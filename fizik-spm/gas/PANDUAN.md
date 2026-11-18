# Panduan: Fizik SPM Interaktif + Google Sheets (Apps Script)

Data murid disimpan dalam Google Sheet cikgu. Laman (di Netlify atau mana-mana hos) menghantar jawapan ke Apps Script, yang menyemak jawapan, mengira mata dan menyimpan dalam Sheet.

## A. Sediakan Google Sheet dan Apps Script (sekali sahaja)

1. Buka **Google Sheets** dan cipta spreadsheet baharu, contohnya *Fizik SPM - Markah*.
2. Menu **Extensions → Apps Script**.
3. Padam semua kod dalam `Code.gs`, kemudian tampal **keseluruhan** kandungan fail `gas/Kod.gs`. Klik ikon simpan.
4. Kiri: **Project Settings** (ikon gear) → bahagian **Script properties** → **Add script property**:
   - Property: `GURU_KATA_LALUAN`
   - Value: kata laluan guru (sekurang-kurangnya 8 aksara)
   - Klik **Save script properties**.
5. Kanan atas: **Deploy → New deployment**.
   - Klik ikon gear di sebelah *Select type* → pilih **Web app**.
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**
   - Klik **Deploy**, kemudian **Authorize access** dan benarkan akaun Google cikgu. Jika Google memaparkan "Google hasn't verified this app", klik **Advanced → Go to ... (unsafe)**; ini skrip cikgu sendiri.
6. Salin **Web app URL** (berakhir dengan `/exec`).
7. Uji: buka URL itu dalam tab baharu. Ia patut memaparkan `"Pelayan Fizik SPM (Google Apps Script) berfungsi."`

## B. Sambungkan laman kepada Apps Script

1. Di GitHub, buka fail `fizik-spm/web/config.js` → ikon pensel (Edit).
2. Tampal URL di antara tanda petik:
   ```
   window.FIZIK_GAS_URL = 'https://script.google.com/macros/s/XXXX/exec';
   ```
3. Commit. Netlify akan deploy semula sendiri.
   - Jika cikgu memuat naik laman secara seret dan lepas, sunting `config.js` dalam folder `web` pada komputer dan seret folder `web` sekali lagi.

## C. Guna

- **Guru**: buka `https://nama-laman.netlify.app/#guru` → log masuk dengan kata laluan → daftar murid (satu-satu atau tampal dari Excel).
- Guru juga boleh mendaftar murid **terus dalam Sheet**: tab *Murid*, isi lajur A (No IC), B (Nama) dan C (Kelas) pada baris baharu. Biarkan lajur lain kosong.
- **Murid**: tab *Profil* atau *Log masuk* → masukkan no. IC.

## Perhatian

- **Jangan sunting lajur J** ("Data (jangan sunting)"), kerana jawapan murid disimpan di situ.
- Lajur Mata, Markah dan Kemajuan dikira semula oleh pelayan setiap kali murid menjawab.
- Selepas menukar kod dalam `Kod.gs`, buat **Deploy → Manage deployments → Edit (pensel) → Version: New version → Deploy**, supaya URL kekal sama.
- Kata laluan boleh ditukar dalam halaman guru. Selepas itu, `GURU_KATA_LALUAN` dalam Script properties dipadam sendiri dan diganti dengan cincangan.
- Jika terlupa kata laluan: dalam Script properties, padam `GURU_HASH` dan `GURU_GARAM`, kemudian tambah semula `GURU_KATA_LALUAN`.
- Sesi log masuk tamat selepas 6 jam.
