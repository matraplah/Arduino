# Sistem Kehadiran Murid (ESP32 + RFID + Google Sheets)

Murid tap kad RFID di stesen ESP32. Rekod terus masuk ke Google Sheets,
dengan status **Hadir** atau **Lewat**. Laporan kehadiran ikut kelas, termasuk
senarai murid tidak hadir, boleh dijana dengan satu klik.

```
[Kad murid] -> [RC522 + ESP32] --WiFi/HTTPS--> [Google Apps Script] -> [Google Sheets]
                 LED / buzzer / LCD  <---- nama & status ----
```

## Ciri-ciri
- Status **Hadir** atau **Lewat** ditentukan oleh masa tap (tetapkan `MASA_LEWAT`)
- Tap kali kedua pada hari yang sama tidak direkod semula
- Kad yang belum berdaftar direkod dalam tab *Kad Tidak Dikenali*, jadi
  mudah untuk dapatkan UID kad baru
- **Bila WiFi terputus**, sehingga 150 rekod disimpan dalam memori ESP32
  dengan masa tap sebenar, dan dihantar bila WiFi pulih
- Boleh pasang beberapa stesen (contohnya Pagar Utama dan Pagar Belakang) ke
  Sheet yang sama
- Menu **Kehadiran**: laporan hari ini dan laporan ikut tarikh

## Barang diperlukan (lebih kurang RM50–80 satu stesen)
| Barang | Nota |
|---|---|
| ESP32 Dev Board | |
| Modul RFID RC522 13.56MHz | biasanya datang dengan 1 kad + 1 keychain |
| Kad RFID MIFARE 13.56MHz | satu untuk setiap murid. Kad matrik sekolah yang berjenis MIFARE juga boleh dipakai. |
| LED hijau, LED merah, 2 x perintang 220Ω | |
| Buzzer **aktif** 5V/3.3V | |
| (Pilihan) LCD 16x2 I2C | untuk papar nama murid |
| Adapter USB 5V + kotak | |

## Sambungan wayar

| RC522 | ESP32 |
|---|---|
| SDA (SS) | GPIO 5 |
| SCK | GPIO 18 |
| MOSI | GPIO 23 |
| MISO | GPIO 19 |
| RST | GPIO 4 |
| 3.3V | **3V3** (jangan sambung ke 5V!) |
| GND | GND |

| Lain-lain | ESP32 |
|---|---|
| LED hijau (+), melalui perintang 220Ω | GPIO 25 |
| LED merah (+), melalui perintang 220Ω | GPIO 26 |
| Buzzer aktif (+) | GPIO 27 |
| LCD I2C SDA / SCL | GPIO 21 / GPIO 22 |
| LCD VCC | VIN (5V) |

Semua kaki (−) dan GND disambung ke GND ESP32.

---

## Langkah 1: Sediakan Google Sheets
1. Buka [sheets.new](https://sheets.new) dengan akaun Google sekolah dan namakan
   Sheet itu, contohnya "Kehadiran Murid 2026".
2. Pergi ke **File > Settings** dan tetapkan *Time zone* kepada
   **(GMT+08:00) Kuala Lumpur**.
3. Pergi ke **Extensions > Apps Script**.
4. Padam kod sedia ada, kemudian tampal isi [`apps-script/Code.gs`](apps-script/Code.gs).
5. Tukar `API_KEY` kepada kunci rahsia anda sendiri, contohnya `SMK-xY82kq-2026`.
   Tukar juga `MASA_LEWAT` jika perlu.
6. Klik **Save**. Kembali ke Sheet dan refresh page. Menu **Kehadiran** akan
   muncul. Klik **Kehadiran > 1. Sediakan tab** dan benarkan akses bila diminta.
7. Isi tab **Murid** dengan UID, Nama dan Kelas. Langkah 4 di bawah
   menunjukkan cara dapatkan UID.

## Langkah 2: Deploy sebagai Web App
1. Dalam Apps Script, klik **Deploy > New deployment**.
2. Untuk *Select type*, pilih **Web app**.
3. Tetapkan *Execute as* kepada **Me** dan *Who has access* kepada **Anyone**.
4. Klik **Deploy**, kemudian salin **Web app URL** (berakhir dengan `/exec`).

> Untuk uji, buka URL ini di browser:
> `URL_ANDA?key=KUNCI_ANDA&uid=TEST1234&stesen=Ujian`
> Anda patut nampak `{"status":"tidak_dikenali",...}` dan satu baris baru dalam
> tab *Kad Tidak Dikenali*.

> **Penting:** setiap kali anda ubah `Code.gs`, buat
> **Deploy > Manage deployments > Edit > Version: New version**. Jika tidak,
> perubahan anda tidak akan berkuat kuasa.

## Langkah 3: Muat naik kod ke ESP32
1. Pasang [Arduino IDE](https://www.arduino.cc/en/software).
2. Pergi ke **File > Preferences > Additional boards manager URLs** dan tambah:
   `https://espressif.github.io/arduino-esp32/package_esp32_index.json`
3. Di **Tools > Board > Boards Manager**, cari **esp32** (by Espressif) dan
   klik Install.
4. Di **Library Manager**, pasang **MFRC522** (by GithubCommunity). Jika anda
   guna LCD, pasang juga **LiquidCrystal I2C** (by Frank de Brabander).
5. Buka `esp32/KehadiranRFID/KehadiranRFID.ino`.
6. Salin `secrets.example.h` dan namakan sebagai **`secrets.h`** dalam folder
   yang sama. Isi nama dan kata laluan WiFi, `SCRIPT_URL` (dari Langkah 2),
   `API_KEY` (mesti sama dengan dalam `Code.gs`) dan `NAMA_STESEN`.
7. Jika anda ada LCD, tukar `#define USE_LCD 0` kepada `1`.
8. Pilih **Tools > Board > ESP32 Dev Module** dan port yang betul, kemudian
   klik **Upload**.
9. Buka **Serial Monitor** pada 115200 baud untuk lihat status.

## Langkah 4: Daftar kad murid
1. Tap kad baru di stesen. Buzzer akan berbunyi panjang dan LED merah menyala.
2. UID kad itu akan muncul dalam tab **Kad Tidak Dikenali**.
3. Salin UID tersebut ke tab **Murid**, kemudian isi Nama dan Kelas.
4. Tap semula. Kali ini nama murid akan direkod.

Untuk daftar ramai murid sekaligus: tap kad satu per satu ikut susunan senarai
nama, kemudian salin semua UID dari *Kad Tidak Dikenali* ke tab *Murid*.

## Maksud isyarat
| Isyarat | Maksud |
|---|---|
| Hijau + 1 bip pendek | Hadir, berjaya direkod |
| Merah + 1 bip pendek | Lewat, berjaya direkod |
| Hijau + 2 bip | Sudah direkod tadi |
| Merah + bip panjang | Kad belum berdaftar |
| Hijau & merah + 1 bip | WiFi tiada; rekod disimpan dan akan dihantar kemudian |
| Merah + 3 bip | Ralat server (contohnya kunci API salah) |

## Laporan
Dalam Sheet, klik menu **Kehadiran**:
- **Laporan hari ini**: jumlah Hadir, Lewat dan Tidak Hadir serta peratus
  kehadiran setiap kelas, dan senarai nama murid yang tidak hadir
- **Laporan ikut tarikh...**: laporan yang sama untuk tarikh lain

## Masalah biasa
| Masalah | Penyelesaian |
|---|---|
| "RC522 tiada!" | Semak wayar SPI. Pastikan modul guna 3.3V. |
| HTTP -1 / gagal hantar | Semak WiFi. Pastikan `SCRIPT_URL` berakhir dengan `/exec`. |
| "Kunci salah" | `API_KEY` dalam `secrets.h` dan `Code.gs` mesti sama. |
| Ubah Code.gs tapi tiada kesan | Deploy versi baru (rujuk nota di Langkah 2). |
| Masa salah dalam Sheet | Tetapkan zon masa Sheet kepada Kuala Lumpur (Langkah 1). |
| Tiada paparan di LCD | Tukar `LCD_ADDR` kepada `0x3F`. Laraskan skru kontras di belakang LCD. |
| WiFi sekolah guna page login (captive portal) | ESP32 tidak boleh login melalui page itu. Guna WiFi biasa (WPA2) atau hotspot. |

## Privasi dan peraturan
- Ini **alat bantu** sahaja. Kehadiran rasmi tetap perlu direkod dalam **APDM**.
- Data murid dilindungi oleh **PDPA 2010**. Dapatkan kebenaran pentadbir,
  kongsi Sheet dengan guru yang berkenaan sahaja, dan jangan simpan maklumat
  yang tidak perlu seperti nombor IC.
- Rahsiakan `API_KEY` dan URL web app. Sesiapa yang ada kedua-duanya boleh
  menghantar rekod palsu.
- Kad RFID boleh dipinjam kepada kawan. Untuk kawalan lebih ketat, letakkan
  stesen di tempat yang diawasi oleh guru bertugas.
