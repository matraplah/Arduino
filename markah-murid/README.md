# Semakan Markah Sains 2026 (SMK Seri Pagi)

Web app ringkas: murid masukkan No. KP, nampak markah **Awal Tahun, Pertengahan Tahun, Akhir Tahun** (markah total, gred, TP) mereka sendiri sahaja. Data dibaca terus dari Google Sheets "MARKAH PEPERIKSAAN TAHUN 2026 SMKSP".

## Cara pasang (lebih kurang 10 minit)

1. Buka spreadsheet → **Extensions → Apps Script**.
2. Padam kod sedia ada dalam `Code.gs`, tampal isi fail `Code.gs` ini.
3. Klik **+ → HTML**, namakan `Index` (tepat begitu), tampal isi `Index.html`.
4. Simpan. Pilih fungsi `sediakanSenaraiMurid` → **Run** → benarkan akses (Allow).
   - Sheet baru **SENARAI MURID** akan dicipta dengan NAMA dan KELAS semua murid.
5. Dalam sheet **SENARAI MURID**, isi **No. KP** murid dalam lajur A (boleh dengan atau tanpa sempang).
6. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Klik **Deploy**, salin URL dan kongsi dengan murid.

Bila ada murid baru, jalankan semula `sediakanSenaraiMurid` (No. KP yang sudah diisi tidak akan dipadam). Markah dibaca secara langsung, jadi bila guru kemas kini markah, murid terus nampak yang terkini tanpa perlu deploy semula.

## Lajur markah yang digunakan

| Kelas | Awal Tahun | Pertengahan Tahun | Akhir Tahun |
|---|---|---|---|
| 3 DAISY / 3 JASMIN | F (Total Kuiz 1) | K (Total PPSA) | S (Full Total UASA) |
| 3 ALAMANDA | G (Kuiz 1 Total) | L (Total UPSA) | V (Full Total) |
| 4 SAINS | F (Total Kuiz 1) | R (All Round PPSA) | AE (Akhir Tahun) |
| 5 SAINS | F (Total Kuiz 1) | O (PPSA) | W (Trials) |

Jika susunan lajur berubah, ubah nombor dalam `PETA_KELAS` di atas `Code.gs`. Gred diambil dari sheet; jika tiada lajur gred, ia dikira dengan skala A+ 90 … G 0–39.

## Keselamatan

- Carian dibuat di server, jadi murid tidak dapat melihat data murid lain melalui "view source".
- No. KP bukan kata laluan yang kuat: sesiapa yang tahu No. KP murid boleh melihat markahnya.
