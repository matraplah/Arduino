'use strict';
/* ===== Kandungan Tingkatan 4 (Buku Teks Fizik KSSM Tingkatan 4) ===== */

BAB.push({
  id: 't4-b1', ting: 4, no: 1, tema: 'Tema 1 · Asas Fizik', tajuk: 'Pengukuran',
  intro: 'Fizik bermula dengan pengukuran. Bab ini memperkenalkan kuantiti fizik dan unitnya, serta cara merancang penyiasatan saintifik dan mentafsir graf.',
  sim: {
    t: 'Bandul ringkas: daripada bacaan kepada graf',
    d: 'Ubah panjang bandul, rekod tempoh ayunan dan lihat titik diplot pada graf $T^2$ melawan $l$. Setiap bacaan mengandungi ralat rawak kecil, seperti dalam eksperimen sebenar.',
    cuba: [
      { s: 'Rekod bacaan bagi lima panjang yang berbeza. Apakah bentuk graf $T^2$ melawan $l$?', j: 'Garis lurus yang melalui asalan. Maka $T^2$ berkadar terus dengan $l$.' },
      { s: 'Bandingkan tempoh bagi $l = 0.25 "m"$ dengan $l = 1.00 "m"$.', j: 'Tempoh menjadi dua kali ganda (kira-kira 1.00 s dan 2.01 s) apabila panjang menjadi empat kali ganda, kerana $T ∝ sqrt{l}$.' },
      { s: 'Gunakan kecerunan graf untuk menentukan pecutan graviti.', j: 'Daripada $T^2 = {4π^2}/{g} l$, kecerunan graf ialah ${4π^2}/{g}$. Maka $g = {4π^2}/{"kecerunan"}$, iaitu hampir dengan $9.81 "m s"^{-2}$.' }
    ]
  },
  sub: [
    { n: '1.1', t: 'Kuantiti Fizik', p: [
      'Kuantiti fizik ialah kuantiti yang boleh diukur. Setiap kuantiti dinyatakan dengan **magnitud** dan **unit**, contohnya panjang 2.5 m.',
      '**Kuantiti asas** tidak boleh diterbitkan daripada kuantiti fizik yang lain. Terdapat tujuh: panjang (m), jisim (kg), masa (s), suhu termodinamik (K), arus elektrik (A), keamatan berluminositi (cd) dan kuantiti bahan (mol).',
      '**Kuantiti terbitan** diperoleh dengan mendarab atau membahagi kuantiti asas. Contoh: halaju ($"m s"^{-1}$), ketumpatan ($"kg m"^{-3}$) dan daya ($"kg m s"^{-2}$, iaitu newton).',
      'Unit terbitan dicari dengan menggantikan unit ke dalam rumus. Contoh: $F = ma$ memberikan $"kg" × "m s"^{-2} = "kg m s"^{-2}$.',
      '**Kuantiti skalar** mempunyai magnitud sahaja (jarak, laju, jisim, masa, tenaga). **Kuantiti vektor** mempunyai magnitud dan arah (sesaran, halaju, pecutan, daya, momentum).'
    ] },
    { n: '1.2', t: 'Penyiasatan Saintifik', p: [
      'Graf menunjukkan hubungan antara dua kuantiti. Garis lurus melalui asalan bermaksud $y$ **berkadar terus** dengan $x$. Garis lurus yang tidak melalui asalan bermaksud $y$ bertambah atau berkurang **secara linear** dengan $x$.',
      'Lima kemahiran menganalisis graf: menyatakan hubungan, menghitung **kecerunan**, menentukan **luas di bawah graf**, **interpolasi** (nilai di antara titik data) dan **ekstrapolasi** (memanjangkan garis di luar julat data).',
      'Lukis segi tiga yang besar semasa menghitung kecerunan supaya ralat lebih kecil, dan nyatakan unit kecerunan.',
      'Penyiasatan saintifik bermula dengan **inferens** dan **hipotesis**, diikuti tujuan, pemboleh ubah, radas, prosedur, penjadualan data, analisis data dan kesimpulan.',
      'Tiga jenis pemboleh ubah: **dimanipulasikan** (yang diubah), **bergerak balas** (yang diukur) dan **dimalarkan** (yang ditetapkan).',
      'Bagi bandul ringkas, ==$T = 2π sqrt{{l}/{g}}$==. Graf $T^2$ melawan $l$ ialah garis lurus melalui asalan dengan kecerunan ${4π^2}/{g}$.'
    ] }
  ],
  rumus: [
    ['$ρ = {m}/{V}$', 'Ketumpatan = jisim ÷ isi padu. Unit: $"kg m"^{-3}$'],
    ['$"kecerunan" = {y_2 − y_1}/{x_2 − x_1}$', 'Gunakan dua titik yang jauh pada garis lurus penyuaian terbaik'],
    ['$T = {t}/{20}$', 'Tempoh = masa bagi 20 ayunan lengkap ÷ 20'],
    ['$T = 2π sqrt{{l}/{g}}$', 'Tempoh bandul ringkas; $l$ = panjang bandul, $g$ = pecutan graviti'],
    ['$T^2 = {4π^2}/{g} l$', 'Bentuk linear: kecerunan graf $T^2$ melawan $l$ ialah ${4π^2}/{g}$']
  ],
  istilah: [
    ['Kuantiti asas', 'Kuantiti fizik yang tidak boleh diterbitkan daripada kuantiti fizik yang lain.'],
    ['Kuantiti terbitan', 'Kuantiti fizik yang diterbitkan daripada kuantiti asas melalui pendaraban atau pembahagian.'],
    ['Kuantiti skalar', 'Kuantiti fizik yang mempunyai magnitud sahaja.'],
    ['Kuantiti vektor', 'Kuantiti fizik yang mempunyai magnitud dan arah.'],
    ['Inferens', 'Kesimpulan awal yang dibuat berdasarkan pemerhatian.'],
    ['Hipotesis', 'Pernyataan tentang hubungan yang dijangka antara pemboleh ubah dimanipulasikan dengan pemboleh ubah bergerak balas.'],
    ['Interpolasi', 'Menentukan nilai di antara titik data dengan membaca daripada graf.'],
    ['Ekstrapolasi', 'Memanjangkan garis graf di luar julat data untuk menganggar nilai.']
  ],
  rumusan: [
    'Tujuh kuantiti asas dan unit S.I.: m, kg, s, K, A, cd dan mol. Semua kuantiti lain ialah kuantiti terbitan.',
    'Unit kuantiti terbitan diperoleh dengan menggantikan unit asas ke dalam rumus kuantiti itu.',
    'Kuantiti skalar mempunyai magnitud sahaja; kuantiti vektor mempunyai magnitud dan arah.',
    'Daripada graf kita boleh menyatakan hubungan, menghitung kecerunan dan luas di bawah graf, serta membuat interpolasi dan ekstrapolasi.',
    'Eksperimen yang baik mengubah satu pemboleh ubah, mengukur satu pemboleh ubah dan menetapkan pemboleh ubah yang lain.'
  ],
  silap: [
    'Menulis “berkadar terus” bagi garis lurus yang tidak melalui asalan. Jawapan yang betul ialah “bertambah secara linear”.',
    'Menghitung kecerunan menggunakan titik data dan bukan titik pada garis lurus penyuaian terbaik, atau tertinggal unit kecerunan.',
    'Menganggap berat sebagai kuantiti asas. Berat ialah daya (kuantiti terbitan dan vektor); jisim ialah kuantiti asas (skalar).'
  ],
  kuiz: [
    { q: 'Antara kuantiti berikut, yang manakah kuantiti asas?', o: ['Daya', 'Halaju', 'Suhu', 'Isi padu'], a: 2, e: 'Suhu termodinamik ialah satu daripada tujuh kuantiti asas. Daya, halaju dan isi padu diterbitkan daripada kuantiti asas.' },
    { q: 'Apakah unit S.I. bagi daya dalam sebutan unit asas?', o: ['$"kg m s"^{-1}$', '$"kg m s"^{-2}$', '$"kg m"^2 "s"^{-2}$', '$"kg m"^{-1} "s"^{-2}$'], a: 1, e: 'Daripada $F = ma$: $"kg" × "m s"^{-2} = "kg m s"^{-2}$.' },
    { q: 'Pasangan manakah yang kedua-duanya kuantiti vektor?', o: ['Jarak dan laju', 'Sesaran dan momentum', 'Jisim dan berat', 'Kerja dan daya'], a: 1, e: 'Sesaran dan momentum mempunyai magnitud dan arah. Jarak, laju, jisim dan kerja ialah kuantiti skalar.' },
    { q: 'Kuasa ditakrifkan sebagai kerja ÷ masa. Apakah unit kuasa dalam sebutan unit asas?', o: ['$"kg m"^2 "s"^{-3}$', '$"kg m"^2 "s"^{-2}$', '$"kg m s"^{-3}$', '$"kg m s"^{-2}$'], a: 0, e: 'Kerja = daya × sesaran $= "kg m s"^{-2} × "m" = "kg m"^2 "s"^{-2}$. Bahagi dengan masa: $"kg m"^2 "s"^{-3}$.' },
    { q: 'Dalam eksperimen bandul ringkas, graf $T^2$ melawan $l$ mempunyai kecerunan $4.0 "s"^2 "m"^{-1}$. Berapakah nilai pecutan graviti?', o: ['$9.42 "m s"^{-2}$', '$9.81 "m s"^{-2}$', '$9.87 "m s"^{-2}$', '$10.0 "m s"^{-2}$'], a: 2, e: '$g = {4π^2}/{"kecerunan"} = {39.48}/{4.0} = 9.87 "m s"^{-2}$.' },
    { q: 'Seorang murid mengkaji hubungan antara panjang bandul dengan tempoh ayunan. Apakah pemboleh ubah bergerak balas?', o: ['Panjang bandul', 'Jisim ladung', 'Tempoh ayunan', 'Sudut ayunan'], a: 2, e: 'Tempoh ayunan diukur sebagai hasil. Panjang bandul dimanipulasikan, manakala jisim ladung dimalarkan.' },
    { q: 'Graf $p$ melawan $q$ ialah garis lurus berkecerunan negatif yang tidak melalui asalan. Hubungan manakah yang betul?', o: ['$p$ berkadar terus dengan $q$', '$p$ berkadar songsang dengan $q$', '$p$ berkurang secara linear dengan $q$', '$p$ tidak bergantung pada $q$'], a: 2, e: 'Garis lurus berkecerunan negatif bermaksud $p$ berkurang secara linear dengan $q$. Berkadar songsang menghasilkan lengkung, bukan garis lurus.' }
  ],
  struktur: [
    { t: 'Seorang murid mengukur masa bagi 20 ayunan lengkap sebuah bandul ringkas dengan panjang yang berbeza. Keputusannya: $l = 0.20, 0.40, 0.60, 0.80 "m"$ memberikan masa 17.9 s, 25.4 s, 31.1 s dan 35.9 s.', b: [
      { q: '(a) Hitung tempoh ayunan, $T$ bagi $l = 0.40 "m"$.', m: 1, j: '$T = {25.4}/{20} = 1.27 "s"$' },
      { q: '(b) Nyatakan pemboleh ubah dimanipulasikan dan pemboleh ubah bergerak balas.', m: 2, j: 'Dimanipulasikan: panjang bandul, $l$. Bergerak balas: tempoh ayunan, $T$.' },
      { q: '(c) Graf $T^2$ melawan $l$ mempunyai kecerunan $4.03 "s"^2 "m"^{-1}$. Hitung pecutan graviti, $g$.', m: 2, j: '$g = {4π^2}/{4.03} = 9.80 "m s"^{-2}$' },
      { q: '(d) Mengapakah masa bagi 20 ayunan diukur dan bukan masa bagi satu ayunan?', m: 1, j: 'Untuk mengurangkan kesan ralat masa tindak balas manusia, supaya nilai tempoh lebih jitu.' }
    ] },
    { t: 'Tekanan ditakrifkan sebagai daya yang bertindak secara normal per unit luas, $P = {F}/{A}$.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan kuantiti terbitan?', m: 1, j: 'Kuantiti fizik yang diterbitkan daripada kuantiti asas melalui pendaraban atau pembahagian.' },
      { q: '(b) Terbitkan unit tekanan dalam sebutan unit asas S.I.', m: 2, j: 'Unit $F$ ialah $"kg m s"^{-2}$ dan unit $A$ ialah $"m"^2$. Maka unit $P = {"kg m s"^{-2}}/{"m"^2} = "kg m"^{-1} "s"^{-2}$.' },
      { q: '(c) Nyatakan sama ada daya dan luas ialah kuantiti skalar atau kuantiti vektor.', m: 2, j: 'Daya ialah kuantiti vektor (mempunyai arah). Luas ialah kuantiti skalar.' }
    ] }
  ]
});

BAB.push({
  id: 't4-b2', ting: 4, no: 2, tema: 'Tema 2 · Mekanik Newton', tajuk: 'Daya dan Gerakan I',
  intro: 'Bab ini menerangkan gerakan dalam garis lurus, graf gerakan, jatuh bebas, inersia, momentum, daya, impuls dan berat berdasarkan tiga Hukum Gerakan Newton.',
  sim: {
    t: 'Gerakan linear dengan pecutan seragam',
    d: 'Tetapkan halaju awal dan pecutan, kemudian mainkan gerakan selama 10 s. Perhatikan cara graf $v$ melawan $t$ dan graf $s$ melawan $t$ terbentuk serentak dengan gerakan kereta.',
    cuba: [
      { s: 'Tetapkan $a = 0$. Apakah bentuk kedua-dua graf?', j: 'Graf $v$–$t$ ialah garis mengufuk (halaju seragam). Graf $s$–$t$ ialah garis lurus dengan kecerunan malar.' },
      { s: 'Tetapkan $u = 20 "m s"^{-1}$ dan $a = −4 "m s"^{-2}$. Bilakah kereta berhenti seketika, dan apakah yang berlaku selepas itu?', j: 'Pada $t = 5 "s"$ halaju menjadi sifar. Selepas itu halaju bernilai negatif: kereta berpatah balik dan sesarannya berkurang.' },
      { s: 'Dengan $u = 4 "m s"^{-1}$ dan $a = 2 "m s"^{-2}$, semak bahawa luas di bawah graf $v$–$t$ hingga $t = 10 "s"$ sama dengan sesaran.', j: 'Luas trapezium $= {1}/{2}(4 + 24)(10) = 140 "m"$, sama dengan $s = ut + {1}/{2}at^2 = 40 + 100 = 140 "m"$.' }
    ]
  },
  sub: [
    { n: '2.1', t: 'Gerakan Linear', p: [
      '**Jarak** ialah panjang lintasan (skalar); **sesaran** ialah jarak terpendek dari kedudukan awal ke kedudukan akhir pada arah tertentu (vektor).',
      '**Laju** = jarak ÷ masa. **Halaju** = sesaran ÷ masa. **Pecutan** ialah kadar perubahan halaju: ==$a = {v − u}/{t}$==.',
      'Pecutan negatif bermaksud objek semakin perlahan (nyahpecutan). Halaju seragam bermaksud pecutan sifar.',
      'Empat persamaan gerakan linear bagi pecutan seragam: $v = u + at$, $s = {1}/{2}(u + v)t$, $s = ut + {1}/{2}at^2$ dan $v^2 = u^2 + 2as$.',
      'Jangka masa detik berfrekuensi 50 Hz membuat 50 detik sesaat, maka satu detik mewakili 0.02 s.'
    ] },
    { n: '2.2', t: 'Graf Gerakan Linear', p: [
      'Graf sesaran–masa: **kecerunan = halaju**. Garis mengufuk bermaksud objek pegun.',
      'Graf halaju–masa: **kecerunan = pecutan** dan **luas di bawah graf = sesaran**.',
      'Graf pecutan–masa: luas di bawah graf = perubahan halaju.',
      'Bahagian graf di bawah paksi masa mewakili gerakan pada arah yang bertentangan.'
    ] },
    { n: '2.3', t: 'Gerakan Jatuh Bebas', p: [
      'Objek mengalami **jatuh bebas** apabila gerakannya dipengaruhi oleh daya graviti sahaja, tanpa rintangan udara.',
      'Semua objek jatuh bebas dengan pecutan yang sama, iaitu pecutan graviti $g = 9.81 "m s"^{-2}$, tanpa mengira jisim.',
      'Gunakan persamaan gerakan linear dengan $a = g$ bagi gerakan ke bawah dan $a = −g$ bagi gerakan ke atas.'
    ] },
    { n: '2.4', t: 'Inersia', p: [
      '**Inersia** ialah kecenderungan objek untuk kekal dalam keadaan asalnya, sama ada pegun atau bergerak dalam garis lurus dengan halaju malar.',
      '**Hukum Gerakan Newton Pertama**: sesuatu objek kekal pegun atau bergerak dengan halaju malar jika tiada daya luar bertindak ke atasnya.',
      'Semakin besar jisim, semakin besar inersia. Contoh: penumpang terhumban ke hadapan apabila bas berhenti mengejut; tali pinggang keledar mengurangkan kesan ini.'
    ] },
    { n: '2.5', t: 'Momentum', p: [
      '**Momentum** ialah hasil darab jisim dengan halaju: ==$p = mv$==. Unit: $"kg m s"^{-1}$. Momentum ialah kuantiti vektor.',
      '**Prinsip Keabadian Momentum**: jumlah momentum sebelum perlanggaran sama dengan jumlah momentum selepas perlanggaran jika tiada daya luar bertindak.',
      'Perlanggaran: $m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$. Letupan: jumlah momentum awal sifar, maka $0 = m_1v_1 + m_2v_2$ dan dua objek bergerak pada arah bertentangan.',
      'Tetapkan satu arah sebagai positif. Halaju pada arah bertentangan mesti ditulis negatif.'
    ] },
    { n: '2.6', t: 'Daya', p: [
      '**Hukum Gerakan Newton Kedua**: kadar perubahan momentum berkadar terus dengan daya dan bertindak pada arah tindakan daya. Hasilnya ==$F = ma$==.',
      '1 N ialah daya yang menghasilkan pecutan $1 "m s"^{-2}$ pada jisim 1 kg.',
      'Bagi jisim yang tetap, pecutan berkadar terus dengan daya. Bagi daya yang tetap, pecutan berkadar songsang dengan jisim.'
    ] },
    { n: '2.7', t: 'Impuls dan Daya Impuls', p: [
      '**Impuls** ialah perubahan momentum: $J = Ft = mv − mu$. Unit: N s.',
      '**Daya impuls** ialah kadar perubahan momentum dalam perlanggaran yang berlaku dalam masa yang singkat: ==$F = {mv − mu}/{t}$==.',
      'Masa impak yang lebih panjang menghasilkan daya impuls yang lebih kecil. Contoh: beg udara, zon remuk, tilam lompat tinggi, membengkokkan lutut semasa mendarat.',
      '**Hukum Gerakan Newton Ketiga**: bagi setiap daya tindakan terdapat satu daya tindak balas yang sama magnitud tetapi bertentangan arah.'
    ] },
    { n: '2.8', t: 'Berat', p: [
      '**Berat** ialah daya graviti yang bertindak ke atas objek: ==$W = mg$==. Unit: N.',
      'Kekuatan medan graviti di permukaan Bumi ialah $g = 9.81 "N kg"^{-1}$. Jisim objek tetap di mana-mana, tetapi beratnya berubah mengikut nilai $g$.'
    ] }
  ],
  rumus: [
    ['$a = {v − u}/{t}$', '$u$ = halaju awal, $v$ = halaju akhir, $t$ = masa'],
    ['$v = u + at$', 'Halaju akhir selepas masa $t$'],
    ['$s = {1}/{2}(u + v)t$', 'Sesaran apabila $u$, $v$ dan $t$ diketahui'],
    ['$s = ut + {1}/{2}at^2$', 'Sesaran apabila halaju akhir tidak diketahui'],
    ['$v^2 = u^2 + 2as$', 'Digunakan apabila masa tidak diketahui'],
    ['$p = mv$', 'Momentum; unit $"kg m s"^{-1}$'],
    ['$m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$', 'Prinsip Keabadian Momentum'],
    ['$F = ma$', 'Hukum Gerakan Newton Kedua; $F$ ialah daya paduan'],
    ['$J = Ft = mv − mu$', 'Impuls = perubahan momentum; unit N s'],
    ['$W = mg$', 'Berat; $g = 9.81 "m s"^{-2}$ di permukaan Bumi']
  ],
  istilah: [
    ['Sesaran', 'Jarak terpendek antara kedudukan awal dengan kedudukan akhir pada arah tertentu.'],
    ['Pecutan', 'Kadar perubahan halaju.'],
    ['Jatuh bebas', 'Gerakan objek yang dipengaruhi oleh daya graviti sahaja.'],
    ['Inersia', 'Kecenderungan objek untuk kekal dalam keadaan pegun atau gerakan dengan halaju malar.'],
    ['Momentum', 'Hasil darab jisim dengan halaju.'],
    ['Impuls', 'Perubahan momentum; hasil darab daya dengan masa impak.'],
    ['Daya impuls', 'Kadar perubahan momentum dalam perlanggaran atau hentaman dalam masa yang singkat.'],
    ['Berat', 'Daya graviti yang bertindak ke atas sesuatu objek.']
  ],
  rumusan: [
    'Pecutan seragam diselesaikan dengan empat persamaan gerakan linear; pilih persamaan berdasarkan kuantiti yang diberi.',
    'Kecerunan graf $s$–$t$ ialah halaju. Kecerunan graf $v$–$t$ ialah pecutan dan luas di bawahnya ialah sesaran.',
    'Semua objek jatuh bebas dengan pecutan $g = 9.81 "m s"^{-2}$ tanpa mengira jisim.',
    'Inersia bergantung pada jisim. Hukum Newton Pertama menerangkan mengapa objek mengekalkan keadaan gerakannya.',
    'Jumlah momentum diabadikan dalam perlanggaran dan letupan jika tiada daya luar.',
    '$F = ma$ menghubungkan daya paduan dengan pecutan. Daya impuls boleh dikurangkan dengan memanjangkan masa impak.',
    'Berat $W = mg$ ialah daya; jisim ialah kuantiti jirim dan tidak berubah.'
  ],
  silap: [
    'Terlupa menukar unit, contohnya $"km j"^{-1}$ kepada $"m s"^{-1}$ (bahagi dengan 3.6) sebelum menggantikan ke dalam persamaan.',
    'Tidak meletakkan tanda negatif bagi halaju pada arah bertentangan dalam soalan momentum dan impuls.',
    'Menulis “inersia bertambah apabila laju bertambah”. Inersia bergantung pada jisim sahaja.',
    'Menyatakan beg udara “mengurangkan impuls”. Yang dikurangkan ialah daya impuls, kerana masa impak dipanjangkan.'
  ],
  kuiz: [
    { q: 'Sebuah kereta bergerak dengan halaju awal $4 "m s"^{-1}$ dan memecut pada $3 "m s"^{-2}$ selama 6 s. Berapakah halaju akhirnya?', o: ['$18 "m s"^{-1}$', '$22 "m s"^{-1}$', '$24 "m s"^{-1}$', '$28 "m s"^{-1}$'], a: 1, e: '$v = u + at = 4 + (3)(6) = 22 "m s"^{-1}$.' },
    { q: 'Apakah yang diwakili oleh luas di bawah graf halaju melawan masa?', o: ['Pecutan', 'Sesaran', 'Momentum', 'Daya'], a: 1, e: 'Luas di bawah graf $v$–$t$ ialah sesaran. Kecerunannya pula ialah pecutan.' },
    { q: 'Sebiji bola dilepaskan dari keadaan rehat pada ketinggian 20 m. Berapakah masa yang diambil untuk sampai ke tanah? (Abaikan rintangan udara)', o: ['1.43 s', '2.02 s', '2.86 s', '4.08 s'], a: 1, e: '$s = {1}/{2}gt^2$, maka $t = sqrt{{2 × 20}/{9.81}} = 2.02 "s"$.' },
    { q: 'Troli A berjisim 2 kg bergerak dengan halaju $3 "m s"^{-1}$ lalu berlanggar dengan troli B berjisim 1 kg yang pegun. Kedua-dua troli melekat. Berapakah halaju sepunya selepas perlanggaran?', o: ['$1.0 "m s"^{-1}$', '$1.5 "m s"^{-1}$', '$2.0 "m s"^{-1}$', '$3.0 "m s"^{-1}$'], a: 2, e: '$(2)(3) + (1)(0) = (2 + 1)v$, maka $v = 2.0 "m s"^{-1}$.' },
    { q: 'Mengapakah ahli lompat tinggi mendarat di atas tilam yang tebal?', o: ['Untuk mengurangkan momentum atlet', 'Untuk memanjangkan masa impak supaya daya impuls berkurang', 'Untuk menambah impuls yang bertindak', 'Untuk mengurangkan inersia atlet'], a: 1, e: 'Perubahan momentum adalah sama, tetapi masa impak yang lebih panjang menghasilkan daya impuls yang lebih kecil.' },
    { q: 'Daya paduan 600 N bertindak ke atas sebuah kereta berjisim 1 200 kg. Berapakah pecutan kereta itu?', o: ['$0.2 "m s"^{-2}$', '$0.5 "m s"^{-2}$', '$2.0 "m s"^{-2}$', '$5.0 "m s"^{-2}$'], a: 1, e: '$a = {F}/{m} = {600}/{1 200} = 0.5 "m s"^{-2}$.' },
    { q: 'Penumpang bas terhumban ke hadapan apabila bas berhenti secara mengejut. Konsep manakah yang menerangkan situasi ini?', o: ['Inersia', 'Impuls', 'Keabadian momentum', 'Jatuh bebas'], a: 0, e: 'Inersia penumpang cenderung mengekalkan keadaan gerakan asal ke hadapan walaupun bas telah berhenti.' },
    { q: 'Seorang angkasawan berjisim 70 kg berada di Bulan, dengan pecutan graviti $1.62 "m s"^{-2}$. Pernyataan manakah yang betul?', o: ['Jisimnya 113 kg', 'Beratnya 113 N', 'Beratnya 687 N', 'Jisimnya berkurang tetapi beratnya kekal'], a: 1, e: '$W = mg = 70 × 1.62 = 113 "N"$. Jisimnya kekal 70 kg di mana-mana.' }
  ],
  struktur: [
    { t: 'Sebuah kereta berjisim 1 000 kg bergerak dengan halaju $20 "m s"^{-1}$. Pemandu menekan brek dan kereta berhenti dalam masa 4 s.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan pecutan?', m: 1, j: 'Kadar perubahan halaju.' },
      { q: '(b) Hitung pecutan kereta itu.', m: 2, j: '$a = {v − u}/{t} = {0 − 20}/{4} = −5 "m s"^{-2}$ (nyahpecutan $5 "m s"^{-2}$)' },
      { q: '(c) Hitung jarak yang dilalui sebelum kereta berhenti.', m: 2, j: '$s = {1}/{2}(u + v)t = {1}/{2}(20 + 0)(4) = 40 "m"$' },
      { q: '(d) Hitung daya membrek yang bertindak ke atas kereta.', m: 2, j: '$F = ma = 1 000 × (−5) = −5 000 "N"$, iaitu 5 000 N pada arah bertentangan dengan gerakan.' }
    ] },
    { t: 'Sebiji bola berjisim 0.15 kg bergerak dengan halaju $30 "m s"^{-1}$ lalu dipukul balik pada arah bertentangan dengan halaju $40 "m s"^{-1}$. Masa sentuhan antara pemukul dengan bola ialah 0.005 s.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan impuls?', m: 1, j: 'Perubahan momentum (hasil darab daya dengan masa impak).' },
      { q: '(b) Hitung impuls yang dikenakan pada bola.', m: 2, j: 'Ambil arah asal sebagai positif: $J = m(v − u) = 0.15(−40 − 30) = −10.5 "N s"$, iaitu 10.5 N s pada arah pukulan.' },
      { q: '(c) Hitung daya impuls yang bertindak pada bola.', m: 2, j: '$F = {10.5}/{0.005} = 2 100 "N"$' },
      { q: '(d) Terangkan mengapa penjaga gol memakai sarung tangan yang tebal.', m: 2, j: 'Sarung tangan tebal memanjangkan masa impak semasa menangkap bola. Bagi perubahan momentum yang sama, daya impuls pada tangan menjadi lebih kecil.' }
    ] }
  ]
});

BAB.push({
  id: 't4-b3', ting: 4, no: 3, tema: 'Tema 2 · Mekanik Newton', tajuk: 'Kegravitian',
  intro: 'Daya graviti mengawal gerakan planet, bulan dan satelit. Bab ini merangkumi Hukum Kegravitian Semesta Newton, Hukum Kepler dan satelit buatan manusia.',
  sim: {
    t: 'Satelit dalam orbit membulat mengelilingi Bumi',
    d: 'Ubah ketinggian orbit dan perhatikan laju linear, tempoh orbit dan pecutan graviti. Anak panah $v$ menunjukkan halaju satelit; anak panah $F$ menunjukkan daya graviti yang bertindak sebagai daya memusat.',
    cuba: [
      { s: 'Tambah ketinggian orbit. Apakah yang berlaku kepada laju linear dan tempoh orbit?', j: 'Laju berkurang kerana $v = sqrt{{GM}/{r}}$, manakala tempoh bertambah kerana $T^2 ∝ r^3$.' },
      { s: 'Tekan “Orbit geopegun” dan perhatikan satelit serta titik hijau pada permukaan Bumi.', j: 'Tempoh orbit kira-kira 24 jam, sama dengan tempoh putaran Bumi. Satelit sentiasa berada di atas titik yang sama, maka sesuai untuk komunikasi.' },
      { s: 'Mengapakah anak panah $F$ sentiasa menghala ke pusat Bumi?', j: 'Daya graviti bertindak sebagai daya memusat yang mengekalkan satelit dalam orbit. Arahnya sentiasa ke pusat orbit dan serenjang dengan halaju.' }
    ]
  },
  sub: [
    { n: '3.1', t: 'Hukum Kegravitian Semesta Newton', p: [
      '**Hukum Kegravitian Semesta Newton**: daya graviti antara dua jasad berkadar terus dengan hasil darab jisim kedua-dua jasad dan berkadar songsang dengan kuasa dua jarak di antara pusat dua jasad itu: ==$F = {Gm_1m_2}/{r^2}$==.',
      'Pemalar kegravitian $G = 6.67 × 10^{-11} "N m"^2 "kg"^{-2}$. Jarak $r$ diukur dari pusat ke pusat.',
      'Jika jarak digandakan dua kali, daya menjadi satu perempat. Jika satu jisim digandakan, daya turut berganda.',
      'Pecutan graviti pada jarak $r$ dari pusat Bumi: ==$g = {GM}/{r^2}$==. Pada ketinggian $h$ dari permukaan, $r = R + h$.',
      'Objek dalam gerakan membulat mengalami **daya memusat** $F = {mv^2}/{r}$ yang menghala ke pusat bulatan. Bagi satelit dan planet, daya graviti membekalkan daya memusat.',
      'Jisim Bumi atau Matahari boleh dihitung daripada orbit jasad yang mengelilinginya: $M = {4π^2r^3}/{GT^2}$.'
    ] },
    { n: '3.2', t: 'Hukum Kepler', p: [
      '**Hukum Kepler Pertama** (hukum orbit): orbit setiap planet berbentuk elips dengan Matahari di satu daripada fokusnya.',
      '**Hukum Kepler Kedua** (hukum luas): garis yang menyambungkan planet dengan Matahari mencakupi luas yang sama dalam selang masa yang sama. Planet bergerak paling laju apabila paling dekat dengan Matahari.',
      '**Hukum Kepler Ketiga** (hukum tempoh): kuasa dua tempoh orbit berkadar terus dengan kuasa tiga jejari orbit: ==$T^2 ∝ r^3$==.',
      'Bagi dua jasad yang mengorbit jasad pusat yang sama: ${T_1^2}/{T_2^2} = {r_1^3}/{r_2^3}$.'
    ] },
    { n: '3.3', t: 'Satelit Buatan Manusia', p: [
      'Laju linear satelit dalam orbit membulat: ==$v = sqrt{{GM}/{r}}$==. Laju ini tidak bergantung pada jisim satelit.',
      '**Satelit geopegun** mempunyai tempoh orbit 24 jam, mengorbit di atas Khatulistiwa pada arah putaran Bumi dan kelihatan pegun dari Bumi. Kegunaan: komunikasi dan penyiaran.',
      '**Satelit bukan geopegun** berada di orbit yang lebih rendah dengan tempoh yang lebih pendek. Kegunaan: pengimejan Bumi, GPS dan kaji cuaca.',
      '**Halaju lepas** ialah halaju minimum untuk objek di permukaan Bumi mengatasi daya graviti dan terlepas ke angkasa: ==$v = sqrt{{2GM}/{R}}$==. Bagi Bumi nilainya $1.12 × 10^4 "m s"^{-1}$.',
      'Halaju lepas bergantung pada jisim dan jejari planet, bukan pada jisim objek yang dilancarkan.'
    ] }
  ],
  rumus: [
    ['$F = {Gm_1m_2}/{r^2}$', 'Daya graviti antara dua jasad; $r$ = jarak antara pusat'],
    ['$g = {GM}/{r^2}$', 'Pecutan graviti pada jarak $r$ dari pusat jasad berjisim $M$'],
    ['$F = {mv^2}/{r}$', 'Daya memusat bagi gerakan membulat'],
    ['$v = {2πr}/{T}$', 'Laju linear dalam orbit membulat; $T$ = tempoh orbit'],
    ['$M = {4π^2r^3}/{GT^2}$', 'Jisim jasad pusat daripada jejari dan tempoh orbit'],
    ['${T_1^2}/{T_2^2} = {r_1^3}/{r_2^3}$', 'Hukum Kepler Ketiga bagi dua jasad yang mengorbit jasad yang sama'],
    ['$v = sqrt{{GM}/{r}}$', 'Laju linear satelit; $r = R + h$'],
    ['$v = sqrt{{2GM}/{R}}$', 'Halaju lepas dari permukaan jasad berjejari $R$']
  ],
  istilah: [
    ['Daya memusat', 'Daya yang bertindak ke atas objek dalam gerakan membulat dan sentiasa menghala ke pusat bulatan.'],
    ['Tempoh orbit', 'Masa yang diambil untuk melengkapkan satu orbit.'],
    ['Jejari orbit', 'Nilai purata jarak di antara planet dengan Matahari (atau satelit dengan pusat Bumi).'],
    ['Satelit geopegun', 'Satelit yang tempoh orbitnya 24 jam dan sentiasa berada di atas kedudukan yang sama di Bumi.'],
    ['Halaju lepas', 'Halaju minimum yang diperlukan oleh objek di permukaan Bumi untuk mengatasi daya graviti dan terlepas ke angkasa lepas.']
  ],
  rumusan: [
    'Daya graviti wujud antara mana-mana dua jasad dan mematuhi hukum kuasa dua songsang, $F ∝ {1}/{r^2}$.',
    'Pecutan graviti berkurang apabila jarak dari pusat Bumi bertambah: $g = {GM}/{r^2}$.',
    'Daya graviti membekalkan daya memusat bagi planet dan satelit dalam orbit.',
    'Hukum Kepler: orbit elips, luas yang sama dalam masa yang sama, dan $T^2 ∝ r^3$.',
    'Laju satelit $v = sqrt{{GM}/{r}}$ dan halaju lepas $v = sqrt{{2GM}/{R}}$ tidak bergantung pada jisim satelit atau objek.',
    'Satelit geopegun mempunyai tempoh 24 jam dan kekal di atas titik yang sama di Khatulistiwa.'
  ],
  silap: [
    'Menggunakan ketinggian $h$ sebagai $r$. Jarak mesti diukur dari pusat Bumi: $r = R + h$.',
    'Terlupa menukar km kepada m, atau hari dan jam kepada saat, sebelum menghitung.',
    'Menganggap satelit yang lebih berat bergerak lebih perlahan. Laju orbit tidak bergantung pada jisim satelit.',
    'Terlupa mengkuasaduakan $r$ dalam $F = {Gm_1m_2}/{r^2}$.'
  ],
  kuiz: [
    { q: 'Jarak di antara pusat dua jasad digandakan dua kali. Apakah yang berlaku kepada daya graviti antara jasad itu?', o: ['Menjadi dua kali ganda', 'Menjadi separuh', 'Menjadi satu perempat', 'Tidak berubah'], a: 2, e: '$F ∝ {1}/{r^2}$. Apabila $r$ menjadi $2r$, daya menjadi ${1}/{4}$ daripada nilai asal.' },
    { q: 'Pecutan graviti di permukaan Bumi ialah $9.81 "m s"^{-2}$. Berapakah pecutan graviti pada ketinggian $h = R$ dari permukaan Bumi, dengan $R$ jejari Bumi?', o: ['$2.45 "m s"^{-2}$', '$4.91 "m s"^{-2}$', '$9.81 "m s"^{-2}$', '$19.6 "m s"^{-2}$'], a: 0, e: 'Jarak dari pusat ialah $r = 2R$. Maka $g$ menjadi ${1}/{4} × 9.81 = 2.45 "m s"^{-2}$.' },
    { q: 'Menurut Hukum Kepler Kedua, di manakah sebuah planet bergerak paling laju?', o: ['Apabila paling jauh dari Matahari', 'Apabila paling dekat dengan Matahari', 'Lajunya sentiasa sama', 'Apabila berada di fokus elips'], a: 1, e: 'Untuk mencakupi luas yang sama dalam selang masa yang sama, planet mesti bergerak lebih laju apabila jaraknya dari Matahari lebih kecil.' },
    { q: 'Pernyataan manakah yang betul tentang satelit geopegun?', o: ['Tempoh orbitnya 12 jam', 'Bergerak pada arah bertentangan dengan putaran Bumi', 'Sentiasa berada di atas kedudukan yang sama di Bumi', 'Mengorbit melalui kutub Bumi'], a: 2, e: 'Satelit geopegun mempunyai tempoh 24 jam dan mengorbit di atas Khatulistiwa pada arah putaran Bumi, maka kelihatan pegun dari Bumi.' },
    { q: 'Halaju lepas dari sebuah planet bergantung pada', o: ['jisim objek yang dilancarkan', 'jisim dan jejari planet', 'tempoh putaran planet', 'bentuk objek yang dilancarkan'], a: 1, e: '$v = sqrt{{2GM}/{R}}$ hanya mengandungi jisim planet $M$ dan jejari planet $R$.' },
    { q: 'Jejari orbit sebuah planet ialah 4 kali jejari orbit Bumi. Berapakah tempoh orbit planet itu?', o: ['2 tahun', '4 tahun', '8 tahun', '16 tahun'], a: 2, e: '$T^2 ∝ r^3$, maka $T = sqrt{4^3} = sqrt{64} = 8$ tahun.' },
    { q: 'Daya manakah yang membekalkan daya memusat bagi satelit yang mengorbit Bumi?', o: ['Daya tujahan enjin satelit', 'Daya graviti Bumi', 'Rintangan udara', 'Daya emparan'], a: 1, e: 'Daya graviti antara Bumi dengan satelit sentiasa menghala ke pusat Bumi dan bertindak sebagai daya memusat.' }
  ],
  struktur: [
    { t: 'Sebuah satelit berjisim 500 kg mengorbit Bumi dalam orbit membulat dengan jejari $7.00 × 10^6 "m"$. [$G = 6.67 × 10^{-11} "N m"^2 "kg"^{-2}$, jisim Bumi $= 5.97 × 10^{24} "kg"$]', b: [
      { q: '(a) Nyatakan Hukum Kegravitian Semesta Newton.', m: 1, j: 'Daya graviti antara dua jasad berkadar terus dengan hasil darab jisim kedua-dua jasad dan berkadar songsang dengan kuasa dua jarak di antara pusat dua jasad itu.' },
      { q: '(b) Hitung daya graviti antara Bumi dengan satelit itu.', m: 2, j: '$F = {GMm}/{r^2} = {(6.67 × 10^{-11})(5.97 × 10^{24})(500)}/{(7.00 × 10^6)^2} = 4.06 × 10^3 "N"$' },
      { q: '(c) Hitung laju linear satelit itu.', m: 2, j: '$v = sqrt{{GM}/{r}} = sqrt{{(6.67 × 10^{-11})(5.97 × 10^{24})}/{7.00 × 10^6}} = 7.54 × 10^3 "m s"^{-1}$' },
      { q: '(d) Hitung tempoh orbit satelit itu.', m: 2, j: '$T = {2πr}/{v} = {2π(7.00 × 10^6)}/{7.54 × 10^3} = 5.83 × 10^3 "s"$, iaitu kira-kira 97 minit.' }
    ] },
    { t: 'Jejari orbit Bumi ialah $1.50 × 10^{11} "m"$ dan tempoh orbitnya 1.00 tahun. Jejari orbit Marikh ialah $2.28 × 10^{11} "m"$.', b: [
      { q: '(a) Nyatakan Hukum Kepler Ketiga.', m: 1, j: 'Kuasa dua tempoh orbit planet berkadar terus dengan kuasa tiga jejari orbitnya, $T^2 ∝ r^3$.' },
      { q: '(b) Hitung tempoh orbit Marikh dalam tahun.', m: 3, j: '${T_2^2}/{1.00^2} = {(2.28 × 10^{11})^3}/{(1.50 × 10^{11})^3} = 1.52^3 = 3.51$. Maka $T_2 = 1.87$ tahun.' },
      { q: '(c) Terangkan mengapa laju sebuah planet berubah-ubah sepanjang orbitnya.', m: 2, j: 'Orbit planet berbentuk elips, maka jaraknya dari Matahari berubah. Menurut Hukum Kepler Kedua, planet mencakupi luas yang sama dalam selang masa yang sama, jadi planet bergerak lebih laju apabila lebih dekat dengan Matahari.' }
    ] }
  ]
});

BAB.push({
  id: 't4-b4', ting: 4, no: 4, tema: 'Tema 3 · Haba', tajuk: 'Haba',
  intro: 'Bab ini menerangkan pemindahan haba dan keseimbangan terma, muatan haba tentu, haba pendam tentu serta tiga hukum gas.',
  sim: {
    t: 'Lengkung pemanasan: daripada ais kepada stim',
    d: 'Seketul ais pada −20 °C dipanaskan dengan kadar yang tetap. Ubah kuasa pemanas dan jisim ais, kemudian mainkan pemanasan. Kotak “Model zarah” menunjukkan susunan molekul pada setiap fasa.',
    cuba: [
      { s: 'Pada bahagian manakah suhu tidak berubah walaupun haba terus dibekalkan?', j: 'Semasa melebur (0 °C) dan mendidih (100 °C). Haba pendam diserap untuk melemahkan atau memutuskan ikatan antara molekul, bukan untuk menambah tenaga kinetik purata molekul.' },
      { s: 'Mengapakah bahagian mendidih jauh lebih panjang daripada bahagian melebur?', j: 'Haba pendam tentu pengewapan air ($2.26 × 10^6 "J kg"^{-1}$) hampir tujuh kali lebih besar daripada haba pendam tentu pelakuran ais ($3.34 × 10^5 "J kg"^{-1}$).' },
      { s: 'Gandakan kuasa pemanas. Apakah kesannya kepada masa pemanasan dan jumlah haba yang diperlukan?', j: 'Masa menjadi separuh kerana $t = {Q}/{P}$. Jumlah haba yang diperlukan tidak berubah kerana bergantung pada jisim dan bahan sahaja.' }
    ]
  },
  sub: [
    { n: '4.1', t: 'Keseimbangan Terma', p: [
      'Haba mengalir dari objek yang lebih panas ke objek yang lebih sejuk apabila kedua-duanya bersentuhan secara terma.',
      '**Keseimbangan terma** tercapai apabila kadar pemindahan haba bersih antara dua objek ialah sifar dan kedua-dua objek mempunyai suhu yang sama.',
      'Contoh: termometer klinik mencapai keseimbangan terma dengan badan; makanan di dalam peti sejuk menyejuk sehingga suhunya sama dengan suhu udara di dalam peti.',
      'Termometer cecair-dalam-kaca ditentu ukur menggunakan dua takat tetap: takat ais (0 °C) dan takat stim (100 °C). Suhu dihitung dengan $θ = {l_θ − l_0}/{l_{100} − l_0} × 100 "°C"$.'
    ] },
    { n: '4.2', t: 'Muatan Haba Tentu', p: [
      '**Muatan haba**, $C$ ialah kuantiti haba yang diperlukan untuk menaikkan suhu objek sebanyak 1 °C.',
      '**Muatan haba tentu**, $c$ ialah kuantiti haba yang diperlukan untuk menaikkan suhu 1 kg bahan sebanyak 1 °C: ==$Q = mcθ$==. Unit $c$: $"J kg"^{-1} "°C"^{-1}$.',
      'Bahan dengan $c$ yang rendah cepat panas dan cepat sejuk (logam periuk). Bahan dengan $c$ yang tinggi lambat panas (pemegang plastik, air).',
      'Air mempunyai $c = 4 200 "J kg"^{-1} "°C"^{-1}$ yang tinggi, maka sesuai sebagai agen penyejuk enjin. Fenomena bayu laut dan bayu darat juga disebabkan oleh perbezaan muatan haba tentu darat dan laut.',
      'Bagi pemanas elektrik berkuasa $P$: tenaga dibekalkan $Pt = mcθ$, dengan andaian tiada haba hilang ke persekitaran.'
    ] },
    { n: '4.3', t: 'Haba Pendam Tentu', p: [
      '**Haba pendam** ialah haba yang diserap atau dibebaskan semasa perubahan fasa tanpa perubahan suhu.',
      '**Haba pendam tentu**, $l$ ialah kuantiti haba yang diserap atau dibebaskan semasa perubahan fasa bagi 1 kg bahan tanpa perubahan suhu: ==$Q = ml$==. Unit: $"J kg"^{-1}$.',
      'Haba pendam tentu **pelakuran**, $l_f$ melibatkan peleburan dan pembekuan. Haba pendam tentu **pengewapan**, $l_v$ melibatkan pendidihan dan kondensasi.',
      'Suhu tidak berubah semasa perubahan fasa kerana haba digunakan untuk melemahkan atau memutuskan ikatan antara molekul; tenaga kinetik purata molekul tidak bertambah.',
      'Penyejatan menyerap haba pendam daripada persekitaran, maka menghasilkan kesan penyejukan (peluh, peti sejuk, penyaman udara).'
    ] },
    { n: '4.4', t: 'Hukum Gas', p: [
      'Tekanan gas terhasil daripada perlanggaran molekul gas dengan dinding bekas. Suhu mesti dalam kelvin: $T = θ + 273$.',
      '**Hukum Boyle**: tekanan berkadar songsang dengan isi padu bagi jisim gas yang tetap pada suhu malar: ==$P_1V_1 = P_2V_2$==.',
      '**Hukum Charles**: isi padu berkadar terus dengan suhu mutlak bagi jisim gas yang tetap pada tekanan malar: ==${V_1}/{T_1} = {V_2}/{T_2}$==.',
      '**Hukum Gay-Lussac**: tekanan berkadar terus dengan suhu mutlak bagi jisim gas yang tetap pada isi padu malar: ==${P_1}/{T_1} = {P_2}/{T_2}$==.',
      '**Sifar mutlak** (0 K atau −273 °C) ialah suhu terendah yang mungkin, apabila isi padu dan tekanan gas diekstrapolasi kepada sifar.'
    ] }
  ],
  rumus: [
    ['$Q = mcθ$', '$Q$ = haba, $m$ = jisim, $c$ = muatan haba tentu, $θ$ = perubahan suhu'],
    ['$Q = ml$', '$l$ = haba pendam tentu (pelakuran $l_f$ atau pengewapan $l_v$)'],
    ['$Pt = mcθ$', 'Pemanasan elektrik tanpa perubahan fasa; $P$ = kuasa, $t$ = masa'],
    ['$Pt = ml$', 'Pemanasan elektrik semasa perubahan fasa'],
    ['$T = θ + 273$', 'Suhu mutlak (K) daripada suhu Celsius (°C)'],
    ['$P_1V_1 = P_2V_2$', 'Hukum Boyle; suhu malar'],
    ['${V_1}/{T_1} = {V_2}/{T_2}$', 'Hukum Charles; tekanan malar, $T$ dalam kelvin'],
    ['${P_1}/{T_1} = {P_2}/{T_2}$', 'Hukum Gay-Lussac; isi padu malar, $T$ dalam kelvin']
  ],
  istilah: [
    ['Keseimbangan terma', 'Keadaan apabila kadar pemindahan haba bersih antara dua objek ialah sifar dan suhunya sama.'],
    ['Muatan haba', 'Kuantiti haba yang diperlukan untuk menaikkan suhu sesuatu objek sebanyak 1 °C.'],
    ['Muatan haba tentu', 'Kuantiti haba yang diperlukan untuk menaikkan suhu 1 kg bahan sebanyak 1 °C.'],
    ['Haba pendam tentu pelakuran', 'Kuantiti haba yang diserap semasa peleburan atau dibebaskan semasa pembekuan bagi 1 kg bahan tanpa perubahan suhu.'],
    ['Haba pendam tentu pengewapan', 'Kuantiti haba yang diserap semasa pendidihan atau dibebaskan semasa kondensasi bagi 1 kg bahan tanpa perubahan suhu.'],
    ['Sifar mutlak', 'Suhu terendah yang mungkin, iaitu 0 K atau −273 °C.']
  ],
  rumusan: [
    'Dua objek dalam keseimbangan terma mempunyai suhu yang sama dan kadar pemindahan haba bersih sifar.',
    'Haba yang mengubah suhu dihitung dengan $Q = mcθ$; haba yang mengubah fasa dihitung dengan $Q = ml$.',
    'Semasa perubahan fasa, suhu tetap kerana haba pendam digunakan untuk mengatasi ikatan antara molekul.',
    'Air mempunyai muatan haba tentu yang tinggi, maka sesuai sebagai agen penyejuk.',
    'Hukum Boyle ($PV$ malar), Hukum Charles (${V}/{T}$ malar) dan Hukum Gay-Lussac (${P}/{T}$ malar) terpakai bagi jisim gas yang tetap, dengan suhu dalam kelvin.'
  ],
  silap: [
    'Menggunakan suhu dalam °C dalam Hukum Charles dan Hukum Gay-Lussac. Tukar kepada kelvin dahulu.',
    'Menggunakan $Q = mcθ$ semasa perubahan fasa. Apabila suhu tetap, gunakan $Q = ml$.',
    'Menulis “tenaga kinetik molekul bertambah” semasa peleburan atau pendidihan. Tenaga kinetik purata tidak berubah kerana suhu tetap.',
    'Terlupa menukar gram kepada kilogram dan minit kepada saat.'
  ],
  kuiz: [
    { q: 'Dua objek berada dalam keseimbangan terma. Pernyataan manakah yang betul?', o: ['Kedua-dua objek mempunyai jisim yang sama', 'Tiada haba dipindahkan langsung antara objek', 'Kadar pemindahan haba bersih antara objek ialah sifar', 'Kedua-dua objek mempunyai muatan haba yang sama'], a: 2, e: 'Dalam keseimbangan terma, suhu kedua-dua objek sama dan kadar pemindahan haba bersih ialah sifar.' },
    { q: 'Berapakah haba yang diperlukan untuk menaikkan suhu 2 kg air dari 30 °C ke 80 °C? [$c = 4 200 "J kg"^{-1} "°C"^{-1}$]', o: ['$2.52 × 10^5 "J"$', '$4.20 × 10^5 "J"$', '$6.72 × 10^5 "J"$', '$8.40 × 10^5 "J"$'], a: 1, e: '$Q = mcθ = 2 × 4 200 × 50 = 4.20 × 10^5 "J"$.' },
    { q: 'Mengapakah badan periuk diperbuat daripada logam?', o: ['Logam mempunyai muatan haba tentu yang rendah', 'Logam mempunyai muatan haba tentu yang tinggi', 'Logam mempunyai haba pendam tentu yang tinggi', 'Logam mempunyai ketumpatan yang rendah'], a: 0, e: 'Bahan dengan muatan haba tentu yang rendah cepat menjadi panas apabila menerima haba.' },
    { q: 'Mengapakah suhu ais kekal pada 0 °C semasa melebur?', o: ['Tiada haba diserap oleh ais', 'Haba yang diserap digunakan untuk melemahkan ikatan antara molekul', 'Tenaga kinetik molekul bertambah', 'Haba hilang ke persekitaran'], a: 1, e: 'Haba pendam yang diserap digunakan untuk mengatasi ikatan antara molekul. Tenaga kinetik purata molekul, dan oleh itu suhu, tidak berubah.' },
    { q: 'Berapakah haba yang diperlukan untuk meleburkan 0.5 kg ais pada 0 °C? [$l_f = 3.34 × 10^5 "J kg"^{-1}$]', o: ['$1.67 × 10^5 "J"$', '$3.34 × 10^5 "J"$', '$6.68 × 10^5 "J"$', '$1.13 × 10^6 "J"$'], a: 0, e: '$Q = ml = 0.5 × 3.34 × 10^5 = 1.67 × 10^5 "J"$.' },
    { q: 'Gas di dalam bekas tegar mempunyai tekanan 200 kPa pada 27 °C. Berapakah tekanannya pada 127 °C?', o: ['150 kPa', '200 kPa', '267 kPa', '941 kPa'], a: 2, e: 'Isi padu malar: ${P_1}/{T_1} = {P_2}/{T_2}$, maka $P_2 = 200 × {400}/{300} = 267 "kPa"$. Suhu mesti dalam kelvin.' },
    { q: 'Udara berisi padu $120 "cm"^3$ pada tekanan 100 kPa dimampatkan kepada $40 "cm"^3$ pada suhu malar. Berapakah tekanan akhirnya?', o: ['33 kPa', '160 kPa', '300 kPa', '480 kPa'], a: 2, e: 'Hukum Boyle: $P_2 = {P_1V_1}/{V_2} = {100 × 120}/{40} = 300 "kPa"$.' }
  ],
  struktur: [
    { t: 'Sebuah pemanas rendam 500 W digunakan untuk memanaskan 0.8 kg cecair. Suhu cecair naik dari 28 °C ke 58 °C dalam masa 3 minit.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan muatan haba tentu?', m: 1, j: 'Kuantiti haba yang diperlukan untuk menaikkan suhu 1 kg bahan sebanyak 1 °C.' },
      { q: '(b) Hitung tenaga yang dibekalkan oleh pemanas.', m: 2, j: '$Q = Pt = 500 × (3 × 60) = 90 000 "J"$' },
      { q: '(c) Hitung muatan haba tentu cecair itu.', m: 2, j: '$c = {Q}/{mθ} = {90 000}/{0.8 × 30} = 3 750 "J kg"^{-1} "°C"^{-1}$' },
      { q: '(d) Nyatakan satu andaian yang dibuat, dan kesannya terhadap nilai $c$ jika andaian itu tidak benar.', m: 2, j: 'Andaian: semua haba daripada pemanas diserap oleh cecair (tiada haba hilang ke persekitaran). Jika haba hilang, nilai $c$ yang dihitung lebih besar daripada nilai sebenar.' }
    ] },
    { t: 'Sebuah cerek elektrik 2 000 W mengandungi air yang sedang mendidih pada 100 °C. [$l_v = 2.26 × 10^6 "J kg"^{-1}$]', b: [
      { q: '(a) Apakah yang dimaksudkan dengan haba pendam tentu pengewapan?', m: 1, j: 'Kuantiti haba yang diserap semasa pendidihan (atau dibebaskan semasa kondensasi) bagi 1 kg bahan tanpa perubahan suhu.' },
      { q: '(b) Hitung masa yang diambil untuk menukarkan 0.2 kg air mendidih kepada stim.', m: 3, j: '$Q = ml = 0.2 × 2.26 × 10^6 = 4.52 × 10^5 "J"$. $t = {Q}/{P} = {4.52 × 10^5}/{2 000} = 226 "s"$' },
      { q: '(c) Terangkan mengapa lecur akibat stim lebih teruk daripada lecur akibat air mendidih.', m: 2, j: 'Stim pada 100 °C membebaskan haba pendam pengewapan yang besar apabila terkondensasi pada kulit, kemudian air yang terhasil terus membebaskan haba semasa menyejuk. Jumlah haba yang dipindahkan ke kulit lebih banyak.' }
    ] }
  ]
});

BAB.push({
  id: 't4-b5', ting: 4, no: 5, tema: 'Tema 4 · Gelombang, Cahaya dan Optik', tajuk: 'Gelombang',
  intro: 'Gelombang memindahkan tenaga tanpa memindahkan jirim. Bab ini merangkumi ciri gelombang, pelembapan dan resonans, empat fenomena gelombang serta gelombang elektromagnet.',
  sim: {
    t: 'Gelombang merambat: melintang dan membujur',
    d: 'Ubah amplitud, frekuensi sumber dan laju gelombang dalam medium. Zarah berwarna jingga menunjukkan cara satu zarah medium bergetar semasa gelombang melaluinya.',
    cuba: [
      { s: 'Tambah frekuensi tanpa mengubah laju gelombang. Apakah yang berlaku kepada panjang gelombang?', j: 'Panjang gelombang berkurang kerana $λ = {v}/{f}$. Laju gelombang ditentukan oleh medium, bukan oleh sumber.' },
      { s: 'Perhatikan zarah berwarna jingga. Adakah zarah itu bergerak bersama-sama gelombang?', j: 'Tidak. Zarah hanya bergetar di sekitar kedudukan keseimbangannya. Gelombang memindahkan tenaga, bukan jirim.' },
      { s: 'Tukar kepada gelombang membujur. Apakah beza arah getaran zarah?', j: 'Zarah bergetar selari dengan arah perambatan dan membentuk kawasan mampatan dan regangan, seperti gelombang bunyi.' },
      { s: 'Ubah amplitud. Adakah laju atau panjang gelombang berubah?', j: 'Tidak. Amplitud berkaitan dengan tenaga yang dibawa oleh gelombang sahaja.' }
    ]
  },
  sub: [
    { n: '5.1', t: 'Asas Gelombang', p: [
      'Gelombang terhasil daripada getaran atau ayunan dan **memindahkan tenaga tanpa memindahkan jirim**.',
      '**Gelombang melintang**: zarah bergetar serenjang dengan arah perambatan (gelombang air, cahaya). **Gelombang membujur**: zarah bergetar selari dengan arah perambatan (bunyi).',
      'Gelombang mekanik memerlukan medium; gelombang elektromagnet tidak memerlukan medium.',
      '**Amplitud**, $A$: sesaran maksimum dari kedudukan keseimbangan. **Tempoh**, $T$: masa bagi satu ayunan lengkap. **Frekuensi**, $f = {1}/{T}$: bilangan ayunan lengkap sesaat.',
      '**Panjang gelombang**, $λ$: jarak di antara dua titik berturutan yang sefasa. Laju gelombang: ==$v = fλ$==.',
      'Graf sesaran–masa memberikan $A$ dan $T$; graf sesaran–jarak memberikan $A$ dan $λ$.'
    ] },
    { n: '5.2', t: 'Pelembapan dan Resonans', p: [
      '**Pelembapan** ialah pengurangan amplitud sistem ayunan akibat kehilangan tenaga. Frekuensi tidak berubah.',
      'Pelembapan luaran disebabkan oleh rintangan udara atau geseran; pelembapan dalaman disebabkan oleh regangan dan mampatan molekul dalam sistem.',
      '**Resonans** berlaku apabila sistem dipaksa berayun pada frekuensi yang sama dengan **frekuensi aslinya**; sistem berayun dengan amplitud maksimum.',
      'Contoh resonans: bandul Barton, runtuhan Jambatan Tacoma Narrows, penalaan radio, gelas pecah akibat nyanyian bernada tinggi.'
    ] },
    { n: '5.3', t: 'Pantulan Gelombang', p: [
      'Gelombang dipantulkan apabila mengenai pemantul. **Sudut tuju = sudut pantulan**.',
      'Selepas pantulan, frekuensi, panjang gelombang dan laju tidak berubah; hanya arah perambatan berubah.',
      'Aplikasi: sonar untuk mengukur kedalaman laut, ultrabunyi dalam perubatan, radar.'
    ] },
    { n: '5.4', t: 'Pembiasan Gelombang', p: [
      '**Pembiasan** ialah perubahan arah perambatan gelombang akibat perubahan laju apabila gelombang merambat dari satu medium ke medium lain (atau dari air dalam ke air cetek).',
      'Dari kawasan dalam ke kawasan cetek: laju berkurang, panjang gelombang berkurang, **frekuensi tidak berubah**, dan gelombang dibiaskan mendekati garis normal.',
      'Kerana frekuensi tetap: ${v_1}/{λ_1} = {v_2}/{λ_2}$.',
      'Contoh: muka gelombang laut mengikut bentuk pantai; bunyi kedengaran lebih jelas pada waktu malam.'
    ] },
    { n: '5.5', t: 'Pembelauan Gelombang', p: [
      '**Pembelauan** ialah penyebaran gelombang apabila merambat melalui celah atau mengelilingi penghalang.',
      'Selepas pembelauan, frekuensi, panjang gelombang dan laju tidak berubah; amplitud berkurang kerana tenaga tersebar.',
      'Kesan pembelauan lebih ketara apabila saiz celah lebih kecil atau panjang gelombang lebih besar (saiz celah hampir sama dengan $λ$).',
      'Contoh: bunyi boleh didengar di sebalik dinding; benteng pemecah ombak di pelabuhan.'
    ] },
    { n: '5.6', t: 'Interferens Gelombang', p: [
      '**Prinsip superposisi**: apabila dua gelombang bertindih, sesaran paduan ialah hasil tambah sesaran setiap gelombang.',
      'Sumber **koheren** mempunyai frekuensi yang sama dan beza fasa yang tetap.',
      '**Interferens membina**: puncak bertemu puncak (atau lembangan bertemu lembangan), menghasilkan antinod. **Interferens memusnah**: puncak bertemu lembangan, menghasilkan nod.',
      'Rumus interferens: ==$λ = {ax}/{D}$==, dengan $a$ = jarak antara dua sumber koheren, $x$ = jarak antara dua garis antinod (atau nod) berturutan, $D$ = jarak dari sumber ke tempat $x$ diukur.',
      'Bagi cahaya (eksperimen dwicelah Young), pinggir cerah ialah interferens membina dan pinggir gelap ialah interferens memusnah.'
    ] },
    { n: '5.7', t: 'Gelombang Elektromagnet', p: [
      'Gelombang elektromagnet ialah gelombang melintang yang terdiri daripada medan elektrik dan medan magnet yang berayun serenjang antara satu sama lain.',
      'Tidak memerlukan medium dan merambat dengan laju $c = 3.00 × 10^8 "m s"^{-1}$ dalam vakum.',
      'Spektrum mengikut frekuensi menaik: gelombang radio, gelombang mikro, sinaran inframerah, cahaya nampak, sinaran ultraungu, sinar-X, sinar gama. Panjang gelombang berkurang mengikut tertib yang sama.',
      'Aplikasi: radio (penyiaran), mikro (satelit, ketuhar), inframerah (alat kawalan jauh, kamera terma), ultraungu (pensterilan, pengesan wang palsu), sinar-X (imej tulang), sinar gama (rawatan kanser, pensterilan).'
    ] }
  ],
  rumus: [
    ['$f = {1}/{T}$', 'Frekuensi (Hz) dan tempoh (s)'],
    ['$v = fλ$', 'Laju gelombang = frekuensi × panjang gelombang'],
    ['${v_1}/{λ_1} = {v_2}/{λ_2}$', 'Pembiasan: frekuensi tidak berubah'],
    ['$λ = {ax}/{D}$', 'Interferens; $a$ = jarak antara sumber, $x$ = jarak antara antinod berturutan, $D$ = jarak ke skrin'],
    ['$c = fλ$', 'Gelombang elektromagnet dalam vakum; $c = 3.00 × 10^8 "m s"^{-1}$']
  ],
  istilah: [
    ['Amplitud', 'Sesaran maksimum zarah dari kedudukan keseimbangan.'],
    ['Panjang gelombang', 'Jarak di antara dua titik berturutan yang sefasa.'],
    ['Pelembapan', 'Pengurangan amplitud sistem ayunan akibat kehilangan tenaga.'],
    ['Resonans', 'Keadaan apabila sistem dipaksa berayun pada frekuensi aslinya dan berayun dengan amplitud maksimum.'],
    ['Pembiasan', 'Perubahan arah perambatan gelombang akibat perubahan laju apabila bertukar medium.'],
    ['Pembelauan', 'Penyebaran gelombang apabila melalui celah atau mengelilingi penghalang.'],
    ['Sumber koheren', 'Dua sumber gelombang dengan frekuensi yang sama dan beza fasa yang tetap.'],
    ['Interferens', 'Superposisi dua atau lebih gelombang daripada sumber koheren.']
  ],
  rumusan: [
    'Gelombang memindahkan tenaga tanpa memindahkan jirim; $v = fλ$.',
    'Pelembapan mengurangkan amplitud; resonans menghasilkan amplitud maksimum apabila frekuensi paksaan sama dengan frekuensi asli.',
    'Pantulan: $f$, $λ$ dan $v$ tidak berubah. Pembiasan: $v$ dan $λ$ berubah, $f$ tetap. Pembelauan: $f$, $λ$ dan $v$ tetap, amplitud berkurang.',
    'Interferens membina menghasilkan antinod dan interferens memusnah menghasilkan nod; $λ = {ax}/{D}$.',
    'Frekuensi gelombang hanya ditentukan oleh sumber dan tidak berubah dalam mana-mana fenomena gelombang.',
    'Gelombang elektromagnet ialah gelombang melintang yang merambat dalam vakum dengan laju $3.00 × 10^8 "m s"^{-1}$.'
  ],
  silap: [
    'Menyatakan frekuensi berubah semasa pembiasan. Frekuensi ditentukan oleh sumber dan sentiasa tetap.',
    'Membaca panjang gelombang daripada graf sesaran–masa. Graf itu memberikan tempoh, bukan panjang gelombang.',
    'Tertukar $a$ dengan $x$ dalam $λ = {ax}/{D}$, atau tidak menukar mm kepada m.',
    'Mengukur amplitud dari puncak ke lembangan. Amplitud diukur dari kedudukan keseimbangan ke puncak.'
  ],
  kuiz: [
    { q: 'Satu gelombang mempunyai frekuensi 5 Hz dan panjang gelombang 0.6 m. Berapakah laju gelombang itu?', o: ['$0.12 "m s"^{-1}$', '$3.0 "m s"^{-1}$', '$5.6 "m s"^{-1}$', '$8.3 "m s"^{-1}$'], a: 1, e: '$v = fλ = 5 × 0.6 = 3.0 "m s"^{-1}$.' },
    { q: 'Gelombang bunyi ialah gelombang membujur kerana zarah-zarah medium bergetar', o: ['serenjang dengan arah perambatan gelombang', 'selari dengan arah perambatan gelombang', 'dalam bulatan', 'tanpa memindahkan tenaga'], a: 1, e: 'Dalam gelombang membujur, zarah bergetar selari dengan arah perambatan dan membentuk mampatan dan regangan.' },
    { q: 'Gelombang air merambat dari kawasan dalam ke kawasan cetek. Kuantiti manakah yang tidak berubah?', o: ['Laju', 'Panjang gelombang', 'Frekuensi', 'Arah perambatan'], a: 2, e: 'Frekuensi ditentukan oleh sumber. Laju dan panjang gelombang berkurang di kawasan cetek.' },
    { q: 'Kesan pembelauan gelombang air melalui satu celah menjadi lebih ketara apabila', o: ['saiz celah ditambah', 'saiz celah dikurangkan', 'amplitud gelombang ditambah', 'frekuensi gelombang ditambah'], a: 1, e: 'Pembelauan lebih ketara apabila celah lebih sempit atau panjang gelombang lebih besar. Menambah frekuensi memendekkan panjang gelombang dan mengurangkan pembelauan.' },
    { q: 'Dalam eksperimen dwicelah Young, $a = 0.50 "mm"$, $D = 2.0 "m"$ dan jarak antara pinggir cerah berturutan ialah 2.4 mm. Berapakah panjang gelombang cahaya itu?', o: ['$4.2 × 10^{-7} "m"$', '$6.0 × 10^{-7} "m"$', '$9.6 × 10^{-7} "m"$', '$6.0 × 10^{-4} "m"$'], a: 1, e: '$λ = {ax}/{D} = {(0.50 × 10^{-3})(2.4 × 10^{-3})}/{2.0} = 6.0 × 10^{-7} "m"$.' },
    { q: 'Resonans berlaku apabila', o: ['amplitud ayunan berkurang kerana geseran', 'frekuensi daya paksaan sama dengan frekuensi asli sistem', 'dua gelombang bertemu dan saling memusnah', 'gelombang dipantulkan oleh penghalang'], a: 1, e: 'Sistem yang dipaksa berayun pada frekuensi aslinya menyerap tenaga secara maksimum dan berayun dengan amplitud maksimum.' },
    { q: 'Gelombang elektromagnet manakah yang mempunyai frekuensi paling tinggi?', o: ['Gelombang mikro', 'Sinaran ultraungu', 'Sinar-X', 'Sinar gama'], a: 3, e: 'Tertib frekuensi menaik: radio, mikro, inframerah, cahaya nampak, ultraungu, sinar-X, sinar gama.' },
    { q: 'Amplitud ayunan sebuah bandul semakin berkurang dengan masa. Fenomena ini dikenali sebagai', o: ['resonans', 'pelembapan', 'pembelauan', 'interferens'], a: 1, e: 'Pelembapan ialah pengurangan amplitud akibat kehilangan tenaga, contohnya kerana rintangan udara.' }
  ],
  struktur: [
    { t: 'Satu gelombang air mempunyai amplitud 4 cm, tempoh 0.5 s dan panjang gelombang 12 cm di kawasan dalam.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan amplitud?', m: 1, j: 'Sesaran maksimum zarah dari kedudukan keseimbangan.' },
      { q: '(b) Hitung frekuensi gelombang itu.', m: 1, j: '$f = {1}/{T} = {1}/{0.5} = 2 "Hz"$' },
      { q: '(c) Hitung laju gelombang di kawasan dalam.', m: 2, j: '$v = fλ = 2 × 12 = 24 "cm s"^{-1}$' },
      { q: '(d) Gelombang itu memasuki kawasan cetek dan panjang gelombangnya menjadi 8 cm. Namakan fenomena ini dan hitung laju gelombang di kawasan cetek.', m: 3, j: 'Pembiasan gelombang. Frekuensi tidak berubah (2 Hz), maka $v = fλ = 2 × 8 = 16 "cm s"^{-1}$.' }
    ] },
    { t: 'Dua pembesar suara yang disambungkan kepada penjana isyarat yang sama diletakkan 1.5 m antara satu sama lain. Seorang murid berjalan selari dengan pembesar suara pada jarak 10 m dan mendapati jarak antara dua kedudukan bunyi kuat yang berturutan ialah 2.2 m.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan sumber koheren?', m: 1, j: 'Sumber gelombang yang mempunyai frekuensi yang sama dan beza fasa yang tetap.' },
      { q: '(b) Hitung panjang gelombang bunyi itu.', m: 2, j: '$λ = {ax}/{D} = {1.5 × 2.2}/{10} = 0.33 "m"$' },
      { q: '(c) Laju bunyi di udara ialah $330 "m s"^{-1}$. Hitung frekuensi bunyi itu.', m: 2, j: '$f = {v}/{λ} = {330}/{0.33} = 1 000 "Hz"$' },
      { q: '(d) Apakah yang berlaku kepada jarak antara kedudukan bunyi kuat jika jarak antara pembesar suara ditambah?', m: 1, j: 'Jarak itu berkurang, kerana $x = {λD}/{a}$ berkadar songsang dengan $a$.' }
    ] }
  ]
});

BAB.push({
  id: 't4-b6', ting: 4, no: 6, tema: 'Tema 4 · Gelombang, Cahaya dan Optik', tajuk: 'Cahaya dan Optik',
  intro: 'Bab ini menerangkan pembiasan cahaya, pantulan dalam penuh, pembentukan imej oleh kanta dan cermin sfera, serta prinsip kerja peralatan optik.',
  sim: {
    n: 2,
    t: 'Pembiasan cahaya dan rajah sinar kanta',
    d: 'Dua visual dalam satu makmal. Mod pertama menunjukkan pembiasan pada sempadan udara dan medium, termasuk pantulan dalam penuh. Mod kedua melukis rajah sinar bagi kanta nipis dan menentukan ciri imej.',
    cuba: [
      { s: 'Dalam mod pembiasan, pilih “Medium → udara” dengan kaca, kemudian besarkan sudut tuju sedikit demi sedikit. Pada sudut berapakah sinar biasan hilang?', j: 'Kira-kira 42°, iaitu sudut genting kaca ($sin c = {1}/{1.50}$). Apabila $i > c$, semua cahaya dipantulkan: pantulan dalam penuh.' },
      { s: 'Bandingkan sudut genting air, kaca dan intan.', j: 'Air 48.8°, kaca 41.8°, intan 24.4°. Semakin besar indeks biasan, semakin kecil sudut genting. Sebab itu intan kelihatan berkilau.' },
      { s: 'Dalam mod kanta, gunakan kanta cembung dengan $f = 15 "cm"$. Gerakkan objek dari 60 cm ke 5 cm dan perhatikan imej.', j: '$u > 2f$: nyata, songsang, dikecilkan. $u = 2f$: sama saiz. $f < u < 2f$: nyata, songsang, diperbesar. $u < f$: maya, tegak, diperbesar (kanta pembesar).' },
      { s: 'Tukar kepada kanta cekung. Bolehkah imej nyata terbentuk?', j: 'Tidak. Kanta cekung sentiasa membentuk imej maya, tegak dan dikecilkan.' }
    ]
  },
  sub: [
    { n: '6.1', t: 'Pembiasan Cahaya', p: [
      '**Pembiasan cahaya** berlaku kerana laju cahaya berubah apabila merambat melalui medium yang berlainan ketumpatan optik.',
      'Dari medium kurang tumpat ke medium lebih tumpat (udara ke kaca), cahaya dibiaskan **mendekati** garis normal. Dari lebih tumpat ke kurang tumpat, cahaya dibiaskan **menjauhi** garis normal.',
      '**Indeks biasan**: ==$n = {c}/{v}$==, iaitu nisbah laju cahaya dalam vakum kepada laju cahaya dalam medium.',
      '**Hukum Snell**: $n_1 sin θ_1 = n_2 sin θ_2$. Bagi cahaya dari udara ke medium, $n = {sin i}/{sin r}$.',
      'Objek di dalam air kelihatan lebih cetek: $n = {"dalam nyata", H}/{"dalam ketara", h}$.'
    ] },
    { n: '6.2', t: 'Pantulan Dalam Penuh', p: [
      '**Sudut genting**, $c$ ialah sudut tuju dalam medium lebih tumpat apabila sudut biasan dalam medium kurang tumpat ialah 90°: ==$n = {1}/{sin c}$==.',
      'Dua syarat pantulan dalam penuh: (1) cahaya merambat dari medium lebih tumpat ke medium kurang tumpat; (2) sudut tuju lebih besar daripada sudut genting.',
      'Fenomena semula jadi: logamaya, pelangi, kilauan intan.',
      'Aplikasi: gentian optik (teras berindeks biasan lebih tinggi daripada penyalut), periskop berprisma, pemantul mata jalan.'
    ] },
    { n: '6.3', t: 'Pembentukan Imej oleh Kanta', p: [
      '**Kanta cembung** menumpukan cahaya; **kanta cekung** mencapahkan cahaya. **Panjang fokus**, $f$ ialah jarak di antara pusat optik dengan titik fokus.',
      'Dua sinar untuk melukis rajah sinar: (1) sinar selari dengan paksi utama dibiaskan melalui titik fokus; (2) sinar melalui pusat optik bergerak lurus tanpa dibiaskan.',
      'Kanta cembung: $u > 2f$ nyata, songsang, dikecilkan; $u = 2f$ sama saiz; $f < u < 2f$ nyata, songsang, diperbesar; $u < f$ maya, tegak, diperbesar.',
      'Kanta cekung sentiasa menghasilkan imej maya, tegak dan dikecilkan.',
      '**Pembesaran linear**: $m = {v}/{u} = {h_i}/{h_o}$.'
    ] },
    { n: '6.4', t: 'Formula Kanta Nipis', p: [
      'Formula kanta nipis: ==${1}/{f} = {1}/{u} + {1}/{v}$==.',
      'Peraturan tanda: $f$ positif bagi kanta cembung dan negatif bagi kanta cekung; $v$ positif bagi imej nyata dan negatif bagi imej maya.',
      'Graf ${1}/{v}$ melawan ${1}/{u}$ ialah garis lurus; kedua-dua pintasan bernilai ${1}/{f}$.'
    ] },
    { n: '6.5', t: 'Peralatan Optik', p: [
      '**Kanta pembesar**: kanta cembung dengan objek diletakkan pada jarak kurang daripada $f$; imej maya, tegak dan diperbesar.',
      '**Mikroskop majmuk**: dua kanta cembung dengan panjang fokus pendek, $f_o < f_m$. Kanta objek membentuk imej nyata yang diperbesar; kanta mata bertindak sebagai kanta pembesar. Jarak antara kanta lebih besar daripada $f_o + f_m$.',
      '**Teleskop**: kanta objek berpanjang fokus besar dan kanta mata berpanjang fokus kecil, $f_o > f_m$. Pada pelarasan normal, jarak antara kanta ialah $f_o + f_m$ dan pembesaran $M = {f_o}/{f_m}$.'
    ] },
    { n: '6.6', t: 'Pembentukan Imej oleh Cermin Sfera', p: [
      '**Cermin cekung** menumpukan cahaya; **cermin cembung** mencapahkan cahaya. Jejari kelengkungan $r = 2f$.',
      'Cermin cekung: objek jauh menghasilkan imej nyata dan songsang; objek di antara $F$ dengan cermin menghasilkan imej maya, tegak dan diperbesar.',
      'Cermin cembung sentiasa menghasilkan imej maya, tegak dan dikecilkan dengan medan penglihatan yang luas.',
      'Aplikasi: cermin cekung dalam cermin solek, cermin pergigian dan pemantul lampu; cermin cembung sebagai cermin keselamatan di selekoh jalan dan cermin sisi kenderaan.'
    ] }
  ],
  rumus: [
    ['$n = {c}/{v}$', 'Indeks biasan; $c$ = laju cahaya dalam vakum, $v$ = laju cahaya dalam medium'],
    ['$n = {sin i}/{sin r}$', 'Hukum Snell bagi cahaya dari udara ke medium'],
    ['$n_1 sin θ_1 = n_2 sin θ_2$', 'Hukum Snell bagi dua medium'],
    ['$n = {H}/{h}$', '$H$ = dalam nyata, $h$ = dalam ketara'],
    ['$n = {1}/{sin c}$', '$c$ = sudut genting'],
    ['${1}/{f} = {1}/{u} + {1}/{v}$', 'Formula kanta nipis; $u$ = jarak objek, $v$ = jarak imej'],
    ['$m = {v}/{u} = {h_i}/{h_o}$', 'Pembesaran linear'],
    ['$M = {f_o}/{f_m}$', 'Pembesaran teleskop pada pelarasan normal']
  ],
  istilah: [
    ['Indeks biasan', 'Nisbah laju cahaya dalam vakum kepada laju cahaya dalam medium.'],
    ['Sudut genting', 'Sudut tuju dalam medium lebih tumpat apabila sudut biasan dalam medium kurang tumpat ialah 90°.'],
    ['Pantulan dalam penuh', 'Pantulan semua cahaya ke dalam medium lebih tumpat apabila sudut tuju melebihi sudut genting.'],
    ['Panjang fokus', 'Jarak di antara pusat optik dengan titik fokus.'],
    ['Imej nyata', 'Imej yang boleh dibentuk pada skrin; terbentuk oleh sinar cahaya yang benar-benar bertemu.'],
    ['Imej maya', 'Imej yang tidak boleh dibentuk pada skrin; terbentuk pada pemanjangan sinar ke belakang.'],
    ['Pembesaran linear', 'Nisbah tinggi imej kepada tinggi objek.']
  ],
  rumusan: [
    'Cahaya dibiaskan kerana lajunya berubah; $n = {c}/{v} = {sin i}/{sin r}$.',
    'Pantulan dalam penuh berlaku apabila cahaya merambat dari medium lebih tumpat ke kurang tumpat dengan $i > c$; $n = {1}/{sin c}$.',
    'Ciri imej kanta cembung bergantung pada kedudukan objek berbanding $f$ dan $2f$; kanta cekung sentiasa memberikan imej maya, tegak dan dikecilkan.',
    'Formula kanta nipis ${1}/{f} = {1}/{u} + {1}/{v}$ dan pembesaran $m = {v}/{u}$ digunakan bersama peraturan tanda.',
    'Mikroskop menggunakan dua kanta berpanjang fokus pendek; teleskop menggunakan kanta objek berpanjang fokus besar.',
    'Cermin cembung memberikan medan penglihatan yang luas; cermin cekung boleh membesarkan imej.'
  ],
  silap: [
    'Mengukur sudut tuju dan sudut biasan dari permukaan. Sudut mesti diukur dari garis normal.',
    'Menggunakan $n = {sin i}/{sin r}$ bagi cahaya yang keluar dari kaca ke udara tanpa menyongsangkan nisbah.',
    'Terlupa tanda negatif: $f$ bagi kanta cekung dan $v$ bagi imej maya.',
    'Menyatakan hanya satu syarat pantulan dalam penuh. Kedua-dua syarat mesti ditulis.'
  ],
  kuiz: [
    { q: 'Indeks biasan kaca ialah 1.50. Berapakah laju cahaya dalam kaca? [$c = 3.00 × 10^8 "m s"^{-1}$]', o: ['$1.50 × 10^8 "m s"^{-1}$', '$2.00 × 10^8 "m s"^{-1}$', '$3.00 × 10^8 "m s"^{-1}$', '$4.50 × 10^8 "m s"^{-1}$'], a: 1, e: '$v = {c}/{n} = {3.00 × 10^8}/{1.50} = 2.00 × 10^8 "m s"^{-1}$.' },
    { q: 'Satu sinar cahaya merambat dari udara ke dalam air ($n = 1.33$) dengan sudut tuju 45°. Berapakah sudut biasan?', o: ['25.6°', '32.1°', '45.0°', '70.1°'], a: 1, e: '$sin r = {sin 45°}/{1.33} = 0.532$, maka $r = 32.1°$.' },
    { q: 'Berapakah sudut genting bagi kaca berindeks biasan 1.50?', o: ['33.7°', '41.8°', '48.2°', '56.3°'], a: 1, e: '$sin c = {1}/{1.50} = 0.667$, maka $c = 41.8°$.' },
    { q: 'Syarat manakah yang diperlukan untuk pantulan dalam penuh?', o: ['Cahaya merambat dari medium kurang tumpat ke medium lebih tumpat', 'Sudut tuju sama dengan sudut biasan', 'Cahaya merambat dari medium lebih tumpat ke medium kurang tumpat dengan sudut tuju melebihi sudut genting', 'Sudut tuju lebih kecil daripada sudut genting'], a: 2, e: 'Kedua-dua syarat mesti dipenuhi: arah dari medium lebih tumpat ke kurang tumpat, dan $i > c$.' },
    { q: 'Satu objek diletakkan 15 cm dari kanta cembung berpanjang fokus 10 cm. Apakah ciri imej yang terbentuk?', o: ['Nyata, songsang, diperbesar', 'Nyata, songsang, dikecilkan', 'Maya, tegak, diperbesar', 'Maya, tegak, dikecilkan'], a: 0, e: '${1}/{v} = {1}/{10} − {1}/{15}$, maka $v = 30 "cm"$ (nyata). $m = {30}/{15} = 2$ (diperbesar). Objek berada di antara $f$ dengan $2f$.' },
    { q: 'Untuk menggunakan kanta cembung sebagai kanta pembesar, objek mesti diletakkan', o: ['pada jarak lebih besar daripada $2f$', 'pada $2f$', 'di antara $f$ dengan $2f$', 'pada jarak kurang daripada $f$'], a: 3, e: 'Apabila $u < f$, imej yang terbentuk ialah maya, tegak dan diperbesar.' },
    { q: 'Mengapakah cermin cembung digunakan di selekoh jalan yang tajam?', o: ['Menghasilkan imej yang diperbesar', 'Menghasilkan imej nyata', 'Mempunyai medan penglihatan yang luas', 'Menumpukan cahaya lampu kenderaan'], a: 2, e: 'Cermin cembung menghasilkan imej maya, tegak dan dikecilkan, maka kawasan yang lebih luas dapat dilihat.' },
    { q: 'Sebuah kolam mempunyai kedalaman sebenar 2.0 m. Berapakah dalam ketara kolam itu apabila dilihat dari atas? [$n_"air" = 1.33$]', o: ['0.67 m', '1.5 m', '2.0 m', '2.7 m'], a: 1, e: '$h = {H}/{n} = {2.0}/{1.33} = 1.5 "m"$. Kolam kelihatan lebih cetek.' }
  ],
  struktur: [
    { t: 'Satu objek setinggi 4 cm diletakkan 30 cm dari sebuah kanta cembung yang berpanjang fokus 20 cm.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan panjang fokus?', m: 1, j: 'Jarak di antara pusat optik kanta dengan titik fokus.' },
      { q: '(b) Hitung jarak imej.', m: 2, j: '${1}/{v} = {1}/{f} − {1}/{u} = {1}/{20} − {1}/{30} = {1}/{60}$, maka $v = 60 "cm"$.' },
      { q: '(c) Hitung pembesaran linear dan tinggi imej.', m: 2, j: '$m = {v}/{u} = {60}/{30} = 2$. Tinggi imej $= 2 × 4 = 8 "cm"$.' },
      { q: '(d) Nyatakan tiga ciri imej itu.', m: 1, j: 'Nyata, songsang dan diperbesar.' },
      { q: '(e) Objek digerakkan ke kedudukan 10 cm dari kanta. Hitung jarak imej dan nyatakan ciri imej.', m: 2, j: '${1}/{v} = {1}/{20} − {1}/{10} = −{1}/{20}$, maka $v = −20 "cm"$. Imej maya, tegak dan diperbesar, di sebelah yang sama dengan objek.' }
    ] },
    { t: 'Satu sinar cahaya merambat di dalam sebuah bongkah kaca berindeks biasan 1.52 menuju ke sempadan kaca–udara.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan sudut genting?', m: 1, j: 'Sudut tuju dalam medium lebih tumpat apabila sudut biasan dalam medium kurang tumpat sama dengan 90°.' },
      { q: '(b) Hitung sudut genting kaca itu.', m: 2, j: '$sin c = {1}/{n} = {1}/{1.52}$, maka $c = 41.1°$.' },
      { q: '(c) Sinar itu menuju sempadan dengan sudut tuju 45°. Terangkan apa yang berlaku.', m: 2, j: 'Sudut tuju (45°) lebih besar daripada sudut genting (41.1°) dan cahaya merambat dari medium lebih tumpat ke kurang tumpat. Maka pantulan dalam penuh berlaku: semua cahaya dipantulkan ke dalam kaca dengan sudut pantulan 45°.' },
      { q: '(d) Nyatakan satu aplikasi fenomena ini dan satu kelebihannya.', m: 2, j: 'Gentian optik dalam telekomunikasi. Kelebihan: isyarat dihantar dengan kehilangan tenaga yang sangat kecil dan boleh membawa lebih banyak maklumat berbanding kabel kuprum.' }
    ] }
  ]
});
