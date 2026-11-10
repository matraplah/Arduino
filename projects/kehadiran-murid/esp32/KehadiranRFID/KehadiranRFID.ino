/*
  Stesen Kehadiran Murid - ESP32 + RFID RC522
  ------------------------------------------
  Murid tap kad -> ESP32 baca UID -> hantar ke Google Apps Script
  -> rekod masuk Google Sheets -> LED/buzzer (dan LCD jika ada) beri maklum balas.

  Jika WiFi terputus, rekod disimpan sementara dalam memori (dengan masa
  tap sebenar) dan dihantar semula bila WiFi pulih.

  Library yang perlu dipasang (Arduino IDE > Library Manager):
    - "MFRC522" oleh GithubCommunity (miguelbalboa)
    - "LiquidCrystal I2C" oleh Frank de Brabander  (hanya jika USE_LCD = 1)

  Board: "ESP32 Dev Module" (pakej board "esp32" oleh Espressif).

  Sambungan RC522 -> ESP32:
    SDA(SS) -> GPIO 5     SCK  -> GPIO 18
    MOSI    -> GPIO 23    MISO -> GPIO 19
    RST     -> GPIO 4     3.3V -> 3V3 (JANGAN 5V)   GND -> GND
  Lain-lain:
    LED hijau  -> GPIO 25 (melalui perintang 220 ohm)
    LED merah  -> GPIO 26 (melalui perintang 220 ohm)
    Buzzer aktif (+) -> GPIO 27
    LCD I2C 16x2: SDA -> GPIO 21, SCL -> GPIO 22, VCC -> 5V (VIN)
*/

#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <SPI.h>
#include <MFRC522.h>
#include <time.h>
#include "secrets.h"   // salin dari secrets.example.h

// ====== TETAPAN ======
#define USE_LCD 0              // 1 jika anda ada LCD I2C 16x2
#define LCD_ADDR 0x27          // cuba 0x3F jika LCD tidak keluar apa-apa

const uint8_t PIN_SS = 5;
const uint8_t PIN_RST = 4;
const uint8_t PIN_LED_HIJAU = 25;
const uint8_t PIN_LED_MERAH = 26;
const uint8_t PIN_BUZZER = 27;

const uint32_t ABAI_KAD_SAMA_MS = 10000;   // abaikan kad sama dalam 10 saat
const uint32_t SELANG_HANTAR_SEMULA_MS = 5000;
const long ZON_MASA_SAAT = 8 * 3600;       // GMT+8 Malaysia
// =====================

#if USE_LCD
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(LCD_ADDR, 16, 2);
#endif

MFRC522 rfid(PIN_SS, PIN_RST);

// ---- Baris gilir rekod yang belum berjaya dihantar ----
struct Rekod {
  char uid[21];
  time_t ts;   // 0 jika masa belum disegerakkan
};
const int SAIZ_GILIR = 150;
Rekod gilir[SAIZ_GILIR];
int gilirKepala = 0, gilirBilangan = 0;

char uidTerakhir[21] = "";
uint32_t masaTapTerakhir = 0;
uint32_t masaCubaHantar = 0;

// ---------------------------------------------------------------------------

void paparan(const String &b1, const String &b2 = "") {
  Serial.println(b1 + (b2.length() ? " | " + b2 : ""));
#if USE_LCD
  lcd.clear();
  lcd.setCursor(0, 0); lcd.print(b1.substring(0, 16));
  lcd.setCursor(0, 1); lcd.print(b2.substring(0, 16));
#endif
}

void bunyi(int kali, int lamaMs, uint8_t led) {
  for (int i = 0; i < kali; i++) {
    digitalWrite(led, HIGH);
    digitalWrite(PIN_BUZZER, HIGH);
    delay(lamaMs);
    digitalWrite(PIN_BUZZER, LOW);
    if (i < kali - 1) { digitalWrite(led, LOW); delay(100); }
  }
  delay(600);
  digitalWrite(led, LOW);
}

void paparSedia() {
  paparan("Sila tap kad", WiFi.status() == WL_CONNECTED
          ? (gilirBilangan ? "Belum hantar:" + String(gilirBilangan) : NAMA_STESEN)
          : "WiFi terputus");
}

bool masaSah() { return time(nullptr) > 1700000000; }

String urlEncode(const char *s) {
  String out;
  const char *hex = "0123456789ABCDEF";
  for (; *s; s++) {
    char c = *s;
    if (isalnum((unsigned char)c) || c == '-' || c == '_' || c == '.' || c == '~') out += c;
    else { out += '%'; out += hex[(c >> 4) & 0xF]; out += hex[c & 0xF]; }
  }
  return out;
}

// Ambil nilai teks ringkas dari JSON, cth. ambilJson(body, "nama")
String ambilJson(const String &body, const char *kunci) {
  String cari = String("\"") + kunci + "\":\"";
  int a = body.indexOf(cari);
  if (a < 0) return "";
  a += cari.length();
  int b = body.indexOf('"', a);
  return b < 0 ? "" : body.substring(a, b);
}

// Hantar satu rekod. Pulangkan isi jawapan JSON, atau "" jika gagal (rangkaian).
String hantar(const Rekod &r) {
  if (WiFi.status() != WL_CONNECTED) return "";
  WiFiClientSecure client;
  client.setInsecure();  // ringkas; sambungan masih disulitkan
  HTTPClient http;
  String url = String(SCRIPT_URL) + "?key=" + urlEncode(API_KEY) +
               "&uid=" + r.uid + "&stesen=" + urlEncode(NAMA_STESEN);
  if (r.ts) url += "&ts=" + String((long)r.ts);

  http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS);  // Google buat redirect
  http.setTimeout(15000);
  if (!http.begin(client, url)) return "";
  int kod = http.GET();
  String body = (kod == 200) ? http.getString() : "";
  http.end();
  Serial.printf("HTTP %d: %s\n", kod, body.c_str());
  return body;
}

void masukGilir(const Rekod &r) {
  if (gilirBilangan == SAIZ_GILIR) {  // penuh: buang yang paling lama
    gilirKepala = (gilirKepala + 1) % SAIZ_GILIR;
    gilirBilangan--;
  }
  gilir[(gilirKepala + gilirBilangan) % SAIZ_GILIR] = r;
  gilirBilangan++;
}

// Proses jawapan server dan beri maklum balas kepada murid.
void maklumBalas(const String &body) {
  String status = ambilJson(body, "status");
  String nama = ambilJson(body, "nama");
  if (status == "ok") {
    String k = ambilJson(body, "kehadiran");
    paparan(nama, k + " " + ambilJson(body, "masa").substring(0, 5));
    bunyi(1, 150, k == "Lewat" ? PIN_LED_MERAH : PIN_LED_HIJAU);
  } else if (status == "sudah_hadir") {
    paparan(nama, "Sudah direkod");
    bunyi(2, 80, PIN_LED_HIJAU);
  } else if (status == "tidak_dikenali") {
    paparan("Kad tidak", "berdaftar");
    bunyi(1, 800, PIN_LED_MERAH);
  } else {
    paparan("Ralat server", ambilJson(body, "mesej"));
    bunyi(3, 80, PIN_LED_MERAH);
  }
}

void prosesTap(const char *uid) {
  Rekod r;
  strncpy(r.uid, uid, sizeof(r.uid) - 1);
  r.uid[sizeof(r.uid) - 1] = 0;
  r.ts = masaSah() ? time(nullptr) : 0;

  // Rekod lama mesti dihantar dulu supaya susunan masa kekal.
  if (gilirBilangan == 0) {
    paparan("Membaca...", uid);
    String body = hantar(r);
    if (body.length()) { maklumBalas(body); return; }
  }
  masukGilir(r);
  paparan("Diterima", "Hantar kemudian");
  digitalWrite(PIN_LED_MERAH, HIGH);
  bunyi(1, 150, PIN_LED_HIJAU);
  digitalWrite(PIN_LED_MERAH, LOW);
}

void hantarSemulaGilir() {
  if (!gilirBilangan || WiFi.status() != WL_CONNECTED) return;
  if (millis() - masaCubaHantar < SELANG_HANTAR_SEMULA_MS) return;
  masaCubaHantar = millis();
  String body = hantar(gilir[gilirKepala]);
  if (!body.length()) return;   // masih gagal, cuba lagi nanti
  // Berjaya sampai ke server (apa pun statusnya) - buang dari gilir.
  gilirKepala = (gilirKepala + 1) % SAIZ_GILIR;
  gilirBilangan--;
  paparSedia();
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_LED_HIJAU, OUTPUT);
  pinMode(PIN_LED_MERAH, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);

#if USE_LCD
  lcd.init();
  lcd.backlight();
#endif

  SPI.begin();  // SCK 18, MISO 19, MOSI 23
  rfid.PCD_Init();
  byte versi = rfid.PCD_ReadRegister(MFRC522::VersionReg);
  if (versi == 0x00 || versi == 0xFF) {
    paparan("RC522 tiada!", "Semak wayar");
    bunyi(3, 300, PIN_LED_MERAH);
  }

  WiFi.mode(WIFI_STA);
  WiFi.setAutoReconnect(true);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  paparan("Sambung WiFi...", WIFI_SSID);
  uint32_t mula = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - mula < 20000) delay(250);

  configTime(ZON_MASA_SAAT, 0, "pool.ntp.org", "time.google.com");
  if (WiFi.status() == WL_CONNECTED) {
    paparan("WiFi OK", WiFi.localIP().toString());
    mula = millis();
    while (!masaSah() && millis() - mula < 10000) delay(200);
  }
  bunyi(1, 100, PIN_LED_HIJAU);
  paparSedia();
}

void loop() {
  static uint32_t semakWifi = 0;
  static wl_status_t wifiLama = WL_IDLE_STATUS;
  if (millis() - semakWifi > 2000) {
    semakWifi = millis();
    if (WiFi.status() != wifiLama) { wifiLama = WiFi.status(); paparSedia(); }
  }

  hantarSemulaGilir();

  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;

  char uid[21] = "";
  for (byte i = 0; i < rfid.uid.size && i < 10; i++) {
    sprintf(uid + i * 2, "%02X", rfid.uid.uidByte[i]);
  }
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();

  if (strcmp(uid, uidTerakhir) == 0 && millis() - masaTapTerakhir < ABAI_KAD_SAMA_MS) return;
  strcpy(uidTerakhir, uid);
  masaTapTerakhir = millis();

  Serial.printf("Kad: %s\n", uid);
  prosesTap(uid);
  delay(800);
  paparSedia();
}
