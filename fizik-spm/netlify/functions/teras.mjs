// Logik pelayan Fizik SPM Interaktif (tanpa bergantung pada Netlify, supaya boleh diuji secara setempat).
// Storan: objek dengan get(key) -> JSON|null, set(key, json), del(key), keys(prefix) -> [key].
import { createHash, pbkdf2Sync, randomBytes, timingSafeEqual } from 'node:crypto';

export const MATA_SOALAN = 10, MATA_MARKAH_REKA = 5;
const ITER = 150000;
const JAM = 3600 * 1000;

export const icBersih = v => String(v || '').replace(/\D/g, '');
export function icSah(ic) {
  if (!/^\d{12}$/.test(ic)) return 'No. IC mesti 12 digit, contoh 080512-10-1234.';
  const bln = +ic.slice(2, 4), hr = +ic.slice(4, 6);
  if (bln < 1 || bln > 12 || hr < 1 || hr > 31) return 'Enam digit pertama mesti tarikh lahir yang sah (TTBBHH).';
  return '';
}
export const icCincang = ic => createHash('sha256').update('fizik-spm-interaktif|' + ic).digest('hex').slice(0, 32);
const kataCincang = (kata, garam) => pbkdf2Sync(kata, garam, ITER, 32, 'sha256').toString('hex');
const samaRata = (a, b) => { const x = Buffer.from(a, 'hex'), y = Buffer.from(b, 'hex'); return x.length === y.length && timingSafeEqual(x, y); };
const token = () => randomBytes(24).toString('hex');

/* ---------- pengiraan mata (sama seperti dalam pelayar) ---------- */
export function kira(doc, KUNCI) {
  let jumlah = 0, max = 0, dijawab = 0, item = 0, babTamat = 0;
  for (const [id, k] of Object.entries(KUNCI)) {
    const d = (doc.jaw && doc.jaw[id]) || { q: {} };
    let done = 0;
    k.q.forEach((a, i) => { const v = d.q ? d.q[i] : undefined; if (v != null) { done++; if (v === a) jumlah += MATA_SOALAN; } });
    max += k.q.length * MATA_SOALAN;
    let tot = k.q.length;
    if (k.reka) { tot++; max += (k.reka.ok.length * 2 + 2) * MATA_MARKAH_REKA; if (d.reka) { done++; jumlah += d.reka.m * MATA_MARKAH_REKA; } }
    dijawab += done; item += tot; if (done === tot) babTamat++;
  }
  return { jumlah, peratusMarkah: Math.round(jumlah / max * 100), kemajuan: Math.round(dijawab / item * 100), babTamat, dijawab };
}

/* gabungkan jawapan baharu sahaja: jawapan yang sudah disimpan TIDAK boleh diubah */
export function gabung(simpan, hantar, KUNCI) {
  const jaw = JSON.parse(JSON.stringify(simpan || {}));
  for (const [id, k] of Object.entries(KUNCI)) {
    const h = hantar && hantar[id]; if (!h || typeof h !== 'object') continue;
    const d = jaw[id] || (jaw[id] = { q: {}, reka: null });
    if (!d.q) d.q = {};
    if (h.q && typeof h.q === 'object') {
      for (const [i, v] of Object.entries(h.q)) {
        const n = +i;
        if (Number.isInteger(n) && n >= 0 && n < k.q.length && d.q[n] == null && Number.isInteger(v) && v >= 0 && v <= 3) d.q[n] = v;
      }
    }
    if (k.reka && !d.reka && h.reka && Array.isArray(h.reka.j) && h.reka.j.length === k.reka.ok.length && Number.isInteger(h.reka.o) && h.reka.o >= 0 && h.reka.o < k.reka.n) {
      const j = h.reka.j.map(x => String(x).slice(0, 200));
      const m = k.reka.ok.reduce((s, ok, i) => s + (j[i] === ok ? 2 : 0), 0) + (h.reka.o === k.reka.jawapan ? 2 : 0);
      d.reka = { j, o: h.reka.o, m };
    }
  }
  return jaw;
}

/* ---------- kedudukan kelas ---------- */
export function gelaran(r, mata) { if (!(mata > 0)) return ''; return r === 1 ? 'Juara Kelas' : r === 2 ? 'Naib Juara' : r === 3 ? 'Tempat Ketiga' : r <= 10 ? '10 Terbaik' : ''; }
export function susun(rows) {
  const s = rows.slice().sort((a, b) => (b.jumlah || 0) - (a.jumlah || 0) || String(a.nama).localeCompare(String(b.nama)));
  let r = 0, prev = null;
  s.forEach((x, i) => { if (x.jumlah !== prev) { r = i + 1; prev = x.jumlah; } x.kedudukan = r; x.gelaran = gelaran(r, x.jumlah); });
  return s;
}

const LENCANA_SAH = ['mula', 'tepat5', 'tepat10', 'tamat', 'sempurna', 'pereka', 't4', 't5'];
const awam = d => ({ nama: d.nama, kelas: d.kelas, ic4: String(d.ic || '').slice(-4), jaw: d.jaw || {}, streak: d.streak || { now: 0, best: 0 }, lencana: d.lencana || [], jumlah: d.jumlah || 0, peratusMarkah: d.peratusMarkah || 0, kemajuan: d.kemajuan || 0, babTamat: d.babTamat || 0 });
const dokBaru = (ic, nama, kelas) => ({ ic, nama, kelas, didaftar: Date.now(), jaw: {}, streak: { now: 0, best: 0 }, lencana: [], jumlah: 0, peratusMarkah: 0, kemajuan: 0, babTamat: 0, kemaskini: null });

/* ---------- had percubaan (ikut alamat IP) ---------- */
async function had(S, jenis, ip, maks, minit) {
  const k = `had/${jenis}/${createHash('sha256').update(String(ip || '?')).digest('hex').slice(0, 24)}`;
  const now = Date.now(), r = (await S.get(k)) || { n: 0, t: now };
  if (now - r.t > minit * 60000) { r.n = 0; r.t = now; }
  return { lebih: r.n >= maks, catat: async () => { r.n++; await S.set(k, r); }, kosong: async () => { await S.del(k); } };
}

async function sesi(S, t, jenis) {
  if (!t || !/^[0-9a-f]{48}$/.test(t)) return null;
  const s = await S.get('sesi/' + t);
  if (!s || s.j !== jenis || s.exp < Date.now()) return null;
  return s;
}

/* ---------- penghala API ---------- */
export async function kendali(laluan, body, { S, KUNCI, env, ip }) {
  const salah = (msg, status = 400) => ({ status, data: { ok: false, salah: msg } });
  const ok = data => ({ status: 200, data: { ok: true, ...data } });
  body = body || {};

  if (laluan === 'ping') return ok({ versi: 1 });

  /* ----- murid ----- */
  if (laluan === 'murid/masuk') {
    const h = await had(S, 'murid', ip, 30, 10);
    if (h.lebih) return salah('Terlalu banyak percubaan. Cuba lagi selepas 10 minit.', 429);
    const ic = icBersih(body.ic), e = icSah(ic); if (e) return salah(e);
    const id = icCincang(ic), d = await S.get('pelajar/' + id);
    if (!d) { await h.catat(); return salah('No. IC ini belum didaftarkan. Sila minta guru mendaftarkan anda.', 404); }
    const t = token(); await S.set('sesi/' + t, { j: 'm', id, exp: Date.now() + 12 * JAM });
    return ok({ token: t, profil: awam(d) });
  }
  if (laluan === 'murid/saya') {
    const s = await sesi(S, body.token, 'm'); if (!s) return salah('Sesi tamat. Sila log masuk semula.', 401);
    const d = await S.get('pelajar/' + s.id); if (!d) return salah('Profil tidak dijumpai.', 404);
    return ok({ profil: awam(d) });
  }
  if (laluan === 'murid/simpan') {
    const s = await sesi(S, body.token, 'm'); if (!s) return salah('Sesi tamat. Sila log masuk semula.', 401);
    const d = await S.get('pelajar/' + s.id); if (!d) return salah('Profil tidak dijumpai.', 404);
    d.jaw = gabung(d.jaw, body.jaw, KUNCI);
    const k = kira(d, KUNCI);
    Object.assign(d, { jumlah: k.jumlah, peratusMarkah: k.peratusMarkah, kemajuan: k.kemajuan, babTamat: k.babTamat, kemaskini: Date.now() });
    if (body.streak && Number.isFinite(body.streak.best)) d.streak = { now: Math.max(0, Math.min(+body.streak.now || 0, k.dijawab)), best: Math.max(d.streak?.best || 0, Math.min(+body.streak.best, k.dijawab)) };
    if (Array.isArray(body.lencana)) d.lencana = body.lencana.filter(x => LENCANA_SAH.includes(x));
    await S.set('pelajar/' + s.id, d);
    return ok({ profil: awam(d) });
  }
  if (laluan === 'kedudukan') {
    const s = await sesi(S, body.token, 'm'); if (!s) return salah('Sesi tamat. Sila log masuk semula.', 401);
    const saya = await S.get('pelajar/' + s.id); if (!saya) return salah('Profil tidak dijumpai.', 404);
    const rows = [];
    for (const key of await S.keys('pelajar/')) {
      const d = await S.get(key); if (!d || d.kelas !== saya.kelas) continue;
      rows.push({ nama: d.nama, jumlah: d.jumlah || 0, peratusMarkah: d.peratusMarkah || 0, kemajuan: d.kemajuan || 0, saya: key === 'pelajar/' + s.id });
    }
    return ok({ kelas: saya.kelas, senarai: susun(rows) });
  }
  if (laluan === 'keluar') { if (body.token && /^[0-9a-f]{48}$/.test(body.token)) await S.del('sesi/' + body.token); return ok({}); }

  /* ----- guru ----- */
  const tetapan = async () => (await S.get('tetapan/guru')) || null;
  if (laluan === 'guru/status') {
    const t = await tetapan();
    return ok({ ada: !!(t && t.hash) || !!env.GURU_KATA_LALUAN });
  }
  if (laluan === 'guru/masuk') {
    const h = await had(S, 'guru', ip, 5, 15);
    if (h.lebih) return salah('Terlalu banyak percubaan salah. Cuba lagi selepas 15 minit.', 429);
    const kata = String(body.kata || ''), t = await tetapan();
    let betul = false;
    if (t && t.hash) betul = samaRata(kataCincang(kata, t.garam), t.hash);
    else if (env.GURU_KATA_LALUAN) betul = kata.length > 0 && samaRata(createHash('sha256').update(kata).digest('hex'), createHash('sha256').update(env.GURU_KATA_LALUAN).digest('hex'));
    else return salah('Kata laluan guru belum ditetapkan. Tetapkan pemboleh ubah GURU_KATA_LALUAN dalam tetapan Netlify.', 409);
    if (!betul) { await h.catat(); return salah('Kata laluan salah.', 401); }
    await h.kosong();
    const tk = token(); await S.set('sesi/' + tk, { j: 'g', exp: Date.now() + 8 * JAM });
    return ok({ token: tk });
  }
  const g = laluan.startsWith('guru/') ? await sesi(S, body.token, 'g') : null;
  if (laluan.startsWith('guru/') && !g) return salah('Sesi guru tamat. Sila log masuk semula.', 401);

  if (laluan === 'guru/tukar') {
    const baru = String(body.baru || ''); if (baru.length < 8) return salah('Kata laluan mesti sekurang-kurangnya 8 aksara.');
    const t = await tetapan(), lama = String(body.lama || '');
    const betul = t && t.hash ? samaRata(kataCincang(lama, t.garam), t.hash) : !!env.GURU_KATA_LALUAN && lama === env.GURU_KATA_LALUAN;
    if (!betul) return salah('Kata laluan semasa salah.', 401);
    const garam = randomBytes(16).toString('hex');
    await S.set('tetapan/guru', { garam, hash: kataCincang(baru, garam), iter: ITER, dikemaskini: Date.now() });
    return ok({});
  }
  if (laluan === 'guru/senarai') {
    const rows = [];
    for (const key of await S.keys('pelajar/')) {
      const d = await S.get(key); if (!d) continue;
      rows.push({ id: key.slice(8), ic: d.ic, nama: d.nama, kelas: d.kelas, didaftar: d.didaftar, jumlah: d.jumlah || 0, peratusMarkah: d.peratusMarkah || 0, kemajuan: d.kemajuan || 0, babTamat: d.babTamat || 0, kemaskini: d.kemaskini || null });
    }
    return ok({ senarai: rows });
  }
  if (laluan === 'guru/daftar') {
    const ic = icBersih(body.ic), e = icSah(ic); if (e) return salah(e);
    const nama = String(body.nama || '').trim().replace(/\s+/g, ' ').slice(0, 80), kelas = String(body.kelas || '').trim().toUpperCase().replace(/\s+/g, ' ').slice(0, 20);
    if (nama.length < 3) return salah('Nama terlalu pendek.');
    if (!kelas) return salah('Kelas mesti diisi.');
    const id = icCincang(ic), cur = await S.get('pelajar/' + id);
    if (cur) { Object.assign(cur, { ic, nama, kelas }); await S.set('pelajar/' + id, cur); return ok({ hasil: 'kemas' }); }
    await S.set('pelajar/' + id, dokBaru(ic, nama, kelas)); return ok({ hasil: 'baru' });
  }
  if (laluan === 'guru/padam' || laluan === 'guru/sifar') {
    const id = String(body.id || ''); if (!/^[0-9a-f]{32}$/.test(id)) return salah('Murid tidak sah.');
    const cur = await S.get('pelajar/' + id); if (!cur) return salah('Murid tidak dijumpai.', 404);
    if (laluan === 'guru/padam') await S.del('pelajar/' + id);
    else await S.set('pelajar/' + id, { ...dokBaru(cur.ic, cur.nama, cur.kelas), didaftar: cur.didaftar || Date.now() });
    return ok({});
  }
  if (laluan === 'guru/keluar') { await S.del('sesi/' + body.token); return ok({}); }
  return salah('Laluan tidak dikenali.', 404);
}
