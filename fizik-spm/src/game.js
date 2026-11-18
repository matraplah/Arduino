'use strict';
/* ===== Sistem permainan: mata, bintang, pangkat, lencana =====
   Jawapan disimpan dalam storan pelayar (fz:jaw:<bab>) dan dikunci selepas disemak. */
const MATA_SOALAN = 10;           // setiap soalan objektif betul
const MATA_MARKAH_REKA = 5;       // setiap markah soalan reka bentuk (10 markah = 50 mata)
const PANGKAT = [
  [0, 'Pemula'], [100, 'Perantis Fizik'], [300, 'Penyiasat Muda'], [600, 'Jurutera Muda'],
  [1000, 'Saintis'], [1500, 'Pakar Fizik'], [1900, 'Profesor Fizik']
];
const LENCANA = [
  ['mula', 'Langkah Pertama', 'Jawab betul soalan pertama'],
  ['tepat5', 'Tepat Lima', '5 jawapan betul berturut-turut'],
  ['tepat10', 'Penembak Tepat', '10 jawapan betul berturut-turut'],
  ['tamat', 'Tamat Bab', 'Jawab semua soalan dalam satu bab'],
  ['sempurna', 'Bab Sempurna', 'Mata penuh dalam satu bab'],
  ['pereka', 'Pereka Hebat', 'Markah penuh soalan reka bentuk'],
  ['t4', 'Juara Tingkatan 4', 'Tamat semua bab Tingkatan 4'],
  ['t5', 'Juara Tingkatan 5', 'Tamat semua bab Tingkatan 5']
];

/* ---------- profil murid (log masuk dengan no. IC) ----------
   No. IC penuh TIDAK disimpan. Dokumen pangkalan data dinamakan dengan cincangan SHA-256 IC;
   hanya nama dan 4 digit terakhir IC disimpan untuk paparan guru. */
let DB = null, PENGGUNA = null, dbSedia = null, Profil = null, simpanQ = Promise.resolve(), simpanGagal = false;
function dbMula() {
  if (dbSedia) return dbSedia;
  const tamat = new Promise(r => setTimeout(() => r(null), 10000));
  const ambil = n => (window.claude && window.claude.use) ? Promise.race([window.claude.use(n).catch(() => null), tamat]) : Promise.resolve(null);
  dbSedia = Promise.all([ambil('db'), ambil('user')]).then(([d, u]) => { DB = d; PENGGUNA = u; return d; });
  return dbSedia;
}
const icBersih = v => String(v || '').replace(/\D/g, '');
function icSah(ic) {
  if (!/^\d{12}$/.test(ic)) return 'No. IC mesti 12 digit, contoh 080512-10-1234.';
  const bln = +ic.slice(2, 4), hr = +ic.slice(4, 6);
  if (bln < 1 || bln > 12 || hr < 1 || hr > 31) return 'Enam digit pertama mesti tarikh lahir yang sah (TTBBHH).';
  return '';
}
async function icCincang(ic) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('fizik-spm-interaktif|' + ic));
  return [...new Uint8Array(buf)].slice(0, 16).map(x => x.toString(16).padStart(2, '0')).join('');
}
const dataKosong = () => ({ jaw: {}, streak: { now: 0, best: 0 }, lencana: [] });
function dariDok(o) { return { jaw: o && o.jaw ? JSON.parse(JSON.stringify(o.jaw)) : {}, streak: o && o.streak ? { ...o.streak } : { now: 0, best: 0 }, lencana: o && o.lencana ? [...o.lencana] : [] }; }

const Akaun = {
  /* murid hanya boleh masuk jika IC telah didaftarkan oleh guru */
  async masuk(icMentah) {
    const r = await API.muridMasuk(icMentah); if (r.salah) return r;
    this.pasang(r.token, r.profil);
    try { sessionStorage.setItem('fz:sesi', JSON.stringify({ token: r.token })); } catch (e) { /* abaikan */ }
    hud(); this.kedudukan();
    return {};
  },
  pasang(token, p) { Profil = { token, nama: p.nama || '', kelas: p.kelas || '', ic4: p.ic4 || '', data: dariDok(p), ked: null }; },
  /* pulihkan sesi selepas muat semula halaman (tab yang sama sahaja) */
  async pulih() {
    let s = null; try { s = JSON.parse(sessionStorage.getItem('fz:sesi')); } catch (e) { s = null; }
    if (!s || !s.token) return false;
    const p = await API.muridSaya(s.token);
    if (!p) { this.keluar(); return false; }
    this.pasang(s.token, p); this.kedudukan();
    return true;
  },
  keluar() { if (Profil) API.muridKeluar(Profil.token); Profil = null; try { sessionStorage.removeItem('fz:sesi'); } catch (e) { /* abaikan */ } hud(); },
  /* hanya medan kemajuan; nama, IC dan kelas diurus oleh guru */
  dok() {
    let dijawab = 0, item = 0;
    BAB.forEach(b => { const x = Game.bab(b); dijawab += x.done; item += x.total; });
    const jumlah = Game.total(), max = Game.max();
    return { jaw: Profil.data.jaw, streak: Profil.data.streak, lencana: Profil.data.lencana, jumlah, peratusMarkah: Math.round(jumlah / max * 100), kemajuan: Math.round(dijawab / item * 100), babTamat: BAB.filter(b => Game.bab(b).tamat).length, kemaskini: Date.now() };
  },
  /* simpan satu demi satu; pelayan Netlify memulangkan profil yang telah disemaknya sendiri */
  simpan() {
    if (!Profil) return Promise.resolve();
    const P = Profil, body = this.dok();
    simpanQ = simpanQ.then(() => API.muridSimpan(P.token, body)).then(p => {
      if (p && Profil === P) P.data = dariDok(p);
      if (simpanGagal) { simpanGagal = false; statusSimpan(); }
      this.kedudukan();
    }).catch(() => { simpanGagal = true; statusSimpan(); });
    return simpanQ;
  },
  /* kedudukan dalam kelas sendiri; toast apabila mendapat gelaran baharu */
  async kedudukan() {
    if (!Profil) return null;
    const P = Profil, senarai = await API.kedudukan(P.token, P.kelas);
    if (!senarai || Profil !== P) return null;
    const saya = senarai.find(x => x.saya) || null, lama = P.ked && P.ked.saya;
    P.ked = { senarai, saya };
    if (lama && saya && saya.gelaran && saya.gelaran !== lama.gelaran && saya.kedudukan < lama.kedudukan) toast(`Tahniah! Anda kini ${saya.gelaran} (#${saya.kedudukan})`, 'naik');
    hud(); kemasKedudukan();
    return P.ked;
  }
};
function statusSimpan() {
  const n = document.getElementById('simpan-nota'); if (!n) return;
  n.hidden = !simpanGagal;
  n.textContent = 'Markah terkini belum dapat disimpan ke pangkalan data. Ia akan dihantar semula semasa semakan seterusnya; jangan log keluar dahulu.';
}

const Game = {
  load(id) { const d = Profil && Profil.data.jaw[id]; return d && d.q ? JSON.parse(JSON.stringify(d)) : { q: {}, reka: null }; },
  save(id, d) { if (!Profil) return; Profil.data.jaw[id] = d; },
  rekaMax(b) { return b.reka ? (b.reka.aspek.length * 2 + 2) * MATA_MARKAH_REKA : 0; },
  bab(b) {
    const d = this.load(b.id), qs = semuaKuiz(b);
    let pts = 0, done = 0, ok = 0;
    qs.forEach((q, i) => { if (d.q[i] != null) { done++; if (d.q[i] === q.a) { ok++; pts += MATA_SOALAN; } } });
    if (d.reka) { done++; pts += d.reka.m * MATA_MARKAH_REKA; }
    const max = qs.length * MATA_SOALAN + this.rekaMax(b), total = qs.length + (b.reka ? 1 : 0);
    const f = pts / max;
    return { pts, max, done, total, ok, tamat: done === total, bintang: f >= .9 ? 3 : f >= .7 ? 2 : f >= .4 ? 1 : 0 };
  },
  total() { return BAB.reduce((n, b) => n + this.bab(b).pts, 0); },
  max() { return BAB.reduce((n, b) => n + this.bab(b).max, 0); },
  pangkat(p) {
    let i = 0; PANGKAT.forEach((x, k) => { if (p >= x[0]) i = k; });
    const nx = PANGKAT[i + 1];
    return { nama: PANGKAT[i][1], aras: i + 1, seterusnya: nx ? nx[1] : null, perlu: nx ? nx[0] - p : 0, frac: nx ? (p - PANGKAT[i][0]) / (nx[0] - PANGKAT[i][0]) : 1 };
  },
  streak() { return Profil ? Profil.data.streak : { now: 0, best: 0 }; },
  lencanaDapat() {
    const s = this.streak(), st = BAB.map(b => [b, this.bab(b)]);
    const got = new Set();
    if (st.some(([, x]) => x.ok > 0)) got.add('mula');
    if (s.best >= 5) got.add('tepat5');
    if (s.best >= 10) got.add('tepat10');
    if (st.some(([, x]) => x.tamat)) got.add('tamat');
    if (st.some(([, x]) => x.pts === x.max)) got.add('sempurna');
    if (st.some(([b]) => { const d = this.load(b.id); return d.reka && b.reka && d.reka.m === b.reka.aspek.length * 2 + 2; })) got.add('pereka');
    if (st.filter(([b]) => b.ting === 4).every(([, x]) => x.tamat)) got.add('t4');
    if (st.filter(([b]) => b.ting === 5).every(([, x]) => x.tamat)) got.add('t5');
    return got;
  },
  /* panggil selepas setiap semakan: simpan, kemas kini HUD, tunjuk toast mata, pangkat & lencana baharu */
  lepasSemak(mata, betul, sebelum) {
    if (!Profil) return;
    if (betul != null) { const s = Profil.data.streak; s.now = betul ? s.now + 1 : 0; s.best = Math.max(s.best, s.now); }
    const t = this.total(), p0 = this.pangkat(sebelum), p1 = this.pangkat(t);
    toast(mata > 0 ? `+${mata} mata` : 'Tiada mata', mata > 0 ? 'ok' : 'no');
    const s = this.streak(); if (betul && s.now >= 3) toast(`${s.now} betul berturut-turut`, 'api');
    if (p1.aras > p0.aras) toast(`Naik pangkat: ${p1.nama}`, 'naik');
    const lama = new Set(Profil.data.lencana), baru = this.lencanaDapat();
    LENCANA.forEach(([k, n]) => { if (baru.has(k) && !lama.has(k)) toast(`Lencana baharu: ${n}`, 'naik'); });
    Profil.data.lencana = [...baru];
    Akaun.simpan();
    hud();
    const st = document.querySelector('.bab-st'), b = BAB.find(x => x.id === location.hash.slice(1));
    if (st && b) st.outerHTML = babStatusHtml(b);
  }
};

function bintangHtml(n) { return `<span class="bintang" aria-label="${n} bintang">${'★'.repeat(n)}<s>${'★'.repeat(3 - n)}</s></span>`; }

function hud() {
  const h = document.getElementById('hud'); if (!h) return;
  if (!Profil) { h.innerHTML = '<b class="masuk-l">Log masuk</b>'; h.href = '#masuk'; h.setAttribute('aria-label', 'Log masuk dengan no. IC'); return; }
  const t = Game.total(), pk = Game.pangkat(t);
  h.href = '#utama';
  h.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" style="fill:var(--c2)"/></svg><b class="num">${t}</b><span class="hud-l">mata · ${esc(Profil.nama.split(' ')[0])}</span>${Profil.ked && Profil.ked.saya && Profil.ked.saya.gelaran ? `<span class="hud-g">${gelaranHtml(Profil.ked.saya.gelaran)}</span>` : ''}`;
  h.setAttribute('aria-label', `${Profil.nama}: ${t} mata, pangkat ${pk.nama}`);
}
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let toastBox = null;
function toast(msg, kind) {
  if (!toastBox) { toastBox = el('div', 'toasts'); toastBox.setAttribute('aria-live', 'polite'); document.body.append(toastBox); }
  const t = el('div', 'toast ' + (kind || ''), msg); toastBox.append(t);
  while (toastBox.children.length > 3) toastBox.firstChild.remove();
  setTimeout(() => { t.classList.add('pergi'); setTimeout(() => t.remove(), 400); }, 1900);
}

/* kad profil (halaman Profil) */
function profilKadHtml() {
  if (!Profil) return loginKadHtml();
  const t = Game.total(), mx = Game.max(), pk = Game.pangkat(t), dapat = Game.lencanaDapat(), s = Game.streak();
  const tamat = BAB.filter(b => Game.bab(b).tamat).length;
  return `<div class="kad">
      <div class="pf-id"><div class="avatar" aria-hidden="true">${esc((Profil.nama || '?').trim().charAt(0).toUpperCase())}</div>
        <div><div class="pf-nama">${esc(Profil.nama)} <span id="pf-gel">${Profil.ked && Profil.ked.saya ? gelaranHtml(Profil.ked.saya.gelaran) : ''}</span></div>
        <div class="pf-p">${Profil.kelas ? esc(Profil.kelas) + ' · ' : ''}Pangkat ${pk.aras}: <b>${pk.nama}</b><span id="pf-ked">${kedTeks()}</span></div></div></div>
      <div class="pf-atas">
        <div><div class="pf-n num">${t}<small> / ${mx} mata</small></div></div>
        <dl class="pf-s"><div><dt>Bab tamat</dt><dd class="num">${tamat}/${BAB.length}</dd></div><div><dt>Rekod berturut</dt><dd class="num">${s.best}</dd></div><div><dt>Lencana</dt><dd class="num">${dapat.size}/${LENCANA.length}</dd></div></dl>
      </div>
      <div class="pf-bar"><i style="width:${Math.round(pk.frac * 100)}%"></i></div>
      <p class="pf-next">${pk.seterusnya ? `${pk.perlu} mata lagi untuk menjadi <b>${pk.seterusnya}</b>.` : 'Pangkat tertinggi dicapai. Tahniah!'}</p>
      <p class="nota-simpan" id="simpan-nota" hidden></p>
    </div>
    <h2 class="h-kecil">Lencana</h2>
    <ul class="lencana">${LENCANA.map(([k, n, d]) => `<li class="${dapat.has(k) ? 'ada' : ''}"><b>${n}</b><span>${d}</span></li>`).join('')}</ul>
    <div class="row"><button type="button" class="btn ghost" id="keluar">Log keluar</button><span class="q-hint">Log keluar selepas selesai, terutama di komputer yang dikongsi.</span></div>`;
}
function loginKadHtml(teks) {
  return `<div class="kad kad-masuk"><h2>Log masuk murid</h2><p>${teks || 'Log masuk dengan <b>no. kad pengenalan</b> untuk menjawab latihan, mengumpul mata dan bersaing dalam kedudukan kelas.'}</p><div class="row"><a class="btn" href="#masuk">Log masuk</a><a class="lnk" href="#guru">Halaman guru</a></div></div>`;
}
function kedTeks() {
  const s = Profil && Profil.ked && Profil.ked.saya;
  return s ? ` · Kedudukan <b>#${s.kedudukan}</b> daripada ${Profil.ked.senarai.length} dalam kelas` : '';
}
function kedHtml(penuh) {
  if (penuh === undefined) penuh = location.hash === '#kedudukan';
  if (!Profil || !Profil.ked) return '<p class="lede">Memuatkan kedudukan kelas…</p>';
  const L = Profil.ked.senarai, saya = Profil.ked.saya;
  if (!L.length) return '<p class="lede">Belum ada data kedudukan.</p>';
  const atas = penuh ? L : L.filter(x => x.kedudukan <= 10);
  const baris = x => `<li class="${x.saya ? 'saya' : ''} k${x.kedudukan <= 3 && x.jumlah > 0 ? x.kedudukan : ''}"><span class="k-no num">${x.kedudukan}</span><span class="k-nama">${esc(x.nama)}${x.saya ? ' <small>(anda)</small>' : ''} ${gelaranHtml(x.gelaran)}</span><span class="k-mata num"><b>${x.jumlah}</b> mata</span></li>`;
  let h = `<ol class="ked">${atas.map(baris).join('')}</ol>`;
  if (!penuh && saya && saya.kedudukan > 10) h += `<p class="q-hint" style="margin:6px 0 2px">…</p><ol class="ked">${baris(saya)}</ol>`;
  const depan = saya ? L.filter(x => x.jumlah > saya.jumlah).pop() : null;
  if (saya && depan) h += `<p class="k-kejar">${depan.jumlah - saya.jumlah} mata lagi untuk memintas <b>${esc(depan.nama)}</b> di tempat #${depan.kedudukan}.</p>`;
  else if (saya && saya.kedudukan === 1 && saya.jumlah > 0) h += '<p class="k-kejar">Anda mendahului kelas. Teruskan menjawab untuk kekal di tempat pertama!</p>';
  return h;
}
function kemasKedudukan() {
  const b = document.getElementById('ked-box'); if (b) b.innerHTML = kedHtml();
  const k = document.getElementById('pf-ked'); if (k) k.innerHTML = kedTeks();
  const g = document.getElementById('pf-gel'); if (g) g.innerHTML = Profil && Profil.ked && Profil.ked.saya ? gelaranHtml(Profil.ked.saya.gelaran) : '';
  const st = document.querySelector('.bab-st .bs-ked'); if (st) st.innerHTML = kedRingkas();
}
function kedRingkas() { const s = Profil && Profil.ked && Profil.ked.saya; return s ? `<span class="eb">Kedudukan kelas</span><b class="num">#${s.kedudukan}</b>${gelaranHtml(s.gelaran)}` : ''; }
function profilBind() {
  statusSimpan();
  if (Profil) Akaun.kedudukan();
  const k = document.getElementById('keluar'); if (k) k.onclick = () => { Akaun.keluar(); toast('Anda telah log keluar', 'no'); route(); };
}

/* ---------- halaman log masuk murid ---------- */
function viewMasuk() {
  app.innerHTML = `<header class="ch-head"><div class="wrap" style="padding-bottom:20px">
      <a class="back" href="#utama">← Kandungan</a>
      <div class="ch-title"><div><div class="eb">Profil murid</div><h1>Log masuk</h1></div></div>
      <p class="ch-intro">Masukkan no. kad pengenalan anda. Hanya murid yang telah didaftarkan oleh guru boleh log masuk.</p>
    </div></header>
    <div class="wrap"><div class="panel"><form class="masuk" id="f-masuk" novalidate>
      <label for="ic">No. kad pengenalan</label>
      <input id="ic" name="ic" inputmode="numeric" autocomplete="off" maxlength="14" placeholder="080512-10-1234" required>
      <p class="ralat" id="ralat" role="alert"></p>
      <div class="row"><button type="submit" class="btn" id="b-masuk">Log masuk</button></div>
    </form><p class="lede">Guru? <a href="#guru">Log masuk ke halaman guru</a>.</p></div></div>
    <footer class="foot"><div class="wrap">Fizik SPM Interaktif · Log masuk</div></footer>`;
  const f = document.getElementById('f-masuk'), ic = document.getElementById('ic'), er = document.getElementById('ralat'), bt = document.getElementById('b-masuk');
  ic.oninput = () => { ic.value = icFormat(ic.value); er.textContent = ''; };
  f.onsubmit = async e => {
    e.preventDefault(); er.textContent = ''; bt.disabled = true; bt.textContent = 'Menyemak…';
    try {
      const r = await Akaun.masuk(ic.value);
      if (r.salah) { er.textContent = r.salah; return; }
      toast(`Selamat datang, ${Profil.nama.split(' ')[0]}!`, 'naik');
      location.hash = 'utama'; route();
    } finally { bt.disabled = false; bt.textContent = 'Log masuk'; }
  };
  ic.focus();
}
function icFormat(v) { const d = icBersih(v).slice(0, 12); return d.length > 8 ? d.slice(0, 6) + '-' + d.slice(6, 8) + '-' + d.slice(8) : d.length > 6 ? d.slice(0, 6) + '-' + d.slice(6) : d; }

/* ---------- soalan objektif (mod permainan atau latihan bebas) ---------- */
function mcq(host, qs, opt) {
  opt = opt || {};
  const b = opt.bab, game = !!b;
  host.innerHTML = ''; host.style.cssText = 'display:flex;flex-direction:column;gap:18px';
  const d = game ? Game.load(b.id) : { q: {} };
  const sc = el('div', 'score');
  const upd = () => {
    let done = 0, right = 0; qs.forEach((q, i) => { if (d.q[i] != null) { done++; if (d.q[i] === q.a) right++; } });
    sc.innerHTML = game
      ? `<span>Betul <b class="num">${right}/${qs.length}</b></span><span class="bar"><i style="width:${done / qs.length * 100}%"></i></span><span class="sc-m"><b class="num">${right * MATA_SOALAN}</b> mata</span>`
      : `<span>Betul <b class="num">${right}/${qs.length}</b></span><span class="bar"><i style="width:${done / qs.length * 100}%"></i></span><button type="button" class="btn ghost">Soalan baharu</button>`;
    if (!game) sc.querySelector('button').onclick = opt.again;
    return { done, right };
  };
  host.append(sc); upd();
  const kunci = (card, box, q, pilihan) => {
    box.querySelectorAll('.opt').forEach(x => { x.disabled = true; x.setAttribute('aria-pressed', 'false'); if (x.dataset.ok) x.classList.add('ok'); if (+x.dataset.oi === pilihan && pilihan !== q.a) x.classList.add('no'); });
    const ok = pilihan === q.a;
    const fb = el('div', 'fb ' + (ok ? 'ok' : 'no'), `<strong>${ok ? 'Betul' : 'Salah'}${game ? ` · ${ok ? '+' + MATA_SOALAN : '0'} mata` : ''}</strong>${fmt(q.e)}`); fb.setAttribute('role', 'status');
    const act = card.querySelector('.q-act'); if (act) act.replaceWith(fb); else card.append(fb);
    card.classList.add('dikunci');
  };
  qs.forEach((q, n) => {
    const card = el('div', 'q', `<div class="qh"><span class="qn">${n + 1}</span><div>${q.src ? `<div class="src">${q.src}</div>` : ''}<div>${fmt(q.q)}</div></div></div><div class="opts"></div>`);
    const box = card.querySelector('.opts'); let pilih = null;
    const order = d.q[n] != null ? [0, 1, 2, 3] : shuffle([0, 1, 2, 3]);
    order.forEach((oi, k) => {
      const bt = el('button', 'opt', `<b>${'ABCD'[k]}</b><span>${fmt(q.o[oi])}</span>`); bt.type = 'button';
      bt.dataset.ok = oi === q.a ? '1' : ''; bt.dataset.oi = oi; bt.setAttribute('aria-pressed', 'false');
      bt.onclick = () => { pilih = oi; box.querySelectorAll('.opt').forEach(x => x.setAttribute('aria-pressed', x === bt)); semak.disabled = false; };
      box.append(bt);
    });
    const act = el('div', 'row q-act', `<button type="button" class="btn" disabled>Semak jawapan</button><span class="q-hint">Pilih satu jawapan dahulu. Jawapan tidak boleh diubah selepas disemak.</span>`);
    const semak = act.querySelector('button');
    semak.onclick = () => {
      if (pilih == null) return;
      const sebelum = game ? Game.total() : 0;
      d.q[n] = pilih; if (game) Game.save(b.id, d);
      kunci(card, box, q, pilih);
      const r = upd();
      if (game) Game.lepasSemak(pilih === q.a ? MATA_SOALAN : 0, pilih === q.a, sebelum);
      if (r.done === qs.length) selesai();
    };
    card.append(act);
    if (d.q[n] != null) kunci(card, box, q, d.q[n]);
    host.append(card);
  });
  function selesai() {
    const { right } = upd(), pct = right / qs.length;
    const old = host.querySelector('.done'); if (old) old.remove();
    host.append(el('div', 'done', `<b class="num">Bahagian A selesai: ${right}/${qs.length} betul${game ? ` · ${right * MATA_SOALAN} mata` : ''}</b><p>${pct === 1 ? 'Semua betul. Hebat!' : pct >= .6 ? 'Baik. Baca semula penjelasan bagi soalan yang salah.' : 'Ulang kaji tab Penerangan dan Fokus SPM, kemudian cuba Kuiz campuran untuk latihan tambahan.'}</p>`));
  }
  if (upd().done === qs.length) selesai();
}

/* ---------- soalan reka bentuk (dikunci selepas semak) ---------- */
function reka(p, b) {
  const r = b.reka, d = Game.load(b.id), card = el('div', 'reka');
  card.innerHTML = `<p>${fmt(r.s)}</p>
    <div class="scroll"><table class="rumus spec"><thead><tr><th>Aspek</th>${r.opsyen.map(o => `<th>${o}</th>`).join('')}</tr></thead><tbody>${r.aspek.map(x => `<tr><td>${x.a}</td>${x.v.map(v => `<td>${fmt(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <h3>Langkah 1: Pilih ciri yang paling sesuai bagi setiap aspek</h3><div class="asp"></div>
    <h3>Langkah 2: Reka bentuk yang paling sesuai ialah</h3><div class="row pilih"></div>
    <div class="row rk-act"><button type="button" class="btn" disabled>Semak jawapan</button><span class="q-hint">Jawab semua aspek dahulu. Jawapan dikunci selepas disemak.</span></div><div class="hasil" role="status"></div>`;
  const asp = card.querySelector('.asp'), pilih = card.querySelector('.pilih'), act = card.querySelector('.rk-act'), cek = act.querySelector('.btn'), hasil = card.querySelector('.hasil');
  const jaw = r.aspek.map(() => null); let opt = null;
  const siap = () => { cek.disabled = !(jaw.every(x => x != null) && opt != null); };
  r.aspek.forEach((x, i) => {
    const row = el('div', 'asp-r', `<b>${x.a}</b><div class="row"></div><div class="sebab" hidden></div>`);
    [...new Set(x.v)].forEach(v => { const c = el('button', 'chip', fmt(v)); c.type = 'button'; c.dataset.v = v; c.setAttribute('aria-pressed', 'false'); c.onclick = () => { jaw[i] = v; row.querySelectorAll('.chip').forEach(z => z.setAttribute('aria-pressed', z === c)); siap(); }; row.querySelector('.row').append(c); });
    asp.append(row);
  });
  r.opsyen.forEach((o, i) => { const c = el('button', 'chip', o); c.type = 'button'; c.setAttribute('aria-pressed', 'false'); c.onclick = () => { opt = i; pilih.querySelectorAll('.chip').forEach(z => z.setAttribute('aria-pressed', z === c)); siap(); }; pilih.append(c); });
  const tunjuk = (j, o, m) => {
    asp.querySelectorAll('.asp-r').forEach((row, i) => {
      const x = r.aspek[i], ok = j[i] === x.ok, sb = row.querySelector('.sebab');
      row.querySelectorAll('.chip').forEach(z => { z.disabled = true; z.setAttribute('aria-pressed', z.dataset.v === j[i]); });
      row.classList.add(ok ? 'ok' : 'no'); sb.hidden = false;
      sb.innerHTML = `${ok ? '✓ +2 markah' : '✗ 0 markah'} · Ciri: <b>${fmt(x.ok)}</b>. Sebab: ${fmt(x.sebab)}`;
    });
    pilih.querySelectorAll('.chip').forEach((z, i) => { z.disabled = true; z.setAttribute('aria-pressed', i === o); });
    pilih.classList.add(o === r.jawapan ? 'ok' : 'no');
    act.remove(); card.classList.add('dikunci');
    hasil.innerHTML = `<b class="num">Markah: ${m}/${r.aspek.length * 2 + 2} · ${m * MATA_MARKAH_REKA} mata</b><p>Jawapan contoh: <b>${r.opsyen[r.jawapan]}</b> paling sesuai kerana ${r.aspek.map(x => `${x.a.charAt(0).toLowerCase() + x.a.slice(1)} ialah ${fmt(x.ok)}`).join('; ')}.</p>`;
  };
  cek.onclick = () => {
    if (cek.disabled) return;
    const sebelum = Game.total();
    let m = r.aspek.reduce((n, x, i) => n + (jaw[i] === x.ok ? 2 : 0), 0) + (opt === r.jawapan ? 2 : 0);
    const dd = Game.load(b.id); dd.reka = { j: jaw.slice(), o: opt, m }; Game.save(b.id, dd);
    tunjuk(jaw, opt, m);
    Game.lepasSemak(m * MATA_MARKAH_REKA, null, sebelum);
  };
  if (d.reka) tunjuk(d.reka.j, d.reka.o, d.reka.m);
  p.append(card);
}

function babStatusHtml(b) {
  const s = Game.bab(b);
  return `<div class="bab-st"><div><span class="eb">Mata bab ini</span><b class="num">${s.pts}<small> / ${s.max}</small></b></div>${bintangHtml(s.bintang)}<div><span class="eb">Dijawab</span><b class="num">${s.done}<small> / ${s.total}</small></b></div><div class="bs-ked">${kedRingkas()}</div></div>`;
}
