# Fizik SPM Interaktif

Laman pembelajaran Fizik KSSM Tingkatan 4 dan 5: penerangan, visual interaktif, Fokus SPM dan latihan berbentuk permainan dengan mata, pangkat, lencana dan kedudukan kelas.

## Pilihan pelayan

- **Google Sheets + Apps Script (disyorkan, percuma):** ikut `gas/PANDUAN.md`. Data murid tersimpan dalam Google Sheet cikgu.
- **Netlify Functions + Blobs:** ikut langkah di bawah dan biarkan `web/config.js` kosong.

## Memasang di Netlify

1. Dalam Netlify, pilih **Add new site → Import an existing project** dan sambungkan repositori GitHub ini.
2. Tetapan bina:
   - **Branch to deploy:** cabang yang mengandungi folder `fizik-spm`
   - **Base directory:** `fizik-spm`
   - **Build command:** biarkan seperti dalam `netlify.toml`
   - **Publish directory:** `fizik-spm/web` (diisi automatik daripada `netlify.toml`)
3. Sebelum deploy, buka **Site configuration → Environment variables** dan tambah:
   - `GURU_KATA_LALUAN` = kata laluan guru (sekurang-kurangnya 8 aksara)
4. Deploy. Laman guru: `https://<nama-laman>.netlify.app/#guru`.
5. Selepas log masuk kali pertama, guru boleh menukar kata laluan dalam halaman guru. Kata laluan baharu disimpan sebagai cincangan dan menggantikan `GURU_KATA_LALUAN`.

Data murid disimpan dalam **Netlify Blobs** (stor `fizik-spm`) dan hanya dibaca oleh fungsi pelayan `netlify/functions/api.mjs`.

## Keselamatan

- No. IC penuh hanya dihantar kepada guru yang log masuk; murid hanya menerima nama dan mata rakan sekelas.
- Pelayan menyemak jawapan dengan kunci jawapannya sendiri, mengira mata, dan menolak sebarang perubahan pada jawapan yang sudah disemak.
- Log masuk guru dihadkan kepada 5 percubaan salah setiap 15 minit; log masuk murid kepada 30 percubaan gagal setiap 10 minit (ikut alamat IP).
- Sesi guru tamat selepas 8 jam; sesi murid selepas 12 jam.
- Murid log masuk dengan no. IC sahaja, jadi sesiapa yang tahu IC seorang murid boleh log masuk sebagai murid itu.

## Mengubah kandungan

Sunting fail dalam `src/`, kemudian jalankan:

```
python3 build.py
```

Ini menghasilkan `web/index.html` (laman) dan `netlify/functions/kunci.mjs` (kunci jawapan untuk pelayan). Commit kedua-dua fail dan push; Netlify akan deploy semula.
