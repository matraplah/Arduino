/**
 * Fizik SPM Interaktif: pelayan Google Apps Script.
 * Data disimpan dalam Google Sheet ini (tab "Murid"). Fail ini dijana oleh build.py; salin keseluruhannya ke Kod.gs.
 *
 * PERSEDIAAN (sekali sahaja):
 * 1. Project Settings → Script properties → tambah GURU_KATA_LALUAN = kata laluan guru (sekurang-kurangnya 8 aksara).
 * 2. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone → Deploy.
 * 3. Salin URL web app (berakhir dengan /exec) dan letakkan dalam web/config.js laman.
 */

var MATA_SOALAN = 10, MATA_MARKAH_REKA = 5;
var TAB = 'Murid';
var LAJUR = ['No IC', 'Nama', 'Kelas', 'Mata', 'Markah (%)', 'Kemajuan (%)', 'Bab tamat', 'Aktiviti terakhir', 'Didaftar', 'Data (jangan sunting)'];
var JAM = 3600;
var LENCANA_SAH = ['mula', 'tepat5', 'tepat10', 'tamat', 'sempurna', 'pereka', 't4', 't5'];

/* ---------- pintu masuk ---------- */
function doGet() { return jawab({ ok: true, versi: 1, nota: 'Pelayan Fizik SPM (Google Apps Script) berfungsi.' }); }
function doPost(e) {
  var body = {};
  try { body = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { body = {}; }
  try { return jawab(kendali(String(body.laluan || ''), body)); }
  catch (err) { console.error(err); return jawab({ ok: false, salah: 'Ralat pelayan. Cuba lagi sebentar.', kod: 500 }); }
}
function jawab(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

/* ---------- utiliti ---------- */
function hex(bytes) { return bytes.map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join(''); }
function sha(s) { return hex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s, Utilities.Charset.UTF_8)); }
function kataCincang(kata, garam) { var h = garam + '|' + kata; for (var i = 0; i < 2000; i++) h = sha(h + '|' + garam); return h; }
function icBersih(v) { return String(v == null ? '' : v).replace(/\D/g, ''); }
function icSah(ic) {
  if (!/^\d{12}$/.test(ic)) return 'No. IC mesti 12 digit, contoh 080512-10-1234.';
  var bln = +ic.slice(2, 4), hr = +ic.slice(4, 6);
  if (bln < 1 || bln > 12 || hr < 1 || hr > 31) return 'Enam digit pertama mesti tarikh lahir yang sah (TTBBHH).';
  return '';
}
function token() { return (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '').slice(0, 48); }
function salah(msg, kod) { return { ok: false, salah: msg, kod: kod || 400 }; }
function ok(o) { o = o || {}; o.ok = true; return o; }

/* ---------- helaian Murid ---------- */
function helaian() {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(TAB);
  if (!sh) {
    sh = ss.insertSheet(TAB);
    sh.getRange(1, 1, 1, LAJUR.length).setValues([LAJUR]).setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('@');
  }
  return sh;
}
/* baca semua murid: [{baris, ic, nama, kelas, ..., data}] */
function semuaMurid() {
  var sh = helaian(), n = sh.getLastRow();
  if (n < 2) return [];
  var v = sh.getRange(2, 1, n - 1, LAJUR.length).getValues(), out = [];
  for (var i = 0; i < v.length; i++) {
    var ic = icBersih(v[i][0]); if (!ic) continue;
    if (ic.length === 11) ic = '0' + ic;  /* Sheets membuang sifar di hadapan jika lajur bukan teks */
    var d = {}; try { d = JSON.parse(v[i][9] || '{}'); } catch (e) { d = {}; }
    out.push({ baris: i + 2, ic: ic, nama: String(v[i][1] || '').trim(), kelas: String(v[i][2] || '').trim().toUpperCase().replace(/\s+/g, ' '),
      jumlah: +v[i][3] || 0, peratusMarkah: +v[i][4] || 0, kemajuan: +v[i][5] || 0, babTamat: +v[i][6] || 0,
      kemaskini: v[i][7] instanceof Date ? v[i][7].getTime() : (v[i][7] ? +new Date(v[i][7]) || null : null),
      didaftar: v[i][8] instanceof Date ? v[i][8].getTime() : null,
      jaw: d.jaw || {}, streak: d.streak || { now: 0, best: 0 }, lencana: d.lencana || [] });
  }
  return out;
}
function cariMurid(ic) { var s = semuaMurid(); for (var i = 0; i < s.length; i++) if (s[i].ic === ic) return s[i]; return null; }
function tulisMurid(m) {
  var sh = helaian();
  var row = ["'" + m.ic, m.nama, m.kelas, m.jumlah || 0, m.peratusMarkah || 0, m.kemajuan || 0, (m.babTamat || 0) + '/' + Object.keys(KUNCI).length,
    m.kemaskini ? new Date(m.kemaskini) : '', m.didaftar ? new Date(m.didaftar) : new Date(),
    JSON.stringify({ jaw: m.jaw || {}, streak: m.streak || { now: 0, best: 0 }, lencana: m.lencana || [] })];
  if (m.baris) sh.getRange(m.baris, 1, 1, row.length).setValues([row]);
  else sh.appendRow(row);
}
function awam(m) { return { nama: m.nama, kelas: m.kelas, ic4: m.ic.slice(-4), jaw: m.jaw, streak: m.streak, lencana: m.lencana, jumlah: m.jumlah, peratusMarkah: m.peratusMarkah, kemajuan: m.kemajuan, babTamat: m.babTamat }; }

/* ---------- pengiraan mata (sama seperti dalam pelayar) ---------- */
function kira(m) {
  var jumlah = 0, max = 0, dijawab = 0, item = 0, babTamat = 0;
  Object.keys(KUNCI).forEach(function (id) {
    var k = KUNCI[id], d = (m.jaw && m.jaw[id]) || { q: {} }, done = 0;
    k.q.forEach(function (a, i) { var v = d.q ? d.q[i] : undefined; if (v != null) { done++; if (v === a) jumlah += MATA_SOALAN; } });
    max += k.q.length * MATA_SOALAN;
    var tot = k.q.length;
    if (k.reka) { tot++; max += (k.reka.ok.length * 2 + 2) * MATA_MARKAH_REKA; if (d.reka) { done++; jumlah += d.reka.m * MATA_MARKAH_REKA; } }
    dijawab += done; item += tot; if (done === tot) babTamat++;
  });
  return { jumlah: jumlah, peratusMarkah: Math.round(jumlah / max * 100), kemajuan: Math.round(dijawab / item * 100), babTamat: babTamat, dijawab: dijawab };
}
/* gabungkan jawapan baharu sahaja: jawapan yang sudah disimpan TIDAK boleh diubah */
function gabung(simpan, hantar) {
  var jaw = JSON.parse(JSON.stringify(simpan || {}));
  Object.keys(KUNCI).forEach(function (id) {
    var k = KUNCI[id], h = hantar && hantar[id]; if (!h || typeof h !== 'object') return;
    var d = jaw[id] || (jaw[id] = { q: {}, reka: null }); if (!d.q) d.q = {};
    if (h.q && typeof h.q === 'object') Object.keys(h.q).forEach(function (i) {
      var n = +i, v = h.q[i];
      if (n === Math.floor(n) && n >= 0 && n < k.q.length && d.q[n] == null && v === Math.floor(v) && v >= 0 && v <= 3) d.q[n] = v;
    });
    if (k.reka && !d.reka && h.reka && Array.isArray(h.reka.j) && h.reka.j.length === k.reka.ok.length && h.reka.o === Math.floor(h.reka.o) && h.reka.o >= 0 && h.reka.o < k.reka.n) {
      var j = h.reka.j.map(function (x) { return String(x).slice(0, 200); });
      var mk = k.reka.ok.reduce(function (s, okv, i) { return s + (j[i] === okv ? 2 : 0); }, 0) + (h.reka.o === k.reka.jawapan ? 2 : 0);
      d.reka = { j: j, o: h.reka.o, m: mk };
    }
  });
  return jaw;
}
function gelaran(r, mata) { if (!(mata > 0)) return ''; return r === 1 ? 'Juara Kelas' : r === 2 ? 'Naib Juara' : r === 3 ? 'Tempat Ketiga' : r <= 10 ? '10 Terbaik' : ''; }
function susun(rows) {
  var s = rows.slice().sort(function (a, b) { return (b.jumlah || 0) - (a.jumlah || 0) || String(a.nama).localeCompare(String(b.nama)); });
  var r = 0, prev = null;
  s.forEach(function (x, i) { if (x.jumlah !== prev) { r = i + 1; prev = x.jumlah; } x.kedudukan = r; x.gelaran = gelaran(r, x.jumlah); });
  return s;
}

/* ---------- sesi (CacheService, maksimum 6 jam) ---------- */
function sesiBaru(o) { var t = token(); CacheService.getScriptCache().put('sesi_' + t, JSON.stringify(o), 6 * JAM); return t; }
function sesi(t, jenis) {
  if (!t || !/^[0-9a-f]{48}$/.test(t)) return null;
  var v = CacheService.getScriptCache().get('sesi_' + t); if (!v) return null;
  var s = JSON.parse(v); return s.j === jenis ? s : null;
}

/* ---------- penghala ---------- */
function kendali(laluan, body) {
  if (laluan === 'ping') return ok({ versi: 1 });
  var lock = LockService.getScriptLock();

  /* murid */
  if (laluan === 'murid/masuk') {
    var ic = icBersih(body.ic), e = icSah(ic); if (e) return salah(e);
    var m = cariMurid(ic); if (!m) return salah('No. IC ini belum didaftarkan. Sila minta guru mendaftarkan anda.', 404);
    return ok({ token: sesiBaru({ j: 'm', ic: ic }), profil: awam(m) });
  }
  if (laluan === 'murid/saya' || laluan === 'murid/simpan' || laluan === 'kedudukan') {
    var s = sesi(body.token, 'm'); if (!s) return salah('Sesi tamat. Sila log masuk semula.', 401);
    if (laluan === 'murid/simpan') {
      lock.waitLock(20000);
      try {
        var m2 = cariMurid(s.ic); if (!m2) return salah('Profil tidak dijumpai.', 404);
        m2.jaw = gabung(m2.jaw, body.jaw);
        var k = kira(m2);
        m2.jumlah = k.jumlah; m2.peratusMarkah = k.peratusMarkah; m2.kemajuan = k.kemajuan; m2.babTamat = k.babTamat; m2.kemaskini = Date.now();
        if (body.streak && isFinite(body.streak.best)) m2.streak = { now: Math.max(0, Math.min(+body.streak.now || 0, k.dijawab)), best: Math.max((m2.streak && m2.streak.best) || 0, Math.min(+body.streak.best, k.dijawab)) };
        if (Array.isArray(body.lencana)) m2.lencana = body.lencana.filter(function (x) { return LENCANA_SAH.indexOf(x) >= 0; });
        tulisMurid(m2);
        return ok({ profil: awam(m2) });
      } finally { lock.releaseLock(); }
    }
    var semua = semuaMurid(), saya = null;
    for (var i = 0; i < semua.length; i++) if (semua[i].ic === s.ic) saya = semua[i];
    if (!saya) return salah('Profil tidak dijumpai.', 404);
    if (laluan === 'murid/saya') return ok({ profil: awam(saya) });
    var rows = semua.filter(function (x) { return x.kelas === saya.kelas; }).map(function (x) { return { nama: x.nama, jumlah: x.jumlah, peratusMarkah: x.peratusMarkah, kemajuan: x.kemajuan, saya: x.ic === saya.ic }; });
    return ok({ kelas: saya.kelas, senarai: susun(rows) });
  }
  if (laluan === 'keluar') { if (body.token && /^[0-9a-f]{48}$/.test(body.token)) CacheService.getScriptCache().remove('sesi_' + body.token); return ok({}); }

  /* guru */
  var P = PropertiesService.getScriptProperties();
  if (laluan === 'guru/status') return ok({ ada: !!(P.getProperty('GURU_HASH') || P.getProperty('GURU_KATA_LALUAN')) });
  if (laluan === 'guru/masuk') {
    var c = CacheService.getScriptCache(), gagal = +(c.get('guru_gagal') || 0);
    if (gagal >= 10) return salah('Terlalu banyak percubaan salah. Cuba lagi selepas 15 minit.', 429);
    var kata = String(body.kata || ''), h = P.getProperty('GURU_HASH'), betul = false;
    if (h) betul = kataCincang(kata, P.getProperty('GURU_GARAM')) === h;
    else if (P.getProperty('GURU_KATA_LALUAN')) betul = kata.length > 0 && kata === P.getProperty('GURU_KATA_LALUAN');
    else return salah('Kata laluan guru belum ditetapkan. Dalam Apps Script: Project Settings → Script properties → tambah GURU_KATA_LALUAN.', 409);
    if (!betul) { c.put('guru_gagal', String(gagal + 1), 900); return salah('Kata laluan salah.', 401); }
    c.remove('guru_gagal');
    return ok({ token: sesiBaru({ j: 'g' }) });
  }
  if (laluan.indexOf('guru/') === 0 && !sesi(body.token, 'g')) return salah('Sesi guru tamat. Sila log masuk semula.', 401);

  if (laluan === 'guru/tukar') {
    var baru = String(body.baru || ''); if (baru.length < 8) return salah('Kata laluan mesti sekurang-kurangnya 8 aksara.');
    var lama = String(body.lama || ''), h2 = P.getProperty('GURU_HASH');
    var sah = h2 ? kataCincang(lama, P.getProperty('GURU_GARAM')) === h2 : lama === P.getProperty('GURU_KATA_LALUAN');
    if (!sah) return salah('Kata laluan semasa salah.', 401);
    var garam = token();
    P.setProperties({ GURU_GARAM: garam, GURU_HASH: kataCincang(baru, garam) });
    P.deleteProperty('GURU_KATA_LALUAN');
    return ok({});
  }
  if (laluan === 'guru/senarai') {
    return ok({ senarai: semuaMurid().map(function (m) { return { id: m.ic, ic: m.ic, nama: m.nama, kelas: m.kelas, didaftar: m.didaftar, jumlah: m.jumlah, peratusMarkah: m.peratusMarkah, kemajuan: m.kemajuan, babTamat: m.babTamat, kemaskini: m.kemaskini }; }) });
  }
  if (laluan === 'guru/daftar') {
    var ic3 = icBersih(body.ic), e3 = icSah(ic3); if (e3) return salah(e3);
    var nama = String(body.nama || '').trim().replace(/\s+/g, ' ').slice(0, 80), kelas = String(body.kelas || '').trim().toUpperCase().replace(/\s+/g, ' ').slice(0, 20);
    if (nama.length < 3) return salah('Nama terlalu pendek.');
    if (!kelas) return salah('Kelas mesti diisi.');
    lock.waitLock(20000);
    try {
      var cur = cariMurid(ic3);
      if (cur) { cur.nama = nama; cur.kelas = kelas; tulisMurid(cur); return ok({ hasil: 'kemas' }); }
      tulisMurid({ ic: ic3, nama: nama, kelas: kelas, didaftar: Date.now(), jaw: {}, jumlah: 0, peratusMarkah: 0, kemajuan: 0, babTamat: 0 });
      return ok({ hasil: 'baru' });
    } finally { lock.releaseLock(); }
  }
  if (laluan === 'guru/padam' || laluan === 'guru/sifar') {
    lock.waitLock(20000);
    try {
      var cur2 = cariMurid(icBersih(body.id)); if (!cur2) return salah('Murid tidak dijumpai.', 404);
      if (laluan === 'guru/padam') helaian().deleteRow(cur2.baris);
      else tulisMurid({ baris: cur2.baris, ic: cur2.ic, nama: cur2.nama, kelas: cur2.kelas, didaftar: cur2.didaftar, jaw: {}, jumlah: 0, peratusMarkah: 0, kemajuan: 0, babTamat: 0 });
      return ok({});
    } finally { lock.releaseLock(); }
  }
  if (laluan === 'guru/keluar') { CacheService.getScriptCache().remove('sesi_' + body.token); return ok({}); }
  return salah('Laluan tidak dikenali.', 404);
}

/* ---------- kunci jawapan (dijana) ---------- */
var KUNCI = {"t4-b1":{"ting":4,"q":[2,1,1,0,2,2,2],"reka":{"ok":["20 ayunan","Jam randik digital","Dua kali, ambil purata","Kecil (< 10°)"],"jawapan":2,"n":4}},"t4-b2":{"ting":4,"q":[2,1,1,1,1,1,2,1,1,0,1],"reka":{"ok":["Aerodinamik","Aloi aluminium (ketumpatan rendah, kuat)","Tinggi","Zon remuk & beg udara"],"jawapan":2,"n":4}},"t4-b3":{"ting":4,"q":[1,2,2,2,0,1,2,1,2,1],"reka":{"ok":["Aloi titanium (ringan, kuat)","Hidrogen + oksigen cecair","Berbilang","Larus (aerodinamik)"],"jawapan":2,"n":4}},"t4-b4":{"ting":4,"q":[0,1,1,2,1,0,1,0,2,2],"reka":{"ok":["Vakum","Berkilat","Gabus (penebat)","Kaca"],"jawapan":2,"n":4}},"t4-b5":{"ting":4,"q":[0,2,1,1,1,2,1,1,1,3,1],"reka":{"ok":["Gelombang mikro","Tinggi","Besar","Parabola"],"jawapan":0,"n":4}},"t4-b6":{"ting":4,"q":[1,1,1,1,1,1,2,0,3,2,1],"reka":{"ok":["Panjang (100 cm)","Pendek (5 cm)","Besar","$f_o + f_m$"],"jawapan":0,"n":4}},"t5-b1":{"ting":5,"q":[1,1,1,1,1,2,1,1,0,2,3],"reka":{"ok":["Tebal","Kecil","Selari","Keluli"],"jawapan":1,"n":4}},"t5-b2":{"ting":5,"q":[1,1,0,1,3,1,2,2,1,1,3],"reka":{"ok":["Minyak brek","Kecil","Besar","Keluli"],"jawapan":2,"n":4}},"t5-b3":{"ting":5,"q":[1,1,1,2,1,1,0,2,1,2,1],"reka":{"ok":["Nikrom","3 000 W","13 A","Plastik penebat"],"jawapan":1,"n":4}},"t5-b4":{"ting":5,"q":[1,1,1,2,1,0,3,1,0,2,1],"reka":{"ok":["Besi lembut","Berlamina","Kuprum tebal","Sekunder dililit atas primer"],"jawapan":0,"n":4}},"t5-b5":{"ting":5,"q":[1,1,1,0,1,1,0,2,1,1,1],"reka":{"ok":["Gelombang penuh","Ada, selari dengan beban","Injak turun","Tinggi"],"jawapan":2,"n":4}},"t5-b6":{"ting":5,"q":[2,1,1,2,0,1,1,1,2,2,1],"reka":{"ok":["Boron","Grafit","Air","Konkrit tebal"],"jawapan":0,"n":4}},"t5-b7":{"ting":5,"q":[2,0,1,1,1,1,0,2,0,2,2],"reka":{"ok":["Sesium (W rendah)","Vakum","Besar","Tinggi"],"jawapan":3,"n":4}}};
