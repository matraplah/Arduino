'use strict';
/* ===== Fizik SPM Interaktif: enjin laman ===== */
const BAB = [];   // diisi oleh data-t4.js dan data-t5.js
const SIMS = {};  // diisi oleh sims.js

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem('fz:' + k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem('fz:' + k, JSON.stringify(v)); } catch (e) { /* storan tidak tersedia */ } }
};

/* ---- Penulisan rumus ringkas: $v = u + at$, {a}/{b} pecahan, _ subskrip, ^ superskrip,
        sqrt{..} punca kuasa dua, nuk{A}{Z}{X} nuklid, "teks" tegak ---- */
function math(s) {
  let i = 0;
  const E = t => t.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const R = t => t.replace(/(sin|kos|tan|log|maks|min)|([A-Za-zα-ω]+)|([&<>])|(-)/g,
    (m, fn, v, x, h) => fn ? '<span class="up">' + fn + '</span>' : v ? '<i>' + v + '</i>' : h ? '−' : E(x));
  function grp() { i++; const h = seq('}'); i++; return h; }
  function quote() { const j = s.indexOf('"', i + 1); const t = s.slice(i + 1, j); i = j + 1; return '<span class="up">' + E(t) + '</span>'; }
  function atom() {
    if (s[i] === '{') return grp();
    if (s[i] === '"') return quote();
    const m = /^[-−+]?\d+|^./u.exec(s.slice(i)); i += m[0].length; return R(m[0]);
  }
  function seq(end) {
    let o = '';
    while (i < s.length && s[i] !== end) {
      const c = s[i];
      if (c === '{') {
        const a = grp();
        if (s[i] === '/' && s[i + 1] === '{') { i++; const b = grp(); o += '<span class="fr"><span>' + a + '</span><span>' + b + '</span></span>'; }
        else o += a;
      }
      else if (c === '_') { i++; o += '<sub>' + atom() + '</sub>'; }
      else if (c === '^') { i++; o += '<sup>' + atom() + '</sup>'; }
      else if (c === '"') { o += quote(); }
      else if (s.startsWith('sqrt{', i)) { i += 4; o += '<span class="rt">√<span>' + grp() + '</span></span>'; }
      else if (s.startsWith('nuk{', i)) {
        i += 3; const A = grp(), Z = grp(), X = grp();
        o += '<span class="nk"><span>' + A + '</span><span>' + Z + '</span></span><span class="up">' + X.replace(/<\/?i>/g, '') + '</span>';
      }
      else {
        let j = i + 1;
        while (j < s.length && !'{}_^"'.includes(s[j]) && s[j] !== end && !s.startsWith('sqrt{', j) && !s.startsWith('nuk{', j)) j++;
        o += R(s.slice(i, j)); i = j;
      }
    }
    return o;
  }
  return '<span class="m' + (s.length <= 34 ? ' nw' : '') + '">' + seq(null) + '</span>';
}
/* Teks kandungan: $...$ rumus, **tebal**, ==serlah== */
function fmt(t) {
  const ms = [];
  const s = String(t).replace(/\$([^$]+)\$/g, (m, x) => { ms.push(math(x)); return '\u0001' + (ms.length - 1) + '\u0002'; })
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/==(.+?)==/g, '<mark>$1</mark>');
  return s.replace(/\u0001(\d+)\u0002/g, (m, k) => ms[+k]);
}

/* ---------- keadaan ---------- */
const app = document.getElementById('app');
let stopSim = null, stopHero = null;
const TABS = [['terang', 'Penerangan', 'Isi'], ['visual', 'Visual', 'Visual'], ['fokus', 'Fokus SPM', 'Fokus SPM'], ['latih', 'Latihan', 'Latihan'], ['nota', 'Rumusan', 'Rumusan']];
let curTab = store.get('tab2');
if (!TABS.some(t => t[0] === curTab)) curTab = 'terang';
const semuaKuiz = b => (b.kuizTambah || []).concat(b.kuiz);

function cleanup() {
  if (stopSim) { stopSim(); stopSim = null; }
  if (stopHero) { stopHero(); stopHero = null; }
  if (stopGuru) { stopGuru(); stopGuru = null; }
}

/* ---------- navigasi utama ---------- */
const NAV = [
  ['utama', 'Utama', 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H10v6H4a1 1 0 0 1-1-1z'],
  ['bab', 'Bab', 'M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11'],
  ['kuiz', 'Kuiz', 'M9 12l2 2 4-4M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z'],
  ['kedudukan', 'Kedudukan', 'M8 21h8M12 16v5M7 4h10v5a5 5 0 0 1-10 0zM17 6h3v1a3 3 0 0 1-3 3M7 6H4v1a3 3 0 0 0 3 3'],
  ['profil', 'Profil', 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0']
];
function navPasang() {
  const ikon = d => `<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" style="fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"/></svg>`;
  const html = NAV.map(([id, t, d]) => `<a href="#${id}" data-nav="${id}">${ikon(d)}<span>${t}</span></a>`).join('');
  document.getElementById('nav-atas').innerHTML = html;
  document.getElementById('nav-bawah').innerHTML = html;
}
function navAktif(id) {
  document.querySelectorAll('[data-nav]').forEach(a => { if (a.dataset.nav === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
}
function kepala(eb, tajuk, sub) {
  return `<header class="pg-head"><div class="wrap"><div class="eb">${eb}</div><h1>${tajuk}</h1>${sub ? `<p>${sub}</p>` : ''}</div></header>`;
}
const kaki = () => `<footer class="foot"><div class="wrap">Fizik SPM Interaktif · Disusun dan dicipta oleh Cikgu Mohd Sharafi</div></footer>`;
const ikonKecil = d => `<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" style="fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"/></svg>`;

/* ---------- Utama ---------- */
function viewUtama() {
  const akhir = BAB.find(b => b.id === store.get('akhir')) || BAB[0];
  const sa = Game.bab(akhir);
  let atas;
  if (Profil) {
    const t = Game.total(), pk = Game.pangkat(t), sy = Profil.ked && Profil.ked.saya;
    let dijawab = 0, item = 0; BAB.forEach(b => { const x = Game.bab(b); dijawab += x.done; item += x.total; });
    atas = `<div class="kad sambut">
      <div class="sb-h"><div><div class="eb">Selamat datang</div><h2>${esc(Profil.nama)} <span id="pf-gel">${sy ? gelaranHtml(sy.gelaran) : ''}</span></h2><p class="q-hint">${esc(Profil.kelas || '')} · Pangkat: ${pk.nama}</p></div></div>
      <dl class="tiles">
        <div><dt>Mata</dt><dd class="num">${t}</dd></div>
        <div><dt>Kedudukan kelas</dt><dd class="num" id="ut-ked">${sy ? '#' + sy.kedudukan : '–'}</dd></div>
        <div><dt>Kemajuan</dt><dd class="num">${Math.round(dijawab / item * 100)}%</dd></div>
      </dl></div>`;
  } else atas = loginKadHtml();
  app.innerHTML = `
  ${kepala('Fizik KSSM Tingkatan 4 & 5', 'Belajar, berlatih, bersaing', 'Nota ringkas, visual interaktif dan latihan SPM untuk 13 bab.')}
  <div class="wrap halaman">
    ${atas}
    <section><h2 class="h-kecil">Teruskan belajar</h2>
      <a class="kad teruskan" href="#${akhir.id}"><span class="no">${akhir.no}</span><span><span class="eb">Tingkatan ${akhir.ting} · Bab ${akhir.no}</span><b>${akhir.tajuk}</b><span class="q-hint">${sa.done ? `${sa.done}/${sa.total} soalan dijawab` : 'Mula dengan Penerangan, kemudian Latihan'}</span></span><span class="pergi" aria-hidden="true">→</span></a>
    </section>
    <section><h2 class="h-kecil">Akses pantas</h2>
      <div class="pantas">
        <a href="#bab">${ikonKecil(NAV[1][2])}<b>Semua bab</b><span>13 bab T4 dan T5</span></a>
        <a href="#kuiz">${ikonKecil(NAV[2][2])}<b>Kuiz campuran</b><span>10 soalan rawak</span></a>
        <a href="#kedudukan">${ikonKecil(NAV[3][2])}<b>Kedudukan kelas</b><span>Siapa juara?</span></a>
        <a href="#rujukan">${ikonKecil('M4 6h16M4 12h16M4 18h10')}<b>Pemalar fizik</b><span>Nilai rujukan</span></a>
      </div>
    </section>
    <details class="kad cara"><summary>Cara guna setiap bab</summary>
      <ol class="steps">
        <li><b>Penerangan</b><span>Isi ringkas. Tanda <i class="chip-spm">SPM</i> = kerap ditanya.</span></li>
        <li><b>Visual</b><span>Ubah nilai, lihat konsep berlaku.</span></li>
        <li><b>Fokus SPM</b><span>Hafal takrif, kenali corak soalan.</span></li>
        <li><b>Latihan</b><span>Jawab, semak, kumpul mata.</span></li>
        <li><b>Rumusan</b><span>Rumus dan kesilapan lazim.</span></li>
      </ol></details>
  </div>${kaki()}`;
  const iv = setInterval(() => { if (Profil) Akaun.kedudukan(); }, 30000);
  stopHero = () => clearInterval(iv);
  if (Profil) Akaun.kedudukan().then(() => { const k = document.getElementById('ut-ked'), sy = Profil && Profil.ked && Profil.ked.saya; if (k && sy) k.textContent = '#' + sy.kedudukan; });
}

/* ---------- Bab ---------- */
function viewSenaraiBab() {
  let ting = store.get('ting') === 5 ? 5 : 4;
  app.innerHTML = `${kepala('Senarai bab', 'Bab', 'Pilih tingkatan, kemudian pilih bab.')}
    <div class="wrap halaman">
      <div class="seg" role="tablist" aria-label="Tingkatan"><button type="button" role="tab" data-t="4">Tingkatan 4</button><button type="button" role="tab" data-t="5">Tingkatan 5</button></div>
      <ol class="toc" id="toc"></ol>
    </div>${kaki()}`;
  const lukis = () => {
    app.querySelectorAll('.seg button').forEach(b => b.setAttribute('aria-selected', +b.dataset.t === ting));
    document.getElementById('toc').innerHTML = BAB.filter(b => b.ting === ting).map(b => {
      const s = Game.bab(b);
      return `<li><a href="#${b.id}"><span class="no">${b.no}</span>
        <span><span class="tm">${b.tema}</span><span class="tj">${b.tajuk}</span></span>
        <span class="pg${s.tamat ? ' done' : ''}">${Profil ? `${bintangHtml(s.bintang)}<b class="num">${s.pts}<small>/${s.max}</small></b>` : `<span class="q-hint">${b.sub.length} subtopik</span>`}</span></a></li>`;
    }).join('');
  };
  app.querySelectorAll('.seg button').forEach(b => b.onclick = () => { ting = +b.dataset.t; store.set('ting', ting); lukis(); });
  lukis();
}

/* ---------- Kuiz ---------- */
function viewKuizMenu() {
  app.innerHTML = `${kepala('Latihan bebas', 'Kuiz campuran', '10 soalan objektif dipilih secara rawak untuk ulang kaji. Kuiz ini tidak menambah mata; kumpul mata melalui tab Latihan dalam setiap bab.')}
    <div class="wrap halaman"><div class="pantas tiga">
      <a href="#kuiz-t4"><b>Tingkatan 4</b><span>Bab 1 hingga Bab 6</span></a>
      <a href="#kuiz-t5"><b>Tingkatan 5</b><span>Bab 1 hingga Bab 7</span></a>
      <a href="#kuiz-semua"><b>Semua bab</b><span>Ulang kaji menjelang SPM</span></a>
    </div></div>${kaki()}`;
}

/* ---------- Kedudukan ---------- */
function viewKedudukan() {
  if (!Profil) { app.innerHTML = `${kepala('Kelas anda', 'Kedudukan kelas')}<div class="wrap halaman">${loginKadHtml('Log masuk untuk melihat kedudukan anda dalam kelas dan bersaing dengan rakan sekelas.')}</div>${kaki()}`; return; }
  app.innerHTML = `${kepala(esc(Profil.kelas || 'Kelas anda'), 'Kedudukan kelas', 'Dikemas kini setiap kali markah disimpan. Gelaran dipaparkan di sebelah nama.')}
    <div class="wrap halaman"><div class="kad" id="ked-box">${kedHtml(true)}</div>
    <div class="kad gel-info"><h2 class="h-kecil">Gelaran</h2><p>${gelaranHtml('Juara Kelas')} tempat pertama · ${gelaranHtml('Naib Juara')} kedua · ${gelaranHtml('Tempat Ketiga')} ketiga · ${gelaranHtml('10 Terbaik')} tempat 4 hingga 10</p></div></div>${kaki()}`;
  const iv = setInterval(() => Akaun.kedudukan(), 30000); stopHero = () => clearInterval(iv);
  Akaun.kedudukan();
}

/* ---------- Profil ---------- */
function viewProfil() {
  app.innerHTML = `${kepala('Akaun', 'Profil')}<div class="wrap halaman">${profilKadHtml()}
    <p class="q-hint">Guru? <a href="#guru">Buka halaman guru</a>.</p></div>${kaki()}`;
  profilBind();
}

/* ---------- Rujukan ---------- */
function viewRujukan() {
  app.innerHTML = `${kepala('Rujukan', 'Pemalar fizik', 'Nilai yang digunakan dalam buku teks dan laman ini.')}
    <div class="wrap halaman"><div class="kad"><dl class="consts">${[
        ['Pecutan graviti', '$g = 9.81 "m s"^{-2}$'],
        ['Pemalar kegravitian', '$G = 6.67 × 10^{-11} "N m"^2 "kg"^{-2}$'],
        ['Jisim Bumi', '$M = 5.97 × 10^{24} "kg"$'],
        ['Jejari Bumi', '$R = 6.37 × 10^6 "m"$'],
        ['Laju cahaya dalam vakum', '$c = 3.00 × 10^8 "m s"^{-1}$'],
        ['Muatan haba tentu air', '$c = 4 200 "J kg"^{-1} "°C"^{-1}$'],
        ['Haba pendam tentu pelakuran ais', '$l_f = 3.34 × 10^5 "J kg"^{-1}$'],
        ['Haba pendam tentu pengewapan air', '$l_v = 2.26 × 10^6 "J kg"^{-1}$'],
        ['Ketumpatan air', '$ρ = 1 000 "kg m"^{-3}$'],
        ['Tekanan atmosfera', '$760 "mm Hg" ≈ 1.01 × 10^5 "Pa"$'],
        ['Cas elektron', '$e = 1.60 × 10^{-19} "C"$'],
        ['Jisim elektron', '$m = 9.11 × 10^{-31} "kg"$'],
        ['Pemalar Planck', '$h = 6.63 × 10^{-34} "J s"$'],
        ['Unit jisim atom', '$1 "u.j.a." = 1.66 × 10^{-27} "kg"$'],
        ['Elektron-volt', '$1 "eV" = 1.60 × 10^{-19} "J"$']
      ].map(r => `<div><dt>${r[0]}</dt><dd>${fmt(r[1])}</dd></div>`).join('')}</dl></div></div>${kaki()}`;
}

/* ---------- halaman bab ---------- */
function viewBab(b) {
  const idx = BAB.indexOf(b), pv = BAB[idx - 1], nx = BAB[idx + 1];
  app.innerHTML = `
  <header class="ch-head"><div class="wrap">
    <a class="back" href="#bab">← Senarai bab</a>
    <div class="ch-title"><span class="no">${b.no}</span><div><div class="eb">Tingkatan ${b.ting} · ${b.tema}</div><h1>${b.tajuk}</h1></div></div>
    <p class="ch-intro">${fmt(b.intro)}</p>
  </div></header>
  <div class="tabs-bar"><div class="wrap"><div class="tabs" role="tablist">${TABS.map(t => `<button type="button" role="tab" id="tab-${t[0]}" data-tab="${t[0]}"><span class="lg">${t[1]}</span><span class="sm">${t[2]}</span></button>`).join('')}</div></div></div>
  <div class="wrap"><div class="panel" id="panel" role="tabpanel"></div>
    <nav class="pn" aria-label="Bab lain">
      ${pv ? `<a href="#${pv.id}"><small>← T${pv.ting} Bab ${pv.no}</small>${pv.tajuk}</a>` : '<span></span>'}
      ${nx ? `<a href="#${nx.id}" style="text-align:right"><small>T${nx.ting} Bab ${nx.no} →</small>${nx.tajuk}</a>` : '<span></span>'}
    </nav></div>
  ${kaki()}`;
  store.set('akhir', b.id);
  app.querySelectorAll('.tabs button').forEach(bt => bt.onclick = () => { curTab = bt.dataset.tab; store.set('tab2', curTab); showTab(b); const t = app.querySelector('.tabs-bar'); if (t.getBoundingClientRect().top < 60) window.scrollTo({ top: app.querySelector('.ch-head').offsetHeight - 2 }); });
  showTab(b);
}

function showTab(b) {
  if (stopSim) { stopSim(); stopSim = null; }
  app.querySelectorAll('.tabs button').forEach(bt => bt.setAttribute('aria-selected', bt.dataset.tab === curTab));
  const p = document.getElementById('panel'); p.innerHTML = ''; p.setAttribute('aria-labelledby', 'tab-' + curTab);
  ({ visual: tabVisual, terang: tabTerang, fokus: tabFokus, latih: tabLatih, nota: tabNota })[curTab](p, b);
}

function tabVisual(p, b) {
  p.append(el('div', null, `<h2>${b.sim.t}</h2><p class="lede" style="margin-top:8px">${fmt(b.sim.d)}</p>`));
  const lab = el('div', 'lab'); p.append(lab);
  const sim = SIMS[b.id](lab, b.id); stopSim = () => sim.destroy();
  const box = el('div', null, '<h3>Cuba ini</h3>');
  const ol = el('ol', 'cuba'); ol.style.marginTop = '10px';
  b.sim.cuba.forEach(x => ol.append(el('li', null, `${fmt(x.s)}<details><summary>Semak jawapan</summary><p>${fmt(x.j)}</p></details>`)));
  box.append(ol); p.append(box);
}

const isiLi = x => x[0] === '!' ? `<li class="kerap"><span>${fmt(x.slice(1))}</span><i class="chip-spm" title="Kerap keluar SPM">SPM</i></li>` : `<li><span>${fmt(x)}</span></li>`;

function tabTerang(p, b) {
  p.append(el('p', 'lede', `Isi bertanda <i class="chip-spm">SPM</i> kerap ditanya dalam peperiksaan. Kotak kuning ialah perkara utama yang mesti diingat.`));
  b.sub.forEach(s => {
    p.append(el('section', 'sub', `<div class="sn">${s.n}</div><div><h3>${s.t}</h3><ul class="isi">${(s.isi || s.p).map(isiLi).join('')}</ul>${s.ingat ? `<p class="ingat"><b>Ingat:</b> ${fmt(s.ingat)}</p>` : ''}</div>`));
  });
  if (b.contoh && b.contoh.length) {
    p.append(el('div', null, `<h2>Contoh pengiraan langkah demi langkah</h2><p class="lede" style="margin-top:6px">Cuba jawab dahulu, kemudian buka satu langkah pada satu masa.</p>`));
    b.contoh.forEach((c, i) => {
      const card = el('div', 'contoh', `<div class="eb">Contoh ${i + 1} · ${c.t}</div><p>${fmt(c.q)}</p><ol class="langkah"></ol><div class="row"><button type="button" class="btn">Langkah seterusnya</button><button type="button" class="btn ghost">Tunjuk semua</button></div>`);
      const ol = card.querySelector('.langkah'), [nx, all] = card.querySelectorAll('button');
      let k = 0;
      const step = () => {
        if (k < c.l.length) ol.append(el('li', null, fmt(c.l[k++])));
        else if (k === c.l.length) { ol.append(el('li', 'jwp', `<b>Jawapan:</b> ${fmt(c.j)}`)); k++; }
        if (k > c.l.length) { nx.remove(); all.remove(); }
      };
      nx.onclick = step; all.onclick = () => { while (k <= c.l.length) step(); };
      p.append(card);
    });
  }
}

function tabFokus(p, b) {
  const f = b.fokus; if (!f) return;
  const bin = n => '<span class="bintang" aria-label="' + ['', 'Pernah keluar', 'Kerap', 'Sangat kerap'][n] + '">' + '★'.repeat(n) + '<s>' + '★'.repeat(3 - n) + '</s></span>';
  p.append(el('div', null, `<h2>Topik yang kerap ditanya</h2><p class="lede" style="margin-top:6px">Berdasarkan Koleksi Soalan K2 Percubaan SPM 2025 bagi bab ini. ★★★ sangat kerap · ★★ kerap · ★ pernah keluar.</p>
    <ul class="topik">${f.topik.map(t => `<li>${bin(t[1])}<span>${fmt(t[0])}</span></li>`).join('')}</ul>`));

  const sudah = store.get('hafal:' + b.id) || [];
  const tk = el('div', null, `<h2>Takrif wajib hafal</h2><p class="lede" style="margin-top:6px">Soalan 1 markah “Nyatakan maksud …” hampir pasti keluar. Cuba sebut takrif dahulu, kemudian buka kad untuk menyemak.</p><div class="row" style="margin-top:8px"><span class="hafal-n num"></span><button type="button" class="btn ghost">Buka semua</button></div><div class="kad"></div>`);
  const box = tk.querySelector('.kad'), cnt = tk.querySelector('.hafal-n');
  const upd = () => { cnt.textContent = `Sudah hafal: ${sudah.length}/${f.takrif.length}`; };
  f.takrif.forEach(([t, d]) => {
    const k = el('details', 'kd' + (sudah.includes(t) ? ' ok' : ''), `<summary>${t}</summary><p>${fmt(d)}</p><label class="chk"><input type="checkbox"${sudah.includes(t) ? ' checked' : ''}> Saya sudah hafal</label>`);
    k.querySelector('input').onchange = e => {
      const i = sudah.indexOf(t); if (e.target.checked && i < 0) sudah.push(t); if (!e.target.checked && i >= 0) sudah.splice(i, 1);
      k.classList.toggle('ok', e.target.checked); store.set('hafal:' + b.id, sudah); upd();
    };
    box.append(k);
  });
  tk.querySelector('.btn').onclick = e => { const open = e.target.textContent === 'Buka semua'; box.querySelectorAll('details').forEach(d => d.open = open); e.target.textContent = open ? 'Tutup semua' : 'Buka semua'; };
  upd(); p.append(tk);

  p.append(el('div', null, `<h2>Corak soalan Kertas 2</h2><ul class="corak">${f.corak.map(x => `<li>${fmt(x)}</li>`).join('')}</ul>`));
  p.append(el('div', null, `<h2>Cara jawab soalan “banding” dan “hubung kait”</h2>
    <ol class="rum" style="margin-top:12px">
      <li><span><b>Bandingkan</b>: tulis perbandingan lengkap dengan perkataan “lebih”, contoh “Panjang gelombang di kawasan P <i>lebih panjang</i> daripada di kawasan Q.” Jangan tulis nilai sahaja.</span></li>
      <li><span><b>Hubung kait</b>: guna pola “Semakin … , semakin …”, contoh “Semakin dalam air, semakin panjang panjang gelombang.”</span></li>
      <li><span><b>Nyatakan hukum/prinsip/konsep</b>: tulis nama penuh, contoh “Prinsip Pascal”, “Hukum Kepler Kedua”.</span></li>
    </ol>`));
  p.append(el('div', null, `<h2>Bank jawapan soalan reka bentuk (10 markah)</h2>
    <p class="lede" style="margin-top:6px">Format jawapan: setiap aspek = <b>ciri</b> (1 markah) + <b>sebab</b> (1 markah). Akhir sekali: pilih satu jawapan dan nyatakan sebab (2 markah).</p>
    <div class="scroll" style="margin-top:10px"><table class="rumus bank"><thead><tr><th>Situasi</th><th>Ciri yang sesuai</th><th>Sebab</th></tr></thead><tbody>${f.ciri.map(r => `<tr><td>${fmt(r[0])}</td><td>${fmt(r[1])}</td><td>${fmt(r[2])}</td></tr>`).join('')}</tbody></table></div>`));
}

function tabNota(p, b) {
  p.append(el('div', null, `<h2>Rumus penting</h2><div class="scroll" style="margin-top:10px"><table class="rumus"><thead><tr><th>Rumus</th><th>Maksud simbol dan catatan</th></tr></thead><tbody>${b.rumus.map(r => `<tr><td>${fmt(r[0])}</td><td>${fmt(r[1])}</td></tr>`).join('')}</tbody></table></div>`));
  p.append(el('div', null, `<h2>Rumusan bab</h2><ol class="rum" style="margin-top:12px">${b.rumusan.map(r => `<li><span>${fmt(r)}</span></li>`).join('')}</ol>`));
  p.append(el('div', null, `<h2>Kesilapan lazim dalam peperiksaan</h2><ul class="awas" style="margin-top:12px">${b.silap.map(r => `<li>${fmt(r)}</li>`).join('')}</ul>`));
  if (b.istilah) p.append(el('div', null, `<h2>Istilah lain</h2><dl class="ist" style="margin-top:6px">${b.istilah.map(r => `<dt>${r[0]}</dt><dd>${fmt(r[1])}</dd>`).join('')}</dl>`));
}

function tabLatih(p, b) {
  if (!Profil) {
    p.append(el('div', 'kad kad-masuk', `<h2>Log masuk untuk menjawab</h2><p>Latihan bab ini memberi mata yang disimpan pada profil no. IC anda. Log masuk dahulu supaya markah anda tidak hilang.</p><div class="row"><a class="btn" href="#masuk">Log masuk dengan no. IC</a></div>`));
    p.append(el('p', 'lede', 'Untuk latihan tanpa mata, cuba <a href="#kuiz-semua">Kuiz campuran</a>.'));
    return;
  }
  p.append(el('div', null, babStatusHtml(b)));
  p.append(el('p', 'lede', `<b>Peraturan permainan:</b> pilih jawapan, kemudian tekan <b>Semak jawapan</b>. Sistem menyemak dan mengira mata serta-merta, dan jawapan <b>tidak boleh diubah</b> lagi. Objektif betul = ${MATA_SOALAN} mata. Soalan reka bentuk = ${MATA_MARKAH_REKA} mata bagi setiap markah.`));
  const nav = el('nav', 'bhg', `<a href="#" data-k="A"><b>A</b>Objektif</a>${b.reka ? '<a href="#" data-k="C"><b>B</b>Reka bentuk</a>' : ''}<a href="#" data-k="B"><b>C</b>Struktur</a>`);
  nav.querySelectorAll('a').forEach(a => a.onclick = e => { e.preventDefault(); document.getElementById('bhg-' + a.dataset.k).scrollIntoView({ behavior: 'smooth' }); });
  p.append(nav);
  p.append(el('div', null, `<h2 id="bhg-A">Bahagian A: Soalan objektif</h2><p class="lede" style="margin-top:6px">Gaya Kertas 1. Penjelasan dipaparkan selepas setiap semakan.</p>`));
  const a = el('div'); p.append(a); mcq(a, semuaKuiz(b), { bab: b });
  if (b.reka) { p.append(el('div', null, `<h2 id="bhg-C" style="margin-top:14px">Bahagian B: Soalan reka bentuk (10 markah)</h2><p class="lede" style="margin-top:6px">Soalan ini muncul hampir setiap tahun dalam Kertas 2. Pilih ciri yang paling sesuai bagi setiap aspek dan reka bentuk terbaik, kemudian semak. Markah penuh = ${(b.reka.aspek.length * 2 + 2) * MATA_MARKAH_REKA} mata.</p>`)); reka(p, b); }
  p.append(el('div', null, `<h2 id="bhg-B" style="margin-top:14px">Bahagian C: Soalan struktur (latihan bertulis)</h2><p class="lede" style="margin-top:6px">Gaya Kertas 2. Jawapan bertulis tidak dapat disemak oleh sistem, jadi bahagian ini <b>tidak diberi mata</b>. Jawab di atas kertas dahulu, kemudian bandingkan dengan skema.</p>`));
  b.struktur.forEach((s, i) => {
    const tot = s.b.reduce((n, x) => n + x.m, 0);
    const card = el('div', 'q', `<div class="qh"><span class="qn">${i + 1}</span><div>${fmt(s.t)}</div></div>
      <ol class="parts">${s.b.map(x => `<li><div>${fmt(x.q)}</div><span class="mk">[${x.m} markah]</span><div class="ans-row"><button type="button" class="lnk">Semak skema</button></div><div class="ans" hidden>${fmt(x.j)}</div></li>`).join('')}</ol>
      <div class="row"><button type="button" class="btn ghost">Tunjuk semua skema</button><span class="mk" style="font-weight:500;color:var(--muted)">Jumlah: ${tot} markah</span></div>`);
    card.querySelectorAll('.parts li').forEach(li => { const bt = li.querySelector('.lnk'), an = li.querySelector('.ans'); bt.onclick = () => { an.hidden = !an.hidden; bt.textContent = an.hidden ? 'Semak skema' : 'Sembunyi skema'; }; });
    const bt = card.querySelector('.btn');
    bt.onclick = () => { const show = bt.textContent.startsWith('Tunjuk'); card.querySelectorAll('.ans').forEach(x => x.hidden = !show); card.querySelectorAll('.lnk').forEach(x => x.textContent = show ? 'Sembunyi skema' : 'Semak skema'); bt.textContent = show ? 'Sembunyi semua skema' : 'Tunjuk semua skema'; };
    p.append(card);
  });
}

/* ---------- kuiz campuran ---------- */
function viewKuiz(scope) {
  const pool = BAB.filter(b => scope === 'semua' || b.id.startsWith(scope));
  const name = scope === 'semua' ? 'Semua bab' : 'Tingkatan ' + scope[1];
  app.innerHTML = `<header class="ch-head"><div class="wrap" style="padding-bottom:20px">
      <a class="back" href="#kuiz">← Kuiz</a>
      <div class="ch-title"><div><div class="eb">Kuiz campuran · latihan bebas</div><h1>${name}</h1></div></div>
      <p class="ch-intro">10 soalan objektif dipilih secara rawak untuk ulang kaji. Latihan bebas <b>tidak menambah mata</b>; kumpul mata melalui tab Latihan dalam setiap bab.</p>
    </div></header>
    <div class="wrap"><div class="panel"><div id="kz"></div></div></div>
    <footer class="foot"><div class="wrap">Fizik SPM Interaktif · Kuiz campuran</div></footer>`;
  const draw = () => {
    const all = []; pool.forEach(b => b.kuiz.forEach(q => all.push(Object.assign({ src: `T${b.ting} Bab ${b.no} · ${b.tajuk}` }, q))));
    mcq(document.getElementById('kz'), shuffle(all).slice(0, 10), { again: draw });
  };
  draw();
}

/* ---------- penghalaan ---------- */
function route() {
  cleanup();
  const h = location.hash.slice(1) || 'utama', b = BAB.find(x => x.id === h), k = /^kuiz-(t4|t5|semua)$/.exec(h);
  const T = t => { document.title = t ? t + ' · Fizik SPM Interaktif' : 'Fizik SPM Interaktif'; };
  let nav = '';
  if (h === 'masuk') { viewMasuk(); T('Log masuk'); nav = 'profil'; }
  else if (h === 'guru') { viewGuru(); T('Halaman guru'); }
  else if (b) { viewBab(b); T(`Bab ${b.no} ${b.tajuk}`); nav = 'bab'; }
  else if (k) { viewKuiz(k[1]); T('Kuiz campuran'); nav = 'kuiz'; }
  else if (h === 'bab') { viewSenaraiBab(); T('Bab'); nav = 'bab'; }
  else if (h === 'kuiz') { viewKuizMenu(); T('Kuiz'); nav = 'kuiz'; }
  else if (h === 'kedudukan') { viewKedudukan(); T('Kedudukan kelas'); nav = 'kedudukan'; }
  else if (h === 'profil') { viewProfil(); T('Profil'); nav = 'profil'; }
  else if (h === 'rujukan') { viewRujukan(); T('Pemalar fizik'); nav = 'utama'; }
  else { viewUtama(); T(''); nav = 'utama'; }
  navAktif(nav);
  hud();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
navPasang();
/* ---------- tema: auto (ikut peranti) / cerah / gelap ---------- */
const TEMA = [['auto', 'Auto', 'M12 3a9 9 0 1 0 0 18zM12 3a9 9 0 0 1 0 18'], ['cerah', 'Cerah', 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4'], ['gelap', 'Gelap', 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z']];
function temaPasang(t) {
  const i = Math.max(0, TEMA.findIndex(x => x[0] === t)), [id, nama, d] = TEMA[i], root = document.documentElement;
  if (id === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', id === 'gelap' ? 'dark' : 'light');
  const b = document.getElementById('tema'); if (!b) return;
  b.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" style="fill:${id === 'auto' ? 'currentColor' : 'none'};fill-rule:evenodd;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"/></svg><span>${nama}</span>`;
  b.title = `Tema: ${nama}. Klik untuk menukar.`;
  b.setAttribute('aria-label', `Tema ${nama}. Klik untuk menukar tema.`);
}
(function () {
  let t = store.get('tema') || 'auto'; temaPasang(t);
  document.getElementById('tema').onclick = () => {
    t = TEMA[(TEMA.findIndex(x => x[0] === t) + 1) % TEMA.length][0];
    store.set('tema', t); temaPasang(t); toast('Tema: ' + TEMA.find(x => x[0] === t)[1], 'no');
  };
})();
function mula() { Akaun.pulih().then(ada => { if (ada) route(); }); }
