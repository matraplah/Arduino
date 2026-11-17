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
let curTab = store.get('tab') || 'visual';
const TABS = [['visual', 'Visual Interaktif', 'Visual'], ['terang', 'Penerangan', 'Penerangan'], ['latih', 'Latihan SPM', 'Latihan'], ['nota', 'Nota &amp; Rumusan', 'Nota']];

function cleanup() {
  if (stopSim) { stopSim(); stopSim = null; }
  if (stopHero) { stopHero(); stopHero = null; }
}
function best(id) { return store.get('skor:' + id); }

/* ---------- laman utama ---------- */
function viewHome() {
  const nq = BAB.reduce((n, b) => n + b.kuiz.length + b.struktur.length, 0);
  const nsim = BAB.reduce((n, b) => n + (b.sim.n || 1), 0);
  const toc = ting => BAB.filter(b => b.ting === ting).map(b => {
    const s = best(b.id);
    return `<li><a href="#${b.id}"><span class="no">${b.no}</span>
      <span><span class="tm">${b.tema}</span><span class="tj">${b.tajuk}</span><span class="st">${b.sub.map(x => x.n + ' ' + x.t).join(' · ')}</span></span>
      <span class="pg${s != null && s === b.kuiz.length ? ' done' : ''}"><b class="num">${s != null ? s + '/' + b.kuiz.length : '–'}</b>${s != null ? 'markah terbaik' : 'belum dicuba'}</span></a></li>`;
  }).join('');
  app.innerHTML = `
  <section class="hero"><div class="wrap">
    <div>
      <h1>Fizik SPM <span>Interaktif</span></h1>
      <p>Nota ringkas, visual yang boleh diubah sendiri dan latihan berformat SPM untuk semua bab Fizik KSSM Tingkatan 4 dan Tingkatan 5.</p>
      <ul class="stats"><li><b class="num">${BAB.length}</b>bab</li><li><b class="num">${nsim}</b>visual interaktif</li><li><b class="num">${nq}</b>soalan latihan</li></ul>
    </div>
    <canvas id="hero-cv" aria-hidden="true"></canvas>
  </div></section>
  <div class="wrap">
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
  <footer class="foot"><div class="wrap">Kandungan disusun mengikut Buku Teks Fizik KSSM Tingkatan 4 dan Tingkatan 5 (Kementerian Pendidikan Malaysia). Soalan latihan ditulis mengikut gaya Kertas 1 dan Kertas 2 SPM; markah terbaik disimpan pada peranti ini sahaja.</div></footer>`;
  stopHero = heroAnim(document.getElementById('hero-cv'));
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
  app.querySelectorAll('.tabs button').forEach(bt => bt.onclick = () => { curTab = bt.dataset.tab; store.set('tab', curTab); showTab(b); });
  showTab(b);
}

function showTab(b) {
  if (stopSim) { stopSim(); stopSim = null; }
  app.querySelectorAll('.tabs button').forEach(bt => bt.setAttribute('aria-selected', bt.dataset.tab === curTab));
  const p = document.getElementById('panel'); p.innerHTML = ''; p.setAttribute('aria-labelledby', 'tab-' + curTab);
  ({ visual: tabVisual, terang: tabTerang, latih: tabLatih, nota: tabNota })[curTab](p, b);
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

function tabTerang(p, b) {
  b.sub.forEach(s => {
    p.append(el('section', 'sub', `<div class="sn">${s.n}</div><div><h3>${s.t}</h3><ul>${s.p.map(x => '<li>' + fmt(x) + '</li>').join('')}</ul></div>`));
  });
}

function tabNota(p, b) {
  p.append(el('div', null, `<h2>Rumus penting</h2><div class="scroll" style="margin-top:10px"><table class="rumus"><thead><tr><th>Rumus</th><th>Maksud simbol dan catatan</th></tr></thead><tbody>${b.rumus.map(r => `<tr><td>${fmt(r[0])}</td><td>${fmt(r[1])}</td></tr>`).join('')}</tbody></table></div>`));
  p.append(el('div', null, `<h2>Istilah utama</h2><dl class="ist" style="margin-top:6px">${b.istilah.map(r => `<dt>${r[0]}</dt><dd>${fmt(r[1])}</dd>`).join('')}</dl>`));
  p.append(el('div', null, `<h2>Rumusan bab</h2><ol class="rum" style="margin-top:12px">${b.rumusan.map(r => `<li><span>${fmt(r)}</span></li>`).join('')}</ol>`));
  p.append(el('div', null, `<h2>Kesilapan lazim dalam peperiksaan</h2><ul class="awas" style="margin-top:12px">${b.silap.map(r => `<li>${fmt(r)}</li>`).join('')}</ul>`));
}

function tabLatih(p, b) {
  p.append(el('div', null, `<h2>Bahagian A: Soalan objektif</h2><p class="lede" style="margin-top:8px">Gaya Kertas 1. Pilih satu jawapan; penjelasan dipaparkan sebaik sahaja anda menjawab.</p>`));
  const a = el('div'); p.append(a); mcq(a, b.kuiz, b.id);
  p.append(el('div', null, `<h2 style="margin-top:14px">Bahagian B: Soalan struktur</h2><p class="lede" style="margin-top:8px">Gaya Kertas 2. Jawab di atas kertas dahulu, kemudian bandingkan dengan skema jawapan.</p>`));
  b.struktur.forEach((s, i) => {
    const tot = s.b.reduce((n, x) => n + x.m, 0);
    const card = el('div', 'q', `<div class="qh"><span class="qn">${i + 1}</span><div>${fmt(s.t)}</div></div>
      <ol class="parts">${s.b.map(x => `<li><div>${fmt(x.q)}</div><span class="mk">[${x.m} markah]</span><div class="ans" hidden>${fmt(x.j)}</div></li>`).join('')}</ol>
      <div class="row"><button type="button" class="btn ghost">Tunjuk skema jawapan</button><span class="mk" style="font-weight:500;color:var(--muted)">Jumlah: ${tot} markah</span></div>`);
    const bt = card.querySelector('button');
    bt.onclick = () => { const show = bt.textContent.startsWith('Tunjuk'); card.querySelectorAll('.ans').forEach(x => x.hidden = !show); bt.textContent = show ? 'Sembunyi skema jawapan' : 'Tunjuk skema jawapan'; };
    p.append(card);
  });
}

/* ---------- soalan objektif ---------- */
function mcq(host, qs, key, again) {
  host.innerHTML = ''; host.style.cssText = 'display:flex;flex-direction:column;gap:18px';
  let done = 0, right = 0;
  const sc = el('div', 'score', `<span>Markah <b class="num">0/${qs.length}</b></span><span class="bar"><i></i></span><button type="button" class="btn ghost">${again ? 'Soalan baharu' : 'Cuba semula'}</button>`);
  sc.querySelector('button').onclick = () => again ? again() : mcq(host, qs, key);
  host.append(sc);
  const upd = () => { sc.querySelector('b').textContent = right + '/' + qs.length; sc.querySelector('i').style.width = (done / qs.length * 100) + '%'; };
  qs.forEach((q, n) => {
    const card = el('div', 'q', `<div class="qh"><span class="qn">${n + 1}</span><div>${q.src ? `<div class="src">${q.src}</div>` : ''}<div>${fmt(q.q)}</div></div></div><div class="opts"></div>`);
    const box = card.querySelector('.opts');
    shuffle([0, 1, 2, 3]).forEach((oi, k) => {
      const bt = el('button', 'opt', `<b>${'ABCD'[k]}</b><span>${fmt(q.o[oi])}</span>`); bt.type = 'button'; bt.dataset.ok = oi === q.a ? '1' : '';
      bt.onclick = () => {
        const ok = oi === q.a; done++; if (ok) right++;
        box.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (x.dataset.ok) x.classList.add('ok'); });
        if (!ok) bt.classList.add('no');
        const fb = el('div', 'fb ' + (ok ? 'ok' : 'no'), `<strong>${ok ? 'Betul' : 'Belum tepat'}</strong>${fmt(q.e)}`); fb.setAttribute('role', 'status');
        card.append(fb); upd();
        if (done === qs.length) {
          const prev = store.get('skor:' + key); if (prev == null || right > prev) store.set('skor:' + key, right);
          const pct = right / qs.length;
          host.append(el('div', 'done', `<b class="num">Markah akhir: ${right}/${qs.length}</b><p>${pct === 1 ? 'Semua betul. Teruskan ke soalan struktur atau bab seterusnya.' : pct >= .6 ? 'Hampir menguasai bab ini. Semak semula penjelasan bagi soalan yang salah.' : 'Baca semula tab Penerangan dan cuba visual interaktif, kemudian jawab sekali lagi.'}</p>`));
        }
      };
      box.append(bt);
    });
    host.append(card);
  });
}

/* ---------- kuiz campuran ---------- */
function viewKuiz(scope) {
  const pool = BAB.filter(b => scope === 'semua' || b.id.startsWith(scope));
  const name = scope === 'semua' ? 'Semua bab' : 'Tingkatan ' + scope[1];
  app.innerHTML = `<header class="ch-head"><div class="wrap" style="padding-bottom:20px">
      <a class="back" href="#utama">← Kandungan</a>
      <div class="ch-title"><div><div class="eb">Kuiz campuran</div><h1>${name}</h1></div></div>
      <p class="ch-intro">10 soalan objektif dipilih secara rawak. Tekan “Soalan baharu” untuk set yang lain.</p>
    </div></header>
    <div class="wrap"><div class="panel"><div id="kz"></div></div></div>
    <footer class="foot"><div class="wrap">Fizik SPM Interaktif · Kuiz campuran</div></footer>`;
  const draw = () => {
    const all = []; pool.forEach(b => b.kuiz.forEach(q => all.push(Object.assign({ src: `T${b.ting} Bab ${b.no} · ${b.tajuk}` }, q))));
    mcq(document.getElementById('kz'), shuffle(all).slice(0, 10), 'kuiz-' + scope, draw);
  };
  draw();
}

/* ---------- penghalaan ---------- */
function route() {
  cleanup();
  const h = location.hash.slice(1), b = BAB.find(x => x.id === h), k = /^kuiz-(t4|t5|semua)$/.exec(h);
  if (b) { viewBab(b); document.title = `Bab ${b.no} ${b.tajuk} · Fizik SPM Interaktif`; }
  else if (k) { viewKuiz(k[1]); document.title = 'Kuiz campuran · Fizik SPM Interaktif'; }
  else { viewHome(); document.title = 'Fizik SPM Interaktif'; }
  document.querySelectorAll('.top nav a').forEach(a => {
    const on = a.getAttribute('href') === '#utama' ? !k : !!k;
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
