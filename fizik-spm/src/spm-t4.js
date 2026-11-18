'use strict';
/* ===== Kandungan fokus SPM Tingkatan 4 =====
   sub: penerangan ringkas (baris bermula "!" = isi yang kerap keluar SPM)
   contoh: pengiraan langkah demi langkah
   fokus: topik (bintang 3 = sangat kerap dalam Koleksi K2 Trial SPM 2025), takrif wajib hafal, corak soalan, bank ciri
   reka: soalan reka bentuk 10 markah (interaktif)  */
function SPM(id, o) { Object.assign(BAB.find(b => b.id === id), o); }

SPM('t4-b1', {
  sub: [
    { n: '1.1', t: 'Kuantiti Fizik', ingat: 'Kuantiti asas: 7 sahaja. Yang lain semuanya kuantiti terbitan.', isi: [
      '!**Kuantiti asas** ialah kuantiti yang tidak boleh diterbitkan daripada kuantiti lain. Ada 7: panjang (m), jisim (kg), masa (s), suhu (K), arus (A), keamatan berluminositi (cd), kuantiti bahan (mol).',
      '**Kuantiti terbitan** = gabungan kuantiti asas. Contoh: halaju ($"m s"^{-1}$), daya ($"kg m s"^{-2}$), tekanan ($"kg m"^{-1} "s"^{-2}$).',
      '!Cara cari unit terbitan: tulis rumus, gantikan unit asas, ringkaskan. Contoh: $F = ma$ → $"kg" × "m s"^{-2}$.',
      '!**Skalar** = magnitud sahaja (jarak, laju, jisim, masa, tenaga). **Vektor** = magnitud + arah (sesaran, halaju, pecutan, daya, momentum).'
    ] },
    { n: '1.2', t: 'Penyiasatan Saintifik', ingat: 'Garis lurus melalui asalan = berkadar terus. Tidak melalui asalan = bertambah/berkurang secara linear.', isi: [
      '!Tafsir graf: garis lurus **melalui asalan** → $y$ berkadar terus dengan $x$. Garis lurus **tidak melalui asalan** → $y$ bertambah secara linear dengan $x$.',
      '!Lima analisis graf: hubungan, **kecerunan**, **luas di bawah graf**, **interpolasi** (baca nilai di dalam julat) dan **ekstrapolasi** (panjangkan garis).',
      'Kecerunan: lukis segi tiga besar (sekurang-kurangnya separuh garis) dan tulis unit.',
      'Pemboleh ubah: **dimanipulasikan** (diubah), **bergerak balas** (diukur), **dimalarkan** (ditetapkan).',
      'Bandul ringkas: ukur masa 20 ayunan untuk kurangkan ralat. $T^2 = {4π^2}/{g}l$, jadi $g = {4π^2}/{"kecerunan"}$.'
    ] }
  ],
  contoh: [
    { t: 'Cari unit terbitan', q: 'Tekanan $P = {F}/{A}$. Terbitkan unit S.I. tekanan dalam sebutan unit asas.', l: [
      'Unit daya: $F = ma$ → $"kg" × "m s"^{-2} = "kg m s"^{-2}$.',
      'Unit luas: $A$ → $"m"^2$.',
      'Bahagi: ${"kg m s"^{-2}}/{"m"^2}$.'
    ], j: '$"kg m"^{-1} "s"^{-2}$ (bersamaan pascal, Pa)' },
    { t: 'Nilai g daripada kecerunan graf', q: 'Graf $T^2$ melawan $l$ bagi bandul ringkas ialah garis lurus melalui asalan dengan kecerunan $4.03 "s"^2 "m"^{-1}$. Hitung $g$.', l: [
      'Rumus: $T^2 = {4π^2}/{g}l$, maka kecerunan $= {4π^2}/{g}$.',
      'Susun semula: $g = {4π^2}/{"kecerunan"}$.',
      'Ganti: $g = {39.48}/{4.03}$.'
    ], j: '$g = 9.80 "m s"^{-2}$' }
  ],
  fokus: {
    topik: [['Tafsir graf (kecerunan, luas, ekstrapolasi)', 3], ['Kuantiti asas & terbitan, unit', 2], ['Skalar & vektor', 2], ['Pemboleh ubah eksperimen', 2]],
    takrif: [
      ['Kuantiti asas', 'Kuantiti fizik yang tidak boleh diterbitkan daripada kuantiti fizik yang lain.'],
      ['Kuantiti terbitan', 'Kuantiti fizik yang terdiri daripada gabungan kuantiti asas secara darab atau bahagi.'],
      ['Kuantiti skalar', 'Kuantiti fizik yang mempunyai magnitud sahaja.'],
      ['Kuantiti vektor', 'Kuantiti fizik yang mempunyai magnitud dan arah.']
    ],
    corak: [
      'Nyatakan kuantiti asas yang ditunjukkan oleh paksi graf (cth: masa).',
      'Namakan kuantiti yang diwakili oleh kecerunan atau luas di bawah graf.',
      'Terbitkan unit bagi suatu kuantiti (cth: unit $G$ ialah $"kg"^{-1} "m"^3 "s"^{-2}$).',
      'Ekstrapolasi graf untuk mencari nilai di luar julat data.'
    ],
    ciri: [
      ['Mengukur tempoh bandul', 'Ukur masa 20 ayunan, ulang dan ambil purata', 'Kurangkan ralat masa tindak balas manusia'],
      ['Mengukur masa larian', 'Guna pengesan elektronik / jam randik digital', 'Elak ralat masa tindak balas'],
      ['Membaca skala', 'Mata berserenjang dengan skala', 'Elak ralat paralaks']
    ]
  },
  reka: {
    s: 'Seorang murid mahu menentukan nilai $g$ dengan **jitu** menggunakan bandul ringkas. Pilih kaedah yang paling sesuai.',
    opsyen: ['P', 'Q', 'R', 'S'],
    aspek: [
      { a: 'Bilangan ayunan yang dimasa', v: ['1 ayunan', '20 ayunan', '20 ayunan', '1 ayunan'], ok: '20 ayunan', sebab: 'Ralat masa tindak balas dibahagi dengan 20, maka tempoh lebih jitu.' },
      { a: 'Alat pengukur masa', v: ['Jam randik digital', 'Jam dinding', 'Jam randik digital', 'Jam randik digital'], ok: 'Jam randik digital', sebab: 'Kepekaan tinggi (0.01 s).' },
      { a: 'Bilangan bacaan bagi setiap panjang', v: ['Dua kali, ambil purata', 'Sekali', 'Dua kali, ambil purata', 'Sekali'], ok: 'Dua kali, ambil purata', sebab: 'Purata mengurangkan ralat rawak.' },
      { a: 'Sudut ayunan', v: ['Kecil (< 10°)', 'Kecil (< 10°)', 'Kecil (< 10°)', 'Besar (40°)'], ok: 'Kecil (< 10°)', sebab: 'Rumus $T = 2π sqrt{{l}/{g}}$ hanya tepat untuk ayunan kecil.' }
    ],
    jawapan: 2
  }
});

SPM('t4-b2', {
  sub: [
    { n: '2.1', t: 'Gerakan Linear', ingat: 'Pilih persamaan gerakan berdasarkan kuantiti yang TIDAK diberi.', isi: [
      '!**Halaju** = kadar perubahan sesaran. **Pecutan** = kadar perubahan halaju: $a = {v − u}/{t}$.',
      '**Jarak** (skalar) ialah jumlah lintasan; **sesaran** (vektor) ialah jarak terpendek dari mula ke akhir dengan arah.',
      '!Empat persamaan gerakan (pecutan seragam): $v = u + at$, $s = {1}/{2}(u + v)t$, $s = ut + {1}/{2}at^2$, $v^2 = u^2 + 2as$.',
      'Pita detik 50 Hz: 1 detik = 0.02 s. Jarak antara titik bertambah → memecut.'
    ] },
    { n: '2.2', t: 'Graf Gerakan Linear', ingat: 'Graf v–t: kecerunan = pecutan, luas = sesaran.', isi: [
      '!Graf **s–t**: kecerunan = halaju. Garis mengufuk = pegun.',
      '!Graf **v–t**: kecerunan = pecutan; **luas di bawah graf = sesaran**. Garis mengufuk = halaju seragam.',
      'Kecerunan lebih curam → pecutan lebih besar.'
    ] },
    { n: '2.3', t: 'Gerakan Jatuh Bebas', ingat: 'Dalam vakum, bulu dan bola keluli jatuh serentak.', isi: [
      '!**Jatuh bebas**: objek jatuh di bawah pengaruh daya graviti sahaja.',
      '!Semua objek jatuh bebas dengan pecutan sama, $g = 9.81 "m s"^{-2}$, **tidak bergantung pada jisim**.',
      '!Dalam udara, objek dengan luas permukaan besar (kertas, bulu) mengalami **rintangan udara** lebih besar dan jatuh lebih lambat. Dalam **vakum** tiada rintangan udara, jadi semua jatuh serentak.',
      'Hitung: guna persamaan gerakan dengan $u = 0$ dan $a = g$. Contoh: $s = {1}/{2}gt^2$.'
    ] },
    { n: '2.4', t: 'Inersia', isi: [
      '!**Inersia**: kecenderungan objek untuk kekal pegun atau bergerak dengan halaju seragam (Hukum Newton Pertama).',
      '!Jisim bertambah → inersia bertambah. Contoh: lori berat sukar dihentikan; tali pinggang keledar menahan penumpang terhumban ke depan.'
    ] },
    { n: '2.5', t: 'Momentum', ingat: 'Tetapkan arah positif dahulu; halaju arah bertentangan diberi tanda negatif.', isi: [
      '!**Momentum** $p = mv$ (unit $"kg m s"^{-1}$, vektor).',
      '!**Prinsip keabadian momentum**: jumlah momentum sebelum = jumlah momentum selepas, jika tiada daya luar.',
      'Perlanggaran kenyal: $m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$. Tidak kenyal (melekat): $m_1u_1 + m_2u_2 = (m_1 + m_2)v$.',
      '!**Letupan / pelancaran roket**: momentum awal sifar → $0 = m_1v_1 + m_2v_2$. Gas ditolak ke belakang, roket bergerak ke hadapan.'
    ] },
    { n: '2.6–2.7', t: 'Daya, Impuls dan Daya Impuls', ingat: 'Masa impak panjang → daya impuls kecil.', isi: [
      '!**Hukum Newton Kedua**: $F = ma$. Jisim tetap: $a ∝ F$. Daya tetap: $a ∝ {1}/{m}$.',
      '!**Impuls** = perubahan momentum: $Ft = mv − mu$ (unit N s).',
      '!**Daya impuls** = kadar perubahan momentum dalam masa yang singkat: $F = {mv − mu}/{t}$.',
      '!Kurangkan daya impuls dengan **memanjangkan masa impak**: beg udara, zon remuk, tilam lompat tinggi, membengkokkan lutut.',
      'Tambah daya impuls dengan memendekkan masa impak: alu, tukul, kaki pemain bola sepak.',
      '**Hukum Newton Ketiga**: setiap daya tindakan ada daya tindak balas yang sama magnitud, bertentangan arah.'
    ] },
    { n: '2.8', t: 'Berat', isi: [
      '**Berat** $W = mg$ ialah daya graviti (unit N). Jisim (kg) tidak berubah di mana-mana; berat berubah mengikut $g$.'
    ] }
  ],
  contoh: [
    { t: 'Jatuh bebas', q: 'Sebuah roket air jatuh bebas dari ketinggian maksimum 80 m. Hitung (a) masa untuk sampai ke tanah, (b) halaju sebelum mencecah tanah.', l: [
      'Data: $u = 0$, $s = 80 "m"$, $a = g = 9.81 "m s"^{-2}$.',
      '(a) $s = ut + {1}/{2}at^2$ → $80 = {1}/{2}(9.81)t^2$ → $t = sqrt{{160}/{9.81}}$ = 4.04 s.',
      '(b) $v = u + at = 0 + 9.81 × 4.04$.'
    ], j: '(a) 4.04 s  (b) $39.6 "m s"^{-1}$' },
    { t: 'Impuls dan halaju lantunan', q: 'Bola 0.3 kg bergerak pada $60 "km j"^{-1}$ dipukul dengan daya 70 N selama 0.2 s dan melantun ke arah bertentangan. Hitung (a) impuls, (b) halaju lantunan.', l: [
      'Tukar unit: $60 "km j"^{-1} = {60}/{3.6} = 16.67 "m s"^{-1}$.',
      '(a) $J = Ft = 70 × 0.2 = 14 "N s"$ (arah bertentangan dengan gerakan asal).',
      '(b) Ambil arah asal positif: $−14 = 0.3(v − 16.67)$.',
      '$v = 16.67 − {14}/{0.3} = 16.67 − 46.67$.'
    ], j: '(a) 14 N s  (b) $v = −30.0 "m s"^{-1}$, iaitu $30.0 "m s"^{-1}$ ke arah bertentangan' }
  ],
  fokus: {
    topik: [['Momentum, letupan & roket', 3], ['Takrif halaju / pecutan + graf v–t', 3], ['Jatuh bebas & rintangan udara / vakum', 3], ['Daya impuls (beg udara, zon remuk)', 2], ['$F = ma$ (hubung kait jisim & pecutan)', 2], ['Soalan reka bentuk: kenderaan laju & selamat', 2]],
    takrif: [
      ['Halaju', 'Kadar perubahan sesaran.'],
      ['Pecutan', 'Kadar perubahan halaju.'],
      ['Jatuh bebas', 'Gerakan objek yang jatuh di bawah pengaruh daya graviti sahaja.'],
      ['Inersia', 'Kecenderungan objek untuk kekal dalam keadaan pegun atau bergerak dengan halaju seragam.'],
      ['Momentum', 'Hasil darab jisim dengan halaju.'],
      ['Prinsip keabadian momentum', 'Jumlah momentum sebelum perlanggaran sama dengan jumlah momentum selepas perlanggaran jika tiada daya luar bertindak.'],
      ['Impuls', 'Perubahan momentum.'],
      ['Daya impuls', 'Kadar perubahan momentum dalam perlanggaran atau hentaman dalam masa yang singkat.']
    ],
    corak: [
      'Rajah dua graf v–t → **bandingkan** kecerunan, pecutan, halaju akhir → **hubung kait** kecerunan dengan pecutan.',
      'Bulu dan bola dalam udara vs vakum → bandingkan masa jatuh, hubung kait luas permukaan dengan rintangan udara.',
      'Hitung masa jatuh bebas dan halaju sebelum mencecah tanah.',
      'Beg udara / tilam keselamatan → nyatakan hukum, terangkan kesan kepada daya impuls (masa impak bertambah).',
      'Roket / kereta belon → nyatakan konsep (keabadian momentum) dan terangkan cara ia bergerak (4 markah).',
      'Reka bentuk 10 markah: keretapi laju, hoverkraf, paraglider, kereta lumba.'
    ],
    ciri: [
      ['Kenderaan laju', 'Bentuk aerodinamik / larus', 'Kurangkan rintangan udara'],
      ['Kenderaan laju', 'Bahan badan berketumpatan rendah & kuat (gentian karbon)', 'Jisim kecil → pecutan besar ($a = {F}/{m}$); tahan hentaman'],
      ['Kenderaan laju', 'Kuasa enjin tinggi', 'Daya tujah besar → pecutan besar'],
      ['Keselamatan', 'Zon remuk, beg udara, tali pinggang keledar', 'Panjangkan masa impak → daya impuls kecil; atasi inersia'],
      ['Hoverkraf', 'Lapisan udara di bawah badan', 'Kurangkan geseran dengan permukaan'],
      ['Roket', 'Gas ekzos keluar laju ke belakang', 'Keabadian momentum → roket ke hadapan']
    ]
  },
  reka: {
    s: 'Anda diminta memilih reka bentuk **keretapi laju** yang boleh bergerak pantas dan selamat.',
    opsyen: ['P', 'Q', 'R', 'S'],
    aspek: [
      { a: 'Bentuk hadapan', v: ['Rata', 'Aerodinamik', 'Aerodinamik', 'Rata'], ok: 'Aerodinamik', sebab: 'Kurangkan rintangan udara.' },
      { a: 'Bahan badan', v: ['Keluli (ketumpatan tinggi)', 'Keluli (ketumpatan tinggi)', 'Aloi aluminium (ketumpatan rendah, kuat)', 'Aloi aluminium (ketumpatan rendah, kuat)'], ok: 'Aloi aluminium (ketumpatan rendah, kuat)', sebab: 'Jisim kecil → pecutan lebih besar untuk daya tujahan yang sama; tahan hentaman.' },
      { a: 'Kuasa enjin', v: ['Tinggi', 'Rendah', 'Tinggi', 'Tinggi'], ok: 'Tinggi', sebab: 'Daya tujahan besar, pecutan besar.' },
      { a: 'Sistem keselamatan', v: ['Zon remuk & beg udara', 'Tiada', 'Zon remuk & beg udara', 'Tiada'], ok: 'Zon remuk & beg udara', sebab: 'Panjangkan masa impak, kurangkan daya impuls semasa perlanggaran.' }
    ],
    jawapan: 2
  },
  kuizTambah: [
    { q: 'Sebiji syiling dan sehelai bulu pelepah dilepaskan serentak dari ketinggian sama di dalam **vakum**. Pernyataan manakah betul?', o: ['Syiling sampai dahulu kerana lebih berat', 'Bulu sampai dahulu kerana lebih ringan', 'Kedua-duanya sampai serentak', 'Bulu terapung kerana tiada udara'], a: 2, e: 'Dalam vakum tiada rintangan udara. Kedua-dua objek jatuh bebas dengan pecutan $g$ yang sama.' },
    { q: 'Mengapakah roket dapat bergerak ke atas apabila gas panas dipancut ke bawah?', o: ['Gas menolak udara di bawah roket', 'Keabadian momentum: momentum gas ke bawah diimbangi momentum roket ke atas', 'Inersia roket berkurang', 'Berat roket menjadi sifar'], a: 1, e: 'Jumlah momentum awal sifar. Gas mendapat momentum ke bawah, jadi roket mendapat momentum yang sama magnitud ke atas.' },
    { q: 'Seorang lelaki melompat ke atas beg udara keselamatan. Apabila dia tenggelam lebih dalam ke dalam beg itu, daya impuls', o: ['bertambah kerana masa impak berkurang', 'berkurang kerana masa impak bertambah', 'tidak berubah', 'bertambah kerana momentum bertambah'], a: 1, e: 'Perubahan momentum sama, tetapi masa impak lebih panjang, jadi $F = {mv − mu}/{t}$ menjadi lebih kecil.' }
  ]
});

SPM('t4-b3', {
  sub: [
    { n: '3.1', t: 'Hukum Kegravitian Semesta Newton', ingat: 'Jarak $r$ diukur dari PUSAT ke PUSAT: $r = R + h$.', isi: [
      '!$F = {Gm_1m_2}/{r^2}$: daya graviti **berkadar terus** dengan hasil darab jisim dan **berkadar songsang** dengan kuasa dua jarak.',
      '!Jarak ganda dua → daya jadi ${1}/{4}$. Satu jisim ganda dua → daya ganda dua.',
      '!Pecutan graviti $g = {GM}/{r^2}$: semakin jauh dari pusat Bumi, $g$ semakin kecil.',
      '!**Daya memusat** $F = {mv^2}/{r}$: daya ke arah pusat bagi objek dalam gerakan membulat. Laju ganda dua → daya memusat ganda empat.',
      'Bagi satelit dan planet, **daya graviti membekalkan daya memusat**.',
      'Jika daya memusat hilang (tali putus), objek bergerak lurus pada arah tangen (laju linear).'
    ] },
    { n: '3.2', t: 'Hukum Kepler', ingat: 'Dekat Matahari = laju. Jauh = perlahan.', isi: [
      '!**Kepler I**: orbit planet berbentuk **elips**, Matahari di salah satu fokus.',
      '!**Kepler II**: garis planet–Matahari mencakupi **luas yang sama dalam masa yang sama**. Maka planet bergerak lebih laju apabila dekat dengan Matahari.',
      '!**Kepler III**: $T^2 ∝ r^3$. Bandingkan dua planet: ${T_1^2}/{T_2^2} = {r_1^3}/{r_2^3}$.'
    ] },
    { n: '3.3', t: 'Satelit Buatan Manusia', ingat: 'Orbit tinggi → laju rendah, tempoh panjang.', isi: [
      '!Laju satelit $v = sqrt{{GM}/{r}}$: jejari orbit besar → laju kecil, tempoh besar. Tidak bergantung pada jisim satelit.',
      '!**Satelit geopegun** (cth. MEASAT): tempoh 24 jam, di atas Khatulistiwa, arah sama dengan putaran Bumi, kelihatan pegun → komunikasi, siaran TV.',
      '!**Satelit bukan geopegun** (cth. RazakSAT): orbit rendah, tempoh < 24 jam, melintasi tempat berbeza → pengimejan, kaji cuaca, GPS.',
      '!**Halaju lepas** $v = sqrt{{2GM}/{R}}$: halaju minimum untuk terlepas daripada graviti. Bumi: $11.2 "km s"^{-1}$.',
      'Satelit dengan laju kurang daripada laju orbit akan jatuh ke Bumi; laju melebihi halaju lepas akan terlepas ke angkasa.'
    ] }
  ],
  contoh: [
    { t: 'Daya graviti antara Bumi dan satelit', q: 'Satelit 1 000 kg mengorbit pada ketinggian 600 km. Hitung daya graviti. [$G = 6.67 × 10^{-11}$, $M = 5.97 × 10^{24} "kg"$, $R = 6.37 × 10^6 "m"$]', l: [
      'Jarak dari pusat: $r = R + h = 6.37 × 10^6 + 6.0 × 10^5 = 6.97 × 10^6 "m"$.',
      '$F = {GMm}/{r^2} = {(6.67 × 10^{-11})(5.97 × 10^{24})(1 000)}/{(6.97 × 10^6)^2}$.'
    ], j: '$F = 8.20 × 10^3 "N"$' },
    { t: 'Daya memusat', q: 'Objek 6 kg bergerak dalam bulatan berjejari 1.5 m dengan laju $20 "m s"^{-1}$. Hitung (a) daya memusat, (b) pecutan memusat.', l: [
      '(a) $F = {mv^2}/{r} = {6 × 20^2}/{1.5}$ = 1 600 N.',
      '(b) $a = {v^2}/{r} = {400}/{1.5}$.'
    ], j: '(a) 1 600 N  (b) $267 "m s"^{-2}$' }
  ],
  fokus: {
    topik: [['Satelit geopegun vs bukan geopegun', 3], ['Hitung daya graviti $F = {Gm_1m_2}/{r^2}$', 3], ['Daya memusat (takrif, hitung, bandingkan)', 3], ['Hukum Kepler II (luas sama, laju berbeza)', 2], ['Hukum Kepler III & halaju lepas', 2], ['Reka bentuk: roket / teknik lontar tukul', 2]],
    takrif: [
      ['Hukum Kegravitian Semesta Newton', 'Daya graviti antara dua jasad berkadar terus dengan hasil darab jisim kedua-dua jasad dan berkadar songsang dengan kuasa dua jarak di antara pusat kedua-dua jasad.'],
      ['Daya memusat', 'Daya yang bertindak ke atas objek dalam gerakan membulat dan berarah ke pusat bulatan.'],
      ['Hukum Kepler Pertama', 'Orbit setiap planet ialah elips dengan Matahari berada di salah satu fokusnya.'],
      ['Hukum Kepler Kedua', 'Garis yang menyambungkan planet dengan Matahari mencakupi luas yang sama dalam selang masa yang sama.'],
      ['Hukum Kepler Ketiga', 'Kuasa dua tempoh orbit planet berkadar terus dengan kuasa tiga jejari orbitnya.'],
      ['Halaju lepas', 'Halaju minimum yang diperlukan oleh objek di permukaan Bumi untuk mengatasi daya graviti dan terlepas ke angkasa lepas.']
    ],
    corak: [
      'Rajah orbit elips (A→B dekat, C→D jauh) → bandingkan panjang lengkok, luas, laju → nyatakan Hukum Kepler II.',
      'Dua satelit (cth. GOES-19 vs CloudSat) → bandingkan jejari orbit, tempoh, laju linear → hubung kait.',
      'Tukul besi / kereta di selekoh → takrif daya memusat, hitung $F = {mv^2}/{r}$, kesan jika laju bertambah.',
      'Hitung daya graviti antara Bumi dengan satelit / roket (ingat $r = R + h$).',
      'Nyatakan dua perbezaan satelit geopegun dan bukan geopegun.'
    ],
    ciri: [
      ['Satelit komunikasi', 'Orbit geopegun, tempoh 24 jam, atas Khatulistiwa', 'Sentiasa di atas tempat yang sama'],
      ['Satelit pengimejan', 'Orbit rendah, tempoh pendek', 'Gambar jelas; lalu banyak tempat'],
      ['Roket', 'Jisim kecil / bahan ringan', 'Pecutan besar untuk mencapai halaju lepas'],
      ['Roket', 'Bahan api berkuasa tinggi (hidrogen + oksigen cecair)', 'Daya tujahan besar'],
      ['Roket', 'Berbilang peringkat', 'Tangki kosong dibuang → jisim berkurang'],
      ['Lontar tukul besi', 'Laju putaran tinggi, jejari besar', 'Laju linear besar semasa dilepaskan → lontaran jauh']
    ]
  },
  reka: {
    s: 'Pilih **roket** yang paling sesuai untuk membawa satelit ke orbit.',
    opsyen: ['K', 'L', 'M', 'N'],
    aspek: [
      { a: 'Bahan badan roket', v: ['Aloi titanium (ringan, kuat)', 'Keluli (berat)', 'Aloi titanium (ringan, kuat)', 'Keluli (berat)'], ok: 'Aloi titanium (ringan, kuat)', sebab: 'Jisim kecil → pecutan besar; tahan suhu dan tekanan tinggi.' },
      { a: 'Jenis bahan api', v: ['Petrol', 'Hidrogen + oksigen cecair', 'Hidrogen + oksigen cecair', 'Petrol'], ok: 'Hidrogen + oksigen cecair', sebab: 'Membebaskan tenaga besar; oksigen dibawa sendiri kerana tiada udara di angkasa.' },
      { a: 'Bilangan peringkat', v: ['Satu', 'Berbilang', 'Berbilang', 'Berbilang'], ok: 'Berbilang', sebab: 'Peringkat kosong dibuang, jisim berkurang, pecutan bertambah.' },
      { a: 'Bentuk', v: ['Larus (aerodinamik)', 'Larus (aerodinamik)', 'Larus (aerodinamik)', 'Silinder rata'], ok: 'Larus (aerodinamik)', sebab: 'Kurangkan rintangan udara semasa melalui atmosfera.' }
    ],
    jawapan: 2
  },
  kuizTambah: [
    { q: 'Satelit X mempunyai jejari orbit lebih besar daripada satelit Y. Berbanding Y, satelit X mempunyai', o: ['laju linear lebih tinggi dan tempoh lebih pendek', 'laju linear lebih rendah dan tempoh lebih panjang', 'laju linear dan tempoh yang sama', 'laju linear lebih tinggi dan tempoh lebih panjang'], a: 1, e: '$v = sqrt{{GM}/{r}}$ (r besar → v kecil) dan $T^2 ∝ r^3$ (r besar → T besar).' },
    { q: 'Laju sebuah kereta di selekoh bulat digandakan dua kali. Daya memusat yang diperlukan menjadi', o: ['separuh', 'dua kali ganda', 'empat kali ganda', 'tidak berubah'], a: 2, e: '$F = {mv^2}/{r}$, jadi $F ∝ v^2$. $2^2 = 4$.' },
    { q: 'Antara berikut, yang manakah satelit geopegun?', o: ['RazakSAT untuk pengimejan', 'Satelit GPS', 'MEASAT untuk siaran televisyen', 'Stesen Angkasa Antarabangsa (ISS)'], a: 2, e: 'MEASAT ialah satelit komunikasi yang berada di orbit geopegun dengan tempoh 24 jam.' }
  ]
});

SPM('t4-b4', {
  sub: [
    { n: '4.1', t: 'Keseimbangan Terma', ingat: 'Keseimbangan terma = suhu sama, kadar pemindahan haba bersih sifar.', isi: [
      '!**Haba** ialah tenaga yang dipindahkan dari objek panas ke objek sejuk. **Suhu** ialah darjah kepanasan objek.',
      '!**Keseimbangan terma**: dua objek bersentuhan mencapai suhu yang sama; kadar pemindahan haba bersih menjadi sifar.',
      '!Termometer: bebuli dan badan bertukar haba sehingga mencapai keseimbangan terma, kemudian bacaan termometer = suhu badan.',
      'Tentu ukur termometer: $θ = {l_θ − l_0}/{l_{100} − l_0} × 100 "°C"$. Suhu dalam kelvin: $T = θ + 273$.'
    ] },
    { n: '4.2', t: 'Muatan Haba Tentu', ingat: 'c rendah = cepat panas, cepat sejuk. c tinggi = lambat panas, simpan haba lama.', isi: [
      '!**Muatan haba tentu**, $c$: haba yang diperlukan untuk menaikkan suhu **1 kg** bahan sebanyak **1 °C**. $Q = mcθ$.',
      '!Pemanas elektrik: $Pt = mcθ$ (andaian: tiada haba hilang ke persekitaran).',
      '!Campuran panas + sejuk: **haba hilang = haba diterima**, $m_1c(θ_1 − θ) = m_2c(θ − θ_2)$.',
      '!Aplikasi: periuk logam ($c$ rendah, cepat panas), pemegang plastik ($c$ tinggi, penebat), air sebagai agen penyejuk enjin ($c$ tinggi), bayu laut dan bayu darat.'
    ] },
    { n: '4.3', t: 'Haba Pendam Tentu', ingat: 'Garis mengufuk pada lengkung pemanasan = perubahan fasa → guna $Q = ml$.', isi: [
      '!**Haba pendam tentu**, $l$: haba yang diserap/dibebaskan semasa perubahan fasa **1 kg** bahan **tanpa perubahan suhu**. $Q = ml$.',
      '!Suhu tetap semasa melebur/mendidih kerana haba digunakan untuk **memutuskan ikatan antara molekul**, bukan menambah tenaga kinetik.',
      '!**Peluh menyejukkan badan**: peluh menyejat dan menyerap haba pendam pengewapan daripada kulit.',
      'Stim lebih melecurkan kerana membebaskan haba pendam pengewapan yang besar semasa terkondensasi.',
      'Pada lengkung pemanasan: bahagian condong guna $Pt = mcθ$; bahagian mengufuk guna $Pt = ml$.'
    ] },
    { n: '4.4', t: 'Hukum Gas', ingat: 'Suhu MESTI dalam kelvin (+273).', isi: [
      '!**Boyle** ($T$ malar): $P_1V_1 = P_2V_2$. **Charles** ($P$ malar): ${V_1}/{T_1} = {V_2}/{T_2}$. **Gay-Lussac** ($V$ malar): ${P_1}/{T_1} = {P_2}/{T_2}$.',
      '!Teori kinetik: suhu naik → molekul bergerak lebih laju → lebih kerap berlanggar dengan dinding → tekanan bertambah (periuk tekanan, tayar panas).',
      'Isi padu berkurang (Boyle) → molekul lebih rapat → kekerapan perlanggaran bertambah → tekanan bertambah.'
    ] }
  ],
  contoh: [
    { t: 'Suhu akhir campuran', q: '0.2 kg air pada 80 °C dicampur dengan 0.3 kg air pada 20 °C. Hitung suhu akhir. (Abaikan haba hilang.)', l: [
      'Haba hilang oleh air panas = haba diterima oleh air sejuk.',
      '$0.2 × 4 200 × (80 − θ) = 0.3 × 4 200 × (θ − 20)$.',
      '$c$ dibatalkan: $16 − 0.2θ = 0.3θ − 6$ → $0.5θ = 22$.'
    ], j: '$θ = 44 "°C"$' },
    { t: 'Haba pendam daripada lengkung pemanasan', q: 'Pepejal 0.05 kg dipanaskan dengan pemanas 100 W. Suhu kekal pada takat lebur selama 120 s. Hitung haba pendam tentu pelakuran.', l: [
      'Bahagian mengufuk = peleburan, maka $Pt = ml$.',
      '$100 × 120 = 0.05 × l$.',
      '$l = {12 000}/{0.05}$.'
    ], j: '$l = 2.4 × 10^5 "J kg"^{-1}$' },
    { t: 'Hukum Gay-Lussac', q: 'Udara dalam kelalang pada 25 °C mempunyai tekanan 101 kPa. Hitung tekanan pada 50 °C (isi padu malar).', l: [
      'Tukar ke kelvin: $T_1 = 298 "K"$, $T_2 = 323 "K"$.',
      '${P_1}/{T_1} = {P_2}/{T_2}$ → $P_2 = 101 × {323}/{298}$.'
    ], j: '$P_2 = 109 "kPa"$' }
  ],
  fokus: {
    topik: [['Muatan haba tentu $Q = mcθ$ (hitung, campuran)', 3], ['Soalan reka bentuk: termos, periuk, tabung nasi, peti sejuk', 3], ['Haba pendam (peluh, lengkung pemanasan)', 3], ['Keseimbangan terma & termometer', 2], ['Hukum gas & kelvin', 2]],
    takrif: [
      ['Suhu', 'Darjah kepanasan sesuatu objek.'],
      ['Haba', 'Tenaga yang dipindahkan dari objek panas ke objek sejuk.'],
      ['Keseimbangan terma', 'Keadaan dua objek bersentuhan secara terma apabila kadar pemindahan haba bersih ialah sifar dan suhunya sama.'],
      ['Muatan haba tentu', 'Kuantiti haba yang diperlukan untuk menaikkan suhu 1 kg bahan sebanyak 1 °C.'],
      ['Haba pendam tentu', 'Kuantiti haba yang diserap atau dibebaskan semasa perubahan fasa bagi 1 kg bahan tanpa perubahan suhu.'],
      ['Hukum Boyle', 'Tekanan berkadar songsang dengan isi padu bagi gas berjisim tetap pada suhu malar.'],
      ['Hukum Charles', 'Isi padu berkadar terus dengan suhu mutlak bagi gas berjisim tetap pada tekanan malar.'],
      ['Hukum Gay-Lussac', 'Tekanan berkadar terus dengan suhu mutlak bagi gas berjisim tetap pada isi padu malar.']
    ],
    corak: [
      'Termometer klinik / inframerah → terangkan keseimbangan terma (haba mengalir hingga suhu sama, kadar bersih sifar).',
      'Peluh / tuala basah menyejukkan tin minuman → haba pendam pengewapan diserap.',
      'Lengkung pemanasan → hitung haba pendam (bahagian rata) dan muatan haba tentu (bahagian condong).',
      'Campuran air panas + sejuk → hitung suhu akhir; nyatakan andaian (tiada haba hilang).',
      'Periuk tekanan / pam basikal → namakan hukum gas, terangkan dengan teori kinetik.',
      'Reka bentuk 10 markah: kelalang termos, beg makanan, tabung nasi, pengukus, seterika wap, peti sejuk.'
    ],
    ciri: [
      ['Simpan panas (termos, beg makanan)', 'Lapisan vakum / udara', 'Halang konduksi dan perolakan'],
      ['Simpan panas', 'Permukaan dalam berkilat', 'Pantulkan sinaran haba, kurang kehilangan'],
      ['Simpan panas', 'Penutup penebat (gabus/plastik), ketat', 'Kurangkan kehilangan haba'],
      ['Periuk / kuali', 'Badan logam, $c$ rendah', 'Cepat panas'],
      ['Periuk / kuali', 'Pemegang plastik/kayu, $c$ tinggi & penebat', 'Lambat panas, selamat dipegang'],
      ['Agen penyejuk', 'Air / cecair dengan $c$ tinggi', 'Serap banyak haba dengan kenaikan suhu kecil'],
      ['Pengukus / seterika wap', 'Stim', 'Bebaskan haba pendam pengewapan yang besar semasa terkondensasi'],
      ['Termometer peka', 'Dinding bebuli nipis, tiub rerambut sempit', 'Haba cepat dipindah; perubahan panjang turus ketara']
    ]
  },
  reka: {
    s: 'Pilih **kelalang termos** yang paling sesuai untuk mengekalkan kopi panas dalam masa yang lama.',
    opsyen: ['P', 'Q', 'R', 'S'],
    aspek: [
      { a: 'Ruang antara dua dinding', v: ['Udara', 'Vakum', 'Vakum', 'Vakum'], ok: 'Vakum', sebab: 'Tiada medium, jadi tiada konduksi dan perolakan haba.' },
      { a: 'Permukaan dinding dalam', v: ['Berkilat', 'Gelap', 'Berkilat', 'Berkilat'], ok: 'Berkilat', sebab: 'Memantulkan sinaran haba kembali ke dalam kopi.' },
      { a: 'Bahan penutup', v: ['Gabus (penebat)', 'Gabus (penebat)', 'Gabus (penebat)', 'Logam'], ok: 'Gabus (penebat)', sebab: 'Konduktor haba yang lemah, kurangkan kehilangan haba melalui konduksi.' },
      { a: 'Bahan bekas dalam', v: ['Kaca', 'Kaca', 'Kaca', 'Aluminium'], ok: 'Kaca', sebab: 'Konduktor haba yang lemah dan tidak bertindak balas dengan minuman.' }
    ],
    jawapan: 2
  },
  kuizTambah: [
    { q: 'Mengapakah tuala kertas basah yang dibalut pada tin minuman dapat menyejukkan minuman pada hari panas?', o: ['Air pada tuala menyerap haba pendam pengewapan daripada tin semasa menyejat', 'Tuala kertas ialah penebat haba', 'Air mempunyai muatan haba tentu yang rendah', 'Tuala memantulkan sinaran Matahari'], a: 0, e: 'Penyejatan memerlukan haba pendam. Haba itu diambil daripada tin, jadi suhu minuman turun.' },
    { q: 'Sebatang termometer dimasukkan ke dalam mulut pesakit. Bacaan termometer boleh diambil apabila', o: ['termometer mula menyerap haba', 'kadar pemindahan haba bersih antara badan dan termometer menjadi sifar', 'merkuri berhenti mengembang sebaik sahaja dimasukkan', 'suhu termometer melebihi suhu badan'], a: 1, e: 'Apabila keseimbangan terma tercapai, suhu termometer sama dengan suhu badan dan kadar pemindahan haba bersih sifar.' },
    { q: 'Pada lengkung pemanasan, bahagian mana yang digunakan untuk menghitung haba pendam tentu?', o: ['Bahagian condong ke atas', 'Bahagian mengufuk', 'Titik permulaan', 'Bahagian terakhir sahaja'], a: 1, e: 'Bahagian mengufuk menunjukkan perubahan fasa pada suhu tetap. Gunakan $Pt = ml$.' }
  ]
});

SPM('t4-b5', {
  sub: [
    { n: '5.1', t: 'Asas Gelombang', ingat: '$v = fλ$. Frekuensi ditentukan oleh SUMBER.', isi: [
      '!Gelombang memindahkan **tenaga** tanpa memindahkan jirim.',
      '!**Melintang**: zarah bergetar **serenjang** dengan arah perambatan (air, cahaya). **Membujur**: zarah bergetar **selari** dengan arah perambatan, ada mampatan & regangan (bunyi).',
      '!Amplitud $A$ (sesaran maksimum), tempoh $T$, frekuensi $f = {1}/{T}$, panjang gelombang $λ$. **$v = fλ$**.',
      'Graf sesaran–masa → $A$ dan $T$. Graf sesaran–jarak → $A$ dan $λ$.'
    ] },
    { n: '5.2', t: 'Pelembapan dan Resonans', ingat: 'Pelembapan: amplitud berkurang, frekuensi tetap.', isi: [
      '!**Pelembapan**: amplitud ayunan berkurang kerana tenaga hilang (rintangan udara, geseran). Frekuensi tidak berubah.',
      'Untuk terus berayun: kenakan **daya luar berkala** pada frekuensi asli sistem.',
      '!**Resonans**: sistem dipaksa berayun pada **frekuensi aslinya** → amplitud maksimum. Contoh: bandul Barton (bandul sama panjang dengan bandul pemacu berayun paling kuat), penalaan radio, jambatan Tacoma.'
    ] },
    { n: '5.3–5.4', t: 'Pantulan dan Pembiasan', ingat: 'Dalam → cetek: v ↓, λ ↓, f tetap, dibiaskan mendekati normal.', isi: [
      'Pantulan: sudut tuju = sudut pantulan; $f$, $λ$, $v$ tidak berubah. Aplikasi: sonar, ultrabunyi, radar.',
      '!**Pembiasan**: perubahan arah gelombang kerana **laju berubah** apabila kedalaman berubah.',
      '!Air dalam → cetek: **laju berkurang, panjang gelombang berkurang, frekuensi tetap**, dibiaskan **mendekati garis normal**.',
      '!Hubungan: kedalaman ↑ → $λ$ ↑ → $v$ ↑. Kira dengan ${v_1}/{λ_1} = {v_2}/{λ_2}$ (kerana $f$ sama).',
      'Fenomena: ombak di pantai sentiasa selari dengan pantai; bunyi lebih jelas pada waktu malam.'
    ] },
    { n: '5.5', t: 'Pembelauan', ingat: 'Celah kecil (≈ λ) → pembelauan lebih ketara.', isi: [
      '!**Pembelauan**: gelombang menyebar apabila melalui celah atau tepi penghalang.',
      '!$f$, $λ$, $v$ tidak berubah; **amplitud berkurang** kerana tenaga tersebar.',
      '!Lebih ketara apabila **saiz celah kecil** atau **panjang gelombang besar**. Bunyi (λ besar) terbelau lebih ketara → boleh didengar di sebalik dinding.'
    ] },
    { n: '5.6', t: 'Interferens', ingat: '$λ = {ax}/{D}$ — tukar mm ke m.', isi: [
      '!**Prinsip superposisi**: sesaran paduan = hasil tambah sesaran gelombang individu.',
      'Sumber **koheren**: frekuensi sama, beza fasa tetap.',
      '!**Membina** (puncak + puncak) → antinod, bunyi kuat / pinggir cerah. **Memusnah** (puncak + lembangan) → nod, bunyi lemah / pinggir gelap.',
      '!$λ = {ax}/{D}$: $a$ jarak antara sumber, $x$ jarak antara dua antinod berturutan, $D$ jarak sumber ke skrin.'
    ] },
    { n: '5.7', t: 'Gelombang Elektromagnet', isi: [
      '!Gelombang melintang, tidak perlu medium, laju $3.0 × 10^8 "m s"^{-1}$ dalam vakum.',
      '!Tertib (frekuensi naik): radio → mikro → inframerah → cahaya nampak → ultraungu → sinar-X → gama.',
      '!Aplikasi kerap ditanya: gelombang mikro (satelit, komunikasi, ketuhar), inframerah (alat kawalan jauh, kamera terma), ultraungu (pensterilan), sinar-X (imej tulang), gama (rawatan kanser).'
    ] }
  ],
  contoh: [
    { t: 'Pembiasan gelombang air', q: 'Gelombang air di kawasan cetek: $λ = 2 "cm"$, $v = 6 "cm s"^{-1}$. Di kawasan dalam, lajunya $9 "cm s"^{-1}$. Hitung panjang gelombang di kawasan dalam.', l: [
      'Frekuensi tidak berubah: $f = {v}/{λ} = {6}/{2} = 3 "Hz"$.',
      'Di kawasan dalam: $λ = {v}/{f} = {9}/{3}$.'
    ], j: '$λ = 3 "cm"$' },
    { t: 'Interferens (dwicelah Young)', q: 'Jarak antara dua celah $a = 0.4 "mm"$, skrin pada $D = 2.0 "m"$, jarak antara pinggir cerah berturutan $x = 3.0 "mm"$. Hitung panjang gelombang cahaya.', l: [
      'Tukar unit: $a = 0.4 × 10^{-3} "m"$, $x = 3.0 × 10^{-3} "m"$.',
      '$λ = {ax}/{D} = {(0.4 × 10^{-3})(3.0 × 10^{-3})}/{2.0}$.'
    ], j: '$λ = 6.0 × 10^{-7} "m"$ (600 nm)' }
  ],
  fokus: {
    topik: [['Pembiasan gelombang air (dalam ↔ cetek)', 3], ['Gelombang elektromagnet & aplikasi', 3], ['Pembelauan & saiz celah', 2], ['Pelembapan & resonans', 2], ['Interferens $λ = {ax}/{D}$', 2], ['Reka bentuk: antena / sistem pemancar isyarat', 2]],
    takrif: [
      ['Gelombang melintang', 'Gelombang yang zarah mediumnya bergetar serenjang dengan arah perambatan gelombang.'],
      ['Gelombang membujur', 'Gelombang yang zarah mediumnya bergetar selari dengan arah perambatan gelombang.'],
      ['Frekuensi', 'Bilangan ayunan lengkap dalam satu saat.'],
      ['Pelembapan', 'Pengurangan amplitud sistem ayunan akibat kehilangan tenaga.'],
      ['Resonans', 'Keadaan sistem dipaksa berayun pada frekuensi aslinya oleh daya luar berkala, menyebabkan amplitud maksimum.'],
      ['Pembiasan gelombang', 'Perubahan arah perambatan gelombang akibat perubahan laju gelombang apabila merambat dari satu medium ke medium lain.'],
      ['Pembelauan gelombang', 'Penyebaran gelombang apabila merambat melalui celah atau tepi penghalang.'],
      ['Prinsip superposisi', 'Sesaran paduan apabila dua gelombang bertindih ialah hasil tambah sesaran setiap gelombang.']
    ],
    corak: [
      'Rajah tangki riak dalam → cetek → bandingkan kedalaman, λ, laju → hubung kait → lukis garis normal & arah gelombang.',
      'Nyatakan kuantiti yang malar semasa pembiasan (frekuensi).',
      'Rajah dua celah berlainan saiz → bandingkan corak pembelauan → hubungan saiz celah dengan pembelauan.',
      'Bandul Barton → namakan resonans, bandul mana berayun dengan amplitud maksimum, terangkan.',
      'Ultrasonik untuk mengukur kedalaman laut → kira jarak ($s = {vt}/{2}$) atau panjang gelombang.',
      'Reka bentuk: antena satelit / pemancar isyarat (jenis gelombang, ketinggian, diameter piring).'
    ],
    ciri: [
      ['Komunikasi satelit', 'Gelombang mikro', 'Frekuensi tinggi, tenaga tinggi, boleh menembusi atmosfera'],
      ['Antena / pemancar', 'Diletakkan tinggi, kawasan lapang', 'Tiada halangan, kurang pantulan dan pembelauan'],
      ['Piring penerima', 'Diameter besar, berbentuk parabola', 'Terima dan fokuskan lebih banyak isyarat'],
      ['Mengukur kedalaman laut', 'Ultrasonik', 'Frekuensi tinggi, kurang pembelauan, tenaga tinggi'],
      ['Pelabuhan tenang', 'Benteng dengan celah sempit', 'Pembelauan → amplitud ombak berkurang']
    ]
  },
  reka: {
    s: 'Pilih **sistem pemancar isyarat** yang paling sesuai untuk meningkatkan liputan internet satelit di kawasan pedalaman.',
    opsyen: ['P', 'Q', 'R', 'S'],
    aspek: [
      { a: 'Jenis gelombang', v: ['Gelombang mikro', 'Gelombang radio frekuensi rendah', 'Gelombang mikro', 'Gelombang mikro'], ok: 'Gelombang mikro', sebab: 'Frekuensi tinggi, tenaga tinggi dan boleh menembusi atmosfera ke satelit.' },
      { a: 'Ketinggian antena', v: ['Tinggi', 'Tinggi', 'Rendah', 'Tinggi'], ok: 'Tinggi', sebab: 'Tiada halangan; isyarat tidak dipantul atau dibelau oleh bangunan dan pokok.' },
      { a: 'Diameter piring', v: ['Besar', 'Besar', 'Besar', 'Kecil'], ok: 'Besar', sebab: 'Menerima lebih banyak isyarat dan memfokuskannya ke penerima.' },
      { a: 'Bentuk piring', v: ['Parabola', 'Parabola', 'Parabola', 'Parabola'], ok: 'Parabola', sebab: 'Memantulkan isyarat ke titik fokus.' }
    ],
    jawapan: 0
  },
  kuizTambah: [
    { q: 'Gelombang air merambat dari kawasan cetek ke kawasan dalam. Apakah yang berlaku?', o: ['Laju bertambah, panjang gelombang bertambah', 'Laju berkurang, panjang gelombang berkurang', 'Frekuensi bertambah', 'Laju bertambah, frekuensi berkurang'], a: 0, e: 'Kawasan dalam: laju dan panjang gelombang bertambah, frekuensi kekal, gelombang dibiaskan menjauhi normal.' },
    { q: 'Dalam bandul Barton, bandul manakah berayun dengan amplitud paling besar?', o: ['Bandul paling pendek', 'Bandul paling panjang', 'Bandul yang sama panjang dengan bandul pemacu', 'Semua berayun dengan amplitud sama'], a: 2, e: 'Bandul yang sama panjang mempunyai frekuensi asli yang sama dengan bandul pemacu, maka berlaku resonans.' },
    { q: 'Mengapakah bunyi dapat didengar di sebalik dinding tetapi cahaya tidak?', o: ['Bunyi lebih laju daripada cahaya', 'Panjang gelombang bunyi lebih besar, jadi pembelauan lebih ketara', 'Cahaya tidak boleh dipantulkan', 'Bunyi ialah gelombang melintang'], a: 1, e: 'Pembelauan lebih ketara apabila panjang gelombang hampir sama dengan saiz bukaan atau penghalang.' }
  ]
});

SPM('t4-b6', {
  sub: [
    { n: '6.1', t: 'Pembiasan Cahaya', ingat: 'Masuk medium lebih tumpat → mendekati normal.', isi: [
      '!Cahaya dibiaskan kerana **laju cahaya berubah** apabila melalui medium berlainan ketumpatan optik.',
      '!Udara → air/kaca: dibiaskan **mendekati** normal. Air/kaca → udara: **menjauhi** normal.',
      '!Indeks biasan: $n = {sin i}/{sin r}$ dan $n = {c}/{v}$.',
      '!**Dalam ketara**: objek dalam air (ikan, syiling, rod bengkok) kelihatan lebih cetek. $n = {"dalam nyata"}/{"dalam ketara"}$. Untuk menombak ikan, bidik **lebih ke bawah** daripada imej.'
    ] },
    { n: '6.2', t: 'Pantulan Dalam Penuh', ingat: 'Dua syarat: lebih tumpat → kurang tumpat, dan i > c.', isi: [
      '!**Sudut genting** $c$: sudut tuju dalam medium lebih tumpat apabila sudut biasan = 90°. $n = {1}/{sin c}$.',
      '!Syarat pantulan dalam penuh: (1) cahaya dari medium **lebih tumpat ke kurang tumpat**; (2) **sudut tuju > sudut genting**.',
      'Contoh: logamaya, kilauan berlian, gentian optik (teras $n$ tinggi, penyalut $n$ rendah), periskop prisma.'
    ] },
    { n: '6.3–6.4', t: 'Kanta dan Formula Kanta Nipis', ingat: 'Kanta cembung: “RID / RIS / RIM / VUM” mengikut kedudukan objek.', isi: [
      '!**Panjang fokus** $f$: jarak di antara pusat optik dengan titik fokus.',
      '!Kanta lebih tebal / jejari kelengkungan lebih kecil → **panjang fokus lebih pendek** → lebih kuat menumpu.',
      '!Ciri imej kanta cembung: $u > 2f$ nyata, songsang, dikecilkan (**RID**); $u = 2f$ sama saiz (**RIS**); $f < u < 2f$ diperbesar (**RIM**); $u < f$ maya, tegak, diperbesar (**VUM**, kanta pembesar).',
      '!Kanta cekung: sentiasa **maya, tegak, dikecilkan**.',
      '!${1}/{f} = {1}/{u} + {1}/{v}$. Tanda: kanta cekung $f$ negatif; imej maya $v$ negatif. Pembesaran $m = {v}/{u}$.',
      'Kuasa kanta $P = {1}/{f}$ ($f$ dalam meter, unit diopter, D).'
    ] },
    { n: '6.5', t: 'Peralatan Optik', isi: [
      '!**Kanta pembesar**: kanta cembung, objek di antara F dan kanta. Panjang fokus pendek → pembesaran tinggi.',
      '!**Teleskop astronomi**: kanta objek $f_o$ panjang, kanta mata $f_m$ pendek; jarak kanta $= f_o + f_m$; pembesaran $M = {f_o}/{f_m}$. Diameter kanta objek besar → imej lebih terang.',
      '**Mikroskop majmuk**: dua kanta cembung berpanjang fokus pendek, $f_o < f_m$.',
      'Kamera CCTV di ruang sempit: kanta berpanjang fokus pendek (sudut pandangan luas).'
    ] },
    { n: '6.6', t: 'Cermin Sfera', ingat: 'Cermin cembung = maya, tegak, kecil, pandangan luas.', isi: [
      '!**Cermin cekung**: menumpukan cahaya. Mentol di F → pancaran cahaya selari (lampu suluh, lampu kereta, dapur solar).',
      '!**Cermin cembung**: imej maya, tegak, dikecilkan; **medan penglihatan luas** → cermin selekoh, cermin sisi kereta, cermin keselamatan kedai.',
      'Jejari kelengkungan $r = 2f$.'
    ] }
  ],
  contoh: [
    { t: 'Formula kanta nipis (kanta cekung)', q: 'Objek diletakkan 30 cm dari kanta cekung berpanjang fokus 15 cm. Tentukan kedudukan dan ciri imej.', l: [
      'Kanta cekung: $f = −15 "cm"$, $u = 30 "cm"$.',
      '${1}/{v} = {1}/{f} − {1}/{u} = −{1}/{15} − {1}/{30} = −{3}/{30}$.',
      '$v = −10 "cm"$ (negatif → maya, sebelah objek).',
      'Pembesaran $m = {10}/{30} = 0.33$.'
    ], j: 'Imej 10 cm dari kanta, sebelah objek; maya, tegak, dikecilkan.' },
    { t: 'Indeks biasan', q: 'Cahaya memasuki kaca ($n = 1.50$) dengan sudut tuju 30°. Hitung sudut biasan dan sudut genting kaca.', l: [
      '$sin r = {sin 30°}/{1.50} = {0.5}/{1.50} = 0.333$ → $r = 19.5°$.',
      '$sin c = {1}/{1.50} = 0.667$ → $c = 41.8°$.'
    ], j: '$r = 19.5°$, $c = 41.8°$' }
  ],
  fokus: {
    topik: [['Pembiasan cahaya: dalam ketara, menombak ikan', 3], ['Takrif panjang fokus', 3], ['Kanta: rajah sinar & ciri imej', 3], ['Cermin cekung & cembung (aplikasi)', 2], ['Peralatan optik: kanta pembesar, teleskop, CCTV', 2], ['Formula kanta & pembesaran', 2]],
    takrif: [
      ['Pembiasan cahaya', 'Perubahan arah perambatan cahaya akibat perubahan laju cahaya apabila merambat melalui medium berlainan ketumpatan optik.'],
      ['Indeks biasan', 'Nisbah laju cahaya dalam vakum kepada laju cahaya dalam medium.'],
      ['Sudut genting', 'Sudut tuju dalam medium lebih tumpat apabila sudut biasan dalam medium kurang tumpat ialah 90°.'],
      ['Pantulan dalam penuh', 'Pantulan semua cahaya ke dalam medium lebih tumpat apabila sudut tuju melebihi sudut genting.'],
      ['Panjang fokus', 'Jarak di antara pusat optik dengan titik fokus kanta (atau cermin).'],
      ['Pembesaran linear', 'Nisbah ketinggian imej kepada ketinggian objek, $m = {v}/{u}$.']
    ],
    corak: [
      'Rod kelihatan bengkok / lelaki menombak ikan → namakan pembiasan, terangkan, lukis sinar, cadang cara membidik.',
      'Nyatakan maksud panjang fokus (sangat kerap, 1 markah).',
      'Dua kanta berlainan ketebalan → bandingkan jejari kelengkungan, ketebalan, panjang fokus → hubung kait.',
      'Lengkapkan rajah sinar dan nyatakan ciri imej.',
      'Lampu suluh / dapur solar → jenis cermin, kedudukan mentol/periuk di titik fokus.',
      'Reka bentuk: kanta pembesar, teleskop astronomi, kanta CCTV.'
    ],
    ciri: [
      ['Kanta pembesar', 'Kanta cembung, panjang fokus pendek', 'Pembesaran tinggi'],
      ['Kanta pembesar', 'Diameter besar', 'Medan penglihatan luas'],
      ['Teleskop astronomi', 'Kanta objek $f_o$ panjang, kanta mata $f_m$ pendek', 'Pembesaran $M = {f_o}/{f_m}$ besar'],
      ['Teleskop astronomi', 'Diameter kanta objek besar', 'Kumpul lebih banyak cahaya, imej terang'],
      ['Teleskop astronomi', 'Jarak antara kanta $= f_o + f_m$', 'Pelarasan normal, imej akhir di infiniti'],
      ['Lampu suluh / dapur solar', 'Cermin cekung, mentol/periuk di titik fokus', 'Cahaya dipantul selari / tertumpu'],
      ['Cermin selekoh', 'Cermin cembung', 'Medan penglihatan luas'],
      ['Gentian optik', 'Teras indeks biasan tinggi, penyalut rendah', 'Pantulan dalam penuh berlaku']
    ]
  },
  reka: {
    s: 'Pilih reka bentuk **teleskop astronomi** yang menghasilkan imej yang besar dan terang.',
    opsyen: ['P', 'Q', 'R', 'S'],
    aspek: [
      { a: 'Panjang fokus kanta objek', v: ['Panjang (100 cm)', 'Panjang (100 cm)', 'Pendek (5 cm)', 'Panjang (100 cm)'], ok: 'Panjang (100 cm)', sebab: 'Pembesaran $M = {f_o}/{f_m}$ besar.' },
      { a: 'Panjang fokus kanta mata', v: ['Pendek (5 cm)', 'Panjang (50 cm)', 'Pendek (5 cm)', 'Pendek (5 cm)'], ok: 'Pendek (5 cm)', sebab: 'Pembesaran besar.' },
      { a: 'Diameter kanta objek', v: ['Besar', 'Besar', 'Besar', 'Kecil'], ok: 'Besar', sebab: 'Lebih banyak cahaya dikumpul, imej lebih terang.' },
      { a: 'Jarak antara dua kanta', v: ['$f_o + f_m$', '$f_o + f_m$', '$f_o + f_m$', '$f_o − f_m$'], ok: '$f_o + f_m$', sebab: 'Pelarasan normal; imej akhir di infiniti.' }
    ],
    jawapan: 0
  },
  kuizTambah: [
    { q: 'Seorang lelaki ingin menombak ikan di dalam sungai. Ke manakah dia patut membidik?', o: ['Tepat pada imej ikan yang dilihat', 'Lebih ke bawah daripada imej ikan', 'Lebih ke atas daripada imej ikan', 'Ke sebelah kiri imej ikan'], a: 1, e: 'Akibat pembiasan, imej ikan kelihatan lebih cetek daripada kedudukan sebenar. Ikan sebenar berada di bawah imej.' },
    { q: 'Kanta cembung yang lebih tebal mempunyai', o: ['panjang fokus lebih panjang', 'panjang fokus lebih pendek', 'panjang fokus sama', 'tiada titik fokus'], a: 1, e: 'Kanta tebal mempunyai jejari kelengkungan lebih kecil dan lebih kuat membiaskan cahaya, jadi panjang fokusnya lebih pendek.' },
    { q: 'Mengapakah mentol lampu suluh diletakkan di titik fokus cermin cekung?', o: ['Supaya imej diperbesar', 'Supaya cahaya dipantulkan sebagai alur selari', 'Supaya cahaya tertumpu pada satu titik', 'Supaya imej maya terbentuk'], a: 1, e: 'Sinar dari titik fokus dipantulkan selari dengan paksi utama, menghasilkan alur cahaya yang kuat dan jauh.' }
  ]
});
