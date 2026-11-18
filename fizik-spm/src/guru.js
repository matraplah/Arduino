'use strict';
/* ===== Halaman guru: kata laluan, pendaftaran murid, markah =====
   Kata laluan disimpan sebagai cincangan PBKDF2 (bukan teks asal) dalam tetapan/guru.
   Rekod murid: pelajar/<cincangan IC> = { ic, nama, kelas, didaftar, ...kemajuan } */
const ITER = 150000;
let stopGuru = null, guruToken = null;
try { guruToken = sessionStorage.getItem('fz:guru2') || null; } catch (e) { guruToken = null; }

async function kataCincang(kata, garam) {
  const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(kata), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: new TextEncoder().encode(garam), iterations: ITER }, k, 256);
  return [...new Uint8Array(bits)].map(x => x.toString(16).padStart(2, '0')).join('');
}
const garamBaru = () => [...crypto.getRandomValues(new Uint8Array(16))].map(x => x.toString(16).padStart(2, '0')).join('');
function setGuru(t) { guruToken = t || null; try { if (t) sessionStorage.setItem('fz:guru2', t); else sessionStorage.removeItem('fz:guru2'); } catch (e) { /* abaikan */ } }

function guruShell(isi, sub) {
  app.innerHTML = `<header class="ch-head"><div class="wrap" style="padding-bottom:20px">
      <a class="back" href="#utama">← Kandungan</a>
      <div class="ch-title"><div><div class="eb">Untuk guru</div><h1>Halaman guru</h1></div></div>
      <p class="ch-intro">${sub}</p>
    </div></header><div class="wrap"><div class="panel" id="guru">${isi}</div></div>
    <footer class="foot"><div class="wrap">Fizik SPM Interaktif · Halaman guru</div></footer>`;
  return document.getElementById('guru');
}

async function viewGuru() {
  const box = guruShell('<p class="lede">Memuatkan…</p>', 'Daftar murid, pantau markah dan kedudukan kelas.');
  const st = await API.guruStatus();
  if (st.salah) {
    box.innerHTML = `<p class="ralat">${esc(st.salah)}</p>` + (st.diag ? `<div class="kad"><h2 class="h-kecil">Semak tetapan Netlify</h2><ol class="rum">
      <li><span>Laman mesti di-deploy daripada <b>GitHub</b> (Add new site → Import an existing project), bukan dengan seret dan lepas fail.</span></li>
      <li><span>Site configuration → Build &amp; deploy → <b>Base directory</b> = <code>fizik-spm</code>, <b>Publish directory</b> = <code>fizik-spm/web</code>.</span></li>
      <li><span>Dalam senarai deploy terkini, bahagian <b>Functions</b> mesti menunjukkan fungsi <code>api</code>.</span></li>
      <li><span>Buka <code>${esc(location.origin)}/api/ping</code> dalam tab baharu. Jika betul, ia memaparkan “Pelayan Fizik SPM berfungsi”.</span></li></ol></div>` : '');
    return;
  }
  if (!st.ada) return st.jenis === 'claude' ? guruTetap(box) : (box.innerHTML = st.jenis === 'gas'
    ? '<p class="ralat">Kata laluan guru belum ditetapkan. Dalam Google Apps Script, buka Project Settings → Script properties dan tambah <b>GURU_KATA_LALUAN</b>.</p>'
    : '<p class="ralat">Kata laluan guru belum ditetapkan. Dalam Netlify, buka Site configuration → Environment variables dan tambah <b>GURU_KATA_LALUAN</b>, kemudian deploy semula.</p>');
  if (!guruToken) return guruMasuk(box);
  guruPapan(box);
}

/* kali pertama: guru menetapkan kata laluan */
function guruTetap(box) {
  box.innerHTML = `<form class="masuk" id="g-f" novalidate>
      <h2>Tetapkan kata laluan guru</h2>
      <p class="q-hint">Kata laluan belum ditetapkan. Tetapkan sekarang, sebelum laman dikongsi kepada murid. Kata laluan disimpan dalam bentuk cincangan, bukan teks asal.</p>
      <label for="g-k1">Kata laluan baharu (sekurang-kurangnya 8 aksara)</label><input id="g-k1" type="password" autocomplete="new-password">
      <label for="g-k2">Taip semula kata laluan</label><input id="g-k2" type="password" autocomplete="new-password">
      <p class="ralat" id="g-r" role="alert"></p>
      <div class="row"><button type="submit" class="btn" id="g-b">Simpan kata laluan</button></div></form>`;
  const f = box.querySelector('#g-f'), r = box.querySelector('#g-r'), b = box.querySelector('#g-b');
  f.onsubmit = async e => {
    e.preventDefault(); r.textContent = '';
    const k1 = box.querySelector('#g-k1').value, k2 = box.querySelector('#g-k2').value;
    if (k1.length < 8) { r.textContent = 'Kata laluan mesti sekurang-kurangnya 8 aksara.'; return; }
    if (k1 !== k2) { r.textContent = 'Kedua-dua kata laluan tidak sama.'; return; }
    b.disabled = true;
    try {
      const r = await API.guruTetap(k1);
      if (r.salah) { return void (box.querySelector('#g-r').textContent = r.salah); }
      setGuru(r.token); toast('Kata laluan disimpan', 'naik'); guruPapan(box);
    } catch (err) { box.querySelector('#g-r').textContent = 'Gagal menyimpan. Hanya pemilik atau Editor laman boleh menetapkan kata laluan.'; }
    finally { b.disabled = false; }
  };
}

function guruMasuk(box) {
  box.innerHTML = `<form class="masuk" id="g-f" novalidate>
      <h2>Log masuk guru</h2>
      <label for="g-k">Kata laluan</label><input id="g-k" type="password" autocomplete="current-password">
      <p class="ralat" id="g-r" role="alert"></p>
      <div class="row"><button type="submit" class="btn" id="g-b">Log masuk</button></div></form>`;
  const f = box.querySelector('#g-f'), r = box.querySelector('#g-r'), b = box.querySelector('#g-b'), k = box.querySelector('#g-k');
  f.onsubmit = async e => {
    e.preventDefault(); r.textContent = ''; b.disabled = true; b.textContent = 'Menyemak…';
    try {
      const res = await API.guruMasuk(k.value);
      if (res.token) { setGuru(res.token); guruPapan(box); }
      else { r.textContent = res.salah || 'Kata laluan salah.'; k.select(); }
    } finally { b.disabled = false; b.textContent = 'Log masuk'; }
  };
  k.focus();
}

/* rekod murid baharu / kemas kini nama & kelas (kemajuan tidak disentuh) */
async function daftarMuridDb(icMentah, nama, kelas) {
  const ic = icBersih(icMentah), salah = icSah(ic);
  if (salah) throw new Error(salah);
  nama = String(nama || '').trim().replace(/\s+/g, ' '); kelas = String(kelas || '').trim().toUpperCase().replace(/\s+/g, ' ');
  if (nama.length < 3) throw new Error('Nama terlalu pendek.');
  if (!kelas) throw new Error('Kelas mesti diisi.');
  const hash = await icCincang(ic), ref = DB.doc('pelajar/' + hash), cur = await ref.get();
  if (cur.exists) { await ref.update({ ic, nama, kelas }); return 'kemas'; }
  await ref.set({ ic, nama, kelas, didaftar: Date.now(), jaw: {}, streak: { now: 0, best: 0 }, lencana: [], jumlah: 0, peratusMarkah: 0, kemajuan: 0, babTamat: 0, kemaskini: null });
  return 'baru';
}

function guruPapan(box) {
  if (stopGuru) { stopGuru(); stopGuru = null; }
  box.innerHTML = `
    <div class="row g-atas"><span class="q-hint">Anda log masuk sebagai guru.</span><button type="button" class="btn ghost" id="g-tukar">Tukar kata laluan</button><button type="button" class="btn ghost" id="g-keluar">Log keluar guru</button></div>
    <section class="g-kad"><h2>Daftar murid</h2>
      <form class="g-daftar" id="g-d" novalidate>
        <div><label for="d-ic">No. kad pengenalan</label><input id="d-ic" inputmode="numeric" maxlength="14" placeholder="080512-10-1234" autocomplete="off"></div>
        <div><label for="d-nama">Nama penuh</label><input id="d-nama" maxlength="80" autocomplete="off"></div>
        <div><label for="d-kelas">Kelas</label><input id="d-kelas" maxlength="20" placeholder="5 SAINS 1" list="senarai-kelas" autocomplete="off"><datalist id="senarai-kelas"></datalist></div>
        <div class="g-btn"><button type="submit" class="btn">Daftar</button></div>
      </form>
      <p class="ralat" id="d-r" role="alert"></p>
      <details class="g-pukal"><summary>Daftar ramai murid sekali gus</summary>
        <p class="q-hint">Tampal satu murid setiap baris dalam format <b>No IC, Nama, Kelas</b>. Boleh disalin terus daripada Excel atau Google Sheets (tiga lajur).</p>
        <textarea id="p-teks" rows="6" placeholder="080512-10-1234, Aminah binti Ahmad, 5 SAINS 1&#10;080733-01-5678, Badrul bin Hassan, 5 SAINS 1"></textarea>
        <div class="row"><button type="button" class="btn" id="p-b">Daftar semua</button><span class="q-hint" id="p-st"></span></div>
        <ul class="p-ralat" id="p-r"></ul>
      </details>
    </section>
    <section class="g-kad"><div class="row g-tajuk"><h2>Senarai murid</h2><span class="q-hint" id="g-bil"></span></div>
      <div class="row g-tapis"><label for="g-kls">Kelas</label><select id="g-kls"><option value="">Semua kelas</option></select><input id="g-cari" placeholder="Cari nama atau IC" aria-label="Cari nama atau IC"><button type="button" class="btn ghost" id="g-salin">Salin sebagai jadual</button></div>
      <div id="g-ringkas"></div>
      <div class="scroll"><table class="rumus guru"><thead><tr><th>Kedudukan</th><th>No. IC</th><th>Nama</th><th>Kelas</th><th>Markah</th><th>Kemajuan</th><th>Aktiviti terakhir</th><th></th></tr></thead><tbody id="g-tb"><tr><td colspan="8">Memuatkan…</td></tr></tbody></table></div>
    </section>`;

  box.querySelector('#g-keluar').onclick = () => { API.guruKeluar(); setGuru(null); if (stopGuru) { stopGuru(); stopGuru = null; } toast('Log keluar guru', 'no'); route(); };
  box.querySelector('#g-tukar').onclick = () => guruTukar(box);
  const dic = box.querySelector('#d-ic'); dic.oninput = () => { dic.value = icFormat(dic.value); };

  const dr = box.querySelector('#d-r');
  box.querySelector('#g-d').onsubmit = async e => {
    e.preventDefault(); dr.textContent = '';
    const bt = e.target.querySelector('button'); bt.disabled = true;
    try {
      const st = await API.guruDaftar(dic.value, box.querySelector('#d-nama').value, box.querySelector('#d-kelas').value);
      toast(st === 'baru' ? 'Murid didaftarkan' : 'Maklumat murid dikemas kini', 'ok'); segar();
      dic.value = ''; box.querySelector('#d-nama').value = ''; dic.focus();
    } catch (err) { dr.textContent = err.message || 'Gagal mendaftar.'; }
    finally { bt.disabled = false; }
  };

  box.querySelector('#p-b').onclick = async () => {
    const pb = box.querySelector('#p-b'), st = box.querySelector('#p-st'), pr = box.querySelector('#p-r');
    const baris = box.querySelector('#p-teks').value.split(/\r?\n/).map(x => x.trim()).filter(Boolean);
    if (!baris.length) { st.textContent = 'Tiada data untuk didaftarkan.'; return; }
    pb.disabled = true; pr.innerHTML = ''; let ok = 0, gagal = 0;
    for (let i = 0; i < baris.length; i++) {
      const c = baris[i].split(/\t|;|,/).map(x => x.trim());
      st.textContent = `Mendaftar ${i + 1}/${baris.length}…`;
      try {
        if (c.length < 3) throw new Error('perlu tiga lajur: No IC, Nama, Kelas');
        await API.guruDaftar(c[0], c.slice(1, c.length - 1).join(', '), c[c.length - 1]); ok++;
      } catch (err) { gagal++; pr.append(el('li', null, `Baris ${i + 1} (${esc(baris[i].slice(0, 40))}): ${esc(err.message || 'gagal')}`)); }
    }
    st.textContent = `${ok} berjaya, ${gagal} gagal.`; pb.disabled = false;
    if (!gagal) box.querySelector('#p-teks').value = '';
    toast(`${ok} murid didaftarkan`, ok ? 'ok' : 'no'); segar();
  };

  let rows = [], segar = () => {};
  const kls = box.querySelector('#g-kls'), cari = box.querySelector('#g-cari'), tb = box.querySelector('#g-tb');
  const tapis = () => { const k = kls.value, q = cari.value.trim().toLowerCase().replace(/-/g, ''); return rows.filter(r => (!k || r.kelas === k) && (!q || (r.nama || '').toLowerCase().includes(q) || String(r.ic || '').includes(q))); };
  const lukis = () => {
    const v = tapis();
    box.querySelector('#g-bil').textContent = `${rows.length} murid berdaftar${kls.value || cari.value ? ` · ${v.length} dipaparkan` : ''}`;
    const purata = v.length ? Math.round(v.reduce((n, r) => n + (+r.peratusMarkah || 0), 0) / v.length) : 0;
    const aktif = v.filter(r => r.kemaskini).length;
    box.querySelector('#g-ringkas').innerHTML = v.length ? `<dl class="g-sum"><div><dt>Murid</dt><dd class="num">${v.length}</dd></div><div><dt>Sudah mula</dt><dd class="num">${aktif}</dd></div><div><dt>Purata markah</dt><dd class="num">${purata}%</dd></div><div><dt>Purata kemajuan</dt><dd class="num">${Math.round(v.reduce((n, r) => n + (+r.kemajuan || 0), 0) / v.length)}%</dd></div></dl>` : '';
    tb.innerHTML = v.length ? v.map((r, i) => `<tr class="${r.kedudukan <= 3 && r.jumlah > 0 ? 'k' + r.kedudukan : ''}"><td class="num"><b>#${r.kedudukan}</b></td><td class="num nw">${esc(icFormat(r.ic || ''))}</td><td>${esc(r.nama || '')} ${gelaranHtml(r.gelaran)}</td><td class="nw">${esc(r.kelas || '')}</td>
      <td class="num"><b>${+r.peratusMarkah || 0}%</b><small>${+r.jumlah || 0} mata</small></td>
      <td><div class="g-pr"><i style="width:${Math.min(100, +r.kemajuan || 0)}%"></i></div><small class="num">${+r.kemajuan || 0}% dijawab · ${+r.babTamat || 0}/${BAB.length} bab</small></td>
      <td class="num kecil">${r.kemaskini ? new Date(r.kemaskini).toLocaleString('ms-MY', { dateStyle: 'short', timeStyle: 'short' }) : '<span class="q-hint">Belum mula</span>'}</td>
      <td class="g-aksi"><button type="button" class="lnk" data-act="sifar" data-id="${esc(r.id)}">Set semula</button> <button type="button" class="lnk" data-act="padam" data-id="${esc(r.id)}">Padam</button></td></tr>`).join('')
      : `<tr><td colspan="8">${rows.length ? 'Tiada murid sepadan dengan carian.' : 'Belum ada murid berdaftar. Daftar murid menggunakan borang di atas.'}</td></tr>`;
    tb.querySelectorAll('button[data-act]').forEach(b => b.onclick = async () => {
      if (!b.dataset.sure) { b.dataset.sure = '1'; b.textContent = b.dataset.act === 'padam' ? 'Sahkan padam' : 'Sahkan set semula'; b.classList.add('bahaya'); return; }
      const r = rows.find(x => x.id === b.dataset.id); if (!r) return;
      try {
        if (b.dataset.act === 'padam') { await API.guruPadam(r); toast('Murid dipadam', 'no'); }
        else { await API.guruSifar(r); toast('Markah murid diset semula', 'no'); }
        API.jenis().then(j => { if (pelayan(j)) segar(); });
      } catch (e) { toast('Gagal. Cuba lagi.', 'no'); }
    });
  };
  kls.onchange = lukis; cari.oninput = lukis;
  box.querySelector('#g-salin').onclick = async () => {
    const v = tapis(), head = ['No IC', 'Nama', 'Kelas', 'Mata', 'Markah (%)', 'Kemajuan (%)', 'Bab tamat', 'Aktiviti terakhir'];
    const txt = [head].concat(v.map(r => [r.kedudukan, icFormat(r.ic || ''), r.nama, r.kelas, r.gelaran || '', +r.jumlah || 0, +r.peratusMarkah || 0, +r.kemajuan || 0, (+r.babTamat || 0) + '/' + BAB.length, r.kemaskini ? new Date(r.kemaskini).toLocaleString('ms-MY') : ''])).map(x => x.join('\t')).join('\n');
    try { await navigator.clipboard.writeText(txt); toast('Jadual disalin. Tampal dalam Excel atau Sheets.', 'ok'); }
    catch (e) { const ta = el('textarea', 'g-salin-ta'); ta.value = txt; box.querySelector('#g-ringkas').after(ta); ta.select(); toast('Tekan Ctrl+C untuk menyalin', 'no'); }
  };

  let pemasa = setTimeout(() => { tb.innerHTML = '<tr><td colspan="8" class="ralat">Pelayan belum menjawab. Data mungkin belum terkini.</td></tr>'; }, 10000);
  const terima = (data, cache) => {
    if (pemasa && !cache) { clearTimeout(pemasa); pemasa = null; }
    const ikutKelas = {};
    data.forEach(r => { (ikutKelas[r.kelas] = ikutKelas[r.kelas] || []).push(r); });
    rows = [];
    Object.keys(ikutKelas).sort().forEach(k => { susunKedudukan(ikutKelas[k]).forEach(r => rows.push(r)); });
    const senarai = Object.keys(ikutKelas).filter(Boolean).sort();
    const pilih = kls.value;
    kls.innerHTML = '<option value="">Semua kelas</option>' + senarai.map(k => `<option${k === pilih ? ' selected' : ''}>${esc(k)}</option>`).join('');
    box.querySelector('#senarai-kelas').innerHTML = senarai.map(k => `<option value="${esc(k)}">`).join('');
    lukis();
  };
  const ralat = msg => { if (pemasa) { clearTimeout(pemasa); pemasa = null; } if (!guruToken) { route(); return; } tb.innerHTML = `<tr><td colspan="8" class="ralat">${esc(msg)}</td></tr>`; };
  stopGuru = API.guruLanggan(terima, ralat);
  segar = () => { if (stopGuru) stopGuru(); stopGuru = API.guruLanggan(terima, ralat); };
}

function guruTukar(box) {
  const d = el('form', 'masuk g-tukar', `<h2>Tukar kata laluan</h2>
    <label for="t-lama">Kata laluan semasa</label><input id="t-lama" type="password" autocomplete="current-password">
    <label for="t-k1">Kata laluan baharu (sekurang-kurangnya 8 aksara)</label><input id="t-k1" type="password" autocomplete="new-password">
    <label for="t-k2">Taip semula kata laluan baharu</label><input id="t-k2" type="password" autocomplete="new-password">
    <p class="ralat" id="t-r" role="alert"></p><div class="row"><button type="submit" class="btn">Simpan</button><button type="button" class="btn ghost" id="t-batal">Batal</button></div>`);
  d.noValidate = true;
  const atas = box.querySelector('.g-atas'); const lama = box.querySelector('.g-tukar'); if (lama) lama.remove();
  atas.after(d);
  d.querySelector('#t-batal').onclick = () => d.remove();
  d.onsubmit = async e => {
    e.preventDefault(); const r = d.querySelector('#t-r'); r.textContent = '';
    const k1 = d.querySelector('#t-k1').value;
    if (k1.length < 8) { r.textContent = 'Kata laluan mesti sekurang-kurangnya 8 aksara.'; return; }
    if (k1 !== d.querySelector('#t-k2').value) { r.textContent = 'Kedua-dua kata laluan baharu tidak sama.'; return; }
    try {
      const res = await API.guruTukar(d.querySelector('#t-lama').value, k1);
      if (res.salah) { r.textContent = res.salah; return; }
      d.remove(); toast('Kata laluan ditukar', 'ok');
    } catch (err) { r.textContent = 'Gagal menyimpan. Cuba lagi.'; }
  };
}
