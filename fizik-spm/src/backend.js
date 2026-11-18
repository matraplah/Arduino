'use strict';
/* ===== Sumber data =====
   'netlify' : pelayan sendiri di /api (Netlify Functions + Netlify Blobs). No. IC tidak pernah dihantar ke murid.
   'claude'  : pangkalan data artifak claude.ai (window.claude.use('db')).
   null      : tiada sumber data; log masuk tidak tersedia. */
const GELARAN_GAYA = { 'Juara Kelas': 'emas', 'Naib Juara': 'perak', 'Tempat Ketiga': 'gangsa', '10 Terbaik': 'biru' };
function gelaran(r, mata) { if (!(mata > 0)) return ''; return r === 1 ? 'Juara Kelas' : r === 2 ? 'Naib Juara' : r === 3 ? 'Tempat Ketiga' : r <= 10 ? '10 Terbaik' : ''; }
function susunKedudukan(rows) {
  const s = rows.slice().sort((a, b) => (b.jumlah || 0) - (a.jumlah || 0) || String(a.nama).localeCompare(String(b.nama)));
  let r = 0, prev = null;
  s.forEach((x, i) => { if (x.jumlah !== prev) { r = i + 1; prev = x.jumlah; } x.kedudukan = r; x.gelaran = gelaran(r, x.jumlah); });
  return s;
}
function gelaranHtml(g) { return g ? `<span class="gelaran ${GELARAN_GAYA[g] || ''}">${g === 'Juara Kelas' ? '♛ ' : ''}${g}</span>` : ''; }

let jenisSedia = null;
const API = {
  jenis() {
    if (jenisSedia) return jenisSedia;
    jenisSedia = (async () => {
      if (window.claude && window.claude.use) { await dbMula(); return DB ? 'claude' : null; }
      try { const r = await fetch('api/ping', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' }); const j = await r.json(); if (j && j.ok) return 'netlify'; } catch (e) { /* tiada pelayan */ }
      return null;
    })();
    return jenisSedia;
  },
  async post(laluan, body) {
    try {
      const r = await fetch('api/' + laluan, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body || {}) });
      const j = await r.json().catch(() => ({ ok: false, salah: 'Respons pelayan tidak sah.' }));
      if (!j.ok && r.status === 401 && laluan.startsWith('guru/') && laluan !== 'guru/masuk') { setGuru(null); }
      return j;
    } catch (e) { return { ok: false, salah: 'Tidak dapat menghubungi pelayan. Semak sambungan internet.' }; }
  },
  tiada: 'Sistem log masuk tidak tersedia pada paparan ini.',

  /* ---------- murid ---------- */
  async muridMasuk(icMentah) {
    const ic = icBersih(icMentah), e = icSah(ic); if (e) return { salah: e };
    const j = await this.jenis();
    if (j === 'netlify') { const r = await this.post('murid/masuk', { ic }); return r.ok ? { token: r.token, profil: r.profil } : { salah: r.salah }; }
    if (j !== 'claude') return { salah: this.tiada };
    const hash = await icCincang(ic);
    try { const s = await DB.doc('pelajar/' + hash).get(); if (!s.exists) return { salah: 'No. IC ini belum didaftarkan. Sila minta guru mendaftarkan anda.' }; const d = s.data(); return { token: hash, profil: { ...d, ic4: String(d.ic || '').slice(-4) } }; }
    catch (err) { return { salah: 'Pangkalan data tidak dapat dihubungi. Cuba sebentar lagi.' }; }
  },
  async muridSaya(token) {
    const j = await this.jenis();
    if (j === 'netlify') { const r = await this.post('murid/saya', { token }); return r.ok ? r.profil : null; }
    if (j !== 'claude') return null;
    try { const s = await DB.doc('pelajar/' + token).get(); if (!s.exists) return null; const d = s.data(); return { ...d, ic4: String(d.ic || '').slice(-4) }; } catch (e) { return null; }
  },
  /* pulangkan profil terkini daripada pelayan (Netlify) atau null jika tiada perubahan pelayan */
  async muridSimpan(token, body) {
    const j = await this.jenis();
    if (j === 'netlify') { const r = await this.post('murid/simpan', { token, jaw: body.jaw, streak: body.streak, lencana: body.lencana }); if (!r.ok) throw new Error(r.salah); return r.profil; }
    if (j === 'claude') { await DB.doc('pelajar/' + token).update(body); return null; }
    throw new Error(this.tiada);
  },
  async kedudukan(token, kelas) {
    const j = await this.jenis();
    if (j === 'netlify') { const r = await this.post('kedudukan', { token }); return r.ok ? r.senarai : null; }
    if (j !== 'claude') return null;
    try {
      const snap = await DB.collection('pelajar').where('kelas', '==', kelas).get();
      return susunKedudukan(snap.docs.map(d => { const x = d.data(); return { nama: x.nama, jumlah: x.jumlah || 0, peratusMarkah: x.peratusMarkah || 0, kemajuan: x.kemajuan || 0, saya: d.id === token }; }));
    } catch (e) { return null; }
  },
  async muridKeluar(token) { if ((await this.jenis()) === 'netlify') this.post('keluar', { token }); },

  /* ---------- guru ---------- */
  async guruStatus() {
    const j = await this.jenis();
    if (j === 'netlify') { const r = await this.post('guru/status'); return r.ok ? { ada: r.ada, jenis: j } : { salah: r.salah }; }
    if (j !== 'claude') return { salah: 'Halaman guru memerlukan pelayan laman (Netlify) atau pangkalan data claude.ai.' };
    try { const s = await DB.doc('tetapan/guru').get(); return { ada: s.exists && !!s.data().hash, jenis: j }; } catch (e) { return { salah: 'Pangkalan data tidak dapat dihubungi. Muat semula halaman.' }; }
  },
  async guruTetap(kata) {
    if ((await this.jenis()) !== 'claude') return { salah: 'Pada Netlify, kata laluan pertama ditetapkan melalui pemboleh ubah GURU_KATA_LALUAN.' };
    const cur = await DB.doc('tetapan/guru').get();
    if (cur.exists && cur.data().hash) return { salah: 'Kata laluan sudah ditetapkan. Muat semula halaman.' };
    const garam = garamBaru();
    await DB.doc('tetapan/guru').set({ garam, hash: await kataCincang(kata, garam), iter: ITER, dikemaskini: Date.now() });
    return { token: 'claude' };
  },
  async guruMasuk(kata) {
    const j = await this.jenis();
    if (j === 'netlify') { const r = await this.post('guru/masuk', { kata }); return r.ok ? { token: r.token } : { salah: r.salah }; }
    const t = (await DB.doc('tetapan/guru').get()).data();
    return (await kataCincang(kata, t.garam)) === t.hash ? { token: 'claude' } : { salah: 'Kata laluan salah.' };
  },
  async guruTukar(lama, baru) {
    const j = await this.jenis();
    if (j === 'netlify') { const r = await this.post('guru/tukar', { token: guruToken, lama, baru }); return r.ok ? {} : { salah: r.salah }; }
    const t = (await DB.doc('tetapan/guru').get()).data();
    if ((await kataCincang(lama, t.garam)) !== t.hash) return { salah: 'Kata laluan semasa salah.' };
    const garam = garamBaru();
    await DB.doc('tetapan/guru').set({ garam, hash: await kataCincang(baru, garam), iter: ITER, dikemaskini: Date.now() });
    return {};
  },
  async guruDaftar(ic, nama, kelas) {
    const j = await this.jenis();
    if (j === 'netlify') { const r = await this.post('guru/daftar', { token: guruToken, ic, nama, kelas }); if (!r.ok) throw new Error(r.salah); return r.hasil; }
    return daftarMuridDb(ic, nama, kelas);
  },
  async guruPadam(row) {
    if ((await this.jenis()) === 'netlify') { const r = await this.post('guru/padam', { token: guruToken, id: row.id }); if (!r.ok) throw new Error(r.salah); return; }
    await DB.doc('pelajar/' + row.id).delete();
  },
  async guruSifar(row) {
    if ((await this.jenis()) === 'netlify') { const r = await this.post('guru/sifar', { token: guruToken, id: row.id }); if (!r.ok) throw new Error(r.salah); return; }
    await DB.doc('pelajar/' + row.id).set({ ic: row.ic, nama: row.nama, kelas: row.kelas, didaftar: row.didaftar || Date.now(), jaw: {}, streak: { now: 0, best: 0 }, lencana: [], jumlah: 0, peratusMarkah: 0, kemajuan: 0, babTamat: 0, kemaskini: null });
  },
  /* senarai langsung: claude = onSnapshot; netlify = tinjau setiap 15 s */
  guruLanggan(cb, err) {
    let mati = false, stop = () => { mati = true; };
    this.jenis().then(j => {
      if (mati) return;
      if (j === 'netlify') {
        const tarik = async () => { const r = await this.post('guru/senarai', { token: guruToken }); if (mati) return; if (r.ok) cb(r.senarai, false); else err(r.salah); };
        tarik(); const iv = setInterval(tarik, 15000); stop = () => { mati = true; clearInterval(iv); };
      } else {
        const un = DB.collection('pelajar').onSnapshot(snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() })), snap.metadata.fromCache), () => err('Senarai tidak dapat dimuatkan. Muat semula halaman untuk cuba lagi.'));
        stop = () => { mati = true; un(); };
      }
    });
    return () => stop();
  },
  async guruKeluar() { if ((await this.jenis()) === 'netlify' && guruToken && guruToken !== 'claude') this.post('guru/keluar', { token: guruToken }); }
};
