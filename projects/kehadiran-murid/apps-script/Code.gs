/**
 * Sistem Kehadiran Murid - Google Apps Script
 *
 * Menerima rekod tap kad RFID dari stesen ESP32 dan menyimpannya
 * dalam Google Sheets. Lihat README.md untuk cara pasang.
 *
 * Tab yang digunakan:
 *   Murid              : UID | Nama | Kelas
 *   Kehadiran          : Tarikh | Masa | UID | Nama | Kelas | Stesen | Status
 *   Kad Tidak Dikenali : Tarikh | Masa | UID | Stesen
 *   Laporan            : dijana dari menu "Kehadiran"
 */

// ====== TETAPAN (ubah ikut sekolah anda) ======
// Kunci rahsia. MESTI sama dengan API_KEY dalam secrets.h di ESP32.
const API_KEY = 'TUKAR-KUNCI-RAHSIA-INI';
// Selepas masa ini murid ditanda "Lewat" (format HH:mm, 24 jam).
const MASA_LEWAT = '07:30';
// Berapa baris terakhir disemak untuk elak rekod berganda pada hari sama.
const HAD_SEMAK_BERGANDA = 3000;
// ==============================================

const TAB_MURID = 'Murid';
const TAB_KEHADIRAN = 'Kehadiran';
const TAB_TIDAK_DIKENALI = 'Kad Tidak Dikenali';
const TAB_LAPORAN = 'Laporan';

/** Menu tambahan dalam Google Sheets. */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Kehadiran')
    .addItem('1. Sediakan tab (kali pertama)', 'sediakanTab')
    .addItem('Laporan hari ini', 'laporanHariIni')
    .addItem('Laporan ikut tarikh...', 'laporanIkutTarikh')
    .addToUi();
}

/** Cipta tab dan header yang diperlukan. Selamat dijalankan berulang kali. */
function sediakanTab() {
  const ss = SpreadsheetApp.getActive();
  sediakanSatuTab_(ss, TAB_MURID, ['UID', 'Nama', 'Kelas']);
  sediakanSatuTab_(ss, TAB_KEHADIRAN,
    ['Tarikh', 'Masa', 'UID', 'Nama', 'Kelas', 'Stesen', 'Status']);
  sediakanSatuTab_(ss, TAB_TIDAK_DIKENALI, ['Tarikh', 'Masa', 'UID', 'Stesen']);

  // Format lajur UID sebagai teks supaya UID seperti "00123456"
  // tidak ditukar menjadi nombor oleh Sheets.
  ss.getSheetByName(TAB_MURID).getRange('A:A').setNumberFormat('@');
  ss.getSheetByName(TAB_KEHADIRAN).getRange('A:C').setNumberFormat('@');
  ss.getSheetByName(TAB_TIDAK_DIKENALI).getRange('A:C').setNumberFormat('@');

  SpreadsheetApp.getUi().alert(
    'Tab sudah sedia. Isi senarai murid dalam tab "' + TAB_MURID + '".');
}

function sediakanSatuTab_(ss, nama, header) {
  let sh = ss.getSheetByName(nama);
  if (!sh) sh = ss.insertSheet(nama);
  sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold');
  sh.setFrozenRows(1);
  return sh;
}

/**
 * Titik masuk dari ESP32:
 *   GET <url>?key=...&uid=A1B2C3D4&stesen=Pagar%20Utama[&ts=1700000000]
 * ts (pilihan) = masa tap dalam saat Unix, untuk rekod yang dihantar lewat
 * (contohnya semasa WiFi terputus).
 */
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.key !== API_KEY) return jawab_({ status: 'ralat', mesej: 'Kunci salah' });

  const uid = normalUid_(p.uid);
  if (!uid) return jawab_({ status: 'ralat', mesej: 'UID kosong' });
  const stesen = String(p.stesen || 'Tidak dinyatakan').slice(0, 50);

  let masaTap = new Date();
  const ts = Number(p.ts);
  // Terima ts hanya jika munasabah (dalam 7 hari lepas, bukan masa depan).
  if (ts && ts * 1000 <= Date.now() + 60000 && ts * 1000 > Date.now() - 7 * 864e5) {
    masaTap = new Date(ts * 1000);
  }

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return jawab_({ status: 'ralat', mesej: 'Sibuk, cuba lagi' });
  try {
    return jawab_(rekodTap_(uid, stesen, masaTap));
  } finally {
    lock.releaseLock();
  }
}

function rekodTap_(uid, stesen, masaTap) {
  const ss = SpreadsheetApp.getActive();
  const tz = ss.getSpreadsheetTimeZone();
  const tarikh = Utilities.formatDate(masaTap, tz, 'yyyy-MM-dd');
  const masa = Utilities.formatDate(masaTap, tz, 'HH:mm:ss');

  const murid = cariMurid_(ss, uid);
  if (!murid) {
    ss.getSheetByName(TAB_TIDAK_DIKENALI).appendRow([tarikh, masa, uid, stesen]);
    return { status: 'tidak_dikenali', uid: uid };
  }

  const shK = ss.getSheetByName(TAB_KEHADIRAN);
  if (sudahHadir_(shK, uid, tarikh)) {
    return { status: 'sudah_hadir', nama: murid.nama, kelas: murid.kelas };
  }

  const status = masa.slice(0, 5) > MASA_LEWAT ? 'Lewat' : 'Hadir';
  shK.appendRow([tarikh, masa, uid, murid.nama, murid.kelas, stesen, status]);
  return { status: 'ok', nama: murid.nama, kelas: murid.kelas, kehadiran: status, masa: masa };
}

function cariMurid_(ss, uid) {
  const sh = ss.getSheetByName(TAB_MURID);
  const n = sh.getLastRow() - 1;
  if (n < 1) return null;
  const data = sh.getRange(2, 1, n, 3).getValues();
  for (let i = 0; i < data.length; i++) {
    if (normalUid_(data[i][0]) === uid) {
      return { nama: String(data[i][1]), kelas: String(data[i][2]) };
    }
  }
  return null;
}

/** Semak dari bawah sama ada UID sudah direkod pada tarikh ini. */
function sudahHadir_(sh, uid, tarikh) {
  const akhir = sh.getLastRow();
  if (akhir < 2) return false;
  const mula = Math.max(2, akhir - HAD_SEMAK_BERGANDA + 1);
  const data = sh.getRange(mula, 1, akhir - mula + 1, 3).getDisplayValues();
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i][0] === tarikh && normalUid_(data[i][2]) === uid) return true;
  }
  return false;
}

function normalUid_(v) {
  return String(v == null ? '' : v).replace(/[^0-9a-fA-F]/g, '').toUpperCase();
}

function jawab_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ====== LAPORAN ======

function laporanHariIni() {
  const ss = SpreadsheetApp.getActive();
  janaLaporan_(Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd'));
}

function laporanIkutTarikh() {
  const ui = SpreadsheetApp.getUi();
  const r = ui.prompt('Laporan kehadiran', 'Masukkan tarikh (yyyy-MM-dd):', ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  const t = r.getResponseText().trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) { ui.alert('Format tarikh salah. Contoh: 2026-11-10'); return; }
  janaLaporan_(t);
}

/** Ringkasan ikut kelas + senarai murid tidak hadir bagi satu tarikh. */
function janaLaporan_(tarikh) {
  const ss = SpreadsheetApp.getActive();
  const shM = ss.getSheetByName(TAB_MURID);
  const shK = ss.getSheetByName(TAB_KEHADIRAN);
  const murid = shM.getLastRow() > 1
    ? shM.getRange(2, 1, shM.getLastRow() - 1, 3).getValues() : [];
  const rekod = shK.getLastRow() > 1
    ? shK.getRange(2, 1, shK.getLastRow() - 1, 7).getDisplayValues() : [];

  const statusUid = {};
  rekod.forEach(function (r) {
    if (r[0] === tarikh) statusUid[normalUid_(r[2])] = r[6];
  });

  const kelas = {};
  const tidakHadir = [];
  murid.forEach(function (m) {
    const uid = normalUid_(m[0]);
    if (!uid) return;
    const k = String(m[2]);
    if (!kelas[k]) kelas[k] = { jumlah: 0, hadir: 0, lewat: 0 };
    kelas[k].jumlah++;
    const s = statusUid[uid];
    if (s === 'Hadir') kelas[k].hadir++;
    else if (s === 'Lewat') kelas[k].lewat++;
    else tidakHadir.push([String(m[1]), k]);
  });

  let sh = ss.getSheetByName(TAB_LAPORAN);
  if (!sh) sh = ss.insertSheet(TAB_LAPORAN);
  sh.clear();

  const baris = [['Laporan kehadiran: ' + tarikh, '', '', '', '', ''],
    ['Kelas', 'Jumlah murid', 'Hadir', 'Lewat', 'Tidak hadir', '% Kehadiran']];
  Object.keys(kelas).sort().forEach(function (k) {
    const c = kelas[k];
    const datang = c.hadir + c.lewat;
    baris.push([k, c.jumlah, c.hadir, c.lewat, c.jumlah - datang,
      c.jumlah ? Math.round(datang / c.jumlah * 1000) / 10 : 0]);
  });
  sh.getRange(1, 1, baris.length, 6).setValues(baris);
  sh.getRange(1, 1).setFontWeight('bold').setFontSize(13);
  sh.getRange(2, 1, 1, 6).setFontWeight('bold');

  const mula = baris.length + 2;
  sh.getRange(mula, 1, 1, 2).setValues([['Murid tidak hadir', 'Kelas']]).setFontWeight('bold');
  tidakHadir.sort(function (a, b) { return a[1].localeCompare(b[1]) || a[0].localeCompare(b[0]); });
  if (tidakHadir.length) sh.getRange(mula + 1, 1, tidakHadir.length, 2).setValues(tidakHadir);

  sh.autoResizeColumns(1, 6);
  ss.setActiveSheet(sh);
}
