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
  /* langkah 1: semak IC; pulangkan {baru:true} jika profil belum wujud */
  async semak(icMentah) {
    const ic = icBersih(icMentah), salah = icSah(ic); if (salah) return { salah };
    const hash = await icCincang(ic); await dbMula();
    let dok = null;
    if (DB) { try { const s = await DB.doc('pelajar/' + hash).get(); if (s.exists) dok = s.data(); } catch (e) { dok = null; } }
    if (!dok) dok = store.get('p:' + hash);
    return { ic, hash, dok, baru: !dok };
  },
  async masuk(r, nama) {
    const dok = r.dok || {};
    Profil = { hash: r.hash, ic4: r.ic.slice(-4), nama: (nama || dok.nama || '').trim(), mod: DB ? 'db' : 'lokal', data: dariDok(dok) };
    try { sessionStorage.setItem('fz:sesi', JSON.stringify({ hash: Profil.hash, ic4: Profil.ic4, nama: Profil.nama })); } catch (e) { /* abaikan */ }
    if (r.baru) await this.simpan();
    hud();
  },
  /* pulihkan sesi selepas muat semula halaman (tab yang sama sahaja) */
  async pulih() {
    let s = null; try { s = JSON.parse(sessionStorage.getItem('fz:sesi')); } catch (e) { s = null; }
    if (!s || !s.hash) return false;
    await dbMula();
    let dok = null;
    if (DB) { try { const d = await DB.doc('pelajar/' + s.hash).get(); if (d.exists) dok = d.data(); } catch (e) { dok = null; } }
    if (!dok) dok = store.get('p:' + s.hash);
    Profil = { hash: s.hash, ic4: s.ic4, nama: (dok && dok.nama) || s.nama, mod: DB ? 'db' : 'lokal', data: dariDok(dok) };
    return true;
  },
  keluar() { Profil = null; try { sessionStorage.removeItem('fz:sesi'); } catch (e) { /* abaikan */ } hud(); },
  dok() {
    const babTamat = BAB.filter(b => Game.bab(b).tamat).length;
    return { nama: Profil.nama, ic4: Profil.ic4, jaw: Profil.data.jaw, streak: Profil.data.streak, lencana: Profil.data.lencana, jumlah: Game.total(), babTamat, kemaskini: Date.now() };
  },
  /* simpan satu demi satu (tiada tulisan bertindih ke dokumen yang sama) */
  simpan() {
    if (!Profil) return Promise.resolve();
    const body = this.dok(), hash = Profil.hash;
    store.set('p:' + hash, body);
    if (!DB) return Promise.resolve();
    simpanQ = simpanQ.then(() => DB.doc('pelajar/' + hash).set(body)).then(() => { if (simpanGagal) { simpanGagal = false; statusSimpan(); } }).catch(() => { simpanGagal = true; statusSimpan(); });
    return simpanQ;
  }
};
function statusSimpan() {
  const n = document.getElementById('simpan-nota'); if (!n) return;
  n.hidden = !simpanGagal && Profil && Profil.mod === 'db';
  n.textContent = simpanGagal ? 'Markah belum dapat disimpan ke pangkalan data; ia disimpan pada peranti ini dan akan dihantar semasa semakan seterusnya.' : 'Pangkalan data tidak tersedia pada paparan ini, jadi markah disimpan pada peranti ini sahaja.';
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
  h.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" style="fill:var(--c2)"/></svg><b class="num">${t}</b><span class="hud-l">mata · ${esc(Profil.nama.split(' ')[0])}</span>`;
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

/* kad profil di laman utama */
function profilHtml() {
  if (!Profil) return `<section class="sec"><div class="sec-h"><h2>Profil saya</h2><small>Log masuk untuk mengumpul mata</small></div>
    <div class="profil kosong"><p>Log masuk dengan <b>no. kad pengenalan</b> untuk menjawab latihan, mengumpul mata dan menyimpan markah pada profil anda.</p><div class="row"><a class="btn" href="#masuk">Log masuk</a></div></div></section>`;
  const t = Game.total(), mx = Game.max(), pk = Game.pangkat(t), dapat = Game.lencanaDapat(), s = Game.streak();
  const tamat = BAB.filter(b => Game.bab(b).tamat).length;
  return `<section class="sec"><div class="sec-h"><h2>Profil saya</h2><small>${esc(Profil.nama)} · IC ••••••••${esc(Profil.ic4)}</small></div>
    <div class="profil">
      <div class="pf-atas">
        <div><div class="pf-n num">${t}<small> / ${mx} mata</small></div><div class="pf-p">Pangkat ${pk.aras}: <b>${pk.nama}</b></div></div>
        <dl class="pf-s"><div><dt>Bab tamat</dt><dd class="num">${tamat}/${BAB.length}</dd></div><div><dt>Rekod berturut</dt><dd class="num">${s.best}</dd></div><div><dt>Lencana</dt><dd class="num">${dapat.size}/${LENCANA.length}</dd></div></dl>
      </div>
      <div class="pf-bar"><i style="width:${Math.round(pk.frac * 100)}%"></i></div>
      <p class="pf-next">${pk.seterusnya ? `${pk.perlu} mata lagi untuk menjadi <b>${pk.seterusnya}</b>.` : 'Pangkat tertinggi dicapai. Tahniah!'}</p>
      <ul class="lencana">${LENCANA.map(([k, n, d]) => `<li class="${dapat.has(k) ? 'ada' : ''}"><b>${n}</b><span>${d}</span></li>`).join('')}</ul>
      <p class="nota-simpan" id="simpan-nota" hidden></p>
      <div class="row"><button type="button" class="btn ghost" id="keluar">Log keluar</button><span class="q-hint">Log keluar selepas selesai, terutama di komputer yang dikongsi.</span></div>
    </div></section>`;
}
function profilBind() {
  statusSimpan();
  const k = document.getElementById('keluar'); if (k) k.onclick = () => { Akaun.keluar(); toast('Anda telah log keluar', 'no'); route(); };
}

/* ---------- halaman log masuk ---------- */
function viewMasuk() {
  app.innerHTML = `<header class="ch-head"><div class="wrap" style="padding-bottom:20px">
      <a class="back" href="#utama">← Kandungan</a>
      <div class="ch-title"><div><div class="eb">Profil murid</div><h1>Log masuk</h1></div></div>
      <p class="ch-intro">Masukkan no. kad pengenalan anda. Markah dan jawapan disimpan pada profil IC anda.</p>
    </div></header>
    <div class="wrap"><div class="panel"><form class="masuk" id="f-masuk" novalidate>
      <label for="ic">No. kad pengenalan</label>
      <input id="ic" name="ic" inputmode="numeric" autocomplete="off" maxlength="14" placeholder="080512-10-1234" required>
      <div id="f-nama" hidden><label for="nama">Nama penuh</label><input id="nama" name="nama" autocomplete="name" maxlength="60" placeholder="Nama seperti dalam senarai kelas"><p class="q-hint">Profil baharu. Nama dipaparkan kepada guru bersama 4 digit terakhir IC.</p></div>
      <p class="ralat" id="ralat" role="alert"></p>
      <div class="row"><button type="submit" class="btn" id="b-masuk">Teruskan</button></div>
      <p class="q-hint">No. IC penuh tidak disimpan. Sistem hanya menyimpan kod cincangan IC, nama dan 4 digit terakhir IC.</p>
    </form></div></div>
    <footer class="foot"><div class="wrap">Fizik SPM Interaktif · Log masuk</div></footer>`;
  const f = document.getElementById('f-masuk'), ic = document.getElementById('ic'), nm = document.getElementById('nama'), bx = document.getElementById('f-nama'), er = document.getElementById('ralat'), bt = document.getElementById('b-masuk');
  let semakan = null;
  ic.oninput = () => { const d = icBersih(ic.value).slice(0, 12); ic.value = d.length > 8 ? d.slice(0, 6) + '-' + d.slice(6, 8) + '-' + d.slice(8) : d.length > 6 ? d.slice(0, 6) + '-' + d.slice(6) : d; semakan = null; bx.hidden = true; bt.textContent = 'Teruskan'; er.textContent = ''; };
  f.onsubmit = async e => {
    e.preventDefault(); er.textContent = ''; bt.disabled = true;
    try {
      if (!semakan) {
        bt.textContent = 'Menyemak…';
        const r = await Akaun.semak(ic.value);
        if (r.salah) { er.textContent = r.salah; bt.textContent = 'Teruskan'; return; }
        semakan = r;
        if (r.baru) { bx.hidden = false; nm.focus(); bt.textContent = 'Daftar dan masuk'; return; }
      } else if (semakan.baru && nm.value.trim().length < 3) { er.textContent = 'Sila masukkan nama penuh.'; return; }
      await Akaun.masuk(semakan, nm.value);
      toast(semakan.baru ? `Selamat datang, ${Profil.nama.split(' ')[0]}!` : `Selamat kembali, ${Profil.nama.split(' ')[0]}!`, 'naik');
      location.hash = 'utama'; route();
    } finally { bt.disabled = false; }
  };
  ic.focus();
}

/* ---------- papan guru (Editor / pemilik sahaja) ---------- */
let stopGuru = null;
function viewGuru() {
  app.innerHTML = `<header class="ch-head"><div class="wrap" style="padding-bottom:20px">
      <a class="back" href="#utama">← Kandungan</a>
      <div class="ch-title"><div><div class="eb">Untuk guru</div><h1>Markah murid</h1></div></div>
      <p class="ch-intro">Senarai dikemas kini secara langsung apabila murid menjawab.</p>
    </div></header><div class="wrap"><div class="panel" id="guru"><p class="lede">Memuatkan…</p></div></div>
    <footer class="foot"><div class="wrap">Fizik SPM Interaktif · Papan guru</div></footer>`;
  const box = document.getElementById('guru');
  dbMula().then(() => {
    if (!DB || !PENGGUNA || !PENGGUNA.canEdit()) { box.innerHTML = '<p class="lede">Papan ini hanya untuk pemilik atau Editor laman, dan memerlukan pangkalan data laman.</p>'; return; }
    let pemasa = setTimeout(() => { box.insertAdjacentHTML('afterbegin', '<p class="ralat">Pangkalan data belum menjawab. Data mungkin belum terkini.</p>'); }, 10000);
    stopGuru = DB.collection('pelajar').orderBy('jumlah', 'desc').onSnapshot(snap => {
      if (!snap.metadata.fromCache) { clearTimeout(pemasa); pemasa = null; }
      const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      box.innerHTML = rows.length ? `<p class="lede">${rows.length} murid berdaftar. Klik “Padam” untuk membuang profil seorang murid (contohnya pendaftaran tersilap).</p>
        <div class="scroll"><table class="rumus guru"><thead><tr><th>#</th><th>Nama</th><th>IC</th><th>Mata</th><th>Bab tamat</th><th>Kemas kini</th><th></th></tr></thead><tbody>
        ${rows.map((r, i) => `<tr><td class="num">${i + 1}</td><td>${esc(r.nama || '–')}</td><td class="num">••••${esc(r.ic4 || '')}</td><td class="num"><b>${+r.jumlah || 0}</b></td><td class="num">${+r.babTamat || 0}/${BAB.length}</td><td class="num">${r.kemaskini ? new Date(r.kemaskini).toLocaleString('ms-MY', { dateStyle: 'short', timeStyle: 'short' }) : '–'}</td><td><button type="button" class="lnk" data-id="${esc(r.id)}">Padam</button></td></tr>`).join('')}
        </tbody></table></div>` : '<p class="lede">Belum ada murid yang log masuk. Senarai akan muncul di sini sebaik sahaja murid mendaftar.</p>';
      box.querySelectorAll('button[data-id]').forEach(b => b.onclick = () => {
        if (b.dataset.sure) { DB.doc('pelajar/' + b.dataset.id).delete().catch(() => toast('Gagal memadam', 'no')); return; }
        b.dataset.sure = '1'; b.textContent = 'Klik lagi untuk sahkan';
      });
    }, () => { box.innerHTML = '<p class="ralat">Senarai tidak dapat dimuatkan. Muat semula halaman untuk cuba lagi.</p>'; });
  });
}

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
  return `<div class="bab-st"><div><span class="eb">Mata bab ini</span><b class="num">${s.pts}<small> / ${s.max}</small></b></div>${bintangHtml(s.bintang)}<div><span class="eb">Dijawab</span><b class="num">${s.done}<small> / ${s.total}</small></b></div></div>`;
}
