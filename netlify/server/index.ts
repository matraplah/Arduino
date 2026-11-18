/* Pelayan API Fizik SPM Interaktif.
   Semua laluan ialah POST /api/<laluan> dengan badan JSON dan respons { ok, ... } atau { ok: false, salah }.
   No. IC penuh hanya dipulangkan kepada guru; murid hanya menerima 4 digit terakhir. */
import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { and, eq, lt } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { pelajar, sesi, tetapan } from "../../db/schema.ts";
import { KUNCI } from "./kunci.ts";

const scrypt = promisify(scryptCb) as (p: string, s: string, n: number) => Promise<Buffer>;

const MATA_SOALAN = 10;
const MATA_MARKAH_REKA = 5;
const SESI_MURID_MS = 7 * 24 * 3600 * 1000;
const SESI_GURU_MS = 12 * 3600 * 1000;
const LENCANA_SAH = ["mula", "tepat5", "tepat10", "tamat", "sempurna", "pereka", "t4", "t5"];

type Jaw = Record<string, { q: Record<string, number>; reka: { j: string[]; o: number; m: number } | null }>;
type Baris = typeof pelajar.$inferSelect;

class Ralat extends Error {
  status: number;
  constructor(msg: string, status = 400) { super(msg); this.status = status; }
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

const sha = (s: string) => createHash("sha256").update(s).digest("hex");
const icBersih = (v: unknown) => String(v ?? "").replace(/\D/g, "");
function icSah(ic: string) {
  if (!/^\d{12}$/.test(ic)) return "No. IC mesti 12 digit, contoh 080512-10-1234.";
  const bln = +ic.slice(2, 4), hr = +ic.slice(4, 6);
  if (bln < 1 || bln > 12 || hr < 1 || hr > 31) return "Enam digit pertama mesti tarikh lahir yang sah (TTBBHH).";
  return "";
}
/* sama seperti icCincang() di klien */
const icCincang = (ic: string) => createHash("sha256").update("fizik-spm-interaktif|" + ic).digest("hex").slice(0, 32);

/* ---------- pengiraan markah (cerminan Game.bab di klien) ---------- */
function bersihJaw(lama: Jaw, baru: unknown): Jaw {
  const out: Jaw = {};
  const b = (baru && typeof baru === "object" ? baru : {}) as Record<string, any>;
  for (const k of KUNCI) {
    const l = lama[k.id] || { q: {}, reka: null };
    const n = b[k.id] && typeof b[k.id] === "object" ? b[k.id] : {};
    const q: Record<string, number> = {};
    k.q.forEach((_, i) => {
      // jawapan yang telah disemak dikunci: nilai lama sentiasa menang
      if (l.q && Number.isInteger(l.q[i])) q[i] = l.q[i];
      else if (n.q && Number.isInteger(n.q[i]) && n.q[i] >= 0 && n.q[i] < 10) q[i] = n.q[i];
    });
    let reka = l.reka || null;
    if (!reka && k.reka && n.reka && Array.isArray(n.reka.j) && n.reka.j.length === k.reka.ok.length && Number.isInteger(n.reka.o)) {
      const j = n.reka.j.map((x: unknown) => String(x ?? "").slice(0, 200));
      const m = k.reka.ok.reduce((s, ok, i) => s + (j[i] === ok ? 2 : 0), 0) + (n.reka.o === k.reka.jawapan ? 2 : 0);
      reka = { j, o: n.reka.o, m };
    }
    if (Object.keys(q).length || reka) out[k.id] = { q, reka };
  }
  return out;
}

function kira(jaw: Jaw, streakMasuk: any) {
  let jumlah = 0, max = 0, dijawab = 0, item = 0, babTamat = 0, okSemua = 0;
  const got = new Set<string>();
  const tamatIkutTing: Record<number, boolean> = { 4: true, 5: true };
  for (const k of KUNCI) {
    const d = jaw[k.id] || { q: {}, reka: null };
    let pts = 0, done = 0, ok = 0;
    k.q.forEach((a, i) => { if (d.q[i] != null) { done++; if (d.q[i] === a) { ok++; pts += MATA_SOALAN; } } });
    const rekaPenuh = k.reka ? k.reka.ok.length * 2 + 2 : 0;
    if (d.reka) { done++; pts += d.reka.m * MATA_MARKAH_REKA; if (d.reka.m === rekaPenuh) got.add("pereka"); }
    const bmax = k.q.length * MATA_SOALAN + rekaPenuh * MATA_MARKAH_REKA, total = k.q.length + (k.reka ? 1 : 0);
    const tamat = done === total;
    jumlah += pts; max += bmax; dijawab += done; item += total; okSemua += ok;
    if (tamat) babTamat++; else tamatIkutTing[k.ting] = false;
    if (ok > 0) got.add("mula");
    if (tamat) got.add("tamat");
    if (pts === bmax) got.add("sempurna");
  }
  const s = streakMasuk && typeof streakMasuk === "object" ? streakMasuk : {};
  const best = Math.min(okSemua, Math.max(0, Math.floor(+s.best || 0)));
  const now = Math.min(best, Math.max(0, Math.floor(+s.now || 0)));
  if (best >= 5) got.add("tepat5");
  if (best >= 10) got.add("tepat10");
  if (tamatIkutTing[4]) got.add("t4");
  if (tamatIkutTing[5]) got.add("t5");
  return {
    jumlah, babTamat,
    peratusMarkah: max ? Math.round((jumlah / max) * 100) : 0,
    kemajuan: item ? Math.round((dijawab / item) * 100) : 0,
    streak: { now, best },
    lencana: LENCANA_SAH.filter((x) => got.has(x)),
  };
}

const profil = (p: Baris) => ({ nama: p.nama, kelas: p.kelas, ic4: p.ic.slice(-4), jaw: p.jaw, streak: p.streak, lencana: p.lencana });

/* ---------- kedudukan ---------- */
function gelaran(r: number, mata: number) {
  if (!(mata > 0)) return "";
  return r === 1 ? "Juara Kelas" : r === 2 ? "Naib Juara" : r === 3 ? "Tempat Ketiga" : r <= 10 ? "10 Terbaik" : "";
}
function susunKedudukan<T extends { jumlah: number; nama: string }>(rows: T[]) {
  const s = rows.slice().sort((a, b) => (b.jumlah || 0) - (a.jumlah || 0) || String(a.nama).localeCompare(String(b.nama)));
  let r = 0, prev: number | null = null;
  return s.map((x, i) => { if (x.jumlah !== prev) { r = i + 1; prev = x.jumlah; } return { ...x, kedudukan: r, gelaran: gelaran(r, x.jumlah) }; });
}

/* ---------- sesi ---------- */
async function sesiBaru(jenis: "murid" | "guru", pelajarId: string | null) {
  const token = randomBytes(32).toString("hex"), kini = Date.now();
  await db.delete(sesi).where(lt(sesi.tamat, kini));
  await db.insert(sesi).values({ token: sha(token), jenis, pelajarId, tamat: kini + (jenis === "guru" ? SESI_GURU_MS : SESI_MURID_MS) });
  return token;
}
async function sesiAmbil(token: unknown, jenis: "murid" | "guru") {
  if (typeof token !== "string" || token.length < 32) return null;
  const [s] = await db.select().from(sesi).where(and(eq(sesi.token, sha(token)), eq(sesi.jenis, jenis)));
  return s && s.tamat > Date.now() ? s : null;
}
async function muridDariToken(token: unknown) {
  const s = await sesiAmbil(token, "murid");
  if (!s || !s.pelajarId) return null;
  const [p] = await db.select().from(pelajar).where(eq(pelajar.id, s.pelajarId));
  return p || null;
}
async function wajibGuru(token: unknown) {
  if (!(await sesiAmbil(token, "guru"))) throw new Ralat("Sesi guru tamat. Sila log masuk semula.", 401);
}

/* ---------- kata laluan guru ---------- */
async function cincangKata(kata: string, garam: string) { return (await scrypt(kata, garam, 32)).toString("hex"); }
async function kataGuru(): Promise<{ garam: string; hash: string } | null> {
  const [t] = await db.select().from(tetapan).where(eq(tetapan.kunci, "guru"));
  if (t) return t.nilai as { garam: string; hash: string };
  const env = process.env.GURU_KATA_LALUAN;
  if (!env) return null;
  const garam = "env";
  return { garam, hash: await cincangKata(env, garam) };
}
async function semakKata(kata: unknown) {
  const k = await kataGuru();
  if (!k || typeof kata !== "string" || !kata) return false;
  const a = Buffer.from(await cincangKata(kata, k.garam), "hex"), b = Buffer.from(k.hash, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}
const lambat = () => new Promise((r) => setTimeout(r, 500));

/* ---------- laluan ---------- */
const LALUAN: Record<string, (b: any) => Promise<Record<string, unknown>>> = {
  async ping() { return {}; },

  async "murid/masuk"(b) {
    const ic = icBersih(b.ic), e = icSah(ic);
    if (e) throw new Ralat(e);
    const [p] = await db.select().from(pelajar).where(eq(pelajar.id, icCincang(ic)));
    if (!p) { await lambat(); throw new Ralat("No. IC ini belum didaftarkan. Sila minta guru mendaftarkan anda."); }
    return { token: await sesiBaru("murid", p.id), profil: profil(p) };
  },
  async "murid/saya"(b) {
    const p = await muridDariToken(b.token);
    if (!p) throw new Ralat("Sesi tamat. Sila log masuk semula.", 401);
    return { profil: profil(p) };
  },
  async "murid/simpan"(b) {
    const p = await muridDariToken(b.token);
    if (!p) throw new Ralat("Sesi tamat. Sila log masuk semula.", 401);
    const jaw = bersihJaw(p.jaw as Jaw, b.jaw), k = kira(jaw, b.streak);
    const [baru] = await db.update(pelajar)
      .set({ jaw, streak: k.streak, lencana: k.lencana, jumlah: k.jumlah, peratusMarkah: k.peratusMarkah, kemajuan: k.kemajuan, babTamat: k.babTamat, kemaskini: Date.now() })
      .where(eq(pelajar.id, p.id)).returning();
    return { profil: profil(baru) };
  },
  async kedudukan(b) {
    const p = await muridDariToken(b.token);
    if (!p) throw new Ralat("Sesi tamat. Sila log masuk semula.", 401);
    const rows = await db.select({ id: pelajar.id, nama: pelajar.nama, jumlah: pelajar.jumlah, peratusMarkah: pelajar.peratusMarkah, kemajuan: pelajar.kemajuan })
      .from(pelajar).where(eq(pelajar.kelas, p.kelas));
    return { senarai: susunKedudukan(rows).map(({ id, ...x }) => ({ ...x, saya: id === p.id })) };
  },
  async keluar(b) {
    if (typeof b.token === "string") await db.delete(sesi).where(eq(sesi.token, sha(b.token)));
    return {};
  },

  async "guru/status"() { return { ada: !!(await kataGuru()) }; },
  async "guru/masuk"(b) {
    if (!(await kataGuru())) throw new Ralat("Kata laluan guru belum ditetapkan.");
    if (!(await semakKata(b.kata))) { await lambat(); throw new Ralat("Kata laluan salah.", 401); }
    return { token: await sesiBaru("guru", null) };
  },
  async "guru/keluar"(b) {
    if (typeof b.token === "string") await db.delete(sesi).where(eq(sesi.token, sha(b.token)));
    return {};
  },
  async "guru/tukar"(b) {
    await wajibGuru(b.token);
    if (!(await semakKata(b.lama))) { await lambat(); throw new Ralat("Kata laluan semasa salah."); }
    if (typeof b.baru !== "string" || b.baru.length < 8) throw new Ralat("Kata laluan mesti sekurang-kurangnya 8 aksara.");
    const garam = randomBytes(16).toString("hex"), nilai = { garam, hash: await cincangKata(b.baru, garam) };
    await db.insert(tetapan).values({ kunci: "guru", nilai }).onConflictDoUpdate({ target: tetapan.kunci, set: { nilai } });
    return {};
  },
  async "guru/daftar"(b) {
    await wajibGuru(b.token);
    const ic = icBersih(b.ic), e = icSah(ic);
    if (e) throw new Ralat(e);
    const nama = String(b.nama ?? "").trim().replace(/\s+/g, " ").slice(0, 80);
    const kelas = String(b.kelas ?? "").trim().toUpperCase().replace(/\s+/g, " ").slice(0, 20);
    if (nama.length < 3) throw new Ralat("Nama terlalu pendek.");
    if (!kelas) throw new Ralat("Kelas mesti diisi.");
    const id = icCincang(ic);
    const [ada] = await db.select({ id: pelajar.id }).from(pelajar).where(eq(pelajar.id, id));
    if (ada) { await db.update(pelajar).set({ ic, nama, kelas }).where(eq(pelajar.id, id)); return { hasil: "kemas" }; }
    await db.insert(pelajar).values({ id, ic, nama, kelas, didaftar: Date.now() });
    return { hasil: "baru" };
  },
  async "guru/padam"(b) {
    await wajibGuru(b.token);
    const id = String(b.id ?? "");
    await db.delete(sesi).where(eq(sesi.pelajarId, id));
    await db.delete(pelajar).where(eq(pelajar.id, id));
    return {};
  },
  async "guru/sifar"(b) {
    await wajibGuru(b.token);
    await db.update(pelajar)
      .set({ jaw: {}, streak: { now: 0, best: 0 }, lencana: [], jumlah: 0, peratusMarkah: 0, kemajuan: 0, babTamat: 0, kemaskini: null })
      .where(eq(pelajar.id, String(b.id ?? "")));
    return {};
  },
  async "guru/senarai"(b) {
    await wajibGuru(b.token);
    const senarai = await db.select({
      id: pelajar.id, ic: pelajar.ic, nama: pelajar.nama, kelas: pelajar.kelas, didaftar: pelajar.didaftar,
      jumlah: pelajar.jumlah, peratusMarkah: pelajar.peratusMarkah, kemajuan: pelajar.kemajuan, babTamat: pelajar.babTamat, kemaskini: pelajar.kemaskini,
    }).from(pelajar);
    return { senarai };
  },
};

export default async (req: Request) => {
  const laluan = new URL(req.url).pathname.replace(/^\/api\//, "").replace(/\/+$/, "");
  const fn = Object.prototype.hasOwnProperty.call(LALUAN, laluan) ? LALUAN[laluan] : null;
  if (!fn) return json({ ok: false, salah: "Laluan tidak dijumpai." }, 404);
  if (req.method !== "POST") return json({ ok: false, salah: "Kaedah tidak dibenarkan." }, 405);
  let body: any = {};
  try { body = await req.json(); } catch { body = {}; }
  if (!body || typeof body !== "object") body = {};
  try {
    return json({ ok: true, ...(await fn(body)) });
  } catch (e) {
    if (e instanceof Ralat) return json({ ok: false, salah: e.message }, e.status);
    console.error("Ralat API", laluan, e);
    return json({ ok: false, salah: "Ralat pelayan. Cuba sebentar lagi." }, 500);
  }
};

export const config = { path: "/api/*" };
