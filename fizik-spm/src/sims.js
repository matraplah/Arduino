'use strict';
/* ===== Visual interaktif (kanvas) ===== */
let _K = null, _cur = null;
function col() {
  if (_K) return _K;
  const s = getComputedStyle(document.documentElement), g = n => s.getPropertyValue(n).trim();
  return _K = { ink: g('--ink'), mut: g('--muted'), line: g('--line'), bg: g('--surface'), a: g('--accent'), soft: g('--accent-soft'), c2: g('--c2'), c3: g('--c3'), c4: g('--c4') };
}
function themeChanged() { _K = null; if (_cur) _cur.redraw(); }
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeChanged);
new MutationObserver(themeChanged).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

const FONT = '"IBM Plex Sans",system-ui,sans-serif';
const f = (v, d = 2) => Number(v).toFixed(d).replace('-', '−');
const sci = (v, d = 2) => { if (!v) return '0'; const e = Math.floor(Math.log10(Math.abs(v))); return (v / Math.pow(10, e)).toFixed(d) + ' × 10<sup>' + (e < 0 ? '−' + (-e) : e) + '</sup>'; };
const G = {
  line(c, x1, y1, x2, y2, s, w = 1.5, d) { c.save(); c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.strokeStyle = s; c.lineWidth = w; if (d) c.setLineDash(d); c.stroke(); c.restore(); },
  arrow(c, x1, y1, x2, y2, s, w = 2.5) {
    const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1); if (L < 2) return;
    const h = Math.min(9, L * .5) + w;
    c.save(); c.strokeStyle = c.fillStyle = s; c.lineWidth = w; c.lineCap = 'round';
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2 - Math.cos(a) * h * .7, y2 - Math.sin(a) * h * .7); c.stroke();
    c.beginPath(); c.moveTo(x2, y2); c.lineTo(x2 - h * Math.cos(a - .42), y2 - h * Math.sin(a - .42)); c.lineTo(x2 - h * Math.cos(a + .42), y2 - h * Math.sin(a + .42)); c.closePath(); c.fill(); c.restore();
  },
  text(c, t, x, y, s, al = 'left', sz = 12, wt = 500) { c.save(); c.font = wt + ' ' + sz + 'px ' + FONT; c.fillStyle = s; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, x, y); c.restore(); },
  dot(c, x, y, r, s) { c.beginPath(); c.arc(x, y, r, 0, 7); c.fillStyle = s; c.fill(); },
  rr(c, x, y, w, h, r, s) { c.beginPath(); if (c.roundRect) c.roundRect(x, y, w, h, r); else c.rect(x, y, w, h); c.fillStyle = s; c.fill(); },
  curve(c, pts, s, w = 2.5, d) { if (pts.length < 2) return; c.save(); c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.strokeStyle = s; c.lineWidth = w; c.lineJoin = 'round'; if (d) c.setLineDash(d); c.stroke(); c.restore(); },
  ticks(lo, hi, n = 5) {
    const raw = (hi - lo) / n, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p, st = (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p, out = [];
    for (let v = Math.ceil(lo / st - 1e-9) * st; v <= hi + st * 1e-6; v += st) out.push(+v.toFixed(10));
    return out;
  },
  box(x, y, w, h) { return { x: x + 44, y: y + 26, w: w - 62, h: h - 66 }; },
  /* paksi graf; pulangkan fungsi penukar koordinat */
  plot(c, K, b, o) {
    const X = v => b.x + (v - o.x[0]) / (o.x[1] - o.x[0]) * b.w, Y = v => b.y + b.h - (v - o.y[0]) / (o.y[1] - o.y[0]) * b.h;
    const xt = o.xt || G.ticks(o.x[0], o.x[1], 5), yt = o.yt || G.ticks(o.y[0], o.y[1], 4);
    c.save(); c.globalAlpha = .8; c.fillStyle = K.bg; c.fillRect(b.x, b.y, b.w, b.h); c.restore();
    xt.forEach(v => { G.line(c, X(v), b.y, X(v), b.y + b.h, K.line, 1); G.text(c, o.xf ? o.xf(v) : String(v), X(v), b.y + b.h + 12, K.mut, 'center', 11); });
    yt.forEach(v => { G.line(c, b.x, Y(v), b.x + b.w, Y(v), K.line, 1); G.text(c, String(v).replace('-', '−'), b.x - 6, Y(v), K.mut, 'right', 11); });
    const y0 = o.y[0] < 0 && o.y[1] > 0 ? Y(0) : b.y + b.h;
    G.line(c, b.x, b.y, b.x, b.y + b.h, K.ink, 1.5); G.line(c, b.x, y0, b.x + b.w, y0, K.ink, 1.5);
    if (o.xl) G.text(c, o.xl, b.x + b.w, b.y + b.h + 28, K.ink, 'right', 12, 600);
    if (o.yl) G.text(c, o.yl, b.x - 30, b.y - 13, K.ink, 'left', 12, 600);
    return { X, Y };
  }
};

/* ---- bekas makmal: kanvas + bacaan + kawalan ---- */
function Lab(host, id, opt = {}) {
  host.innerHTML = '';
  const stage = el('div', 'stage'), cv = el('canvas'), reads = el('dl', 'reads'), ctrl = el('div', 'ctrls');
  cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', opt.alt || 'Visual interaktif');
  stage.append(cv); host.append(stage, reads, ctrl);
  const c = cv.getContext('2d');
  const L = { W: 0, H: 0, playing: !matchMedia('(prefers-reduced-motion: reduce)').matches, changed: null, onPlay: null };
  let drawFn = null, stepFn = null, raf = 0, last = 0, dead = false;
  L.redraw = () => { if (!L.W || !drawFn || dead) return; c.clearRect(0, 0, L.W, L.H); drawFn(c, L.W, L.H, col()); };
  function fit() {
    const w = stage.clientWidth; if (!w) return;
    const r = typeof opt.r === 'function' ? opt.r(w) : (opt.r || .58);
    const h = Math.round(Math.min(Math.max(w * r, 230), opt.max || 470)), d = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(w * d); cv.height = Math.round(h * d); cv.style.height = h + 'px';
    c.setTransform(d, 0, 0, d, 0, 0); L.W = w; L.H = h; L.redraw();
  }
  const ro = new ResizeObserver(fit); ro.observe(stage);
  L.draw = fn => { drawFn = fn; fit(); };
  function tick(ts) { if (dead) return; const dt = Math.min((ts - last) / 1000, .05); last = ts; if (L.playing && stepFn) stepFn(dt); L.redraw(); raf = requestAnimationFrame(tick); }
  L.loop = fn => { stepFn = fn; last = performance.now(); raf = requestAnimationFrame(tick); };
  const fire = () => { if (L.changed) L.changed(); L.redraw(); };
  L.slider = o => {
    const w = el('div', 'ctl'), sid = id + '-' + o.id;
    w.innerHTML = `<label for="${sid}">${o.label}</label><output for="${sid}"></output><input type="range" id="${sid}" min="${o.min}" max="${o.max}" step="${o.step || 1}" value="${o.val}">`;
    const inp = w.querySelector('input'), out = w.querySelector('output');
    const show = () => { out.innerHTML = (o.fmt ? o.fmt(+inp.value) : inp.value) + (o.unit ? ' ' + o.unit : ''); };
    inp.addEventListener('input', () => { show(); if (o.on) o.on(+inp.value); fire(); });
    show(); ctrl.append(w);
    return { get v() { return +inp.value; }, set(v) { inp.value = v; show(); if (o.on) o.on(+inp.value); } };
  };
  L.row = label => { const r = el('div', 'row'); if (label) r.append(el('span', null, label)); ctrl.append(r); return r; };
  L.btn = (row, text, fn, ghost) => { const b = el('button', 'btn' + (ghost ? ' ghost' : ''), text); b.type = 'button'; b.onclick = () => { fn(b); fire(); }; row.append(b); return b; };
  L.playBtn = (row, onReset) => {
    const b = L.btn(row, L.playing ? 'Jeda' : 'Main', () => { L.playing = !L.playing; if (L.playing && L.onPlay) L.onPlay(); b.textContent = L.playing ? 'Jeda' : 'Main'; });
    L.setPlay = v => { L.playing = v; b.textContent = v ? 'Jeda' : 'Main'; };
    if (onReset) L.btn(row, 'Semula', onReset, true);
    return b;
  };
  L.chips = o => {
    const r = L.row(o.label); let cur = o.val;
    const bs = o.opts.map(([v, t]) => {
      const b = el('button', 'chip', t); b.type = 'button'; b.setAttribute('aria-pressed', v === cur);
      b.onclick = () => { cur = v; bs.forEach((x, k) => x.setAttribute('aria-pressed', o.opts[k][0] === v)); if (o.on) o.on(v); fire(); };
      r.append(b); return b;
    });
    return { get v() { return cur; } };
  };
  L.check = o => {
    const r = el('label', 'chk'), i = el('input'); i.type = 'checkbox'; i.id = id + '-' + o.id; i.checked = !!o.val;
    r.append(i, document.createTextNode(o.label)); i.onchange = () => { if (o.on) o.on(i.checked); fire(); }; ctrl.append(r);
    return { get v() { return i.checked; } };
  };
  L.reads = labels => {
    reads.innerHTML = labels.map(l => `<div><dt>${l}</dt><dd>–</dd></div>`).join('');
    const dd = [...reads.querySelectorAll('dd')], prev = [];
    return vals => vals.forEach((v, k) => { if (prev[k] !== v) { prev[k] = v; dd[k].innerHTML = v; } });
  };
  L.destroy = () => { dead = true; cancelAnimationFrame(raf); ro.disconnect(); if (_cur === L) _cur = null; };
  _cur = L; return L;
}
/* beberapa mod dalam satu makmal */
function multi(host, id, modes) {
  host.innerHTML = ''; const bar = el('div', 'modes'), sub = el('div'); host.append(bar, sub); let cur = null;
  const bs = modes.map(([t], k) => { const b = el('button', null, t); b.type = 'button'; b.onclick = () => pick(k); bar.append(b); return b; });
  function pick(k) { if (cur) cur.destroy(); bs.forEach((b, j) => b.setAttribute('aria-pressed', j === k)); cur = modes[k][1](sub, id + '-' + k); }
  pick(0); return { destroy() { if (cur) cur.destroy(); } };
}

/* ================= T4 Bab 1: bandul ringkas ================= */
function simBandul(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? 1.12 : .56, alt: 'Bandul ringkas berayun dan graf T kuasa dua melawan panjang bandul' }), g = 9.81;
  let pts = [], ph = 0;
  const sl = L.slider({ id: 'l', label: 'Panjang bandul, <i>l</i>', min: .1, max: 1, step: .05, val: .5, unit: 'm', fmt: v => v.toFixed(2) });
  const row = L.row();
  L.btn(row, 'Rekod bacaan', () => { const l = sl.v; if (pts.some(p => p.l === l)) return; pts.push({ l, T: 2 * Math.PI * Math.sqrt(l / g) * (1 + (Math.random() - .5) * .03) }); });
  L.btn(row, 'Padam data', () => { pts = []; }, true);
  L.playBtn(row);
  const R = L.reads(['Tempoh, T', 'T²', 'Masa 20 ayunan', 'Kecerunan graf', 'g daripada graf']);
  const grad = () => { if (pts.length < 2) return 0; let a = 0, b = 0; pts.forEach(p => { a += p.l * p.T * p.T; b += p.l * p.l; }); return a / b; };
  L.changed = () => { const T = 2 * Math.PI * Math.sqrt(sl.v / g), m = grad(); R([f(T) + ' s', f(T * T) + ' s²', f(20 * T, 1) + ' s', m ? f(m) + ' s² m<sup>−1</sup>' : 'perlu ≥ 2 bacaan', m ? f(4 * Math.PI ** 2 / m) + ' m s<sup>−2</sup>' : '–']); };
  L.changed();
  L.loop(dt => { ph += dt * Math.sqrt(g / sl.v); });
  L.draw((c, W, H, K) => {
    const v = W < 560, pw = v ? W : W * .36, hh = v ? H * .4 : H;
    const ox = pw / 2, oy = 16, len = (hh - 72) * sl.v + 14, a = .3 * Math.cos(ph), bx = ox + len * Math.sin(a), by = oy + len * Math.cos(a);
    G.line(c, ox - 34, oy, ox + 34, oy, K.ink, 4);
    c.save(); c.setLineDash([3, 4]); c.strokeStyle = K.mut; c.beginPath(); c.arc(ox, oy, len, Math.PI / 2 - .3, Math.PI / 2 + .3); c.stroke(); c.restore();
    G.line(c, ox, oy, bx, by, K.ink, 1.5); G.dot(c, bx, by, 10, K.a);
    G.text(c, 'l = ' + f(sl.v) + ' m', ox, hh - 12, K.ink, 'center', 13, 600);
    const gb = v ? { x: 44, y: hh + 24, w: W - 62, h: H - hh - 66 } : { x: pw + 46, y: 32, w: W - pw - 66, h: H - 76 };
    const P = G.plot(c, K, gb, { x: [0, 1], y: [0, 4.5], xl: 'l / m', yl: 'T² / s²', xt: [0, .2, .4, .6, .8, 1], yt: [0, 1, 2, 3, 4] });
    const m = grad(); if (m) G.line(c, P.X(0), P.Y(0), P.X(1), P.Y(m), K.c2, 1.5);
    G.line(c, P.X(sl.v), P.Y(0), P.X(sl.v), gb.y, K.a, 1, [4, 4]);
    pts.forEach(p => { const x = P.X(p.l), y = P.Y(p.T * p.T); G.line(c, x - 5, y - 5, x + 5, y + 5, K.c2, 2); G.line(c, x - 5, y + 5, x + 5, y - 5, K.c2, 2); });
    if (!pts.length) G.text(c, 'Tekan “Rekod bacaan” untuk memplot titik', gb.x + gb.w / 2, gb.y + gb.h / 2, K.mut, 'center', 12);
  });
  return L;
}
SIMS['t4-b1'] = simBandul;

/* ================= T4 Bab 2: gerakan linear ================= */
function simGerakan(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? 1.22 : .6, alt: 'Kereta bergerak di atas landasan dengan graf halaju-masa dan sesaran-masa' }), TM = 10; let t = 0;
  const u = L.slider({ id: 'u', label: 'Halaju awal, <i>u</i>', min: 0, max: 20, step: 1, val: 4, unit: 'm s<sup>−1</sup>', on: () => { t = 0; } });
  const a = L.slider({ id: 'a', label: 'Pecutan, <i>a</i>', min: -4, max: 4, step: .5, val: 2, unit: 'm s<sup>−2</sup>', fmt: v => (v > 0 ? '+' : '') + f(v, 1), on: () => { t = 0; } });
  const row = L.row(); L.playBtn(row, () => { t = 0; });
  const R = L.reads(['Masa, t', 'Halaju, v = u + at', 'Sesaran, s = ut + ½at²']);
  const V = x => u.v + a.v * x, S = x => u.v * x + .5 * a.v * x * x;
  L.onPlay = () => { if (t >= TM) t = 0; };
  L.loop(dt => { t += dt * 1.6; if (t >= TM) { t = TM; L.setPlay(false); } });
  L.draw((c, W, H, K) => {
    R([f(t, 1) + ' s', f(V(t), 1) + ' m s<sup>−1</sup>', f(S(t), 1) + ' m']);
    const ts = [0, TM]; if (a.v && -u.v / a.v > 0 && -u.v / a.v < TM) ts.push(-u.v / a.v);
    const ss = ts.map(S), lo = Math.min(0, ...ss), hi = Math.max(1, ...ss), tx0 = 34, tw = W - 68, ty = 62;
    const X = s => tx0 + (s - lo) / (hi - lo) * tw;
    G.line(c, tx0 - 18, ty, tx0 + tw + 18, ty, K.ink, 2);
    [...new Set([lo, 0, hi])].forEach(s => { G.line(c, X(s), ty, X(s), ty + 6, K.ink, 1.5); G.text(c, f(s, 0) + ' m', X(s), ty + 16, K.mut, 'center', 11); });
    const cx = X(S(t)), vv = V(t);
    G.rr(c, cx - 18, ty - 21, 36, 13, 3, K.a); G.rr(c, cx - 10, ty - 30, 20, 10, 3, K.a); G.dot(c, cx - 10, ty - 6, 5, K.ink); G.dot(c, cx + 10, ty - 6, 5, K.ink);
    if (Math.abs(vv) > .05) { G.arrow(c, cx, ty - 40, cx + Math.max(-70, Math.min(70, vv * 3)), ty - 40, K.c2, 2.5); G.text(c, 'v', cx, ty - 51, K.c2, 'center', 12, 700); }
    const vert = W < 560, top = 84, gh = vert ? (H - top) / 2 : H - top, gw = vert ? W : W / 2;
    const b1 = G.box(0, top, gw, gh), b2 = G.box(vert ? 0 : gw, vert ? top + gh : top, gw, gh);
    const vs = [V(0), V(TM)], P1 = G.plot(c, K, b1, { x: [0, TM], y: [Math.min(0, ...vs), Math.max(1, ...vs)], xl: 't / s', yl: 'v / m s⁻¹', xt: [0, 2, 4, 6, 8, 10] });
    c.save(); c.globalAlpha = .25; c.fillStyle = K.a; c.beginPath(); c.moveTo(P1.X(0), P1.Y(0)); c.lineTo(P1.X(0), P1.Y(V(0))); c.lineTo(P1.X(t), P1.Y(V(t))); c.lineTo(P1.X(t), P1.Y(0)); c.closePath(); c.fill(); c.restore();
    G.line(c, P1.X(0), P1.Y(V(0)), P1.X(TM), P1.Y(V(TM)), K.a, 1.5, [4, 4]); G.line(c, P1.X(0), P1.Y(V(0)), P1.X(t), P1.Y(V(t)), K.a, 3); G.dot(c, P1.X(t), P1.Y(V(t)), 4.5, K.a);
    G.text(c, 'luas berlorek = sesaran', b1.x + b1.w, b1.y - 13, K.mut, 'right', 11);
    const P2 = G.plot(c, K, b2, { x: [0, TM], y: [lo, hi], xl: 't / s', yl: 's / m', xt: [0, 2, 4, 6, 8, 10] });
    const pa = [], pb = []; for (let k = 0; k <= 80; k++) { const x = TM * k / 80; pa.push([P2.X(x), P2.Y(S(x))]); if (x <= t) pb.push([P2.X(x), P2.Y(S(x))]); } pb.push([P2.X(t), P2.Y(S(t))]);
    G.curve(c, pa, K.c3, 1.5, [4, 4]); G.curve(c, pb, K.c3, 3); G.dot(c, P2.X(t), P2.Y(S(t)), 4.5, K.c3);
    G.text(c, 'kecerunan = halaju', b2.x + b2.w, b2.y - 13, K.mut, 'right', 11);
  });
  return L;
}
SIMS['t4-b2'] = simGerakan;

/* ================= T4 Bab 3: orbit satelit ================= */
function simOrbit(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? .95 : .6, alt: 'Satelit mengorbit Bumi dengan vektor halaju dan daya graviti' }), GM = 6.67e-11 * 5.97e24, RE = 6.37e6, k = 1500; let th = 0, te = 0;
  const hs = L.slider({ id: 'h', label: 'Ketinggian orbit, <i>h</i>', min: 200, max: 40000, step: 100, val: 400, unit: 'km', fmt: v => String(v).replace(/\B(?=(\d{3})+$)/g, ' ') });
  const row = L.row('Pratetap');
  L.btn(row, 'Orbit rendah, 400 km', () => hs.set(400), true); L.btn(row, 'Orbit geopegun, 35 800 km', () => hs.set(35800), true);
  L.playBtn(row);
  const R = L.reads(['Jejari orbit, r = R + h', 'Laju linear, v', 'Tempoh orbit, T', 'Pecutan graviti, g']);
  const calc = () => { const r = RE + hs.v * 1e3, v = Math.sqrt(GM / r); return { r, v, T: 2 * Math.PI * r / v, g: GM / r / r }; };
  L.changed = () => { const o = calc(); R([sci(o.r) + ' m', f(o.v / 1e3) + ' km s<sup>−1</sup>', o.T < 7200 ? f(o.T / 60, 0) + ' min' : f(o.T / 3600, 1) + ' jam', f(o.g) + ' m s<sup>−2</sup>']); };
  L.changed();
  L.loop(dt => { th += dt * k * 2 * Math.PI / calc().T; te += dt * k * 2 * Math.PI / 86164; });
  L.draw((c, W, H, K) => {
    const o = calc(), cx = W / 2, cy = H / 2 + 6, sc = (Math.min(W, H) / 2 - 34) / Math.max(o.r, RE * 2.3), re = RE * sc, ro = o.r * sc;
    c.save(); c.setLineDash([5, 5]); c.strokeStyle = K.mut; c.lineWidth = 1.2; c.beginPath(); c.arc(cx, cy, ro, 0, 7); c.stroke(); c.restore();
    G.line(c, cx, cy, cx + ro * Math.cos(-te), cy + ro * Math.sin(-te), K.c3, 1, [2, 4]);
    c.beginPath(); c.arc(cx, cy, re, 0, 7); c.fillStyle = K.soft; c.fill(); c.strokeStyle = K.a; c.lineWidth = 2; c.stroke();
    G.dot(c, cx + re * Math.cos(-te), cy + re * Math.sin(-te), 4, K.c3);
    if (re > 22) G.text(c, 'Bumi', cx, cy, K.a, 'center', 12, 700);
    const sx = cx + ro * Math.cos(-th), sy = cy + ro * Math.sin(-th), tx = Math.sin(-th), ty = -Math.cos(-th);
    G.arrow(c, sx, sy, sx + tx * 42, sy + ty * 42, K.c2, 2.5); G.text(c, 'v', sx + tx * 53, sy + ty * 53, K.c2, 'center', 13, 700);
    const fl = Math.max(18, Math.min(ro - re - 6, 38)), ux = (cx - sx) / ro, uy = (cy - sy) / ro;
    G.arrow(c, sx, sy, sx + ux * fl, sy + uy * fl, K.c4, 2.5); G.text(c, 'F', sx + ux * (fl + 10), sy + uy * (fl + 10), K.c4, 'center', 13, 700);
    c.fillStyle = K.ink; c.fillRect(sx - 5, sy - 5, 10, 10);
    G.dot(c, 14, H - 13, 4, K.c3); G.text(c, 'titik tetap pada permukaan Bumi', 24, H - 13, K.mut, 'left', 11.5, 600);
    if (Math.abs(o.T - 86164) < 2500) G.text(c, 'T ≈ 24 jam: satelit kekal di atas titik yang sama', W / 2, 15, K.c3, 'center', 12.5, 700);
  });
  return L;
}
SIMS['t4-b3'] = simOrbit;

/* ================= T4 Bab 4: lengkung pemanasan ================= */
function simHaba(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? .95 : .56, alt: 'Lengkung pemanasan: suhu melawan masa bagi ais yang dipanaskan sehingga menjadi stim' }); let t = 0;
  const P = L.slider({ id: 'p', label: 'Kuasa pemanas, <i>P</i>', min: 200, max: 2000, step: 100, val: 1000, unit: 'W', on: () => { t = 0; } });
  const m = L.slider({ id: 'm', label: 'Jisim ais, <i>m</i>', min: .1, max: 1, step: .1, val: .5, unit: 'kg', fmt: v => v.toFixed(1), on: () => { t = 0; } });
  const row = L.row(); L.playBtn(row, () => { t = 0; });
  const R = L.reads(['Fasa jirim', 'Suhu', 'Masa pemanasan', 'Haba dibekalkan, Q = Pt']);
  const NM = ['Pepejal (ais)', 'Pepejal + cecair: melebur', 'Cecair (air)', 'Cecair + gas: mendidih', 'Gas (stim)'], T0 = [-20, 0, 0, 100, 100], T1 = [0, 0, 100, 100, 120];
  const st = () => { const M = m.v; let acc = 0; return [M * 2100 * 20, M * 3.34e5, M * 4200 * 100, M * 2.26e6, M * 2000 * 20].map((Q, i) => { const o = { i, t0: acc / P.v, t1: (acc + Q) / P.v }; acc += Q; return o; }); };
  const at = (S, x) => { const s = S.find(q => x <= q.t1) || S[4], fr = Math.min(1, Math.max(0, (x - s.t0) / (s.t1 - s.t0))); return { s, fr, T: T0[s.i] + (T1[s.i] - T0[s.i]) * fr }; };
  L.onPlay = () => { if (t >= st()[4].t1) t = 0; };
  L.loop(dt => { const end = st()[4].t1; t += dt * end / 18; if (t >= end) { t = end; L.setPlay(false); } });
  L.draw((c, W, H, K) => {
    const S = st(), end = S[4].t1, cur = at(S, t);
    R([NM[cur.s.i], f(cur.T, 0) + ' °C', f(t, 0) + ' s', sci(P.v * t) + ' J']);
    const b = G.box(0, 0, W, H), Pl = G.plot(c, K, b, { x: [0, end], y: [-20, 120], xl: 'Masa / s', yl: 'Suhu / °C', yt: [-20, 0, 20, 40, 60, 80, 100, 120] });
    S.forEach(s => { G.line(c, Pl.X(s.t0), Pl.Y(T0[s.i]), Pl.X(s.t1), Pl.Y(T1[s.i]), s.i % 2 ? K.c2 : K.a, 3); });
    G.text(c, 'melebur: Q = ml', Pl.X(S[1].t0) + 4, Pl.Y(0) + 13, K.c2, 'left', 11.5, 700);
    G.text(c, 'Q = mcθ', Pl.X((S[2].t0 + S[2].t1) / 2) + 10, Pl.Y(50) + 8, K.a, 'left', 11.5, 700);
    G.text(c, 'mendidih: Q = ml', Pl.X((S[3].t0 + S[3].t1) / 2), Pl.Y(100) + 14, K.c2, 'center', 11.5, 700);
    G.line(c, Pl.X(t), Pl.Y(cur.T), Pl.X(t), Pl.Y(-20), K.mut, 1, [3, 4]); G.dot(c, Pl.X(t), Pl.Y(cur.T), 5.5, K.ink);
    /* model zarah */
    const iw = Math.min(132, b.w * .36), ih = iw * .72, ix = b.x + b.w - iw - 8, iy = b.y + b.h - ih - 10, now = performance.now() / 1000;
    c.fillStyle = K.bg; c.strokeStyle = K.line; c.lineWidth = 1; c.fillRect(ix, iy, iw, ih); c.strokeRect(ix, iy, iw, ih);
    G.text(c, 'Model zarah', ix + 2, iy - 9, K.mut, 'left', 11, 600);
    const gas = cur.s.i === 4 ? 1 : cur.s.i === 3 ? cur.fr : 0, liq = cur.s.i >= 2 ? 1 : cur.s.i === 1 ? cur.fr : 0;
    for (let q = 0; q < 16; q++) {
      const fq = (q + .5) / 16; let x, y;
      if (fq < gas) { x = ix + iw * (.5 + .43 * Math.sin(now * 1.3 * (1 + (q % 5) * .2) + q * 2.1)); y = iy + ih * (.5 + .41 * Math.sin(now * 1.7 * (1 + (q % 3) * .3) + q * 1.3)); }
      else if (fq < liq) { x = ix + iw * (.1 + .8 * ((q * .618) % 1)) + 3 * Math.sin(now * 2 + q * 1.7); y = iy + ih * (.6 + .3 * ((q * .371) % 1)) + 2.5 * Math.sin(now * 2.6 + q); }
      else { x = ix + iw * .31 + (q % 4) * iw * .13 + 1.1 * Math.sin(now * 17 + q * 2); y = iy + ih * .36 + Math.floor(q / 4) * ih * .16 + 1.1 * Math.cos(now * 15 + q); }
      G.dot(c, x, y, Math.max(3, iw * .034), K.a);
    }
  });
  return L;
}
SIMS['t4-b4'] = simHaba;

/* ================= T4 Bab 5: gelombang ================= */
function simGelombang(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? .74 : .46, alt: 'Gelombang merambat ke kanan dengan label amplitud dan panjang gelombang' }); let t = 0;
  const md = L.chips({ label: 'Jenis gelombang', opts: [['T', 'Melintang'], ['L', 'Membujur']], val: 'T' });
  const A = L.slider({ id: 'a', label: 'Amplitud, <i>A</i>', min: .5, max: 3, step: .5, val: 2, unit: 'cm', fmt: v => v.toFixed(1) });
  const fq = L.slider({ id: 'f', label: 'Frekuensi, <i>f</i>', min: 1, max: 3, step: .25, val: 1, unit: 'Hz', fmt: v => v.toFixed(2) });
  const vs = L.slider({ id: 'v', label: 'Laju gelombang, <i>v</i> (ditentukan oleh medium)', min: 6, max: 15, step: 1, val: 8, unit: 'cm s<sup>−1</sup>' });
  const lam = { get v() { return vs.v / fq.v; } };
  const row = L.row(); L.playBtn(row);
  const R = L.reads(['Panjang gelombang, λ = v / f', 'Tempoh, T = 1 / f', 'Frekuensi, f', 'Laju gelombang, v = fλ']);
  L.changed = () => R([f(lam.v, 1) + ' cm', f(1 / fq.v) + ' s', f(fq.v) + ' Hz', vs.v + ' cm s<sup>−1</sup>']); L.changed();
  L.loop(dt => { t += dt; });
  L.draw((c, W, H, K) => {
    const x0 = 24, pw = W - 48, sx = pw / 30, cy = H * .5, sy = Math.min((H * .5 - 48) / 3, sx * 1.6), k = 2 * Math.PI / lam.v, w = 2 * Math.PI * fq.v;
    G.line(c, x0, H - 22, x0 + pw, H - 22, K.mut, 1);
    for (let x = 0; x <= 30; x += 5) { G.line(c, x0 + x * sx, H - 26, x0 + x * sx, H - 18, K.mut, 1); G.text(c, x + (x === 30 ? ' cm' : ''), x0 + x * sx, H - 9, K.mut, 'center', 11); }
    const dim = (xa, ya, yb) => {
      G.arrow(c, x0 + (xa + lam.v / 2) * sx, ya, x0 + xa * sx, ya, K.ink, 1.5); G.arrow(c, x0 + (xa + lam.v / 2) * sx, ya, x0 + (xa + lam.v) * sx, ya, K.ink, 1.5);
      G.text(c, 'λ', x0 + (xa + lam.v / 2) * sx, ya - 10, K.ink, 'center', 14, 700);
      G.line(c, x0 + xa * sx, ya, x0 + xa * sx, yb, K.mut, 1, [2, 3]); G.line(c, x0 + (xa + lam.v) * sx, ya, x0 + (xa + lam.v) * sx, yb, K.mut, 1, [2, 3]);
    };
    if (md.v === 'T') {
      const d = x => A.v * Math.sin(k * x - w * t), yT = cy - A.v * sy;
      G.line(c, x0, cy, x0 + pw, cy, K.mut, 1, [4, 4]);
      const pts = []; for (let x = 0; x <= 30; x += .1) pts.push([x0 + x * sx, cy - d(x) * sy]); G.curve(c, pts, K.a, 2.5);
      G.line(c, x0 + 10 * sx, cy - 3.1 * sy, x0 + 10 * sx, cy + 3.1 * sy, K.c2, 1, [2, 3]);
      for (let x = 0; x <= 30; x++) G.dot(c, x0 + x * sx, cy - d(x) * sy, x === 10 ? 6 : 2.6, x === 10 ? K.c2 : K.a);
      let xc = ((Math.PI / 2 + w * t) / k) % lam.v; if (xc < 1) xc += lam.v;
      dim(xc, cy - 3 * sy - 14, yT);
      G.arrow(c, x0 + xc * sx, cy, x0 + xc * sx, yT, K.c3, 1.8); G.text(c, 'A', x0 + xc * sx + 9, cy - A.v * sy / 2, K.c3, 'left', 13, 700);
      G.text(c, 'Zarah bergetar serenjang dengan arah perambatan', x0, 14, K.c2, 'left', 11.5, 600);
    } else {
      const ae = Math.min(A.v * .4, .9 / k), top = cy - H * .19, bot = cy + H * .19;
      for (let x = 0; x <= 30; x += .5) { const xx = x0 + (x + ae * Math.sin(k * x - w * t)) * sx, hot = x === 10; G.line(c, xx, top, xx, bot, hot ? K.c2 : K.a, hot ? 3.5 : 1.6); }
      let xc = ((Math.PI + w * t) / k) % lam.v; if (xc < 1) xc += lam.v;
      dim(xc, top - 14, top);
      G.text(c, 'mampatan', x0 + xc * sx, bot + 12, K.ink, 'center', 11.5, 600); G.text(c, 'regangan', x0 + (xc + lam.v / 2) * sx, bot + 12, K.mut, 'center', 11.5, 600);
      G.text(c, 'Zarah bergetar selari dengan arah perambatan', x0, 14, K.c2, 'left', 11.5, 600);
    }
  });
  return L;
}
SIMS['t4-b5'] = simGelombang;

/* ================= T4 Bab 6: pembiasan dan kanta ================= */
function simBiasan(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? .85 : .52, alt: 'Sinar cahaya dibiaskan pada sempadan antara udara dengan medium' });
  const dir = L.chips({ label: 'Arah cahaya', opts: [['in', 'Udara → medium'], ['out', 'Medium → udara']], val: 'in' });
  const ia = L.slider({ id: 'i', label: 'Sudut tuju, <i>i</i>', min: 0, max: 89, step: 1, val: 40, unit: '°' });
  const n = L.slider({ id: 'n', label: 'Indeks biasan medium, <i>n</i>', min: 1.1, max: 2.5, step: .01, val: 1.5, fmt: v => v.toFixed(2) });
  const row = L.row('Medium'); [['Air, 1.33', 1.33], ['Kaca, 1.50', 1.5], ['Intan, 2.42', 2.42]].forEach(([t, v]) => L.btn(row, t, () => n.set(v), true));
  const R = L.reads(['Sudut biasan, r', 'Sudut genting, c', 'Laju cahaya dalam medium']);
  const calc = () => { const i = ia.v * Math.PI / 180, s = dir.v === 'in' ? Math.sin(i) / n.v : Math.sin(i) * n.v; return { i, tir: s > 1, r: s > 1 ? 0 : Math.asin(s) }; };
  L.changed = () => { const o = calc(); R([o.tir ? 'Tiada: pantulan dalam penuh' : f(o.r * 180 / Math.PI, 1) + '°', f(Math.asin(1 / n.v) * 180 / Math.PI, 1) + '°', sci(3e8 / n.v) + ' m s<sup>−1</sup>']); }; L.changed();
  L.draw((c, W, H, K) => {
    const o = calc(), cx = W / 2, cy = H / 2, len = Math.min(W * .46, H * .44), sg = dir.v === 'in' ? -1 : 1;
    c.fillStyle = K.soft; c.fillRect(0, cy, W, H - cy);
    G.line(c, 0, cy, W, cy, K.ink, 1.5); G.line(c, cx, cy - len - 6, cx, cy + len + 6, K.mut, 1, [5, 5]);
    G.text(c, 'Udara, n = 1.00', 10, 15, K.mut, 'left', 12, 600); G.text(c, 'Medium, n = ' + n.v.toFixed(2), 10, H - 13, K.a, 'left', 12, 600);
    const ray = (x, y, into, alpha, w) => { c.save(); c.globalAlpha = alpha; const mx = (x + cx) / 2, my = (y + cy) / 2; if (into) { G.arrow(c, x, y, mx, my, K.c2, w); G.line(c, mx, my, cx, cy, K.c2, w); } else { G.arrow(c, cx, cy, mx, my, K.c2, w); G.line(c, mx, my, x, y, K.c2, w); } c.restore(); };
    ray(cx - len * Math.sin(o.i), cy + sg * len * Math.cos(o.i), true, 1, 3);
    ray(cx + len * Math.sin(o.i), cy + sg * len * Math.cos(o.i), false, o.tir ? 1 : .28, o.tir ? 3 : 2);
    if (!o.tir) ray(cx + len * Math.sin(o.r), cy - sg * len * Math.cos(o.r), false, 1, 3);
    const arc = (base, ang, lab) => { if (ang < .03) return; c.beginPath(); c.arc(cx, cy, 34, base, base + (sg < 0 ? -ang : ang), sg < 0); c.strokeStyle = K.ink; c.lineWidth = 1.2; c.stroke(); const mid = base + (sg < 0 ? -ang : ang) / 2; G.text(c, lab, cx + 48 * Math.cos(mid), cy + 48 * Math.sin(mid), K.ink, 'center', 14, 700); };
    arc(sg * Math.PI / 2, o.i, 'i'); if (!o.tir) arc(-sg * Math.PI / 2, o.r, 'r');
    if (o.tir) G.text(c, 'Pantulan dalam penuh: i > c', W - 10, 15, K.c2, 'right', 12.5, 700);
  });
  return L;
}
function simKanta(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? .8 : .5, alt: 'Rajah sinar bagi kanta nipis: objek, sinar cahaya dan imej' });
  const ty = L.chips({ label: 'Jenis kanta', opts: [['+', 'Cembung'], ['-', 'Cekung']], val: '+' });
  const us = L.slider({ id: 'u', label: 'Jarak objek, <i>u</i>', min: 4, max: 60, step: 1, val: 30, unit: 'cm' });
  const fs = L.slider({ id: 'f', label: 'Panjang fokus, <i>f</i>', min: 5, max: 25, step: 1, val: 15, unit: 'cm' });
  const R = L.reads(['Jarak imej, v', 'Pembesaran linear, m', 'Ciri imej']);
  const calc = () => { const F = ty.v === '+' ? fs.v : -fs.v, d = 1 / F - 1 / us.v, v = Math.abs(d) < 1e-9 ? Infinity : 1 / d; return { F, v, m: Math.abs(v / us.v) }; };
  L.changed = () => { const o = calc(); if (!isFinite(o.v)) { R(['Infiniti', '–', 'Tiada imej pada skrin (u = f)']); return; } R([f(o.v, 1) + ' cm', f(o.m), (o.v > 0 ? 'Nyata, songsang, ' : 'Maya, tegak, ') + (Math.abs(o.m - 1) < .005 ? 'sama saiz' : o.m > 1 ? 'diperbesar' : 'dikecilkan')]); }; L.changed();
  L.draw((c, W, H, K) => {
    const o = calc(), cx = W / 2, cy = H / 2, sx = W / 150, ho = H * .17, X = x => cx + x * sx, lh = H * .4, cv = ty.v === '+' ? 1 : -1;
    G.line(c, 0, cy, W, cy, K.ink, 1.2); G.line(c, cx, cy - lh, cx, cy + lh, K.a, 2.5);
    [[cy - lh, 1], [cy + lh, -1]].forEach(([y, d]) => { c.beginPath(); c.moveTo(cx - 7, y + d * 8 * cv); c.lineTo(cx, y); c.lineTo(cx + 7, y + d * 8 * cv); c.strokeStyle = K.a; c.lineWidth = 2.5; c.stroke(); });
    [[fs.v, 'F'], [2 * fs.v, '2F'], [-fs.v, 'F'], [-2 * fs.v, '2F']].forEach(([x, t]) => { if (Math.abs(x * sx) < W / 2 - 8) { G.line(c, X(x), cy - 4, X(x), cy + 4, K.ink, 1.5); G.text(c, t, X(x), cy + 15, K.mut, 'center', 11.5, 600); } });
    const ox = X(-us.v), oy = cy - ho; G.arrow(c, ox, cy, ox, oy, K.ink, 3); G.text(c, 'Objek', ox, cy + 31, K.ink, 'center', 11.5, 600);
    const s1 = ho / (o.F * sx), s2 = ho / (us.v * sx);
    G.arrow(c, ox, oy, (ox + cx) / 2, oy, K.c2, 1.8); G.line(c, (ox + cx) / 2, oy, cx, oy, K.c2, 1.8); G.line(c, cx, oy, W, oy + s1 * (W - cx), K.c2, 1.8);
    G.line(c, ox, oy, W, oy + s2 * (W - ox), K.c4, 1.8);
    if (cv < 0) G.line(c, X(o.F), cy, cx, oy, K.c2, 1.2, [4, 4]);
    if (isFinite(o.v)) {
      const xi = X(o.v), yi = cy + (o.v / us.v) * ho, real = o.v > 0;
      if (!real) { G.line(c, cx, oy, xi, yi, K.c2, 1.2, [4, 4]); G.line(c, ox, oy, xi, yi, K.c4, 1.2, [4, 4]); }
      if (xi > 4 && xi < W - 4) {
        if (real) G.arrow(c, xi, cy, xi, yi, K.c3, 3); else { G.line(c, xi, cy, xi, yi, K.c3, 2.5, [5, 4]); G.arrow(c, xi, yi + 12, xi, yi, K.c3, 2.5); }
        G.text(c, real ? 'Imej nyata' : 'Imej maya', Math.max(38, Math.min(W - 38, xi)), real ? cy - 12 : Math.max(12, yi - 11), K.c3, 'center', 11.5, 700);
      } else G.text(c, 'Imej berada di luar rajah (v = ' + f(o.v, 0) + ' cm)', W / 2, 14, K.c3, 'center', 12, 700);
    } else G.text(c, 'u = f: sinar biasan selari, imej di infiniti', W / 2, 14, K.c3, 'center', 12, 700);
  });
  return L;
}
SIMS['t4-b6'] = (host, id) => multi(host, id, [['Pembiasan dan pantulan dalam penuh', simBiasan], ['Kanta nipis', simKanta]]);

/* ================= T5 Bab 1: daya paduan dan leraian daya ================= */
function simPaduan(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? .8 : .5, alt: 'Dua daya dan daya paduannya dalam segi empat selari daya' });
  const F1 = L.slider({ id: 'f1', label: 'Daya <i>F</i><sub>1</sub>', min: 0, max: 100, step: 5, val: 60, unit: 'N' });
  const F2 = L.slider({ id: 'f2', label: 'Daya <i>F</i><sub>2</sub>', min: 0, max: 100, step: 5, val: 40, unit: 'N' });
  const th = L.slider({ id: 'th', label: 'Sudut antara dua daya, <i>θ</i>', min: 0, max: 180, step: 5, val: 60, unit: '°' });
  const R = L.reads(['Daya paduan, F', 'Arah diukur dari F<sub>1</sub>', 'Pecutan objek berjisim 10 kg']);
  const calc = () => { const t = th.v * Math.PI / 180, x = F1.v + F2.v * Math.cos(t), y = F2.v * Math.sin(t); return { t, x, y, F: Math.hypot(x, y), al: Math.atan2(y, x) }; };
  L.changed = () => { const o = calc(); R([f(o.F, 1) + ' N', o.F < .05 ? '–' : f(o.al * 180 / Math.PI, 1) + '°', f(o.F / 10) + ' m s<sup>−2</sup>']); }; L.changed();
  L.draw((c, W, H, K) => {
    const o = calc(), s = Math.min(W * .0031, H * .0066), ox = W * .34, oy = H * .82;
    const p1 = [ox + F1.v * s, oy], p2 = [ox + F2.v * Math.cos(o.t) * s, oy - F2.v * Math.sin(o.t) * s], pr = [ox + o.x * s, oy - o.y * s];
    G.line(c, p1[0], p1[1], pr[0], pr[1], K.mut, 1.2, [5, 4]); G.line(c, p2[0], p2[1], pr[0], pr[1], K.mut, 1.2, [5, 4]);
    c.beginPath(); c.arc(ox, oy, 26, 0, -o.t, true); c.strokeStyle = K.ink; c.lineWidth = 1.2; c.stroke();
    if (th.v > 12) G.text(c, 'θ', ox + 38 * Math.cos(o.t / 2), oy - 38 * Math.sin(o.t / 2), K.ink, 'center', 13, 700);
    G.arrow(c, ox, oy, p1[0], p1[1], K.a, 3); G.arrow(c, ox, oy, p2[0], p2[1], K.c3, 3); G.arrow(c, ox, oy, pr[0], pr[1], K.c2, 4);
    if (F1.v) G.text(c, 'F₁', p1[0] - 8, p1[1] + 15, K.a, 'center', 13, 700);
    if (F2.v) G.text(c, 'F₂', p2[0] - 12, p2[1] - 8, K.c3, 'center', 13, 700);
    if (o.F > 1) G.text(c, 'F = ' + f(o.F, 1) + ' N', Math.min(W - 54, pr[0] + 4), Math.max(12, pr[1] - 13), K.c2, 'center', 13, 700);
    G.dot(c, ox, oy, 4, K.ink);
  });
  return L;
}
function simLeraian(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? .8 : .5, alt: 'Satu daya dileraikan kepada komponen mengufuk dan komponen menegak' });
  const F = L.slider({ id: 'f', label: 'Daya, <i>F</i>', min: 10, max: 100, step: 5, val: 80, unit: 'N' });
  const th = L.slider({ id: 'th', label: 'Sudut dari garis ufuk, <i>θ</i>', min: 0, max: 90, step: 1, val: 35, unit: '°' });
  const R = L.reads(['Komponen mengufuk, F<sub>x</sub> = F kos θ', 'Komponen menegak, F<sub>y</sub> = F sin θ']);
  L.changed = () => { const t = th.v * Math.PI / 180; R([f(F.v * Math.cos(t), 1) + ' N', f(F.v * Math.sin(t), 1) + ' N']); }; L.changed();
  L.draw((c, W, H, K) => {
    const t = th.v * Math.PI / 180, s = Math.min(W * .0064, H * .0068), ox = W * .18, oy = H * .84, x = F.v * Math.cos(t) * s, y = F.v * Math.sin(t) * s;
    G.line(c, ox - 18, oy, W - 14, oy, K.mut, 1); G.line(c, ox, oy + 18, ox, 12, K.mut, 1);
    G.line(c, ox + x, oy, ox + x, oy - y, K.mut, 1.2, [5, 4]); G.line(c, ox, oy - y, ox + x, oy - y, K.mut, 1.2, [5, 4]);
    c.beginPath(); c.arc(ox, oy, 30, 0, -t, true); c.strokeStyle = K.ink; c.lineWidth = 1.2; c.stroke();
    if (th.v > 10) G.text(c, 'θ', ox + 42 * Math.cos(t / 2), oy - 42 * Math.sin(t / 2), K.ink, 'center', 13, 700);
    G.arrow(c, ox, oy, ox + x, oy, K.a, 3); G.arrow(c, ox, oy, ox, oy - y, K.c3, 3); G.arrow(c, ox, oy, ox + x, oy - y, K.c2, 4);
    if (x > 30) G.text(c, 'Fx = ' + f(F.v * Math.cos(t), 1) + ' N', ox + x / 2, oy + 14, K.a, 'center', 12.5, 700);
    if (y > 20) G.text(c, 'Fy = ' + f(F.v * Math.sin(t), 1) + ' N', ox + 8, Math.max(10, oy - y - 11), K.c3, 'left', 12.5, 700);
    G.text(c, 'F = ' + F.v + ' N', Math.min(W - 44, ox + x + 8), Math.max(26, oy - y - 12) + (y > 20 ? 14 : 0), K.c2, 'left', 12.5, 700);
    G.dot(c, ox, oy, 4, K.ink);
  });
  return L;
}
SIMS['t5-b1'] = (host, id) => multi(host, id, [['Daya paduan', simPaduan], ['Leraian daya', simLeraian]]);

/* ================= T5 Bab 2: prinsip Archimedes ================= */
function simApung(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? .85 : .5, alt: 'Bongkah di dalam tangki cecair dengan anak panah berat dan daya apungan' }), V = 1e-3, g = 9.81; let p = null;
  const ro = L.slider({ id: 'ro', label: 'Ketumpatan objek', min: 200, max: 2000, step: 50, val: 600, unit: 'kg m<sup>−3</sup>' });
  const rc = L.slider({ id: 'rc', label: 'Ketumpatan cecair', min: 700, max: 1300, step: 10, val: 1000, unit: 'kg m<sup>−3</sup>' });
  const row = L.row('Cecair'); [['Minyak, 800', 800], ['Air, 1 000', 1000], ['Air laut, 1 030', 1030]].forEach(([t, v]) => L.btn(row, t, () => rc.set(v), true));
  const R = L.reads(['Berat objek, W', 'Daya apungan, F<sub>B</sub>', 'Bahagian yang tenggelam', 'Keadaan']);
  const calc = () => { const fr = Math.min(1, ro.v / rc.v); return { W: ro.v * V * g, fr, FB: rc.v * V * fr * g, sink: ro.v > rc.v }; };
  L.changed = () => { const o = calc(); R([f(o.W) + ' N', f(o.FB) + ' N', f(o.fr * 100, 0) + ' %', o.sink ? 'Tenggelam: W &gt; F<sub>B</sub>' : ro.v === rc.v ? 'Terampai: W = F<sub>B</sub>' : 'Terapung: W = F<sub>B</sub>']); }; L.changed();
  const smooth = L.playing; L.playing = true;
  L.loop(dt => { const o = calc(), tg = o.sink ? 2 : o.fr; p = p == null || !smooth ? tg : p + (tg - p) * Math.min(1, dt * 4); });
  L.draw((c, W, H, K) => {
    const o = calc(), q = p == null ? (o.sink ? 2 : o.fr) : p, tw = Math.min(W - 40, 440), tx = (W - tw) / 2, tb = H - 16, s = Math.min(tw * .3, H * .3);
    const lvl = H * .36 - Math.min(1, q) * s * s / tw, bot = q <= 1 ? lvl + q * s : lvl + s + (tb - lvl - s) * (q - 1), bx = W / 2 - s / 2, by = bot - s;
    c.save(); c.globalAlpha = .14 + .34 * (rc.v - 700) / 600; c.fillStyle = K.a; c.fillRect(tx, lvl, tw, tb - lvl); c.restore();
    G.line(c, tx, lvl, tx + tw, lvl, K.a, 1.5);
    c.strokeStyle = K.ink; c.lineWidth = 2.5; c.beginPath(); c.moveTo(tx, H * .1); c.lineTo(tx, tb); c.lineTo(tx + tw, tb); c.lineTo(tx + tw, H * .1); c.stroke();
    c.fillStyle = K.bg; c.fillRect(bx, by, s, s); c.save(); c.globalAlpha = .25 + .6 * (ro.v - 200) / 1800; c.fillStyle = K.c4; c.fillRect(bx, by, s, s); c.restore(); c.strokeStyle = K.ink; c.lineWidth = 2; c.strokeRect(bx, by, s, s);
    const fs = H * .015, mx = W / 2, my = by + s / 2, wy = Math.min(my, H - 8 - o.W * fs);
    G.arrow(c, mx - 12, wy, mx - 12, wy + o.W * fs, K.c2, 3.5); G.text(c, 'Berat, W', mx - 22, wy + Math.min(o.W * fs - 6, s * .3), K.c2, 'right', 12.5, 700);
    G.arrow(c, mx + 12, my, mx + 12, my - o.FB * fs, K.c3, 3.5); G.text(c, 'Daya apungan', mx + 22, my - Math.min(o.FB * fs - 6, s * .3), K.c3, 'left', 12.5, 700);
    G.text(c, 'aras cecair', tx + 8, lvl - 9, K.a, 'left', 11.5, 600);
  });
  return L;
}
SIMS['t5-b2'] = simApung;

/* ================= T5 Bab 3: d.g.e. dan rintangan dalam ================= */
function simLitar(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? 1.18 : .52, alt: 'Litar sel kering dengan rintangan dalam dan graf V melawan I' }); let ph = 0;
  const E = L.slider({ id: 'e', label: 'D.g.e. sel, <i>ε</i>', min: 1.5, max: 12, step: .5, val: 6, unit: 'V', fmt: v => v.toFixed(1) });
  const r = L.slider({ id: 'r', label: 'Rintangan dalam, <i>r</i>', min: 0, max: 5, step: .1, val: 1, unit: 'Ω', fmt: v => v.toFixed(1) });
  const Rx = L.slider({ id: 'R', label: 'Rintangan luar, <i>R</i>', min: .5, max: 20, step: .5, val: 5, unit: 'Ω', fmt: v => v.toFixed(1) });
  const row = L.row(); L.playBtn(row);
  const Rd = L.reads(['Arus, I = ε / (R + r)', 'Voltan terminal, V = IR', 'Voltan hilang, Ir', 'Kuasa pada R, P = I²R']);
  const calc = () => { const I = E.v / (Rx.v + r.v); return { I, V: I * Rx.v, P: I * I * Rx.v }; };
  L.changed = () => { const o = calc(); Rd([f(o.I) + ' A', f(o.V) + ' V', f(o.I * r.v) + ' V', f(o.P) + ' W']); }; L.changed();
  L.loop(dt => { ph += dt * calc().I * 16; });
  L.draw((c, W, H, K) => {
    const o = calc(), v = W < 560, cw = v ? W : W * .48, ch = v ? H * .44 : H;
    const x0 = Math.max(58, cw * .2), x1 = cw - 70, y0 = 44, y1 = ch - 30, ym = (y0 + y1) / 2, w = x1 - x0, h = y1 - y0, per = 2 * (w + h), nd = Math.floor(per / 30);
    c.strokeStyle = K.ink; c.lineWidth = 2; c.strokeRect(x0, y0, w, h);
    const pos = d => { d = ((d % per) + per) % per; if (d < w) return [x0 + d, y0]; d -= w; if (d < h) return [x1, y0 + d]; d -= h; if (d < w) return [x1 - d, y1]; d -= w; return [x0, y1 - d]; };
    for (let q = 0; q < nd; q++) { const pt = pos(q * per / nd + ph); G.dot(c, pt[0], pt[1], 3, K.c2); }
    /* sel + rintangan dalam */
    c.fillStyle = K.bg; c.fillRect(x0 - 16, ym - 34, 32, 72); c.save(); c.setLineDash([4, 3]); c.strokeStyle = K.mut; c.lineWidth = 1; c.strokeRect(x0 - 18, ym - 38, 36, 80); c.restore();
    G.line(c, x0, ym - 38, x0, ym - 22, K.ink, 2); G.line(c, x0 - 12, ym - 22, x0 + 12, ym - 22, K.ink, 2); G.line(c, x0 - 6, ym - 14, x0 + 6, ym - 14, K.ink, 4.5); G.line(c, x0, ym - 14, x0, ym, K.ink, 2);
    c.strokeStyle = K.ink; c.lineWidth = 2; c.strokeRect(x0 - 6, ym, 12, 28); G.line(c, x0, ym + 28, x0, ym + 42, K.ink, 2);
    G.text(c, 'ε', x0 - 26, ym - 18, K.ink, 'right', 14, 700); G.text(c, 'r', x0 - 26, ym + 14, K.ink, 'right', 14, 700); G.text(c, '+', x0 + 20, ym - 26, K.mut, 'center', 12, 700);
    /* perintang luar */
    c.fillStyle = K.bg; c.fillRect(x1 - 9, ym - 24, 18, 48); c.save(); c.globalAlpha = Math.min(.85, o.P / 14); c.fillStyle = K.c2; c.fillRect(x1 - 9, ym - 24, 18, 48); c.restore();
    c.strokeStyle = K.ink; c.lineWidth = 2; c.strokeRect(x1 - 9, ym - 24, 18, 48); G.text(c, 'R', x1 - 20, ym, K.ink, 'right', 14, 700);
    /* ammeter dan voltmeter */
    const mtr = (x, y, t) => { c.beginPath(); c.arc(x, y, 13, 0, 7); c.fillStyle = K.bg; c.fill(); c.strokeStyle = K.ink; c.lineWidth = 2; c.stroke(); G.text(c, t, x, y + .5, K.ink, 'center', 13, 700); };
    mtr((x0 + x1) / 2, y0, 'A'); G.text(c, f(o.I) + ' A', (x0 + x1) / 2, y0 - 24, K.a, 'center', 13, 700);
    c.strokeStyle = K.ink; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x1, ym - 36); c.lineTo(x1 + 38, ym - 36); c.lineTo(x1 + 38, ym + 36); c.lineTo(x1, ym + 36); c.stroke();
    mtr(x1 + 38, ym, 'V'); G.text(c, f(o.V) + ' V', x1 + 38, ym + 52, K.a, 'center', 13, 700);
    /* graf V melawan I */
    const gb = v ? G.box(0, ch, W, H - ch) : G.box(cw, 4, W - cw, H - 4), xm = Math.max(1, Math.ceil(o.I * 1.5));
    const Pl = G.plot(c, K, gb, { x: [0, xm], y: [0, 12], xl: 'I / A', yl: 'V / V', yt: [0, 3, 6, 9, 12] });
    const xe = r.v ? Math.min(xm, E.v / r.v) : xm;
    G.line(c, Pl.X(0), Pl.Y(E.v), Pl.X(xe), Pl.Y(E.v - xe * r.v), K.a, 2.5);
    G.line(c, Pl.X(o.I), Pl.Y(o.V), Pl.X(o.I), Pl.Y(0), K.c2, 1, [3, 3]); G.line(c, Pl.X(0), Pl.Y(o.V), Pl.X(o.I), Pl.Y(o.V), K.c2, 1, [3, 3]); G.dot(c, Pl.X(o.I), Pl.Y(o.V), 5.5, K.c2);
    G.dot(c, Pl.X(0), Pl.Y(E.v), 4, K.a); G.text(c, 'pintasan = ε', Pl.X(0) + 8, Pl.Y(E.v) - 10, K.a, 'left', 11.5, 700);
    G.text(c, 'kecerunan = −r', gb.x + gb.w, gb.y - 13, K.mut, 'right', 11.5, 600);
  });
  return L;
}
SIMS['t5-b3'] = simLitar;

/* ================= T5 Bab 4: transformer ================= */
function simTransformer(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? .82 : .48, alt: 'Transformer dengan gegelung primer, gegelung sekunder dan bentuk gelombang voltan' }); let ph = 0;
  const Vp = L.slider({ id: 'vp', label: 'Voltan primer, <i>V</i><sub>P</sub>', min: 10, max: 240, step: 10, val: 240, unit: 'V' });
  const Np = L.slider({ id: 'np', label: 'Lilitan primer, <i>N</i><sub>P</sub>', min: 100, max: 2000, step: 100, val: 2000 });
  const Ns = L.slider({ id: 'ns', label: 'Lilitan sekunder, <i>N</i><sub>S</sub>', min: 100, max: 2000, step: 100, val: 100 });
  const Rl = L.slider({ id: 'rl', label: 'Rintangan beban, <i>R</i>', min: 2, max: 100, step: 2, val: 4, unit: 'Ω' });
  const row = L.row(); L.playBtn(row);
  const R = L.reads(['Voltan sekunder, V<sub>S</sub>', 'Jenis transformer', 'Arus sekunder, I<sub>S</sub>', 'Arus primer, I<sub>P</sub> (unggul)']);
  const calc = () => { const Vs = Vp.v * Ns.v / Np.v, Is = Vs / Rl.v; return { Vs, Is, Ip: Vs * Is / Vp.v }; };
  L.changed = () => { const o = calc(); R([f(o.Vs, 1) + ' V', Ns.v > Np.v ? 'Injak naik' : Ns.v < Np.v ? 'Injak turun' : 'Nisbah 1 : 1', f(o.Is) + ' A', f(o.Ip) + ' A']); }; L.changed();
  L.loop(dt => { ph += dt * 4; });
  L.draw((c, W, H, K) => {
    const o = calc(), cw = Math.min(W * .4, 230), chh = H * .56, cx = W / 2, cy = H * .5, x0 = cx - cw / 2, y0 = cy - chh / 2, tk = Math.max(14, cw * .13);
    c.strokeStyle = K.mut; c.lineWidth = tk; c.strokeRect(x0 + tk / 2, y0 + tk / 2, cw - tk, chh - tk);
    c.save(); c.setLineDash([6, 8]); c.lineDashOffset = -Math.sin(ph) * 14; c.strokeStyle = K.bg; c.lineWidth = 2; c.strokeRect(x0 + tk / 2, y0 + tk / 2, cw - tk, chh - tk); c.restore();
    const coil = (x, n, s) => { const top = y0 + tk + 6, hg = chh - 2 * tk - 12; for (let q = 0; q < n; q++) { c.beginPath(); c.ellipse(x, top + hg * (q + .5) / n, tk * .95, Math.min(4, hg / n * .4), 0, 0, 7); c.strokeStyle = s; c.lineWidth = 2; c.stroke(); } };
    coil(x0 + tk / 2, Math.round(Np.v / 100), K.a); coil(x0 + cw - tk / 2, Math.round(Ns.v / 100), K.c2);
    G.text(c, 'Primer', x0 + tk / 2, y0 - 27, K.a, 'center', 12.5, 700); G.text(c, Np.v + ' lilitan', x0 + tk / 2, y0 - 12, K.a, 'center', 11.5, 600);
    G.text(c, 'Sekunder', x0 + cw - tk / 2, y0 - 27, K.c2, 'center', 12.5, 700); G.text(c, Ns.v + ' lilitan', x0 + cw - tk / 2, y0 - 12, K.c2, 'center', 11.5, 600);
    G.text(c, 'teras besi lembut berlamina', cx, y0 + chh + 13, K.mut, 'center', 11, 600);
    const wave = (xa, xb, Vv, s, l1) => {
      if (xb - xa < 30) return; const amp = H * .2 * Vv / Math.max(Vp.v, o.Vs), pts = [];
      for (let x = xa; x <= xb; x += 2) pts.push([x, cy - amp * Math.sin((x - xa) * .1 - ph)]);
      G.line(c, xa, cy, xb, cy, K.mut, 1, [3, 4]); G.curve(c, pts, s, 2.2);
      G.text(c, l1, (xa + xb) / 2, cy + H * .2 + 16, s, 'center', 13, 700);
    };
    wave(8, x0 - tk - 6, Vp.v, K.a, Vp.v + ' V'); wave(x0 + cw + tk + 6, W - 8, o.Vs, K.c2, f(o.Vs, 1) + ' V');
  });
  return L;
}
SIMS['t5-b4'] = simTransformer;

/* ================= T5 Bab 5: rektifikasi ================= */
function simRekt(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? .98 : .5, alt: 'Bentuk gelombang input arus ulang-alik dan output selepas rektifikasi' }); let ph = 0;
  const md = L.chips({ label: 'Rektifikasi', opts: [['h', 'Gelombang separuh'], ['f', 'Gelombang penuh']], val: 'h' });
  const cap = L.check({ id: 'cap', label: 'Sambung kapasitor perata' });
  const cs = L.slider({ id: 'c', label: 'Kapasitans kapasitor', min: 1, max: 10, step: 1, val: 4, fmt: v => v < 4 ? 'kecil' : v < 8 ? 'sederhana' : 'besar' });
  const row = L.row(); L.playBtn(row);
  const R = L.reads(['Bilangan diod', 'Jenis arus output', 'Bentuk output']);
  L.changed = () => R([md.v === 'h' ? '1' : '4 (tetimbang)', 'Arus terus, satu arah', cap.v ? 'Dilicinkan oleh kapasitor' : md.v === 'h' ? 'Separuh kitar positif sahaja' : 'Kedua-dua separuh kitar']); L.changed();
  L.loop(dt => { ph += dt * 2.2; });
  L.draw((c, W, H, K) => {
    const bl = ['Bekalan a.u.', md.v === 'h' ? '1 diod' : '4 diod'].concat(cap.v ? ['Kapasitor'] : [], ['Beban R']);
    const bw = Math.min(118, (W - 20 - (bl.length - 1) * 18) / bl.length), tot = bl.length * bw + (bl.length - 1) * 18; let bx = (W - tot) / 2;
    bl.forEach((t, q) => {
      const hot = q === 1 || t === 'Kapasitor'; c.fillStyle = hot ? K.soft : K.bg; c.strokeStyle = hot ? K.a : K.ink; c.lineWidth = 1.5; c.fillRect(bx, 10, bw, 30); c.strokeRect(bx, 10, bw, 30);
      G.text(c, t, bx + bw / 2, 25.5, hot ? K.a : K.ink, 'center', bw < 86 ? 10.5 : 12, 600);
      if (q < bl.length - 1) G.arrow(c, bx + bw + 2, 25, bx + bw + 16, 25, K.ink, 1.5); bx += bw + 18;
    });
    const top = 48, gh = (H - top) / 2, b1 = G.box(0, top, W, gh + 14), b2 = G.box(0, top + gh, W, gh);
    const P1 = G.plot(c, K, b1, { x: [0, 4], y: [-1.15, 1.15], yl: 'Voltan input', xt: [], yt: [-1, 0, 1] });
    const P2 = G.plot(c, K, b2, { x: [0, 4], y: [-1.15, 1.15], yl: 'Voltan output merentasi beban', xl: 'masa', xt: [], yt: [-1, 0, 1] });
    const vin = x => Math.sin(2 * Math.PI * x - ph), rect = x => md.v === 'h' ? Math.max(0, vin(x)) : Math.abs(vin(x));
    const a = [], b = [], d = [], tau = .22 * cs.v; let vc = 0;
    for (let q = -300; q <= 400; q++) { const x = q / 100, rr = rect(x); vc = cap.v ? Math.max(rr, vc * Math.exp(-.01 / tau)) : rr; if (q >= 0) { a.push([P1.X(x), P1.Y(vin(x))]); b.push([P2.X(x), P2.Y(vc)]); d.push([P2.X(x), P2.Y(rr)]); } }
    G.curve(c, a, K.a, 2.2); if (cap.v) G.curve(c, d, K.mut, 1.2, [3, 4]); G.curve(c, b, K.c2, 2.6);
  });
  return L;
}
SIMS['t5-b5'] = simRekt;

/* ================= T5 Bab 6: reputan radioaktif ================= */
function simReput(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? 1.22 : .5, alt: 'Grid 400 nukleus yang mereput secara rawak dan lengkung reputan' }), N0 = 400; let t, alive, hist;
  const reset = () => { t = 0; alive = new Uint8Array(N0).fill(1); hist = [[0, N0]]; };
  reset();
  const Th = L.slider({ id: 'th', label: 'Separuh hayat, <i>T</i><sub>½</sub>', min: 1, max: 10, step: 1, val: 4, unit: 's', on: reset });
  const row = L.row(); L.playBtn(row, reset);
  const R = L.reads(['Masa, t', 'Nukleus belum mereput, N', 'Peratus yang tinggal', 'Bilangan separuh hayat, t / T<sub>½</sub>']);
  const count = () => { let n = 0; for (let q = 0; q < N0; q++) n += alive[q]; return n; };
  L.onPlay = () => { if (t >= 5 * Th.v) reset(); };
  L.loop(dt => {
    const end = 5 * Th.v; if (t >= end) { L.setPlay(false); return; }
    t = Math.min(end, t + dt); const pr = 1 - Math.pow(.5, dt / Th.v);
    for (let q = 0; q < N0; q++) if (alive[q] && Math.random() < pr) alive[q] = 0;
    hist.push([t, count()]);
  });
  L.draw((c, W, H, K) => {
    const n = count(); R([f(t, 1) + ' s', String(n), f(n / N0 * 100, 1) + ' %', f(t / Th.v)]);
    const v = W < 560, gs = v ? Math.min(W - 60, H * .4) : Math.min(W * .4 - 30, H - 56), gx = v ? (W - gs) / 2 : 22, gy = v ? 12 : (H - gs) / 2 - 8, cell = gs / 20;
    for (let q = 0; q < N0; q++) G.dot(c, gx + (q % 20) * cell + cell / 2, gy + Math.floor(q / 20) * cell + cell / 2, cell * .36, alive[q] ? K.a : K.line);
    if (!v) { G.dot(c, gx + 5, gy + gs + 14, 4, K.a); G.text(c, 'belum mereput', gx + 14, gy + gs + 14, K.mut, 'left', 11.5, 600); G.dot(c, gx + 112, gy + gs + 14, 4, K.line); G.text(c, 'telah mereput', gx + 121, gy + gs + 14, K.mut, 'left', 11.5, 600); }
    const gb = v ? G.box(0, gy + gs + 6, W, H - gy - gs - 6) : G.box(W * .4, 4, W * .6, H - 4);
    const P = G.plot(c, K, gb, { x: [0, 5], y: [0, N0], xl: 'Masa', yl: 'Bilangan nukleus belum mereput, N', xt: [0, 1, 2, 3, 4, 5], xf: x => x ? (x > 1 ? x : '') + 'T½' : '0', yt: [0, 100, 200, 300, 400] });
    const th = []; for (let x = 0; x <= 5.001; x += .05) th.push([P.X(x), P.Y(N0 * Math.pow(.5, x))]); G.curve(c, th, K.mut, 1.3, [4, 4]);
    [1, 2, 3].forEach(q => { const y = P.Y(N0 / 2 ** q); G.line(c, P.X(0), y, P.X(q), y, K.c3, 1, [2, 3]); G.line(c, P.X(q), y, P.X(q), P.Y(0), K.c3, 1, [2, 3]); });
    G.curve(c, hist.map(hh => [P.X(hh[0] / Th.v), P.Y(hh[1])]), K.c2, 2.5);
    G.text(c, 'garis putus-putus: ramalan teori', gb.x + gb.w - 4, gb.y + 11, K.mut, 'right', 11);
  });
  return L;
}
SIMS['t5-b6'] = simReput;

/* ================= T5 Bab 7: kesan fotoelektrik ================= */
function spec(l) {
  if (l < 380 || l > 750) return null; let r = 0, g = 0, b = 0;
  if (l < 440) { r = (440 - l) / 60 * .7; b = 1; } else if (l < 490) { g = (l - 440) / 50; b = 1; } else if (l < 510) { g = 1; b = (510 - l) / 20; }
  else if (l < 580) { r = (l - 510) / 70; g = 1; } else if (l < 645) { r = 1; g = (645 - l) / 65; } else r = 1;
  return 'rgb(' + Math.round(r * 232) + ',' + Math.round(g * 190) + ',' + Math.round(b * 235) + ')';
}
function simFoto(host, id) {
  const L = Lab(host, id, { r: w => w < 560 ? 1.18 : .5, alt: 'Cahaya menyinari permukaan logam dan memancarkan fotoelektron, dengan graf tenaga kinetik maksimum melawan frekuensi' }), h = 6.63e-34, eV = 1.6e-19; let ph = 0, es = [];
  const NAMA = { '2.14': 'sesium', '2.28': 'natrium', '4.31': 'zink' };
  const mt = L.chips({ label: 'Logam', opts: [['2.14', 'Sesium'], ['2.28', 'Natrium'], ['4.31', 'Zink']], val: '2.28', on: () => { es = []; } });
  const lam = L.slider({ id: 'lam', label: 'Panjang gelombang cahaya, <i>λ</i>', min: 150, max: 750, step: 10, val: 400, unit: 'nm', on: () => { es = []; } });
  const it = L.slider({ id: 'it', label: 'Keamatan cahaya', min: 1, max: 10, step: 1, val: 5 });
  const R = L.reads(['Frekuensi cahaya, f', 'Tenaga foton, hf', 'Fungsi kerja logam, W', 'K<sub>maks</sub> = hf − W']);
  const calc = () => { const fr = 3e8 / (lam.v * 1e-9), E = h * fr / eV, W = +mt.v; return { fr, E, W, K: E - W }; };
  L.changed = () => { const o = calc(); R([sci(o.fr) + ' Hz', f(o.E) + ' eV', f(o.W) + ' eV', o.K > 0 ? f(o.K) + ' eV' : 'Tiada fotoelektron']); }; L.changed();
  const smooth = L.playing; L.playing = true;
  L.loop(dt => {
    if (!smooth) return; ph += dt * 6; const o = calc();
    if (o.K > 0 && Math.random() < dt * it.v * 2.4) es.push({ x: Math.random(), vx: (Math.random() - .35) * .6, sp: 55 + 85 * Math.sqrt(o.K), t: 0 });
    es.forEach(e => { e.t += dt; }); es = es.filter(e => e.t < 5);
  });
  L.draw((c, W, H, K) => {
    const o = calc(), v = W < 560, pw = v ? W : W * .46, hh = v ? H * .42 : H, px = pw * .14, pd = pw * .72, pt = hh - 46;
    const s = spec(lam.v), colr = s || K.c4, nb = 2 + Math.round(it.v / 2.5);
    for (let q = 0; q < nb; q++) {
      const tx = px + pd * (q + .5) / nb, sx = tx - hh * .3, dx = tx - sx, dy = pt - 16, ln = Math.hypot(dx, dy), nx = -dy / ln, ny = dx / ln, cyc = 3 + (750 - lam.v) / 55, pts = [];
      for (let u = 0; u <= 1.001; u += .01) { const wb = 4 * Math.sin(2 * Math.PI * cyc * u - ph) * Math.min(1, (1 - u) * 12); pts.push([sx + dx * u + nx * wb, 16 + dy * u + ny * wb]); }
      G.curve(c, pts, colr, 2, s ? null : [5, 3]);
    }
    G.text(c, s ? 'cahaya nampak' : 'sinaran ultraungu', Math.max(6, px - hh * .3) + 4, 10, colr, 'left', 11.5, 700);
    c.fillStyle = K.mut; c.fillRect(px, pt, pd, 16); G.text(c, 'Permukaan logam ' + NAMA[mt.v], px + pd / 2, pt + 30, K.ink, 'center', 12, 600);
    if (o.K > 0) {
      if (smooth) es.forEach(e => { const y = pt - e.sp * e.t, x = px + e.x * pd + e.vx * e.sp * e.t; if (y > 6 && x > 2 && x < pw - 2) G.dot(c, x, y, 3.6, K.a); });
      else [.25, .5, .75].forEach(u => G.arrow(c, px + pd * u, pt - 4, px + pd * u + 10, pt - 30 - 20 * Math.sqrt(o.K), K.a, 2));
      G.text(c, 'fotoelektron', pw - 8, pt - 14, K.a, 'right', 11.5, 700);
    } else G.text(c, 'hf < W: tiada fotoelektron', px + pd / 2, pt - 16, K.c2, 'center', 12.5, 700);
    const gb = v ? G.box(0, hh + 4, W, H - hh - 4) : G.box(pw, 4, W - pw, H - 4), f0 = o.W * eV / h / 1e14, sl = h * 1e14 / eV;
    const P = G.plot(c, K, gb, { x: [0, 20], y: [0, 6], xl: 'f / 10¹⁴ Hz', yl: 'Kmaks / eV', xt: [0, 5, 10, 15, 20], yt: [0, 2, 4, 6] });
    c.save(); c.beginPath(); c.rect(gb.x, gb.y, gb.w, gb.h + 2); c.clip(); G.line(c, P.X(f0), P.Y(0), P.X(20), P.Y((20 - f0) * sl), K.a, 2.5); c.restore();
    G.line(c, P.X(f0), P.Y(0) - 5, P.X(f0), P.Y(0) + 5, K.a, 2); G.text(c, 'f₀', P.X(f0), P.Y(0) - 14, K.a, 'center', 12.5, 700);
    const fx = o.fr / 1e14, ky = Math.max(0, o.K);
    G.line(c, P.X(fx), P.Y(ky), P.X(fx), P.Y(0), K.c2, 1, [3, 3]); G.dot(c, P.X(fx), P.Y(Math.min(6, ky)), 5.5, K.c2);
    G.text(c, 'kecerunan = h', gb.x + gb.w, gb.y - 13, K.mut, 'right', 11.5, 600);
  });
  return L;
}
SIMS['t5-b7'] = simFoto;
