/**
 * SEMAKAN MARKAH SAINS 2026 - SMK SERI PAGI
 * "Enjin" carian (Google Apps Script). Halaman web murid berada di Netlify.
 *
 * Halaman Netlify menghantar No. KP ke sini; skrip ini mencari dalam Google Sheet
 * dan memulangkan markah murid itu SAHAJA. Data murid lain tidak pernah keluar
 * dari Google Sheet.
 */

const SPREADSHEET_ID = '1vwQgwPeT9XmVuIXO2H1zUSBmcBuWVZI6NPjV2emim3c';

// Sheet yang mengandungi senarai No. KP murid: lajur A = NO KP, B = NAMA, C = KELAS
const SHEET_MURID = 'SENARAI MURID';

// Sheet buletin untuk semua murid: A = TARIKH, B = TAJUK, C = MESEJ, D = PAPAR (YA/TIDAK)
const SHEET_BULETIN = 'BULETIN';

/**
 * Lajur bagi setiap kelas (dikira dari 0: A=0, B=1, C=2 ... Z=25, AA=26 ...).
 *   m  = lajur markah total
 *   g  = lajur gred (jika tiada, gred dikira automatik dari markah)
 *   perincian = (pilihan) pecahan markah yang dipaparkan kepada murid
 * Jika susunan lajur dalam sheet berubah, ubah nombor di sini sahaja.
 */
const PETA_KELAS = {
  // Lajur dikira dari 0: A=0 B=1 C=2 D=3 E=4 F=5 G=6 H=7 I=8 J=9 K=10 L=11 M=12 N=13 O=14
  // P=15 Q=16 R=17 S=18 T=19 U=20 V=21 W=22 X=23 Y=24 Z=25 AA=26 AB=27 AC=28 AD=29 AE=30
  // perincian: { label, col, max } = baca lajur; { label, kira: [lajur...], bahagi } = (jumlah ÷ bahagi × 100)
  '3 DAISY': {
    awal:   { m: 5, perincian: [                                   // F TOTAL KUIZ 1
      { label: 'Kuiz 1', col: 2, max: 30 },                        // C
      { label: 'Kuiz 1 (÷30 × 100)', col: 3, max: 100, garis: true }, // D
      { label: '+ Markah Buku Kerja', col: 4 } ] },                // E
    tengah: { m: 10, perincian: [                                  // K TOTAL PPSA
      { label: 'PPSA', col: 9 },                                   // J
      { label: '+ Markah Buku Tulis', col: 8 } ] },                // I
    akhir:  { m: 18, g: 19, perincian: [                           // S FULL TOTAL
      { label: 'UASA', col: 16 },                                  // Q
      { label: '+ Markah Buku Kerja', col: 17 } ] }                // R
  },
  '3 JASMIN': {
    awal:   { m: 5, perincian: [                                   // F TOTAL KUIZ 1
      { label: 'Kuiz 1', col: 2, max: 30 },                        // C
      { label: 'Kuiz 1 (÷30 × 100)', col: 3, max: 100, garis: true }, // D
      { label: '+ Markah Buku Tulis', col: 4 } ] },                // E
    tengah: { m: 10, perincian: [                                  // K TOTAL
      { label: 'PPSA', col: 7 },                                   // H
      { label: '+ Markah Buku Kerja', col: 8 },                     // I
      { label: '+ Markah Tambahan', col: 9 } ] },                  // J
    akhir:  { m: 18, g: 19, perincian: [                           // S TOTAL
      { label: 'UASA', col: 16 },                                  // Q
      { label: '+ Markah Buku Kerja', col: 17 } ] }                // R
  },
  '3 ALAMANDA': {
    awal:   { m: 6, perincian: [                                   // G KUIZ 1 TOTAL
      { label: 'Kuiz 1', col: 3, max: 30 },                        // D
      { label: 'Kuiz 1 (÷30 × 100)', col: 4, max: 100, garis: true }, // E
      { label: '+ Markah Buku Tulis', col: 5 } ] },                // F
    tengah: { m: 11, g: 13, perincian: [                           // L TOTAL UPSA
      { label: 'PPSA', col: 9 },                                   // J
      { label: '+ Markah Buku Kerja', col: 8 },                     // I
      { label: '+ Markah Tambahan', col: 10 } ] },                 // K
    akhir:  { m: 21, g: 22, perincian: [                           // V FULL TOTAL
      { label: 'UASA', col: 18 },                                  // S
      { label: '+ Present', col: 19 },                             // T
      { label: '+ Buku Kerja', col: 20 } ] }                       // U
  },
  '4 SAINS': {
    awal:   { m: 5, perincian: [                                   // F TOTAL KUIZ 1
      { label: 'Kuiz 1', col: 2, max: 30 },                        // C
      { label: 'Kuiz 1 (÷30 × 100)', col: 3, max: 100, garis: true }, // D
      { label: '+ Markah Presentation', col: 4 } ] },              // E
    tengah: { m: 17, g: 15, perincian: [                           // R ALL ROUND
      { label: 'K1', col: 10 },                                    // K
      { label: 'K2', col: 11 },                                    // L
      { label: 'K3', col: 14 },                                    // O
      { label: 'Jumlah K1+K2+K3 (÷140 × 100)', kira: [10, 11, 14], bahagi: 140, max: 100, garis: true },
      { label: '+ Markah Presentation', col: 9 } ] },              // J
    akhir:  { m: 30, g: 31, perincian: [                           // AE AKHIR TAHUN
      { label: 'K1', col: 24, max: 40 },                           // Y
      { label: 'K2', col: 25, max: 100 },                          // Z
      { label: 'K3', col: 26, max: 15 },                           // AA
      { label: 'Jumlah K1+K2+K3 (÷155 × 100)', col: 27, max: 100, garis: true }, // AB
      { label: '+ Markah Presentation (5%)', col: 28 },            // AC
      { label: '+ King + Guru Muda (5%)', col: 29 } ] }            // AD
  },
  '5 SAINS ': {                                                    // nama sheet ada ruang di hujung
    awal:   { m: 5, perincian: [                                   // F TOTAL KUIZ 1
      { label: 'Kuiz 1', col: 2, max: 30 },                        // C
      { label: 'Kuiz 1 (÷30 × 100)', col: 3, max: 100, garis: true }, // D
      { label: '+ Markah Presentation', col: 4 } ] },              // E
    tengah: { m: 14, g: 12, perincian: [                           // O PPSA
      { label: 'K1', col: 7, max: 40 },                            // H
      { label: 'K2', col: 8, max: 100 },                           // I
      { label: 'K3', col: 9, max: 15 },                            // J
      { label: 'Markah Tambahan', col: 10 },                       // K
      { label: 'Jumlah (÷155 × 100)', kira: [7, 8, 9, 10], bahagi: 155, max: 100, garis: true },
      { label: '+ Markah Presentation', col: 11 } ] },             // L
    akhir:  { m: 22, g: 23, perincian: [                           // W TRIALS
      { label: 'K1', col: 17, max: 40 },                           // R
      { label: 'K2', col: 18, max: 100 },                          // S
      { label: 'K3', col: 19, max: 15 },                           // T
      { label: 'P', col: 20 },                                     // U
      { label: 'Jumlah (÷155 × 100)', col: 21, max: 100, garis: true } ] } // V
  }
};

const LABEL_PEPERIKSAAN = {
  awal: 'Awal Tahun',
  tengah: 'Pertengahan Tahun',
  akhir: 'Akhir Tahun'
};

/**
 * PEMENANG SESI PRESENTATION.
 * Murid yang namanya ada di sini akan nampak mesej tahniah selepas log masuk.
 * Nama mesti sama seperti dalam sheet kelas. Kosongkan senarai untuk buang mesej.
 */
const PEMENANG_PRESENTATION = [
  // ---- 3 ALAMANDA ----
  { kelas: '3 ALAMANDA', tempat: 1, hadiah: 'RM100', ahli: ['AKMAL HARITH BIN MOHD AMRI', 'MUHAMMAD AKID BIN MOHD KHAIRUL HISHAM'] },
  { kelas: '3 ALAMANDA', tempat: 2, hadiah: 'RM70',  ahli: ['MUHAMMAD ADAM CHOY BIN ISWAN CHOY', 'AIMAN HAFIZ BIN FADZLY SANI'] },
  { kelas: '3 ALAMANDA', tempat: 3, hadiah: 'RM50',  ahli: ['NOR FARHANIZAN BATRISYA BINTI AZIZAN', 'NOREEN JESSENIA YONG BINTI NOR AZMAN YONG'] },
  { kelas: '3 ALAMANDA', tempat: 4, hadiah: 'RM30',  ahli: ['NURSYARAFANA AFIFAH BINTI SYAHRUL AMRI', 'NURSYARAFANA AFIQAH BINTI SYAHRUL AMRI'] },
  { kelas: '3 ALAMANDA', tempat: 5, hadiah: 'RM20',  ahli: ['KHAIRUL ZAKWAN BIN MOHD ROHADY', 'AARON RIZQIN BIN MOHD SAIFUL HAZLANI'] },
  // ---- 4 SAINS ----
  { kelas: '4 SAINS', tempat: 1, hadiah: 'RM100', tajuk: '2.3 Gerakan Jatuh Bebas',
    ahli: ['MUHAMMAD IRSYAD IZZ BIN ANUAR', 'AMIR BIN KHAIRUL HISHAM'] },
  { kelas: '4 SAINS', tempat: 2, hadiah: 'RM70',  tajuk: '2.7 Impuls dan Daya Impuls',
    ahli: ['AMIRAH HAFIZAH BINTI MOHD HAIDI', 'MAISARAH BINTI SHAIFUL HAFIZ', 'WAN NUR HUMAIRA BINTI WAN AZFARUDDIN'] },
  { kelas: '4 SAINS', tempat: 3, hadiah: 'RM50',  tajuk: '3.3 Satelit Buatan Manusia',
    ahli: ['AHMAD FAIZ MURTADZA BIN BADRUDDIN', 'AHMAD IZZUL IMAN BIN AMIRRUDIN'] },
  { kelas: '4 SAINS', tempat: 4, hadiah: 'RM30',  tajuk: '2.1 Gerakan Linear',
    ahli: ['NUR DAMIA NAZIFA BINTI AHMAD FAZLI', 'BATRISYA UMAIRAH BINTI MOHD AZIZUL HAKIM'] },
  { kelas: '4 SAINS', tempat: 5, hadiah: 'RM20',  tajuk: '4.1 Keseimbangan Terma',
    ahli: ['ANIS SUMAYYAH BINTI SHAMSUDIN', 'DAMIA HAFIYAH BINTI ZUHARILLAH'] }
];

/* ------------------------------------------------------------------ */

/** Halaman Netlify memanggil ini dengan { "ic": "..." }. */
function doPost(e) {
  let ic = '';
  try { ic = JSON.parse(e.postData.contents).ic; } catch (err) { /* abaikan */ }
  let hasil;
  try { hasil = semakMarkah(ic); }
  catch (err) { hasil = { ok: false, mesej: 'Ralat sistem. Sila cuba lagi atau hubungi guru.' }; }
  return keJson(hasil);
}

/** Buka URL web app dalam browser untuk semak ia berfungsi. */
function doGet() {
  let buletin = [];
  try { buletin = bacaBuletin(); } catch (err) { /* abaikan */ }
  return keJson({ ok: true, mesej: 'Enjin Semakan Markah aktif.', buletin: buletin });
}

/** Mesej buletin yang PAPAR = YA (atau kosong). Baris paling bawah dipaparkan dahulu. */
function bacaBuletin() {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_BULETIN);
  if (!sh) return [];
  return sh.getDataRange().getDisplayValues().slice(1)
    .filter(r => bersih(r[2]) && bersih(r[3]).toUpperCase() !== 'TIDAK')
    .map(r => ({ tarikh: bersih(r[0]), tajuk: bersih(r[1]), mesej: bersih(r[2]) }))
    .reverse()
    .slice(0, 20);
}

function keJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Dipanggil dari halaman login. Pulangkan markah murid itu sahaja. */
function semakMarkah(noKp) {
  const ic = bersihkanIc(noKp);
  if (ic.length !== 12) {
    return { ok: false, mesej: 'No. Kad Pengenalan mesti 12 digit.' };
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const senarai = ss.getSheetByName(SHEET_MURID);
  if (!senarai) {
    return { ok: false, mesej: 'Sistem belum disediakan. Sila hubungi guru.' };
  }

  const baris = senarai.getDataRange().getDisplayValues();
  let murid = null;
  for (let i = 1; i < baris.length; i++) {
    if (bersihkanIc(baris[i][0]) === ic) {
      murid = { nama: baris[i][1].trim(), kelas: baris[i][2] };
      break;
    }
  }

  if (!murid) {
    Utilities.sleep(800); // perlahankan percubaan meneka
    return { ok: false, mesej: 'No. Kad Pengenalan tidak dijumpai. Semak semula atau hubungi guru kelas.' };
  }

  const namaSheet = cariNamaSheet(murid.kelas);
  const peta = namaSheet && PETA_KELAS[namaSheet];
  const sheet = namaSheet && ss.getSheetByName(namaSheet);
  if (!peta || !sheet) {
    return { ok: false, mesej: 'Kelas "' + murid.kelas + '" tidak dijumpai. Sila hubungi guru.' };
  }

  const data = sheet.getDataRange().getDisplayValues();
  const sasaran = normalNama(murid.nama);
  const row = data.find(r => normalNama(r[1]) === sasaran);
  if (!row) {
    return { ok: false, mesej: 'Markah belum dimasukkan. Sila hubungi guru.' };
  }

  const peperiksaan = Object.keys(LABEL_PEPERIKSAAN).map(k => {
    const p = peta[k];
    const markah = bacaMarkah(row[p.m]);
    const gredSheet = p.g !== undefined ? bersih(row[p.g]) : '';
    return {
      kunci: k,
      nama: LABEL_PEPERIKSAAN[k],
      markah: markah.nilai,        // nombor atau null
      status: markah.status,       // '', 'TH', 'MC', 'TIADA'
      gred: markah.nilai === null ? '' : (gredSah(gredSheet) ? gredSheet : kiraGred(markah.nilai)),
      perincian: (p.perincian || []).map(d => {
        const v = d.kira ? kiraJumlah(row, d.kira, d.bahagi) : bacaMarkah(row[d.col]);
        return { label: d.label, nilai: v.nilai, status: v.status, max: d.max || null, garis: !!d.garis };
      })
    };
  });

  return {
    ok: true,
    murid: {
      nama: murid.nama,
      kelas: namaSheet.trim(),
      ic: ic.slice(0, 6) + '-••-' + ic.slice(8)
    },
    peperiksaan: peperiksaan,
    tahniah: cariPemenang(namaSheet, murid.nama)
  };
}

function cariPemenang(namaSheet, nama) {
  const k = normalNama(namaSheet), n = normalNama(nama);
  const g = PEMENANG_PRESENTATION.find(p => normalNama(p.kelas) === k && p.ahli.some(a => normalNama(a) === n));
  return g ? { tempat: g.tempat, hadiah: g.hadiah, tajuk: g.tajuk || '' } : null;
}

/* ---------------------------- pembantu ---------------------------- */

function bersihkanIc(v) {
  const d = String(v || '').replace(/\D/g, '');
  return d.length === 11 ? '0' + d : d; // No. KP lahir 2000-2009 kadang-kadang hilang sifar di depan
}
function bersih(v) { return String(v == null ? '' : v).trim(); }
function normalNama(v) { return bersih(v).toUpperCase().replace(/\s+/g, ' '); }

function cariNamaSheet(kelas) {
  const k = normalNama(kelas);
  return Object.keys(PETA_KELAS).find(n => normalNama(n) === k) || null;
}

function kiraJumlah(row, cols, bahagi) {
  let jumlah = 0, ada = false;
  cols.forEach(c => { const v = bacaMarkah(row[c]); if (v.nilai !== null) { jumlah += v.nilai; ada = true; } });
  return ada ? { nilai: Math.round(jumlah / bahagi * 10000) / 100, status: '' } : { nilai: null, status: 'TIADA' };
}

function bacaMarkah(v) {
  const s = bersih(v).toUpperCase();
  if (s === 'TH') return { nilai: null, status: 'TH' };
  if (s === 'MC') return { nilai: null, status: 'MC' };
  if (s === '' || s.charAt(0) === '#') return { nilai: null, status: 'TIADA' };
  const n = parseFloat(s.replace(',', '.'));
  if (isNaN(n)) return { nilai: null, status: 'TIADA' };
  return { nilai: Math.round(n * 100) / 100, status: '' };
}

const GRED_SAH = ['A+', 'A', 'A-', 'B+', 'B', 'C+', 'C', 'D', 'E', 'G'];
function gredSah(g) { return GRED_SAH.indexOf(g) !== -1; }

/** Skala gred sama seperti yang digunakan dalam spreadsheet. */
function kiraGred(m) {
  if (m >= 90) return 'A+';
  if (m >= 80) return 'A';
  if (m >= 70) return 'A-';
  if (m >= 65) return 'B+';
  if (m >= 60) return 'B';
  if (m >= 55) return 'C+';
  if (m >= 50) return 'C';
  if (m >= 45) return 'D';
  if (m >= 40) return 'E';
  return 'G';
}

/* ------------------------- untuk guru sahaja ------------------------- */

/** Tambah menu dalam Google Sheets (jika skrip ini diikat pada spreadsheet). */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Semakan Markah')
    .addItem('Sediakan / kemas kini SENARAI MURID', 'sediakanSenaraiMurid')
    .addToUi();
}

/**
 * Cipta sheet "SENARAI MURID" dan isi NAMA + KELAS dari semua kelas.
 * Guru hanya perlu taip No. KP dalam lajur A.
 * Selamat dijalankan berulang kali: No. KP yang sudah diisi tidak dipadam,
 * murid baru ditambah di bawah.
 */
function sediakanSenaraiMurid() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(SHEET_MURID);
  if (!sh) {
    sh = ss.insertSheet(SHEET_MURID, 0);
    sh.getRange('A1:C1').setValues([['NO KP', 'NAMA', 'KELAS']]).setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('@'); // simpan sebagai teks supaya sifar di depan tak hilang
  }

  const sedia = sh.getDataRange().getDisplayValues();
  const ada = new Set(sedia.slice(1).map(r => normalNama(r[1]) + '|' + normalNama(r[2])));
  const baru = [];

  Object.keys(PETA_KELAS).forEach(namaSheet => {
    const kelasSh = ss.getSheetByName(namaSheet);
    if (!kelasSh) return;
    kelasSh.getDataRange().getDisplayValues().forEach(r => {
      const bil = bersih(r[0]);
      const nama = bersih(r[1]);
      if (!/^\d+$/.test(bil) || !nama) return; // hanya baris murid
      const kunci = normalNama(nama) + '|' + normalNama(namaSheet);
      if (!ada.has(kunci)) {
        baru.push(['', nama, namaSheet.trim()]);
        ada.add(kunci);
      }
    });
  });

  if (baru.length) {
    sh.getRange(sh.getLastRow() + 1, 1, baru.length, 3).setValues(baru);
  }
  sh.autoResizeColumns(2, 2);
  try {
    SpreadsheetApp.getUi().alert(baru.length + ' murid ditambah. Sila isi No. KP dalam lajur A.');
  } catch (e) { /* dijalankan dari editor */ }
}
