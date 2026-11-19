# Semakan Markah Sains 2026 (SMK Seri Pagi)

Web app: murid masukkan No. KP dan nampak markah Awal, Pertengahan dan Akhir Tahun mereka sendiri sahaja.
Sheet **SENARAI MURID** (No. KP murid) sudah disediakan dalam spreadsheet markah.

## Cara pasang (sekali sahaja, lebih kurang 10 minit, guna komputer/laptop)

1. Buka spreadsheet **MARKAH PEPERIKSAAN TAHUN 2026 SMKSP**.
2. Klik menu **Extensions → Apps Script**. Satu tab baru terbuka.
3. Di kiri, klik **Code.gs**. Padam semua kod yang ada, kemudian tampal semua isi fail `Code.gs`.
4. Klik **+** (sebelah "Files") → **HTML**. Namakan `Index` (tanpa .html). Padam isinya, tampal semua isi fail `Index.html`.
5. Klik ikon **Save** (disket).
6. Klik **Deploy → New deployment**.
   - Klik ikon gear ⚙ di sebelah "Select type" → pilih **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone** (jika tiada pilihan ini, pilih **Anyone within moe-dl.edu.my**. Murid perlu log masuk akaun DELIMa dahulu.)
   - Klik **Deploy**.
7. Klik **Authorize access** → pilih akaun cikgu → jika keluar "Google hasn't verified this app", klik **Advanced → Go to ... (unsafe)** → **Allow**. Ini skrip cikgu sendiri, jadi selamat.
8. Salin **Web app URL** (bermula `https://script.google.com/macros/s/...`). Itulah link untuk murid.

Selepas ini, bila cikgu edit markah dalam sheet, murid terus nampak markah baru. Tidak perlu buat apa-apa lagi.

## Jika kod diubah kemudian

Tampal kod baru → Save → **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy**. Link kekal sama.

## Perkara yang boleh diubah dalam `Code.gs`

- `PETA_KELAS`: lajur markah bagi setiap kelas.
- `PEMENANG_PRESENTATION`: senarai kumpulan pemenang presentation dan hadiah.
- No. KP murid baru: tambah terus dalam sheet **SENARAI MURID** (NO KP | NAMA | KELAS). Nama mesti sama seperti dalam sheet kelas.

## Keselamatan

- Carian dibuat di server Google; murid tidak dapat melihat data murid lain.
- No. KP bukan kata laluan yang kuat: sesiapa yang tahu No. KP murid boleh melihat markahnya.
