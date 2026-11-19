/**
 * SEMAKAN MARKAH SAINS 2026 - SMK SERI PAGI
 * Google Apps Script web app.
 *
 * Murid log masuk dengan No. Kad Pengenalan dan hanya nampak markah sendiri.
 * Carian dibuat di server (Apps Script), jadi data murid lain TIDAK dihantar
 * ke telefon / komputer murid.
 */

const SPREADSHEET_ID = '1vwQgwPeT9XmVuIXO2H1zUSBmcBuWVZI6NPjV2emim3c';

// Sheet yang mengandungi senarai No. KP murid: lajur A = NO KP, B = NAMA, C = KELAS
const SHEET_MURID = 'SENARAI MURID';

/**
 * Lajur bagi setiap kelas (dikira dari 0: A=0, B=1, C=2 ... Z=25, AA=26 ...).
 *   m  = lajur markah total
 *   g  = lajur gred (jika tiada, gred dikira automatik dari markah)
 *   perincian = (pilihan) pecahan markah yang dipaparkan kepada murid
 * Jika susunan lajur dalam sheet berubah, ubah nombor di sini sahaja.
 */
const PETA_KELAS = {
  '3 DAISY': {
    awal:   { m: 5 },            // F  TOTAL KUIZ 1
    tengah: { m: 10 },           // K  TOTAL PPSA
    akhir:  { m: 18, g: 19 }     // S  FULL TOTAL UASA
  },
  '3 JASMIN': {
    awal:   { m: 5 },            // F
    tengah: { m: 10 },           // K
    akhir:  { m: 18, g: 19 }     // S
  },
  '3 ALAMANDA': {
    awal:   { m: 6 },                    // G  KUIZ 1 TOTAL
    tengah: { m: 11, g: 13 },            // L  TOTAL UPSA
    akhir:  { m: 21, g: 22,              // V  FULL TOTAL
      perincian: [
        { label: 'UASA',       col: 18 },   // S
        { label: 'Present',    col: 19 },   // T
        { label: 'Buku Kerja', col: 20 }    // U
      ]
    }
  },
  '4 SAINS': {
    awal:   { m: 5 },                    // F  TOTAL KUIZ 1
    tengah: { m: 17, g: 15 },            // R  ALL ROUND (PPSA)
    akhir:  { m: 30, g: 31,              // AE AKHIR TAHUN
      perincian: [
        { label: 'K1',                        col: 24, max: 40 },   // Y
        { label: 'K2',                        col: 25, max: 100 },  // Z
        { label: 'K3',                        col: 26, max: 15 },   // AA
        { label: 'Jumlah K1+K2+K3 (÷155 × 100)', col: 27, max: 100, garis: true }, // AB
        { label: '+ Markah Presentation + King', col: 28 },        // AC
        { label: '+ Guru Muda (5%)',          col: 29 }             // AD
      ]
    }
  },
  '5 SAINS ': {                          // nama sheet ada ruang di hujung
    awal:   { m: 5 },            // F  TOTAL KUIZ 1
    tengah: { m: 14, g: 12 },    // O  PPSA
    akhir:  { m: 22, g: 23 }     // W  TRIALS
  }
};

const LABEL_PEPERIKSAAN = {
  awal: 'Awal Tahun',
  tengah: 'Pertengahan Tahun',
  akhir: 'Akhir Tahun'
};

/* ------------------------------------------------------------------ */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Semakan Markah Sains 2026')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
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
        const v = bacaMarkah(row[d.col]);
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
    peperiksaan: peperiksaan
  };
}

/* ---------------------------- pembantu ---------------------------- */

function bersihkanIc(v) { return String(v || '').replace(/\D/g, ''); }
function bersih(v) { return String(v == null ? '' : v).trim(); }
function normalNama(v) { return bersih(v).toUpperCase().replace(/\s+/g, ' '); }

function cariNamaSheet(kelas) {
  const k = normalNama(kelas);
  return Object.keys(PETA_KELAS).find(n => normalNama(n) === k) || null;
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
