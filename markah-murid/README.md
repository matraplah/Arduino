# Semakan Markah Sains 2026 (SMK Seri Pagi)

Murid masukkan No. KP dan nampak markah Awal, Pertengahan dan Akhir Tahun mereka sendiri sahaja.

Sistem ini ada 2 bahagian:

| Bahagian | Fail | Tempat | Fungsi |
|---|---|---|---|
| Enjin carian | `apps-script/Code.gs` | Google Apps Script (dalam spreadsheet markah) | Baca markah dari Google Sheet, pulangkan markah murid itu sahaja |
| Halaman web | `netlify/index.html` | Netlify | Halaman login dan paparan markah yang murid buka |

Sheet **SENARAI MURID** (No. KP murid) sudah ada dalam spreadsheet markah.

## Langkah 1: Pasang enjin di Apps Script (sekali sahaja)

1. Buka spreadsheet **MARKAH PEPERIKSAAN TAHUN 2026 SMKSP** → **Extensions → Apps Script**.
2. Klik **Code.gs**, padam semua kod, tampal semua isi `apps-script/Code.gs`. Klik **Save**.
3. **Deploy → New deployment** → ⚙ → **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone** (wajib "Anyone" supaya halaman Netlify boleh berhubung)
   - Klik **Deploy** → **Authorize access** → pilih akaun cikgu → jika keluar amaran, klik **Advanced → Go to … (unsafe) → Allow**.
4. Salin **Web app URL** (bermula `https://script.google.com/macros/s/...`).
5. Uji: buka URL itu dalam browser. Patut keluar `{"ok":true,"mesej":"Enjin Semakan Markah aktif."}`.

> Jika pilihan **Anyone** tiada (akaun moe-dl.edu.my kadang-kadang disekat oleh pentadbir), beritahu saya. Ada cara lain.

## Langkah 2: Letak URL dalam halaman web

Buka `netlify/index.html` dengan Notepad, cari baris ini:

```
var API_URL = '';
```

Tampal URL di antara tanda petik:

```
var API_URL = 'https://script.google.com/macros/s/XXXX/exec';
```

Simpan. Selagi `API_URL` kosong, halaman hanya tunjuk data contoh.

## Langkah 3: Naikkan ke Netlify

1. Buka **app.netlify.com/drop** (log masuk/daftar percuma).
2. Seret (drag) **folder `netlify`** ke dalam kotak di halaman itu.
3. Netlify beri link (contoh `https://nama-rawak.netlify.app`). Boleh tukar nama di **Site configuration → Change site name**.
4. Kongsi link itu dengan murid.

## Selepas siap

- **Edit markah dalam Google Sheet** → murid terus nampak markah baru. Tiada langkah lain.
- **Tambah murid baru** → tambah baris dalam sheet **SENARAI MURID** (NO KP | NAMA | KELAS). Nama mesti sama seperti dalam sheet kelas.
- **Tukar pemenang presentation atau lajur markah** → ubah `PEMENANG_PRESENTATION` / `PETA_KELAS` dalam Code.gs di Apps Script → Save → **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy**. URL kekal sama; Netlify tidak perlu diubah.
- **Tukar rupa halaman** → ubah `netlify/index.html` → seret semula folder ke Netlify (**Deploys → drag and drop**).

## Keselamatan

- Halaman Netlify tidak mengandungi sebarang markah atau No. KP. Semua data kekal dalam Google Sheet.
- No. KP bukan kata laluan yang kuat: sesiapa yang tahu No. KP murid boleh melihat markahnya.
