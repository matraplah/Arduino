'use strict';
/* ===== Kandungan fokus SPM Tingkatan 5 (format sama seperti spm-t4.js) ===== */

SPM('t5-b1', {
  sub: [
    { n: '1.1', t: 'Daya Paduan', ingat: 'Daya paduan sifar → pegun ATAU halaju seragam.', isi: [
      '!**Daya paduan**: daya tunggal yang mewakili hasil tambah vektor dua atau lebih daya.',
      'Searah: tambah. Bertentangan: tolak. Berserenjang: $F = sqrt{F_1^2 + F_2^2}$. Sudut lain: lukisan berskala (segi empat selari / segi tiga daya).',
      '!Daya paduan = 0 → objek pegun atau bergerak dengan **halaju seragam**. Daya paduan ≠ 0 → memecut, $F = ma$.',
      'Daya paduan = daya tarikan − daya geseran. Geseran bertambah → daya paduan berkurang → pecutan berkurang.',
      '!Lif: bacaan penimbang $R$. Pegun/halaju seragam: $R = mg$. Memecut ke atas: $R = mg + ma$. Memecut ke bawah: $R = mg − ma$.'
    ] },
    { n: '1.2', t: 'Leraian Daya', ingat: 'Komponen bersebelahan sudut guna kos; bertentangan sudut guna sin.', isi: [
      '!**Leraian daya**: meleraikan satu daya kepada dua komponen berserenjang.',
      '!$F_x = F kos θ$ (mengufuk), $F_y = F sin θ$ (menegak), dengan $θ$ diukur dari garis ufuk.',
      '!Mesin rumput: komponen mengufuk menggerakkan ke hadapan; komponen menegak menekan ke bawah. Pemegang lebih condong (sudut kecil) → daya ke hadapan lebih besar.',
      'Satah condong: $W sin θ$ selari dengan satah (menarik ke bawah), $W kos θ$ serenjang dengan satah.'
    ] },
    { n: '1.3', t: 'Keseimbangan Daya', isi: [
      '!**Keseimbangan daya**: daya paduan yang bertindak ke atas objek ialah sifar.',
      '!Tiga daya dalam keseimbangan membentuk **segi tiga daya tertutup** (lukis hujung ke pangkal).',
      '!Objek tergantung pada dua tali: $2T kos θ = W$ ($θ$ dari garis tegak). Sudut tali dengan garis tegak bertambah → **tegangan bertambah** → tali mudah putus.'
    ] },
    { n: '1.4', t: 'Kekenyalan', ingat: 'k besar = spring keras = pemanjangan kecil.', isi: [
      '!**Kekenyalan**: sifat bahan untuk kembali ke bentuk dan saiz asal selepas daya dialihkan.',
      '!**Hukum Hooke**: pemanjangan spring berkadar terus dengan daya, jika tidak melebihi had kenyal. $F = kx$.',
      '!Pemalar spring $k$ = kecerunan graf $F$–$x$. “$k = 20 "N cm"^{-1}$” bermaksud daya 20 N menghasilkan pemanjangan 1 cm.',
      '!Tenaga keupayaan kenyal = luas di bawah graf $F$–$x$: $E_P = {1}/{2}Fx = {1}/{2}kx^2$.',
      '!Faktor $k$: dawai lebih **tebal**, diameter gegelung lebih **kecil**, spring lebih **pendek**, bahan lebih keras → $k$ lebih besar.',
      '!Susunan **selari**: beban dikongsi → pemanjangan kecil → sistem lebih keras. **Sesiri**: pemanjangan bertambah → sistem lebih lembut.'
    ] }
  ],
  contoh: [
    { t: 'Tegangan tali (keseimbangan daya)', q: 'Papan kenyataan 20 kg tergantung pada dua kabel serupa, setiap kabel membuat sudut 30° dengan garis tegak. Hitung tegangan setiap kabel.', l: [
      'Berat: $W = mg = 20 × 9.81 = 196.2 "N"$.',
      'Komponen menegak dua tegangan mengimbangi berat: $2T kos 30° = 196.2$.',
      '$T = {196.2}/{2 × 0.866}$.'
    ], j: '$T = 113 "N"$' },
    { t: 'Pemalar spring', q: 'Panjang asal spring ialah 8 cm. Apabila beban 10 N digantung, panjangnya menjadi 12 cm. Hitung pemalar spring dan tenaga keupayaan kenyal.', l: [
      'Pemanjangan: $x = 12 − 8 = 4 "cm" = 0.04 "m"$.',
      '$k = {F}/{x} = {10}/{4} = 2.5 "N cm"^{-1}$ (= $250 "N m"^{-1}$).',
      '$E_P = {1}/{2}Fx = {1}/{2}(10)(0.04)$.'
    ], j: '$k = 2.5 "N cm"^{-1}$, $E_P = 0.2 "J"$' }
  ],
  fokus: {
    topik: [['Kekenyalan & Hukum Hooke (bandingkan spring)', 3], ['Keseimbangan daya & segi tiga daya (tegangan tali)', 3], ['Leraian daya (mesin rumput)', 2], ['Daya paduan & geseran', 2], ['Tenaga keupayaan kenyal', 2]],
    takrif: [
      ['Daya paduan', 'Daya tunggal yang mewakili jumlah secara vektor dua atau lebih daya yang bertindak ke atas objek.'],
      ['Leraian daya', 'Proses meleraikan satu daya kepada dua komponen yang berserenjang.'],
      ['Keseimbangan daya', 'Keadaan apabila daya-daya yang bertindak ke atas objek menghasilkan daya paduan sifar.'],
      ['Kekenyalan', 'Sifat bahan yang membolehkan objek kembali kepada bentuk dan saiz asal selepas daya yang dikenakan dialihkan.'],
      ['Hukum Hooke', 'Pemanjangan spring berkadar terus dengan daya yang dikenakan jika had kenyal tidak dilebihi.'],
      ['Pemalar spring', 'Daya yang diperlukan untuk menghasilkan seunit pemanjangan spring ($k = {F}/{x}$).']
    ],
    corak: [
      'Dua spring berlainan diameter/ketebalan → bandingkan pemanjangan, pemalar spring → nyatakan hubungan & Hukum Hooke.',
      'Bilangan spring disusun selari → bandingkan mampatan → hubung kait dengan pemalar spring sistem.',
      'Bingkai gambar / papan tanda pada dua tali → bandingkan sudut & tegangan; hitung tegangan.',
      'Lukis segi tiga daya bagi objek dalam keseimbangan (durian, kereta di cerun).',
      'Mesin rumput → takrif leraian daya, hitung $F_x$, kaedah paling berkesan (menolak dengan sudut kecil).'
    ],
    ciri: [
      ['Spring menanggung beban berat', 'Dawai tebal, diameter gegelung kecil', 'Pemalar spring tinggi, tidak melebihi had kenyal'],
      ['Spring menanggung beban berat', 'Susunan selari', 'Beban dikongsi, sistem lebih keras'],
      ['Spring', 'Bahan keluli', 'Kuat, kenyal, tahan lama'],
      ['Gantung objek pada dua tali', 'Sudut kecil antara tali dengan garis tegak', 'Tegangan tali lebih kecil, tidak mudah putus'],
      ['Mesin rumput', 'Tolak dengan pemegang bersudut kecil dengan ufuk', 'Komponen mengufuk lebih besar'],
      ['Basikal / kereta laju', 'Bahan kerangka berketumpatan rendah dan kuat', 'Jisim kecil → pecutan besar']
    ]
  },
  reka: {
    s: 'Pilih sistem spring yang paling sesuai untuk **penyerap hentak lori** yang membawa muatan berat.',
    opsyen: ['P', 'Q', 'R', 'S'],
    aspek: [
      { a: 'Ketebalan dawai spring', v: ['Nipis', 'Tebal', 'Tebal', 'Tebal'], ok: 'Tebal', sebab: 'Pemalar spring tinggi, tahan beban berat.' },
      { a: 'Diameter gegelung', v: ['Kecil', 'Kecil', 'Besar', 'Kecil'], ok: 'Kecil', sebab: 'Spring lebih keras (pemalar spring tinggi).' },
      { a: 'Susunan spring', v: ['Selari', 'Selari', 'Selari', 'Sesiri'], ok: 'Selari', sebab: 'Beban dikongsi; pemanjangan setiap spring kecil, tidak melebihi had kenyal.' },
      { a: 'Bahan spring', v: ['Keluli', 'Keluli', 'Keluli', 'Keluli'], ok: 'Keluli', sebab: 'Kuat, kenyal dan tahan lama.' }
    ],
    jawapan: 1
  },
  kuizTambah: [
    { q: 'Sebuah bingkai gambar digantung dengan dua tali. Apabila sudut antara setiap tali dengan garis tegak ditambah, tegangan tali', o: ['berkurang', 'bertambah', 'tidak berubah', 'menjadi sifar'], a: 1, e: '$2T kos θ = W$. Apabila $θ$ bertambah, $kos θ$ berkurang, maka $T$ mesti bertambah.' },
    { q: 'Maksud pemalar spring $20 "N cm"^{-1}$ ialah', o: ['spring memanjang 20 cm apabila daya 1 N dikenakan', 'daya 20 N menghasilkan pemanjangan 1 cm', 'spring boleh menanggung 20 N sahaja', 'tenaga keupayaan kenyal ialah 20 J'], a: 1, e: '$k = {F}/{x}$: 20 N diperlukan untuk setiap 1 cm pemanjangan.' },
    { q: 'Sebuah lif bergerak ke bawah dengan pecutan. Bacaan penimbang di dalam lif berbanding berat sebenar murid ialah', o: ['lebih besar', 'lebih kecil', 'sama', 'sifar'], a: 1, e: '$R = mg − ma$, jadi bacaan penimbang lebih kecil daripada berat sebenar.' }
  ]
});

SPM('t5-b2', {
  sub: [
    { n: '2.1', t: 'Tekanan Cecair', ingat: 'P = hρg — bukan bergantung pada bentuk bekas.', isi: [
      '!**Tekanan** = daya per unit luas: $P = {F}/{A}$.',
      '!Tekanan cecair $P = hρg$: bertambah dengan **kedalaman** dan **ketumpatan**. Tidak bergantung pada bentuk bekas atau luas.',
      'Titik pada aras yang sama dalam cecair pegun → tekanan sama.',
      'Aplikasi: empangan lebih tebal di dasar; tangki air di tempat tinggi; kapal selam perlu dinding kuat.'
    ] },
    { n: '2.2–2.3', t: 'Tekanan Atmosfera dan Tekanan Gas', ingat: '1 atm = 76 cm Hg = 10 m air ≈ $1.01 × 10^5$ Pa.', isi: [
      '!**Tekanan atmosfera**: tekanan akibat berat lapisan udara di atas permukaan Bumi.',
      '!Barometer merkuri: tinggi turus merkuri = tekanan atmosfera (76 cm Hg di aras laut). Merkuri digunakan kerana **sangat tumpat** (tiub pendek) dan kadar penyejatan rendah.',
      '!Di puncak gunung: tekanan atmosfera berkurang → turus merkuri lebih rendah (udara lebih nipis).',
      '!**Manometer**: $P_"gas" = P_"atm" + h$ (jika aras di lengan terbuka lebih tinggi). Air berwarna diganti merkuri → $h$ lebih kecil (merkuri lebih tumpat).',
      'Tukar cm Hg ke Pa: $P = hρg$ dengan $ρ = 13 600 "kg m"^{-3}$.'
    ] },
    { n: '2.4', t: 'Prinsip Pascal', ingat: '${F_1}/{A_1} = {F_2}/{A_2}$; faktor penggandaan $= {A_2}/{A_1}$.', isi: [
      '!**Prinsip Pascal**: tekanan yang dikenakan ke atas bendalir tertutup dipindahkan secara **seragam ke semua arah**.',
      '!Jek/brek hidraulik: daya kecil pada omboh kecil → tekanan sama dipindahkan → daya besar pada omboh besar. ${F_1}/{A_1} = {F_2}/{A_2}$.',
      '!Faktor penggandaan $= {A_2}/{A_1}$. Isi padu sama: $A_1d_1 = A_2d_2$ (omboh besar bergerak sedikit).',
      '!Ciri bendalir hidraulik: **minyak** (tidak boleh dimampat, takat didih tinggi, tidak menghakis, melincir). **Tiada gelembung udara** (udara boleh dimampat).'
    ] },
    { n: '2.5', t: 'Prinsip Archimedes', ingat: 'Daya apungan = berat bendalir yang disesarkan.', isi: [
      '!**Prinsip Archimedes**: objek yang direndam sebahagian atau sepenuhnya mengalami **daya apungan** sama dengan **berat bendalir yang disesarkan**. $F_B = ρVg$.',
      '!Terapung pegun: berat objek = daya apungan. Daya apungan > berat → naik; < berat → tenggelam.',
      '!Kapal selam: tangki balast diisi air → berat bertambah → tenggelam; air dipam keluar (udara masuk) → berat berkurang → timbul.',
      'Belon udara panas: udara panas kurang tumpat → daya apungan > berat → naik. Hidrometer: tenggelam lebih dalam dalam cecair kurang tumpat.'
    ] },
    { n: '2.6', t: 'Prinsip Bernoulli', ingat: 'Halaju tinggi → tekanan rendah.', isi: [
      '!**Prinsip Bernoulli**: apabila halaju bendalir bertambah, tekanannya berkurang.',
      '!Aerofoil: udara di atas sayap lebih laju (tekanan rendah), di bawah lebih perlahan (tekanan tinggi) → perbezaan tekanan menghasilkan **daya angkat**.',
      'Aplikasi: nebulizer / penyembur (udara laju di hujung tiub → tekanan rendah → cecair disedut naik), penunu Bunsen, spoiler kereta lumba (daya ke bawah).'
    ] }
  ],
  contoh: [
    { t: 'Jek hidraulik', q: 'Luas omboh X = $0.004 "m"^2$, omboh Y = $0.2 "m"^2$. Daya 60 N dikenakan pada X. Hitung (a) jisim beban yang boleh diangkat, (b) jarak Y bergerak jika X ditolak 0.5 m.', l: [
      '${F_1}/{A_1} = {F_2}/{A_2}$ → $F_2 = 60 × {0.2}/{0.004} = 3 000 "N"$.',
      '(a) $m = {F_2}/{g} = {3 000}/{9.81}$ = 306 kg.',
      '(b) $A_1d_1 = A_2d_2$ → $d_2 = {0.004 × 0.5}/{0.2}$.'
    ], j: '(a) 306 kg  (b) 0.01 m (1 cm)' },
    { t: 'Daya apungan', q: 'Blok logam 0.050 kg mempunyai berat ketara 0.20 N dalam air. Hitung daya apungan dan isi padu blok.', l: [
      'Berat sebenar: $W = 0.050 × 9.81 = 0.49 "N"$.',
      'Daya apungan = kehilangan berat ketara $= 0.49 − 0.20 = 0.29 "N"$.',
      '$F_B = ρVg$ → $V = {0.29}/{1 000 × 9.81}$.'
    ], j: '$F_B = 0.29 "N"$, $V = 2.96 × 10^{-5} "m"^3$' }
  ],
  fokus: {
    topik: [['Prinsip Pascal: jek & brek hidraulik', 3], ['Soalan reka bentuk: jek, brek, jengkaut, kapal selam, nebulizer', 3], ['Barometer & tekanan atmosfera', 2], ['Prinsip Bernoulli (nebulizer, aerofoil)', 2], ['Archimedes: kapal selam, belon', 2], ['Manometer & tekanan gas', 1]],
    takrif: [
      ['Tekanan', 'Daya yang bertindak secara normal per unit luas permukaan.'],
      ['Tekanan atmosfera', 'Tekanan yang disebabkan oleh berat lapisan udara yang bertindak ke atas permukaan Bumi.'],
      ['Prinsip Pascal', 'Tekanan yang dikenakan ke atas bendalir dalam bekas tertutup dipindahkan secara seragam ke semua arah dalam bendalir itu.'],
      ['Prinsip Archimedes', 'Objek yang direndam sebahagian atau sepenuhnya dalam bendalir mengalami daya apungan yang sama dengan berat bendalir yang disesarkan.'],
      ['Daya apungan', 'Daya ke atas yang dikenakan oleh bendalir ke atas objek yang direndam di dalamnya.'],
      ['Prinsip Bernoulli', 'Apabila halaju suatu bendalir bertambah, tekanan dalam bendalir itu berkurang.']
    ],
    corak: [
      'Jek / brek hidraulik → nyatakan Prinsip Pascal, terangkan cara berfungsi (4 markah), hitung faktor penggandaan & daya output.',
      'Cadangkan pengubahsuaian brek: jenis cecair, luas omboh induk, bahan paip.',
      'Barometer → sebab guna merkuri, perubahan $h$ di puncak gunung, hitung tekanan dalam Pa.',
      'Nebulizer / penyembur → nyatakan Prinsip Bernoulli, kawasan halaju tinggi & tekanan rendah, hitung daya $F = ΔP × A$.',
      'Kapal selam → takrif daya apungan, fungsi tangki balast.'
    ],
    ciri: [
      ['Sistem hidraulik', 'Minyak sebagai bendalir', 'Tidak boleh dimampat, tidak menghakis, takat didih tinggi'],
      ['Sistem hidraulik', 'Omboh input kecil, omboh output besar', 'Faktor penggandaan ${A_2}/{A_1}$ besar'],
      ['Sistem hidraulik', 'Paip keluli', 'Kuat, tahan tekanan tinggi, tidak bocor'],
      ['Sistem hidraulik', 'Tiada gelembung udara', 'Udara boleh dimampat, tekanan tidak dipindahkan sepenuhnya'],
      ['Kapal selam', 'Badan keluli tebal, berbentuk larus', 'Tahan tekanan air dalam; kurang rintangan air'],
      ['Kapal selam', 'Tangki balast besar', 'Kawal berat untuk tenggelam/timbul'],
      ['Nebulizer / penyembur', 'Muncung (tiub) sempit', 'Halaju udara tinggi → tekanan rendah']
    ]
  },
  reka: {
    s: 'Pilih **sistem brek hidraulik** yang paling berkesan untuk sebuah kereta.',
    opsyen: ['P', 'Q', 'R', 'S'],
    aspek: [
      { a: 'Jenis cecair brek', v: ['Air', 'Minyak brek', 'Minyak brek', 'Minyak brek'], ok: 'Minyak brek', sebab: 'Tidak boleh dimampat, takat didih tinggi, tidak menghakis.' },
      { a: 'Luas keratan rentas omboh induk', v: ['Kecil', 'Besar', 'Kecil', 'Kecil'], ok: 'Kecil', sebab: 'Tekanan besar dihasilkan oleh daya kaki yang kecil.' },
      { a: 'Luas keratan rentas omboh roda', v: ['Besar', 'Besar', 'Besar', 'Kecil'], ok: 'Besar', sebab: 'Daya membrek besar (faktor penggandaan tinggi).' },
      { a: 'Bahan paip', v: ['Keluli', 'Keluli', 'Keluli', 'Getah nipis'], ok: 'Keluli', sebab: 'Kuat dan tahan tekanan tinggi, tidak mengembang.' }
    ],
    jawapan: 2
  },
  kuizTambah: [
    { q: 'Mengapakah gelembung udara di dalam sistem brek hidraulik mengurangkan keberkesanan brek?', o: ['Udara menambah geseran', 'Udara boleh dimampatkan, jadi tekanan tidak dipindahkan sepenuhnya', 'Udara meningkatkan ketumpatan minyak', 'Udara menyebabkan minyak mendidih'], a: 1, e: 'Sebahagian daya digunakan untuk memampatkan udara, jadi tekanan pada omboh roda berkurang.' },
    { q: 'Sebuah barometer merkuri dibawa ke puncak gunung. Ketinggian turus merkuri', o: ['bertambah', 'berkurang', 'tidak berubah', 'menjadi sifar'], a: 1, e: 'Tekanan atmosfera berkurang dengan altitud kerana lapisan udara di atas lebih nipis.' },
    { q: 'Dalam nebulizer, cecair ubat naik melalui tiub kerana', o: ['udara laju di atas tiub menghasilkan tekanan rendah', 'cecair dipanaskan', 'daya apungan bertindak pada cecair', 'tekanan atmosfera berkurang di dalam botol'], a: 0, e: 'Prinsip Bernoulli: udara laju di hujung tiub bertekanan rendah, tekanan lebih tinggi di permukaan cecair menolak cecair naik.' }
  ]
});

SPM('t5-b3', {
  sub: [
    { n: '3.1', t: 'Arus dan Beza Keupayaan', isi: [
      '!**Medan elektrik**: kawasan di sekitar cas di mana cas lain mengalami daya elektrik. Antara dua plat: $E = {V}/{d}$.',
      'Bola bersalut konduktor di antara dua plat berayun: voltan ↑ atau jarak plat ↓ → medan ↑ → frekuensi ayunan ↑.',
      '!**Arus** = kadar pengaliran cas: $I = {Q}/{t}$. $Q = ne$.',
      '!**Beza keupayaan** = kerja untuk menggerakkan 1 C cas antara dua titik: $V = {W}/{Q}$.'
    ] },
    { n: '3.2', t: 'Rintangan', ingat: '$R = {ρl}/{A}$: panjang ↑ R ↑; luas ↑ R ↓.', isi: [
      '!**Hukum Ohm**: $V ∝ I$ jika suhu malar. $V = IR$.',
      '!Faktor rintangan: **panjang** (↑), **luas keratan rentas** (↓), **kerintangan bahan** dan **suhu** (↑). $R = {ρl}/{A}$.',
      '!**Kerintangan**: ukuran keupayaan bahan menentang arus. Dawai penyambung = **kuprum** (kerintangan rendah). Unsur pemanas = **nikrom** (kerintangan tinggi, takat lebur tinggi, tidak teroksida).',
      'Sesiri: $R = R_1 + R_2$, arus sama. Selari: ${1}/{R} = {1}/{R_1} + {1}/{R_2}$, voltan sama.',
      '!Lampu rumah disambung **selari**: setiap lampu dapat voltan penuh; satu rosak, yang lain masih menyala.'
    ] },
    { n: '3.3', t: 'D.g.e. dan Rintangan Dalam', ingat: 'ε = V + Ir. Suis terbuka: voltmeter baca ε.', isi: [
      '!**D.g.e.**: tenaga yang dibekalkan oleh sumber untuk menggerakkan 1 C cas dalam litar lengkap. Diukur apabila **litar terbuka**.',
      '!**Rintangan dalam** menyebabkan voltan hilang $Ir$. $ε = V + Ir = I(R + r)$.',
      'Graf $V$–$I$: pintasan paksi $V$ = ε; kecerunan = $−r$.'
    ] },
    { n: '3.4', t: 'Tenaga dan Kuasa Elektrik', ingat: '“240 V, 1 100 W” = guna 1 100 J sesaat pada 240 V.', isi: [
      '!**Kuasa** = kadar penggunaan tenaga. $P = VI = I^2R = {V^2}/{R}$. Tenaga $E = Pt$.',
      '!Maksud label “240 V, 800 W”: perkakas menggunakan **800 J tenaga sesaat** apabila disambung kepada bekalan 240 V.',
      '!Pilih **fius** dengan kadaran sedikit lebih tinggi daripada arus kerja ($I = {P}/{V}$).',
      'Kos: tenaga (kWj) = kuasa (kW) × masa (j); kos = kWj × tarif.',
      'Penjimatan: guna lampu LED, padam suis apabila tidak digunakan, pilih perkakas berlabel cekap tenaga (5 bintang).'
    ] }
  ],
  contoh: [
    { t: 'Kuasa, tenaga dan fius', q: 'Pengering rambut “240 V, 1 100 W” digunakan selama 12 minit. Hitung (a) tenaga, (b) arus. (c) Adakah fius 5 A sesuai?', l: [
      '(a) $E = Pt = 1 100 × (12 × 60) = 7.92 × 10^5 "J"$.',
      '(b) $I = {P}/{V} = {1 100}/{240} = 4.58 "A"$.',
      '(c) Fius mesti sedikit lebih tinggi daripada arus kerja: 5 A > 4.58 A.'
    ], j: '(a) $7.92 × 10^5 "J"$  (b) 4.58 A  (c) Sesuai, kerana kadarannya sedikit lebih tinggi daripada 4.58 A.' },
    { t: 'Litar dengan rintangan dalam', q: 'Sel 9 V, rintangan dalam 1 Ω, disambung kepada perintang 4 Ω sesiri dengan gabungan selari 6 Ω dan 3 Ω. Hitung arus dan voltan terminal.', l: [
      'Selari: ${1}/{R} = {1}/{6} + {1}/{3}$ → 2 Ω. Rintangan luar $= 4 + 2 = 6 "Ω"$.',
      '$I = {ε}/{R + r} = {9}/{6 + 1} = 1.29 "A"$.',
      '$V = ε − Ir = 9 − 1.29 × 1$.'
    ], j: '$I = 1.29 "A"$, $V = 7.71 "V"$' }
  ],
  fokus: {
    topik: [['Kuasa & tenaga elektrik (maksud label, $I = {P}/{V}$)', 3], ['Rintangan, kerintangan & bahan unsur pemanas', 3], ['d.g.e. & rintangan dalam', 2], ['Fius', 2], ['Soalan reka bentuk: penggoreng, pemanggang, komuter', 2], ['Medan elektrik & kos tenaga', 1]],
    takrif: [
      ['Medan elektrik', 'Kawasan di sekitar zarah bercas di mana cas elektrik lain akan mengalami daya elektrik.'],
      ['Arus', 'Kadar pengaliran cas.'],
      ['Beza keupayaan', 'Kerja yang dilakukan untuk menggerakkan satu coulomb cas di antara dua titik.'],
      ['Hukum Ohm', 'Beza keupayaan merentasi konduktor berkadar terus dengan arus yang mengalir jika suhu dan keadaan fizikal malar.'],
      ['Kerintangan', 'Ukuran keupayaan suatu bahan untuk menentang pengaliran arus elektrik.'],
      ['Daya gerak elektrik', 'Tenaga yang dibekalkan oleh sumber untuk menggerakkan satu coulomb cas dalam litar lengkap.'],
      ['Kuasa elektrik', 'Kadar penggunaan tenaga elektrik.']
    ],
    corak: [
      'Maksud label “240 V, 1 100 W” atau “P = 3 000 W” (sangat kerap, 1 markah).',
      'Hitung tenaga, arus dan pilih fius; terangkan sama ada fius sesuai.',
      'Dua cerek berlainan kuasa → bandingkan kuasa, arus, kadar penggunaan tenaga → hubung kait.',
      'Terangkan mengapa wayar penyambung guna kuprum tetapi unsur pemanas guna nikrom.',
      'Hitung arus apabila suis dibuka dan ditutup (litar sesiri/selari).',
      'Reka bentuk: unsur pemanas penggoreng / pemanggang / pembuat bebola, keretapi elektrik.'
    ],
    ciri: [
      ['Unsur pemanas', 'Nikrom', 'Kerintangan tinggi, takat lebur tinggi, tidak mudah teroksida'],
      ['Unsur pemanas', 'Dawai bergegelung', 'Panjang dalam ruang kecil, haba tertumpu'],
      ['Wayar penyambung', 'Kuprum, tebal', 'Kerintangan rendah, kurang tenaga hilang sebagai haba'],
      ['Perkakas pemanas', 'Badan luar penebat haba (plastik)', 'Selamat disentuh'],
      ['Penggoreng kering', 'Kipas', 'Sebarkan udara panas dengan sekata'],
      ['Keselamatan', 'Fius kadaran sedikit lebih tinggi daripada arus kerja', 'Putuskan litar apabila arus berlebihan'],
      ['Lampu rumah', 'Sambungan selari', 'Voltan penuh pada setiap lampu; satu rosak, lain menyala']
    ]
  },
  reka: {
    s: 'Pilih **pemanggang elektrik** yang dapat memanggang dengan cepat dan selamat.',
    opsyen: ['P', 'Q', 'R', 'S'],
    aspek: [
      { a: 'Bahan unsur pemanas', v: ['Kuprum', 'Nikrom', 'Nikrom', 'Nikrom'], ok: 'Nikrom', sebab: 'Kerintangan tinggi, takat lebur tinggi, tidak mudah teroksida.' },
      { a: 'Kuasa', v: ['3 000 W', '3 000 W', '800 W', '3 000 W'], ok: '3 000 W', sebab: 'Lebih banyak tenaga haba sesaat, memanggang lebih cepat.' },
      { a: 'Kadaran fius (arus kerja 12.5 A)', v: ['13 A', '13 A', '13 A', '5 A'], ok: '13 A', sebab: 'Sedikit lebih tinggi daripada arus kerja; fius 5 A akan putus dalam penggunaan biasa.' },
      { a: 'Bahan pemegang', v: ['Plastik penebat', 'Plastik penebat', 'Plastik penebat', 'Logam'], ok: 'Plastik penebat', sebab: 'Penebat haba dan elektrik, selamat dipegang.' }
    ],
    jawapan: 1
  },
  kuizTambah: [
    { q: 'Apakah maksud label “240 V, 800 W” pada sebuah cerek elektrik?', o: ['Cerek menghasilkan 800 V apabila disambung kepada 240 W', 'Cerek menggunakan 800 J tenaga sesaat apabila disambung kepada bekalan 240 V', 'Cerek membawa arus 800 A', 'Cerek mempunyai rintangan 800 Ω'], a: 1, e: 'Kuasa 800 W = 800 J sesaat pada voltan operasi 240 V.' },
    { q: 'Mengapakah unsur pemanas diperbuat daripada nikrom dan bukan kuprum?', o: ['Nikrom mempunyai kerintangan rendah', 'Nikrom mempunyai kerintangan tinggi dan takat lebur tinggi', 'Nikrom ialah penebat', 'Nikrom lebih murah'], a: 1, e: 'Kerintangan tinggi menghasilkan haba yang banyak; takat lebur tinggi supaya tidak melebur pada suhu tinggi.' },
    { q: 'Suis sebuah litar dibuka. Bacaan voltmeter yang disambung merentasi terminal sel ialah', o: ['sifar', 'd.g.e. sel', 'voltan hilang', 'separuh d.g.e.'], a: 1, e: 'Tiada arus mengalir, jadi tiada voltan hilang ($Ir = 0$). Voltmeter membaca d.g.e.' }
  ]
});

SPM('t5-b4', {
  sub: [
    { n: '4.1', t: 'Daya ke atas Konduktor Pembawa Arus', ingat: 'Tangan KIRI = motor (daya). Tangan KANAN = penjana (arus aruhan).', isi: [
      '!**Medan lastik**: medan magnet paduan daripada interaksi medan magnet konduktor pembawa arus dengan medan magnet kekal.',
      '!**Petua Tangan Kiri Fleming**: jari telunjuk = medan (U → S), jari tengah = arus, ibu jari = daya/gerakan.',
      '!Daya bertambah apabila **arus** bertambah atau **magnet lebih kuat**. Arus lebih besar → sesaran rod lebih besar.',
      '!**Motor arus terus**: gegelung dalam medan magnet mengalami pasangan daya → berputar. **Komutator** menyongsangkan arus setiap separuh putaran supaya arah putaran sama. Tenaga elektrik → tenaga kinetik.',
      'Laju putaran motor ↑: tambah arus/voltan, tambah bilangan lilitan, guna magnet lebih kuat (magnet melengkung).'
    ] },
    { n: '4.2', t: 'Aruhan Elektromagnet', ingat: 'Tiada gerakan relatif = tiada arus aruhan.', isi: [
      '!**Aruhan elektromagnet**: d.g.e. diaruh apabila konduktor **memotong fluks magnet** (ada gerakan relatif).',
      '!**Hukum Faraday**: d.g.e. aruhan berkadar terus dengan **kadar pemotongan fluks magnet**. Gerak magnet lebih laju, lebih banyak lilitan, magnet lebih kuat → pesongan galvanometer lebih besar.',
      '!**Hukum Lenz**: arus aruhan menentang perubahan yang menghasilkannya. Magnet utara mendekati → hujung solenoid menjadi kutub utara (menolak).'
    ] },
    { n: '4.3', t: 'Transformer', ingat: '${V_S}/{V_P} = {N_S}/{N_P}$ dan $η = {V_SI_S}/{V_PI_P} × 100%$.', isi: [
      '!Transformer hanya berfungsi dengan **arus ulang-alik**: a.u. menghasilkan medan magnet **berubah-ubah** yang mengaruhkan d.g.e. dalam gegelung sekunder. Arus terus menghasilkan medan malar → tiada aruhan.',
      '!${V_S}/{V_P} = {N_S}/{N_P}$. Injak naik: $N_S > N_P$. Injak turun: $N_S < N_P$.',
      '!**Transformer unggul**: kecekapan 100 %, $V_PI_P = V_SI_S$ (kuasa input = kuasa output).',
      '!Kecekapan < 100 % kerana: rintangan gegelung (guna **dawai kuprum tebal**), arus pusar (**teras berlamina**), histeresis (**teras besi lembut**), kebocoran fluks (lilit sekunder di atas primer).',
      'Penghantaran tenaga: voltan sangat tinggi → arus kecil → kehilangan kuasa $I^2R$ dalam kabel kecil.',
      'Dapur aruhan: arus a.u. → medan berubah → **arus pusar** dalam dasar periuk (logam feromagnet) → periuk panas.'
    ] }
  ],
  contoh: [
    { t: 'Transformer dengan kecekapan', q: 'Transformer 240 V menyalakan mentol “12 V, 36 W” dengan normal. Kecekapan 80 %. Hitung (a) nisbah $N_P : N_S$, (b) arus sekunder, (c) arus primer.', l: [
      '(a) ${N_P}/{N_S} = {V_P}/{V_S} = {240}/{12} = 20$, jadi 20 : 1.',
      '(b) $I_S = {P}/{V} = {36}/{12} = 3 "A"$.',
      '(c) Kuasa input $= {36}/{0.80} = 45 "W"$. $I_P = {45}/{240}$.'
    ], j: '(a) 20 : 1  (b) 3 A  (c) 0.19 A' },
    { t: 'Transformer unggul', q: 'Transformer unggul: $V_P = 240 "V"$, $I_P = 0.18 "A"$, $V_S = 6 "V"$. Hitung arus sekunder.', l: [
      'Unggul: $V_PI_P = V_SI_S$.',
      '$I_S = {240 × 0.18}/{6}$.'
    ], j: '$I_S = 7.2 "A"$' }
  ],
  fokus: {
    topik: [['Transformer: nisbah, kecekapan, unggul, sebab tidak 100 %', 3], ['Motor arus terus & medan lastik', 3], ['Reka bentuk: motor, dapur aruhan, transformer, penghantaran', 3], ['Petua tangan kiri Fleming', 2], ['Aruhan: Faraday & Lenz', 2]],
    takrif: [
      ['Medan lastik', 'Medan magnet paduan yang terhasil daripada interaksi antara medan magnet konduktor pembawa arus dengan medan magnet kekal.'],
      ['Aruhan elektromagnet', 'Penghasilan d.g.e. aruhan dalam konduktor apabila terdapat gerakan relatif antara konduktor dengan medan magnet.'],
      ['Hukum Faraday', 'Magnitud d.g.e. aruhan berkadar terus dengan kadar pemotongan fluks magnet.'],
      ['Hukum Lenz', 'Arah arus aruhan sentiasa menentang perubahan fluks magnet yang menghasilkannya.'],
      ['Transformer unggul', 'Transformer yang tiada kehilangan tenaga; kecekapannya 100 % (kuasa input = kuasa output).']
    ],
    corak: [
      'Rod kuprum dalam medan magnet → takrif medan lastik, lukis medan lastik, bandingkan arus & sesaran → hubung kait.',
      'Motor arus terus / kipas mainan → petua tangan kiri, perubahan tenaga, cara tambah laju putaran.',
      'Transformer → jenis, nisbah lilitan, arus sekunder/primer, kecekapan; mengapa tidak berfungsi dengan a.t.',
      'Magnet dijatuhkan ke dalam gegelung → bandingkan bilangan lilitan & pesongan galvanometer → Hukum Faraday.',
      'Reka bentuk: transformer cekap (bahan & struktur teras, dawai), dapur aruhan, sistem penghantaran.'
    ],
    ciri: [
      ['Transformer cekap', 'Teras besi lembut', 'Mudah dimagnet dan dinyahmagnet, kurang histeresis'],
      ['Transformer cekap', 'Teras berlamina', 'Kurangkan arus pusar'],
      ['Transformer cekap', 'Dawai kuprum tebal', 'Rintangan rendah, kurang haba'],
      ['Transformer cekap', 'Gegelung sekunder dililit atas primer', 'Kurangkan kebocoran fluks'],
      ['Motor laju', 'Banyak lilitan, voltan/arus tinggi, magnet kuat', 'Daya putaran lebih besar'],
      ['Penghantaran tenaga', 'Voltan sangat tinggi, kabel aluminium tebal', 'Arus kecil, kehilangan $I^2R$ kecil; ringan'],
      ['Dapur aruhan', 'Bekalan a.u., periuk logam feromagnet, permukaan seramik kaca', 'Medan berubah aruh arus pusar; permukaan penebat']
    ]
  },
  reka: {
    s: 'Pilih **transformer** yang paling cekap untuk ketuhar gelombang mikro.',
    opsyen: ['P', 'Q', 'R', 'S'],
    aspek: [
      { a: 'Bahan teras', v: ['Besi lembut', 'Keluli', 'Besi lembut', 'Besi lembut'], ok: 'Besi lembut', sebab: 'Mudah dimagnet dan dinyahmagnet, kurangkan kehilangan histeresis.' },
      { a: 'Struktur teras', v: ['Berlamina', 'Berlamina', 'Pepejal', 'Berlamina'], ok: 'Berlamina', sebab: 'Kurangkan arus pusar dalam teras.' },
      { a: 'Dawai gegelung', v: ['Kuprum tebal', 'Kuprum tebal', 'Kuprum tebal', 'Nikrom nipis'], ok: 'Kuprum tebal', sebab: 'Rintangan rendah, kurang tenaga hilang sebagai haba.' },
      { a: 'Susunan gegelung', v: ['Sekunder dililit atas primer', 'Berasingan', 'Sekunder dililit atas primer', 'Sekunder dililit atas primer'], ok: 'Sekunder dililit atas primer', sebab: 'Semua fluks primer memaut sekunder, kurang kebocoran fluks.' }
    ],
    jawapan: 0
  },
  kuizTambah: [
    { q: 'Mengapakah transformer tidak berfungsi apabila disambungkan kepada bekalan arus terus?', o: ['Arus terus terlalu besar', 'Medan magnet yang dihasilkan tidak berubah, jadi tiada d.g.e. diaruh', 'Teras besi menjadi panas', 'Gegelung sekunder terputus'], a: 1, e: 'Aruhan memerlukan perubahan fluks magnet. Arus terus menghasilkan fluks malar.' },
    { q: 'Rod kuprum dalam medan magnet tersesar lebih jauh apabila', o: ['arus dikurangkan', 'arus ditambah', 'magnet dialihkan', 'rod digantikan dengan rod plastik'], a: 1, e: 'Daya ke atas konduktor bertambah dengan arus; sesaran rod bertambah.' },
    { q: 'Tenaga elektrik dihantar pada voltan tinggi supaya', o: ['arus dalam kabel besar', 'arus dalam kabel kecil, kehilangan kuasa $I^2R$ berkurang', 'kabel menjadi lebih panas', 'rintangan kabel bertambah'], a: 1, e: 'Untuk kuasa yang sama, voltan tinggi bermaksud arus kecil, jadi kehilangan $I^2R$ kecil.' }
  ]
});

SPM('t5-b5', {
  sub: [
    { n: '5.1', t: 'Elektron', ingat: '$eV = {1}/{2}mv^2$.', isi: [
      '!**Pancaran termion**: pemancaran elektron daripada permukaan logam yang dipanaskan.',
      '!**Sinar katod** = alur elektron berhalaju tinggi dalam tiub vakum. Vakum supaya elektron tidak berlanggar dengan molekul udara.',
      '!Tiub Palang Maltese: **bayang palang** terbentuk kerana sinar katod bergerak lurus dan dihalang; **cahaya hijau** di skrin kerana elektron menghentam skrin berpendarfluor. Sinar katod dipesong oleh medan magnet dan medan elektrik.',
      '!Tenaga keupayaan elektrik → tenaga kinetik: $eV = {1}/{2}mv^2$.'
    ] },
    { n: '5.2', t: 'Diod Semikonduktor', ingat: 'Pincang depan: lapisan susutan nipis, arus mengalir.', isi: [
      '!**Diod** membenarkan arus mengalir dalam **satu arah sahaja**.',
      '!**Pincang depan** (anod ke +): lapisan susutan **nipis**, rintangan rendah, arus mengalir, mentol menyala. **Pincang songsang**: lapisan susutan **tebal**, tiada arus, mentol tidak menyala.',
      '!**Rektifikasi**: menukar arus ulang-alik kepada arus terus. **Separuh gelombang** = 1 diod. **Gelombang penuh** = 4 diod (tetimbang).',
      '!**Kapasitor** disambung **selari dengan beban** sebagai perata: dicas apabila voltan naik, menyahcas apabila voltan turun → output lebih licin.'
    ] },
    { n: '5.3', t: 'Transistor', ingat: 'Tiada $I_B$ → tiada $I_C$.', isi: [
      '!Tiga terminal: **tapak (B)**, **pengumpul (C)**, **pengeluar (E)**. $I_E = I_B + I_C$. Jenis npn dan pnp.',
      '!**Amplifier arus**: $I_B$ kecil mengawal $I_C$ besar ($I_C$ ≫ $I_B$).',
      '!**Suis automatik**: transistor hidup apabila voltan tapak cukup tinggi. Pembahagi voltan: $V = {R_2}/{R_1 + R_2} × V_T$.',
      '!**LDR**: rintangan tinggi dalam gelap. Lampu automatik malam: LDR di antara tapak dan pengeluar. **Termistor**: rintangan turun apabila suhu naik → penggera kebakaran.'
    ] }
  ],
  contoh: [
    { t: 'Halaju elektron', q: 'Satu elektron menerima tenaga keupayaan elektrik $4.8 × 10^{-16} "J"$. Hitung halaju maksimumnya. [$m = 9.11 × 10^{-31} "kg"$]', l: [
      'Tenaga keupayaan = tenaga kinetik: ${1}/{2}mv^2 = 4.8 × 10^{-16}$.',
      '$v = sqrt{{2 × 4.8 × 10^{-16}}/{9.11 × 10^{-31}}}$.'
    ], j: '$v = 3.25 × 10^7 "m s"^{-1}$' },
    { t: 'Pembahagi voltan LDR', q: 'LDR (1 kΩ pada waktu malam) disambung sesiri dengan perintang 0.5 kΩ merentasi bekalan 6 V. Hitung beza keupayaan merentasi LDR.', l: [
      '$V_"LDR" = {R_"LDR"}/{R_"LDR" + R} × V_T$.',
      '$V_"LDR" = {1}/{1 + 0.5} × 6$.'
    ], j: '$V_"LDR" = 4 "V"$ (cukup untuk menghidupkan transistor)' }
  ],
  fokus: {
    topik: [['Rektifikasi & kapasitor perata (lukis surihan OSK)', 3], ['Diod: pincang depan / songsang, lapisan susutan', 3], ['Sinar katod & tiub Palang Maltese', 2], ['Transistor sebagai suis (LDR, termistor)', 2], ['Pembahagi voltan', 2]],
    takrif: [
      ['Pancaran termion', 'Pemancaran elektron daripada permukaan logam yang dipanaskan.'],
      ['Sinar katod', 'Alur elektron yang bergerak dengan halaju tinggi di dalam tiub vakum.'],
      ['Diod semikonduktor', 'Komponen elektronik yang membenarkan arus mengalir dalam satu arah sahaja.'],
      ['Rektifikasi', 'Proses menukarkan arus ulang-alik kepada arus terus.'],
      ['Pendopan', 'Proses menambah bendasing ke dalam kekisi hablur semikonduktor untuk meningkatkan kekonduksiannya.']
    ],
    corak: [
      'Namakan komponen X (diod) dan Y (kapasitor); nyatakan jenis rektifikasi.',
      'Lukis surihan output pada skrin OSK (separuh / penuh / dengan kapasitor).',
      'Lengkapkan litar tetimbang dengan melukis diod; lukis sambungan kapasitor yang betul (selari dengan beban).',
      'Terangkan bagaimana kapasitor meratakan arus output.',
      'Dua litar diod → bandingkan sambungan sel, keadaan mentol, lapisan susutan → hubung kait.',
      'Tiub Palang Maltese → sebab bayang dan cahaya hijau; arah pesongan dalam medan magnet; hitung halaju elektron.'
    ],
    ciri: [
      ['Pengecas telefon', 'Rektifikasi gelombang penuh', 'Kedua-dua separuh kitar digunakan, output lebih licin'],
      ['Pengecas telefon', 'Kapasitor perata (kapasitans besar)', 'Output arus terus lebih stabil'],
      ['Pengecas telefon', 'Transformer injak turun', 'Turunkan 240 V kepada voltan rendah'],
      ['Lampu automatik malam', 'LDR di antara tapak dan pengeluar', 'Gelap → rintangan LDR tinggi → voltan tapak tinggi → transistor hidup'],
      ['Penggera kebakaran', 'Termistor di bahagian atas pembahagi voltan', 'Panas → rintangan termistor rendah → voltan tapak tinggi'],
      ['Litar transistor', 'Perintang pada tapak', 'Hadkan arus tapak, lindungi transistor']
    ]
  },
  reka: {
    s: 'Pilih **pengecas telefon bimbit** yang mengecas dengan cepat dan stabil.',
    opsyen: ['P', 'Q', 'R', 'S'],
    aspek: [
      { a: 'Jenis rektifikasi', v: ['Gelombang separuh', 'Gelombang penuh', 'Gelombang penuh', 'Gelombang penuh'], ok: 'Gelombang penuh', sebab: 'Kedua-dua separuh kitar digunakan, kuasa output lebih besar.' },
      { a: 'Kapasitor', v: ['Ada, selari dengan beban', 'Tiada', 'Ada, selari dengan beban', 'Ada, selari dengan beban'], ok: 'Ada, selari dengan beban', sebab: 'Meratakan output menjadi arus terus yang stabil.' },
      { a: 'Jenis transformer', v: ['Injak turun', 'Injak turun', 'Injak turun', 'Injak naik'], ok: 'Injak turun', sebab: 'Bateri telefon memerlukan voltan rendah (5 V).' },
      { a: 'Kuasa output', v: ['Tinggi', 'Tinggi', 'Tinggi', 'Tinggi'], ok: 'Tinggi', sebab: 'Lebih banyak tenaga sesaat, mengecas lebih cepat.' }
    ],
    jawapan: 2
  },
  kuizTambah: [
    { q: 'Dalam keadaan pincang songsang, lapisan susutan diod', o: ['menjadi lebih nipis dan arus mengalir', 'menjadi lebih tebal dan arus tidak mengalir', 'hilang sepenuhnya', 'tidak berubah'], a: 1, e: 'Pincang songsang menebalkan lapisan susutan, rintangan menjadi sangat tinggi.' },
    { q: 'Bagaimanakah kapasitor perata disambungkan dalam litar rektifikasi?', o: ['Sesiri dengan diod', 'Selari dengan perintang beban', 'Sesiri dengan bekalan a.u.', 'Di antara dua diod'], a: 1, e: 'Kapasitor selari dengan beban supaya dapat menyahcas melalui beban apabila voltan menurun.' },
    { q: 'Dalam tiub Palang Maltese, bayang palang terbentuk pada skrin kerana', o: ['sinar katod bercas positif', 'sinar katod bergerak dalam garis lurus dan dihalang oleh palang', 'skrin menyerap cahaya', 'palang memancarkan elektron'], a: 1, e: 'Elektron yang bergerak lurus dihalang oleh palang, jadi kawasan di belakangnya tidak bercahaya.' }
  ]
});

SPM('t5-b6', {
  sub: [
    { n: '6.1', t: 'Reputan Radioaktif', ingat: 'Alfa: A − 4, Z − 2. Beta: A tetap, Z + 1.', isi: [
      '!**Reputan radioaktif**: proses **rawak dan spontan** apabila nukleus tidak stabil memancarkan sinaran untuk menjadi lebih stabil.',
      '!Alfa ($nuk{4}{2}{He}$): $A − 4$, $Z − 2$. Beta ($nuk{0}{−1}{e}$): $A$ tetap, $Z + 1$. Gama: tiada perubahan $A$ dan $Z$.',
      '!Cari bilangan zarah: guna nombor nukleon untuk alfa dahulu, kemudian nombor proton untuk beta.',
      '!**Separuh hayat** $T_{{1}/{2}}$: masa untuk separuh daripada nukleus asal mereput. $N = N_0({1}/{2})^n$, $n = {t}/{T_{{1}/{2}}}$.',
      'Baca separuh hayat daripada graf: cari masa apabila keaktifan menjadi separuh nilai asal. Separuh hayat pendek → kadar reputan tinggi.'
    ] },
    { n: '6.2', t: 'Tenaga Nuklear', ingat: 'Cacat jisim (u.j.a.) → kg → $E = mc^2$.', isi: [
      '!**Pembelahan nukleus**: nukleus berat (U-235) dibedil neutron → dua nukleus lebih ringan + neutron + tenaga.',
      '!**Tindak balas berantai**: neutron yang dibebaskan membedil nukleus U-235 lain secara berterusan.',
      '!**Pelakuran nukleus**: dua nukleus ringan bercantum (dalam Matahari) pada suhu sangat tinggi.',
      '!**Cacat jisim** = jumlah jisim sebelum − jumlah jisim selepas. $E = mc^2$ (tukar u.j.a. → kg: × $1.66 × 10^{-27}$).',
      '!Reaktor: **rod pengawal** (boron/kadmium) menyerap neutron berlebihan → kawal kadar tindak balas; **moderator** (grafit/air) memperlahankan neutron; **agen penyejuk** (air) memindahkan haba; **dinding konkrit tebal** menghalang sinaran.',
      'Perubahan tenaga stesen jana kuasa nuklear: nuklear → haba → kinetik (turbin) → elektrik.'
    ] }
  ],
  contoh: [
    { t: 'Separuh hayat', q: 'Natrium-24 mempunyai separuh hayat 15 jam. Jisim asal 64 g. Berapakah jisim yang tinggal selepas 45 jam?', l: [
      'Bilangan separuh hayat: $n = {45}/{15} = 3$.',
      '$64 → 32 → 16 → 8$.'
    ], j: '8 g' },
    { t: 'Tenaga daripada cacat jisim', q: 'Cacat jisim pembelahan satu nukleus U-235 ialah 0.186 u.j.a. Hitung tenaga yang dibebaskan.', l: [
      'Tukar ke kg: $0.186 × 1.66 × 10^{-27} = 3.09 × 10^{-28} "kg"$.',
      '$E = mc^2 = (3.09 × 10^{-28})(3.0 × 10^8)^2$.'
    ], j: '$E = 2.78 × 10^{-11} "J"$' }
  ],
  fokus: {
    topik: [['Reaktor nuklear: rod pengawal, moderator, perubahan tenaga', 3], ['Cacat jisim & $E = mc^2$', 3], ['Separuh hayat (graf & pengiraan)', 2], ['Takrif reputan radioaktif', 2], ['Persamaan reputan (cari A dan Z)', 2]],
    takrif: [
      ['Reputan radioaktif', 'Proses rawak dan spontan apabila nukleus tidak stabil memancarkan sinaran radioaktif untuk menjadi nukleus yang lebih stabil.'],
      ['Separuh hayat', 'Masa yang diambil oleh separuh daripada bilangan nukleus asal suatu sampel radioaktif untuk mereput.'],
      ['Pembelahan nukleus', 'Tindak balas nuklear apabila satu nukleus berat terbelah menjadi dua nukleus yang lebih ringan sambil membebaskan tenaga yang besar.'],
      ['Pelakuran nukleus', 'Tindak balas nuklear apabila dua nukleus ringan bercantum membentuk nukleus yang lebih berat sambil membebaskan tenaga yang besar.'],
      ['Cacat jisim', 'Perbezaan antara jumlah jisim sebelum dengan jumlah jisim selepas tindak balas nuklear.'],
      ['Tindak balas berantai', 'Tindak balas pembelahan yang berterusan apabila neutron yang dibebaskan membedil nukleus lain.']
    ],
    corak: [
      'Rajah reaktor → jenis tindak balas, dua komponen pengawal kadar tindak balas, perubahan tenaga.',
      'Jadual jisim sebelum/selepas → hitung cacat jisim (kg) dan tenaga.',
      'Graf keaktifan–masa → tentukan separuh hayat; keaktifan selepas 3 separuh hayat.',
      'Dua graf separuh hayat → bandingkan keaktifan awal, separuh hayat, kadar reputan → hubung kait.',
      'Persamaan reputan → tentukan nilai A dan Z.'
    ],
    ciri: [
      ['Reaktor nuklear', 'Rod pengawal boron/kadmium', 'Serap neutron berlebihan, kawal kadar tindak balas'],
      ['Reaktor nuklear', 'Moderator grafit/air', 'Perlahankan neutron supaya mudah diserap U-235'],
      ['Reaktor nuklear', 'Agen penyejuk air (muatan haba tentu tinggi)', 'Serap banyak haba dari teras'],
      ['Reaktor nuklear', 'Dinding konkrit tebal', 'Halang sinaran terlepas'],
      ['Lokasi stesen', 'Berhampiran laut/sungai, jauh dari penempatan', 'Sumber air penyejuk; keselamatan penduduk'],
      ['Sisa radioaktif', 'Ditanam jauh di dalam tanah dalam bekas plumbum/konkrit', 'Halang pencemaran sinaran']
    ]
  },
  reka: {
    s: 'Pilih reka bentuk **reaktor nuklear** yang paling selamat dan cekap.',
    opsyen: ['P', 'Q', 'R', 'S'],
    aspek: [
      { a: 'Rod pengawal', v: ['Boron', 'Boron', 'Aluminium', 'Boron'], ok: 'Boron', sebab: 'Menyerap neutron berlebihan untuk mengawal kadar tindak balas berantai.' },
      { a: 'Moderator', v: ['Grafit', 'Plumbum', 'Grafit', 'Grafit'], ok: 'Grafit', sebab: 'Memperlahankan neutron supaya pembelahan berterusan.' },
      { a: 'Agen penyejuk', v: ['Air', 'Air', 'Air', 'Udara'], ok: 'Air', sebab: 'Muatan haba tentu tinggi, menyerap banyak haba.' },
      { a: 'Dinding bangunan reaktor', v: ['Konkrit tebal', 'Konkrit tebal', 'Konkrit tebal', 'Konkrit tebal'], ok: 'Konkrit tebal', sebab: 'Menghalang sinaran radioaktif terlepas ke persekitaran.' }
    ],
    jawapan: 0
  },
  kuizTambah: [
    { q: 'Keaktifan suatu sampel ialah 800 bilangan per minit. Separuh hayatnya 2 hari. Berapakah keaktifan selepas 6 hari?', o: ['400', '200', '100', '50'], a: 2, e: '6 hari = 3 separuh hayat: 800 → 400 → 200 → 100.' },
    { q: 'Perubahan tenaga dalam stesen janakuasa nuklear ialah', o: ['nuklear → elektrik → haba', 'nuklear → haba → kinetik → elektrik', 'kimia → haba → elektrik', 'haba → nuklear → elektrik'], a: 1, e: 'Tenaga nuklear menghasilkan haba, stim memutarkan turbin (kinetik), penjana menghasilkan elektrik.' }
  ]
});

SPM('t5-b7', {
  sub: [
    { n: '7.1', t: 'Teori Kuantum Cahaya', ingat: '$E = hf = {hc}/{λ}$.', isi: [
      '**Jasad hitam** menyerap semua sinaran yang jatuh padanya. Teori klasik gagal menerangkan spektrumnya; Max Planck mencadangkan **kuantum tenaga** (paket tenaga diskrit).',
      '!**Foton**: kuantum tenaga cahaya, $E = hf = {hc}/{λ}$, $h = 6.63 × 10^{-34} "J s"$.',
      '!Kuasa sumber cahaya: $P = nhf$ ($n$ = bilangan foton sesaat).',
      'Kedualan gelombang–zarah: $λ = {h}/{p} = {h}/{mv}$ (de Broglie). Pembelauan elektron membuktikan elektron bersifat gelombang.'
    ] },
    { n: '7.2', t: 'Kesan Fotoelektrik', ingat: 'Frekuensi tentukan Kmaks. Keamatan tentukan bilangan elektron.', isi: [
      '!**Kesan fotoelektrik**: pemancaran elektron daripada permukaan logam apabila disinari cahaya dengan **frekuensi tertentu**. Elektron itu = **fotoelektron**.',
      '!Syarat: frekuensi cahaya **> frekuensi ambang** $f_0$. Jika tidak, tiada fotoelektron walaupun keamatan tinggi.',
      '!Frekuensi ↑ → $K_{maks}$ ↑. **Keamatan ↑ → bilangan fotoelektron ↑ → arus fotoelektrik ↑** ($K_{maks}$ tidak berubah).',
      'Fotoelektron dipancarkan serta-merta. Sel foto vakum supaya elektron tidak berlanggar dengan molekul udara.'
    ] },
    { n: '7.3', t: 'Teori Fotoelektrik Einstein', ingat: '$hf = W + K_{maks}$; $W = hf_0$.', isi: [
      '!Persamaan Einstein: $hf = W + {1}/{2}mv_{maks}^2$.',
      '!**Fungsi kerja** $W$: tenaga minimum untuk membebaskan elektron dari permukaan logam. $W = hf_0 = {hc}/{λ_0}$.',
      '!Graf $K_{maks}$–$f$: **kecerunan = $h$**, pintasan paksi $f$ = $f_0$, pintasan paksi $K_{maks}$ (diekstrapolasi) = $−W$. Logam lain: garis selari, $f_0$ berbeza.',
      'Aplikasi: sel suria, pintu automatik, kamera digital, lampu jalan automatik.'
    ] }
  ],
  contoh: [
    { t: 'Bilangan foton sesaat', q: 'Laser 10 mW memancarkan cahaya merah $λ = 6.48 × 10^{-7} "m"$. Hitung bilangan foton yang dipancarkan sesaat.', l: [
      '$P = nhf = n{hc}/{λ}$, maka $n = {Pλ}/{hc}$.',
      '$n = {(10 × 10^{-3})(6.48 × 10^{-7})}/{(6.63 × 10^{-34})(3.0 × 10^8)}$.'
    ], j: '$n = 3.26 × 10^{16}$ foton sesaat' },
    { t: 'Persamaan fotoelektrik Einstein', q: 'Natrium (fungsi kerja 2.28 eV) disinari cahaya 400 nm. Hitung tenaga kinetik maksimum fotoelektron.', l: [
      '$W = 2.28 × 1.6 × 10^{-19} = 3.65 × 10^{-19} "J"$.',
      '$E = {hc}/{λ} = {(6.63 × 10^{-34})(3.0 × 10^8)}/{400 × 10^{-9}} = 4.97 × 10^{-19} "J"$.',
      '$K_{maks} = E − W$.'
    ], j: '$K_{maks} = 1.32 × 10^{-19} "J"$' }
  ],
  fokus: {
    topik: [['Takrif kesan fotoelektrik & syarat', 3], ['Frekuensi ambang & fungsi kerja', 3], ['Graf $K_{maks}$–$f$ (kecerunan, pintasan)', 3], ['Tenaga foton & bilangan foton sesaat', 2], ['Kesan keamatan cahaya', 2]],
    takrif: [
      ['Kesan fotoelektrik', 'Pemancaran elektron daripada permukaan logam apabila disinari oleh cahaya dengan frekuensi tertentu.'],
      ['Frekuensi ambang', 'Frekuensi minimum cahaya yang dapat memancarkan elektron dari permukaan logam.'],
      ['Fungsi kerja', 'Tenaga minimum yang diperlukan untuk membebaskan elektron dari permukaan logam.'],
      ['Foton', 'Paket tenaga cahaya yang diskrit, dengan tenaga $E = hf$.'],
      ['Jasad hitam', 'Jasad unggul yang menyerap semua sinaran elektromagnet yang jatuh padanya.'],
      ['Kuantum tenaga', 'Paket tenaga yang diskrit dan bukan selanjar.']
    ],
    corak: [
      'Takrif kesan fotoelektrik (sangat kerap) dan namakan elektron yang terbebas (fotoelektron).',
      'Satu syarat untuk fotoelektron dibebaskan (frekuensi cahaya > frekuensi ambang).',
      'Kesan menambah keamatan cahaya kepada bacaan mikroammeter (bertambah).',
      'Graf $K_{maks}$ melawan $f$: kuantiti diwakili pintasan-y dan kecerunan; lakar graf logam lain.',
      'Hitung tenaga foton dan bilangan foton sesaat daripada kuasa lampu.'
    ],
    ciri: [
      ['Katod sel foto', 'Logam fungsi kerja rendah (sesium)', 'Mudah membebaskan elektron dengan cahaya nampak'],
      ['Sel foto', 'Tiub vakum', 'Elektron tidak berlanggar dengan molekul udara'],
      ['Sumber cahaya', 'Frekuensi tinggi (biru/UV), melebihi $f_0$', 'Foton bertenaga cukup'],
      ['Sumber cahaya', 'Keamatan tinggi', 'Lebih banyak fotoelektron, arus lebih besar'],
      ['Katod', 'Luas permukaan besar', 'Menerima lebih banyak foton']
    ]
  },
  reka: {
    s: 'Pilih **sel foto** yang paling sesuai untuk pintu automatik yang menggunakan cahaya nampak.',
    opsyen: ['P', 'Q', 'R', 'S'],
    aspek: [
      { a: 'Logam katod', v: ['Zink (W tinggi)', 'Sesium (W rendah)', 'Sesium (W rendah)', 'Sesium (W rendah)'], ok: 'Sesium (W rendah)', sebab: 'Fungsi kerja rendah; cahaya nampak mencukupi untuk membebaskan elektron.' },
      { a: 'Kandungan tiub', v: ['Vakum', 'Udara', 'Vakum', 'Vakum'], ok: 'Vakum', sebab: 'Fotoelektron tidak berlanggar dengan molekul udara.' },
      { a: 'Luas permukaan katod', v: ['Besar', 'Besar', 'Kecil', 'Besar'], ok: 'Besar', sebab: 'Menerima lebih banyak foton, lebih banyak fotoelektron.' },
      { a: 'Keamatan sumber cahaya', v: ['Tinggi', 'Tinggi', 'Tinggi', 'Tinggi'], ok: 'Tinggi', sebab: 'Lebih banyak foton sesaat, arus fotoelektrik lebih besar.' }
    ],
    jawapan: 3
  },
  kuizTambah: [
    { q: 'Apakah yang diwakili oleh kecerunan graf $K_{maks}$ melawan frekuensi?', o: ['Fungsi kerja', 'Frekuensi ambang', 'Pemalar Planck', 'Laju cahaya'], a: 2, e: '$K_{maks} = hf − W$, jadi kecerunan ialah $h$.' },
    { q: 'Bilangan foton yang menyinari katod bertambah tetapi frekuensi sama. Bacaan mikroammeter', o: ['bertambah', 'berkurang', 'tidak berubah', 'menjadi sifar'], a: 0, e: 'Lebih banyak foton → lebih banyak fotoelektron sesaat → arus bertambah.' }
  ]
});
