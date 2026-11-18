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

/* ---------- laman utama ---------- */
function viewHome() {
  const nq = BAB.reduce((n, b) => n + semuaKuiz(b).length + b.struktur.length + (b.reka ? 1 : 0), 0);
  const nsim = BAB.reduce((n, b) => n + (b.sim.n || 1), 0);
  const toc = ting => BAB.filter(b => b.ting === ting).map(b => {
    const s = Game.bab(b);
    return `<li><a href="#${b.id}"><span class="no">${b.no}</span>
      <span><span class="tm">${b.tema}</span><span class="tj">${b.tajuk}</span><span class="st">${b.sub.map(x => x.n + ' ' + x.t).join(' · ')}</span></span>
      <span class="pg${s.tamat ? ' done' : ''}">${bintangHtml(s.bintang)}<b class="num">${s.pts}<small>/${s.max}</small></b>${s.done ? s.done + '/' + s.total + ' dijawab' : 'belum dicuba'}</span></a></li>`;
  }).join('');
  app.innerHTML = `
  <section class="hero"><div class="wrap">
    <div>
      <h1>Fizik SPM <span>Interaktif</span></h1>
      <p>Penerangan ringkas, isi yang kerap keluar SPM dan latihan bertahap untuk semua bab Fizik KSSM Tingkatan 4 dan Tingkatan 5.</p>
      <ul class="stats"><li><b class="num">${BAB.length}</b>bab</li><li><b class="num">${nsim}</b>visual interaktif</li><li><b class="num">${nq}</b>soalan latihan</li></ul>
    </div>
    <canvas id="hero-cv" aria-hidden="true"></canvas>
  </div></section>
  <div class="wrap">
    ${profilHtml()}
    <section class="sec" id="sec-guru"><div class="sec-h"><h2>Untuk guru</h2><small>Memerlukan kata laluan guru</small></div><div class="mix" style="grid-template-columns:minmax(0,1fr)"><a href="#guru"><b>Halaman guru</b><span>Daftar murid, pantau markah dan peratus kemajuan setiap murid</span></a></div></section>
    <section class="sec"><div class="sec-h"><h2>Cara guna</h2><small>Lima langkah bagi setiap bab</small></div>
      <ol class="steps">
        <li><b>Penerangan</b><span>Baca isi ringkas. Tanda <i class="chip-spm">SPM</i> = kerap ditanya.</span></li>
        <li><b>Visual</b><span>Ubah nilai dan lihat konsep berlaku.</span></li>
        <li><b>Fokus SPM</b><span>Hafal takrif, kenali corak soalan.</span></li>
        <li><b>Latihan</b><span>Jawab, semak dan kumpul mata. Jawapan dikunci.</span></li>
        <li><b>Rumusan</b><span>Ulang kaji rumus dan kesilapan lazim.</span></li>
      </ol></section>
    <section class="sec" id="sec-t4"><div class="sec-h"><h2>Tingkatan 4</h2><small>6 bab · Asas Fizik, Mekanik Newton, Haba, Gelombang, Cahaya dan Optik</small></div><ol class="toc">${toc(4)}</ol></section>
    <section class="sec" id="sec-t5"><div class="sec-h"><h2>Tingkatan 5</h2><small>7 bab · Mekanik Newton, Elektrik dan Keelektromagnetan, Fizik Gunaan, Fizik Moden</small></div><ol class="toc">${toc(5)}</ol></section>
    <section class="sec"><div class="sec-h"><h2>Kuiz campuran</h2><small>10 soalan objektif dipilih secara rawak, dengan penjelasan bagi setiap jawapan</small></div>
      <div class="mix">
        <a href="#kuiz-t4"><b>Tingkatan 4</b><span>Bab 1 hingga Bab 6</span></a>
        <a href="#kuiz-t5"><b>Tingkatan 5</b><span>Bab 1 hingga Bab 7</span></a>
        <a href="#kuiz-semua"><b>Semua bab</b><span>Ulang kaji menjelang SPM</span></a>
      </div></section>
    <section class="sec"><div class="sec-h"><h2>Pemalar fizik</h2><small>Nilai yang digunakan dalam buku teks dan laman ini</small></div>
      <dl class="consts">${[
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
      ].map(r => `<div><dt>${r[0]}</dt><dd>${fmt(r[1])}</dd></div>`).join('')}</dl></section>
  </div>
  <footer class="foot"><div class="wrap">Kandungan disusun mengikut Buku Teks Fizik KSSM Tingkatan 4 dan Tingkatan 5 (KPM). Bahagian Fokus SPM dianalisis daripada Koleksi Soalan Kertas 2 Percubaan SPM 2025 (pelbagai negeri, MRSM, SBP dan SMKA). Soalan latihan ditulis semula mengikut gaya Kertas 1 dan Kertas 2; markah terbaik disimpan pada peranti ini sahaja.</div></footer>`;
  stopHero = heroAnim(document.getElementById('hero-cv'));
  profilBind();
}

function heroAnim(cv) {
  const c = cv.getContext('2d'); let raf = 0, t = 0, last = performance.now(), dead = false;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function frame(ts) {
    if (dead) return;
    const w = cv.clientWidth, h = cv.clientHeight, d = Math.min(window.devicePixelRatio || 1, 2);
    if (cv.width !== Math.round(w * d)) { cv.width = Math.round(w * d); cv.height = Math.round(h * d); }
    c.setTransform(d, 0, 0, d, 0, 0); c.clearRect(0, 0, w, h);
    if (!still) t += Math.min((ts - last) / 1000, .05); last = ts;
    const K = col(), x0 = 26, y0 = h / 2, A = h * .3, lam = Math.max(110, w * .42), k = 2 * Math.PI / lam;
    G.line(c, x0, 10, x0, h - 10, K.ink, 1.5); G.line(c, x0, y0, w - 8, y0, K.ink, 1.5);
    const pts = []; for (let x = x0; x <= w - 8; x += 3) pts.push([x, y0 - A * Math.sin(k * (x - x0) - t * 2.2)]);
    G.curve(c, pts, K.a, 3);
    for (let x = x0 + 24; x <= w - 10; x += 24) G.dot(c, x, y0 - A * Math.sin(k * (x - x0) - t * 2.2), 3.4, K.c2);
    let xc = ((Math.PI / 2 + t * 2.2) / k) % lam; if (xc < 14) xc += lam;
    if (x0 + xc + lam < w - 6) {
      const ya = y0 - A - 12;
      G.arrow(c, x0 + xc + lam / 2, ya, x0 + xc, ya, K.ink, 1.4); G.arrow(c, x0 + xc + lam / 2, ya, x0 + xc + lam, ya, K.ink, 1.4);
      G.text(c, 'λ', x0 + xc + lam / 2, ya - 9, K.ink, 'center', 15, 700);
    }
    G.arrow(c, x0 + xc, y0, x0 + xc, y0 - A, K.c3, 1.6); G.text(c, 'A', x0 + xc + 9, y0 - A / 2, K.c3, 'left', 14, 700);
    G.text(c, 'sesaran', x0 + 6, 12, K.mut, 'left', 11.5, 600); G.text(c, 'jarak', w - 10, y0 + 13, K.mut, 'right', 11.5, 600);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
  return () => { dead = true; cancelAnimationFrame(raf); };
}

/* ---------- halaman bab ---------- */
function viewBab(b) {
  const idx = BAB.indexOf(b), pv = BAB[idx - 1], nx = BAB[idx + 1];
  app.innerHTML = `
  <header class="ch-head"><div class="wrap">
    <a class="back" href="#utama">← Kandungan</a>
    <div class="ch-title"><span class="no">${b.no}</span><div><div class="eb">Tingkatan ${b.ting} · ${b.tema}</div><h1>${b.tajuk}</h1></div></div>
    <p class="ch-intro">${fmt(b.intro)}</p>
    <div class="tabs" role="tablist">${TABS.map(t => `<button type="button" role="tab" id="tab-${t[0]}" data-tab="${t[0]}"><span class="lg">${t[1]}</span><span class="sm">${t[2]}</span></button>`).join('')}</div>
  </div></header>
  <div class="wrap"><div class="panel" id="panel" role="tabpanel"></div>
    <nav class="pn" aria-label="Bab lain">
      ${pv ? `<a href="#${pv.id}"><small>← T${pv.ting} Bab ${pv.no}</small>${pv.tajuk}</a>` : '<span></span>'}
      ${nx ? `<a href="#${nx.id}" style="text-align:right"><small>T${nx.ting} Bab ${nx.no} →</small>${nx.tajuk}</a>` : '<span></span>'}
    </nav></div>
  <footer class="foot"><div class="wrap">Fizik SPM Interaktif · Tingkatan ${b.ting} Bab ${b.no}: ${b.tajuk}</div></footer>`;
  app.querySelectorAll('.tabs button').forEach(bt => bt.onclick = () => { curTab = bt.dataset.tab; store.set('tab2', curTab); showTab(b); window.scrollTo({ top: app.querySelector('.tabs').getBoundingClientRect().top + window.scrollY - 60 }); });
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
    p.append(el('div', 'profil kosong', `<h2>Log masuk untuk menjawab</h2><p>Latihan bab ini memberi mata yang disimpan pada profil no. IC anda. Log masuk dahulu supaya markah anda tidak hilang.</p><div class="row"><a class="btn" href="#masuk">Log masuk dengan no. IC</a></div>`));
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
      <a class="back" href="#utama">← Kandungan</a>
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
  const h = location.hash.slice(1), b = BAB.find(x => x.id === h), k = /^kuiz-(t4|t5|semua)$/.exec(h);
  if (h === 'masuk') { viewMasuk(); document.title = 'Log masuk · Fizik SPM Interaktif'; }
  else if (h === 'guru') { viewGuru(); document.title = 'Halaman guru · Fizik SPM Interaktif'; }
  else if (b) { viewBab(b); document.title = `Bab ${b.no} ${b.tajuk} · Fizik SPM Interaktif`; }
  else if (k) { viewKuiz(k[1]); document.title = 'Kuiz campuran · Fizik SPM Interaktif'; }
  else { viewHome(); document.title = 'Fizik SPM Interaktif'; }
  document.querySelectorAll('.top nav a').forEach(a => {
    const on = a.getAttribute('href') === '#utama' ? !k : !!k;
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  hud();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
function mula() { Akaun.pulih().then(ada => { if (ada) route(); }); }
