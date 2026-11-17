'use strict';
/* ===== Kandungan Tingkatan 5 (Buku Teks Fizik KSSM Tingkatan 5) ===== */

BAB.push({
  id: 't5-b1', ting: 5, no: 1, tema: 'Tema 1 · Mekanik Newton', tajuk: 'Daya dan Gerakan II',
  intro: 'Bab ini meneruskan kajian tentang daya: cara menggabungkan dan meleraikan daya, syarat keseimbangan daya dan sifat kekenyalan bahan.',
  sim: {
    n: 2,
    t: 'Daya paduan dan leraian daya',
    d: 'Mod pertama menggabungkan dua daya menggunakan segi empat selari daya. Mod kedua meleraikan satu daya kepada dua komponen yang berserenjang.',
    cuba: [
      { s: 'Dalam mod daya paduan, tetapkan $F_1 = 60 "N"$, $F_2 = 80 "N"$ dan $θ = 90°$. Berapakah daya paduan?', j: '100 N, kerana dua daya itu berserenjang: $F = sqrt{60^2 + 80^2}$. Arahnya 53.1° dari $F_1$.' },
      { s: 'Ubah $θ$ dari 0° ke 180°. Bilakah daya paduan paling besar dan paling kecil?', j: 'Paling besar pada 0° (dua daya searah, $F_1 + F_2$) dan paling kecil pada 180° (dua daya bertentangan arah, $F_1 − F_2$).' },
      { s: 'Dalam mod leraian daya, pada sudut berapakah kedua-dua komponen sama besar?', j: 'Pada 45°, kerana $kos 45° = sin 45°$.' },
      { s: 'Besarkan $θ$ sehingga 90°. Apakah yang berlaku kepada komponen mengufuk?', j: 'Komponen mengufuk menjadi sifar kerana $kos 90° = 0$; seluruh daya bertindak secara menegak.' }
    ]
  },
  sub: [
    { n: '1.1', t: 'Daya Paduan', p: [
      '**Daya paduan** ialah daya tunggal yang mewakili jumlah secara vektor dua atau lebih daya yang bertindak ke atas sesuatu objek.',
      'Daya selari: tambah jika searah, tolak jika bertentangan arah. Daya berserenjang: $F = sqrt{F_1^2 + F_2^2}$ dan arahnya $tan θ = {F_2}/{F_1}$.',
      'Dua daya yang tidak berserenjang digabungkan dengan kaedah **segi tiga daya** atau **segi empat selari daya** menggunakan lukisan berskala.',
      'Daya paduan sifar: objek pegun atau bergerak dengan halaju seragam. Daya paduan bukan sifar: objek memecut mengikut $F = ma$.',
      'Di dalam lif, bacaan penimbang ialah tindak balas normal $R$: $R = mg$ (pegun atau halaju seragam), $R = mg + ma$ (memecut ke atas), $R = mg − ma$ (memecut ke bawah).'
    ] },
    { n: '1.2', t: 'Leraian Daya', p: [
      '**Leraian daya** ialah proses meleraikan satu daya kepada dua komponen yang berserenjang.',
      'Bagi daya $F$ pada sudut $θ$ dari garis ufuk: komponen mengufuk ==$F_x = F kos θ$== dan komponen menegak ==$F_y = F sin θ$==.',
      'Di atas satah condong bersudut $θ$: komponen berat selari dengan satah ialah $W sin θ$ dan komponen berat serenjang dengan satah ialah $W kos θ$.',
      'Selepas dileraikan, selesaikan gerakan pada setiap arah secara berasingan.'
    ] },
    { n: '1.3', t: 'Keseimbangan Daya', p: [
      'Objek berada dalam **keseimbangan daya** apabila daya-daya yang bertindak ke atasnya menghasilkan daya paduan sifar.',
      'Tiga daya sesatah dalam keseimbangan membentuk **segi tiga daya** yang tertutup apabila dilukis mengikut turutan.',
      'Kaedah penyelesaian: leraian daya (jumlah komponen mengufuk = 0 dan jumlah komponen menegak = 0) atau lukisan berskala segi tiga daya.'
    ] },
    { n: '1.4', t: 'Kekenyalan', p: [
      '**Kekenyalan** ialah sifat bahan yang membolehkan objek kembali kepada bentuk dan saiz asalnya selepas daya yang bertindak ke atasnya dialihkan.',
      '**Hukum Hooke**: pemanjangan spring berkadar terus dengan daya yang bertindak ke atasnya jika tidak melebihi had kenyal spring: ==$F = kx$==.',
      '**Pemalar spring**, $k$ ialah kecerunan graf $F$ melawan $x$ (unit $"N m"^{-1}$). Nilai $k$ yang besar bermaksud spring lebih keras.',
      '**Tenaga keupayaan kenyal** ialah luas di bawah graf $F$ melawan $x$: ==$E_P = {1}/{2}Fx = {1}/{2}kx^2$==.',
      'Spring lebih keras jika lebih pendek, diameter gegelungnya lebih kecil atau dawainya lebih tebal; jenis bahan juga mempengaruhi $k$.',
      'Dua spring serupa disusun **sesiri**: jumlah pemanjangan berganda (sistem lebih lembut). Disusun **selari**: beban dikongsi, pemanjangan menjadi separuh (sistem lebih keras).'
    ] }
  ],
  rumus: [
    ['$F = sqrt{F_1^2 + F_2^2}$', 'Daya paduan bagi dua daya yang berserenjang'],
    ['$F = ma$', '$F$ ialah daya paduan yang bertindak ke atas jisim $m$'],
    ['$R = mg ± ma$', 'Bacaan penimbang di dalam lif: + memecut ke atas, − memecut ke bawah'],
    ['$F_x = F kos θ$', 'Komponen mengufuk; $θ$ diukur dari garis ufuk'],
    ['$F_y = F sin θ$', 'Komponen menegak'],
    ['$F = kx$', 'Hukum Hooke; $k$ = pemalar spring, $x$ = pemanjangan atau pemampatan'],
    ['$E_P = {1}/{2}Fx = {1}/{2}kx^2$', 'Tenaga keupayaan kenyal']
  ],
  istilah: [
    ['Daya paduan', 'Daya tunggal yang mewakili jumlah secara vektor dua atau lebih daya yang bertindak ke atas objek.'],
    ['Leraian daya', 'Proses meleraikan satu daya kepada dua komponen yang berserenjang.'],
    ['Keseimbangan daya', 'Keadaan apabila daya-daya yang bertindak ke atas objek menghasilkan daya paduan sifar.'],
    ['Kekenyalan', 'Sifat bahan yang membolehkan objek kembali kepada bentuk dan saiz asal selepas daya dialihkan.'],
    ['Had kenyal', 'Daya maksimum yang boleh dikenakan sebelum spring tidak lagi kembali kepada panjang asalnya.'],
    ['Pemalar spring', 'Daya yang diperlukan untuk menghasilkan seunit pemanjangan spring.']
  ],
  rumusan: [
    'Daya paduan ialah hasil tambah vektor; gunakan Teorem Pythagoras bagi daya berserenjang dan lukisan berskala bagi sudut lain.',
    'Daya paduan sifar bermaksud objek pegun atau bergerak dengan halaju seragam.',
    'Satu daya boleh dileraikan kepada $F kos θ$ dan $F sin θ$; di atas satah condong, berat dileraikan kepada $W sin θ$ dan $W kos θ$.',
    'Tiga daya dalam keseimbangan membentuk segi tiga daya yang tertutup.',
    'Hukum Hooke $F = kx$ sah sehingga had kenyal; tenaga keupayaan kenyal ialah ${1}/{2}kx^2$.',
    'Susunan spring sesiri lebih lembut; susunan selari lebih keras.'
  ],
  silap: [
    'Menambah magnitud daya secara terus tanpa mengambil kira arah.',
    'Tertukar $sin$ dengan $kos$. Semak dahulu sudut itu diukur dari garis ufuk atau dari garis tegak.',
    'Menggunakan panjang spring dan bukan pemanjangan ($x$ = panjang akhir − panjang asal) dalam $F = kx$.',
    'Tidak menukar cm kepada m semasa menghitung tenaga keupayaan kenyal.'
  ],
  kuiz: [
    { q: 'Dua daya, 6 N dan 8 N, bertindak secara berserenjang pada satu objek. Berapakah magnitud daya paduan?', o: ['2 N', '10 N', '14 N', '48 N'], a: 1, e: '$F = sqrt{6^2 + 8^2} = 10 "N"$.' },
    { q: 'Dua daya, 12 N dan 5 N, bertindak pada satu titik. Nilai manakah yang mungkin bagi magnitud daya paduan?', o: ['5 N', '13 N', '18 N', '20 N'], a: 1, e: 'Daya paduan berada di antara $12 − 5 = 7 "N"$ dengan $12 + 5 = 17 "N"$. Hanya 13 N berada dalam julat ini.' },
    { q: 'Satu daya 50 N bertindak pada sudut 30° dari garis ufuk. Berapakah komponen mengufuk daya itu?', o: ['25.0 N', '28.9 N', '43.3 N', '50.0 N'], a: 2, e: '$F_x = 50 kos 30° = 43.3 "N"$.' },
    { q: 'Sebuah objek berada dalam keseimbangan daya. Pernyataan manakah yang betul?', o: ['Objek itu mesti pegun', 'Daya paduan yang bertindak ialah sifar', 'Tiada daya bertindak ke atas objek', 'Objek itu sedang memecut'], a: 1, e: 'Dalam keseimbangan daya, daya paduan ialah sifar. Objek boleh pegun atau bergerak dengan halaju seragam.' },
    { q: 'Sebuah spring dengan pemalar spring $250 "N m"^{-1}$ ditarik dengan daya 12 N. Berapakah pemanjangan spring?', o: ['2.1 cm', '4.8 cm', '20.8 cm', '48 cm'], a: 1, e: '$x = {F}/{k} = {12}/{250} = 0.048 "m" = 4.8 "cm"$.' },
    { q: 'Sebuah spring dengan $k = 200 "N m"^{-1}$ dimampatkan sebanyak 5 cm. Berapakah tenaga keupayaan kenyal yang tersimpan?', o: ['0.25 J', '0.50 J', '5.0 J', '2 500 J'], a: 0, e: '$E_P = {1}/{2}kx^2 = {1}/{2}(200)(0.05)^2 = 0.25 "J"$.' },
    { q: 'Dua spring yang serupa disusun selari dan menyokong beban yang sama seperti satu spring tunggal. Berbanding spring tunggal, pemanjangan sistem ialah', o: ['dua kali ganda', 'sama', 'separuh', 'satu perempat'], a: 2, e: 'Beban dikongsi sama rata, maka setiap spring menanggung separuh beban dan memanjang separuh.' },
    { q: 'Seorang murid berjisim 60 kg berdiri di atas penimbang di dalam lif yang memecut ke atas pada $2 "m s"^{-2}$. Berapakah bacaan penimbang?', o: ['120 N', '469 N', '589 N', '709 N'], a: 3, e: '$R = mg + ma = 60(9.81 + 2) = 709 "N"$.' }
  ],
  struktur: [
    { t: 'Sebuah kotak berjisim 20 kg diletakkan di atas satah condong licin yang bersudut 30° dengan garis ufuk.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan leraian daya?', m: 1, j: 'Proses meleraikan satu daya kepada dua komponen yang berserenjang.' },
      { q: '(b) Hitung komponen berat yang selari dengan satah condong.', m: 2, j: '$W sin θ = (20)(9.81) sin 30° = 98.1 "N"$' },
      { q: '(c) Hitung pecutan kotak menuruni satah.', m: 2, j: '$a = {F}/{m} = {98.1}/{20} = 4.91 "m s"^{-2}$' },
      { q: '(d) Hitung tindak balas normal yang bertindak ke atas kotak.', m: 2, j: '$R = W kos θ = (20)(9.81) kos 30° = 170 "N"$' }
    ] },
    { t: 'Graf $F$ melawan $x$ bagi sebuah spring ialah garis lurus yang melalui asalan. Apabila $F = 8 "N"$, pemanjangan $x = 0.04 "m"$.', b: [
      { q: '(a) Nyatakan Hukum Hooke.', m: 1, j: 'Pemanjangan spring berkadar terus dengan daya yang bertindak ke atasnya jika tidak melebihi had kenyal spring.' },
      { q: '(b) Hitung pemalar spring.', m: 2, j: '$k = {F}/{x} = {8}/{0.04} = 200 "N m"^{-1}$' },
      { q: '(c) Hitung tenaga keupayaan kenyal apabila $x = 0.04 "m"$.', m: 2, j: '$E_P = {1}/{2}Fx = {1}/{2}(8)(0.04) = 0.16 "J"$' },
      { q: '(d) Dua spring yang serupa disusun sesiri dan digantung beban 8 N. Berapakah jumlah pemanjangan?', m: 1, j: 'Setiap spring memanjang 0.04 m, maka jumlah pemanjangan ialah 0.08 m.' },
      { q: '(e) Cadangkan satu cara untuk menghasilkan spring yang lebih keras daripada bahan yang sama.', m: 1, j: 'Gunakan dawai yang lebih tebal, atau gegelung berdiameter lebih kecil, atau spring yang lebih pendek.' }
    ] }
  ]
});

BAB.push({
  id: 't5-b2', ting: 5, no: 2, tema: 'Tema 1 · Mekanik Newton', tajuk: 'Tekanan',
  intro: 'Bab ini menerangkan tekanan dalam cecair, tekanan atmosfera dan tekanan gas, diikuti tiga prinsip penting bendalir: Pascal, Archimedes dan Bernoulli.',
  sim: {
    t: 'Prinsip Archimedes: terapung atau tenggelam',
    d: 'Sebuah bongkah berisi padu $1 000 "cm"^3$ dilepaskan ke dalam cecair. Ubah ketumpatan objek dan ketumpatan cecair, kemudian bandingkan berat dengan daya apungan.',
    cuba: [
      { s: 'Tetapkan ketumpatan objek $600 "kg m"^{-3}$ dalam air. Berapa peratus isi padu objek yang tenggelam?', j: '60 %. Bagi objek terapung, pecahan isi padu yang tenggelam sama dengan nisbah ketumpatan objek kepada ketumpatan cecair.' },
      { s: 'Tambah ketumpatan objek sehingga melebihi ketumpatan cecair. Apakah yang berlaku?', j: 'Objek tenggelam kerana beratnya melebihi daya apungan maksimum, iaitu $ρVg$ apabila seluruh objek berada di dalam cecair.' },
      { s: 'Bagi objek yang terapung, tukar cecair daripada air kepada air laut. Adakah daya apungan berubah?', j: 'Tidak. Daya apungan kekal sama dengan berat objek. Objek hanya terapung lebih tinggi kerana isi padu cecair yang perlu disesarkan lebih kecil.' }
    ]
  },
  sub: [
    { n: '2.1', t: 'Tekanan Cecair', p: [
      'Tekanan dalam cecair disebabkan oleh berat turus cecair: ==$P = hρg$==, dengan $h$ = kedalaman, $ρ$ = ketumpatan cecair dan $g$ = pecutan graviti.',
      'Tekanan cecair bertambah dengan kedalaman dan ketumpatan, bertindak ke semua arah, dan **tidak bergantung** pada bentuk bekas, luas permukaan atau isi padu cecair.',
      'Titik-titik pada aras yang sama dalam cecair yang pegun mempunyai tekanan yang sama.',
      'Tekanan sebenar pada kedalaman $h$: $P = hρg + P_"atm"$.',
      'Aplikasi: dinding empangan lebih tebal di bahagian dasar, tangki air diletakkan di tempat tinggi, beg cecair intravena digantung tinggi, sifon.'
    ] },
    { n: '2.2', t: 'Tekanan Atmosfera', p: [
      '**Tekanan atmosfera** ialah tekanan yang disebabkan oleh berat lapisan udara yang bertindak ke atas permukaan Bumi.',
      'Pada aras laut, tekanan atmosfera menyokong turus merkuri setinggi 760 mm: $760 "mm Hg" ≈ 1.01 × 10^5 "Pa"$ (daripada $hρg$ dengan $ρ = 13 600 "kg m"^{-3}$).',
      'Diukur dengan barometer merkuri, barometer Fortin atau barometer Aneroid.',
      'Tekanan atmosfera berkurang dengan altitud kerana udara semakin nipis; sebab itu kabin kapal terbang perlu ditekankan dan pendaki gunung tinggi memerlukan tangki oksigen.'
    ] },
    { n: '2.3', t: 'Tekanan Gas', p: [
      'Tekanan gas dalam bekas diukur dengan **manometer** tiub-U yang berisi cecair seperti merkuri atau air.',
      'Jika aras cecair di lengan terbuka lebih tinggi sebanyak $h$: $P_"gas" = P_"atm" + hρg$. Jika lebih rendah: $P_"gas" = P_"atm" − hρg$.',
      'Dalam unit cm Hg, tekanan gas = tekanan atmosfera ± beza aras merkuri.'
    ] },
    { n: '2.4', t: 'Prinsip Pascal', p: [
      '**Prinsip Pascal**: tekanan yang dikenakan ke atas bendalir tertutup akan dipindahkan secara seragam ke semua arah dalam bendalir itu.',
      'Dalam sistem hidraulik: ==${F_1}/{A_1} = {F_2}/{A_2}$==. Daya input yang kecil pada omboh kecil menghasilkan daya output yang besar pada omboh besar.',
      'Faktor penggandaan daya ialah ${A_2}/{A_1}$. Omboh besar bergerak melalui jarak yang lebih kecil daripada omboh kecil.',
      'Cecair digunakan kerana tidak boleh dimampatkan. Gelembung udara dalam sistem mengurangkan kecekapan. Aplikasi: jek hidraulik, sistem brek hidraulik.'
    ] },
    { n: '2.5', t: 'Prinsip Archimedes', p: [
      '**Prinsip Archimedes**: objek yang direndam sebahagian atau sepenuhnya dalam bendalir mengalami daya apungan yang sama dengan berat bendalir yang disesarkan.',
      'Daya apungan: ==$F_B = ρVg$==, dengan $ρ$ = ketumpatan bendalir dan $V$ = isi padu bendalir yang disesarkan.',
      'Daya apungan wujud kerana tekanan pada permukaan bawah objek lebih besar daripada tekanan pada permukaan atas.',
      'Objek terapung apabila berat = daya apungan. Jika berat lebih besar daripada daya apungan, objek bergerak ke bawah dengan pecutan.',
      'Aplikasi: kapal dan garis Plimsoll, kapal selam (tangki balast), hidrometer, belon udara panas.'
    ] },
    { n: '2.6', t: 'Prinsip Bernoulli', p: [
      '**Prinsip Bernoulli**: apabila halaju pengaliran suatu bendalir bertambah, tekanan dalam bendalir itu berkurang.',
      '**Aerofoil**: udara mengalir lebih laju di permukaan atas sayap (tekanan rendah) dan lebih perlahan di bawah (tekanan tinggi). Perbezaan tekanan menghasilkan **daya angkat**.',
      'Sudut serang sayap turut menyumbang kepada daya angkat melalui daya tindak balas udara yang dipesongkan.',
      'Aplikasi lain: tiub Venturi, penunu Bunsen, penyembur racun serangga, spoiler kereta lumba (aerofoil songsang yang menghasilkan daya ke bawah).'
    ] }
  ],
  rumus: [
    ['$P = hρg$', 'Tekanan cecair; $h$ = kedalaman, $ρ$ = ketumpatan cecair'],
    ['$P = hρg + P_"atm"$', 'Tekanan sebenar pada kedalaman $h$'],
    ['$P_"gas" = P_"atm" ± hρg$', 'Manometer; + jika aras di lengan terbuka lebih tinggi'],
    ['$P = {F}/{A}$', 'Tekanan = daya ÷ luas'],
    ['${F_1}/{A_1} = {F_2}/{A_2}$', 'Prinsip Pascal dalam sistem hidraulik'],
    ['$F_B = ρVg$', 'Daya apungan; $V$ = isi padu bendalir tersesar'],
    ['$W = F_B$', 'Syarat objek terapung dalam keadaan pegun']
  ],
  istilah: [
    ['Tekanan atmosfera', 'Tekanan yang disebabkan oleh berat lapisan udara yang bertindak ke atas permukaan Bumi.'],
    ['Prinsip Pascal', 'Tekanan yang dikenakan ke atas bendalir tertutup dipindahkan secara seragam ke semua arah dalam bendalir itu.'],
    ['Daya apungan', 'Daya ke atas yang bertindak pada objek yang direndam dalam bendalir, akibat perbezaan tekanan antara permukaan bawah dengan permukaan atas objek.'],
    ['Prinsip Archimedes', 'Objek yang direndam sebahagian atau sepenuhnya dalam bendalir mengalami daya apungan yang sama dengan berat bendalir yang disesarkan.'],
    ['Prinsip Bernoulli', 'Apabila halaju pengaliran bendalir bertambah, tekanan dalam bendalir berkurang.'],
    ['Daya angkat', 'Daya paduan ke atas yang terhasil daripada perbezaan tekanan antara permukaan bawah dengan permukaan atas aerofoil.']
  ],
  rumusan: [
    'Tekanan cecair $P = hρg$ bergantung pada kedalaman, ketumpatan dan $g$ sahaja, bukan pada bentuk bekas.',
    'Tekanan atmosfera pada aras laut ialah 760 mm Hg dan berkurang dengan altitud.',
    'Manometer membandingkan tekanan gas dengan tekanan atmosfera.',
    'Prinsip Pascal membolehkan sistem hidraulik menggandakan daya: ${F_1}/{A_1} = {F_2}/{A_2}$.',
    'Daya apungan sama dengan berat bendalir tersesar, $F_B = ρVg$; objek terapung apabila berat = daya apungan.',
    'Menurut Prinsip Bernoulli, kawasan halaju bendalir tinggi ialah kawasan tekanan rendah.'
  ],
  silap: [
    'Menggunakan ketumpatan objek dalam $F_B = ρVg$. Gunakan ketumpatan bendalir dan isi padu yang tenggelam.',
    'Menganggap tekanan cecair bergantung pada bentuk bekas atau jumlah cecair.',
    'Terlupa menukar $"cm"^2$ kepada $"m"^2$ atau cm kepada m (kecuali apabila nisbah luas digunakan).',
    'Menulis “halaju tinggi menghasilkan tekanan tinggi” dalam soalan Prinsip Bernoulli.'
  ],
  kuiz: [
    { q: 'Berapakah tekanan yang disebabkan oleh air laut pada kedalaman 15 m? [$ρ = 1 030 "kg m"^{-3}$, $g = 9.81 "m s"^{-2}$]', o: ['$1.03 × 10^4 "Pa"$', '$1.52 × 10^5 "Pa"$', '$1.55 × 10^4 "Pa"$', '$2.53 × 10^5 "Pa"$'], a: 1, e: '$P = hρg = 15 × 1 030 × 9.81 = 1.52 × 10^5 "Pa"$.' },
    { q: 'Tekanan pada satu titik di dalam cecair **tidak** bergantung pada', o: ['kedalaman titik itu', 'ketumpatan cecair', 'pecutan graviti', 'bentuk bekas'], a: 3, e: '$P = hρg$ hanya mengandungi kedalaman, ketumpatan dan pecutan graviti.' },
    { q: 'Sebuah barometer merkuri menunjukkan bacaan 760 mm Hg. Berapakah tekanan atmosfera dalam pascal? [$ρ_"merkuri" = 13 600 "kg m"^{-3}$]', o: ['$7.60 × 10^4 "Pa"$', '$1.01 × 10^5 "Pa"$', '$1.03 × 10^6 "Pa"$', '$1.34 × 10^5 "Pa"$'], a: 1, e: '$P = hρg = 0.760 × 13 600 × 9.81 = 1.01 × 10^5 "Pa"$.' },
    { q: 'Dalam satu sistem hidraulik, daya 50 N dikenakan pada omboh kecil berluas $2 "cm"^2$. Luas omboh besar ialah $40 "cm"^2$. Berapakah daya pada omboh besar?', o: ['2.5 N', '100 N', '1 000 N', '4 000 N'], a: 2, e: '$F_2 = F_1 × {A_2}/{A_1} = 50 × {40}/{2} = 1 000 "N"$.' },
    { q: 'Sebuah objek berisi padu $2.0 × 10^{-3} "m"^3$ direndam sepenuhnya di dalam air. Berapakah daya apungan yang bertindak ke atasnya?', o: ['2.0 N', '9.81 N', '19.6 N', '196 N'], a: 2, e: '$F_B = ρVg = 1 000 × 2.0 × 10^{-3} × 9.81 = 19.6 "N"$.' },
    { q: 'Sebuah kapal terapung pegun di permukaan laut. Pernyataan manakah yang betul?', o: ['Berat kapal lebih kecil daripada daya apungan', 'Berat kapal sama dengan berat air laut yang disesarkan', 'Ketumpatan kapal sama dengan ketumpatan besi', 'Daya apungan ialah sifar'], a: 1, e: 'Objek terapung: berat = daya apungan = berat bendalir yang disesarkan.' },
    { q: 'Daya angkat pada sayap kapal terbang terhasil kerana', o: ['udara di atas sayap bergerak lebih perlahan dan bertekanan tinggi', 'udara di atas sayap bergerak lebih laju dan bertekanan rendah', 'ketumpatan udara di bawah sayap lebih rendah', 'sayap menyesarkan udara seberat kapal terbang'], a: 1, e: 'Menurut Prinsip Bernoulli, halaju udara yang tinggi di atas sayap menghasilkan tekanan rendah; tekanan yang lebih tinggi di bawah sayap menolak sayap ke atas.' },
    { q: 'Sebuah manometer merkuri disambungkan kepada bekalan gas. Aras merkuri di lengan terbuka lebih tinggi 20 cm daripada aras di lengan yang bersambung dengan gas. Jika tekanan atmosfera ialah 76 cm Hg, berapakah tekanan gas?', o: ['20 cm Hg', '56 cm Hg', '76 cm Hg', '96 cm Hg'], a: 3, e: 'Tekanan gas lebih tinggi daripada tekanan atmosfera: $76 + 20 = 96 "cm Hg"$.' }
  ],
  struktur: [
    { t: 'Sebuah jek hidraulik mempunyai omboh kecil berluas keratan rentas $5 "cm"^2$ dan omboh besar berluas keratan rentas $200 "cm"^2$. Daya 60 N dikenakan pada omboh kecil.', b: [
      { q: '(a) Nyatakan Prinsip Pascal.', m: 1, j: 'Tekanan yang dikenakan ke atas bendalir tertutup dipindahkan secara seragam ke semua arah dalam bendalir itu.' },
      { q: '(b) Hitung tekanan yang dikenakan pada minyak hidraulik.', m: 2, j: '$P = {F_1}/{A_1} = {60}/{5} = 12 "N cm"^{-2}$ (bersamaan $1.2 × 10^5 "Pa"$)' },
      { q: '(c) Hitung daya yang terhasil pada omboh besar.', m: 2, j: '$F_2 = P × A_2 = 12 × 200 = 2 400 "N"$' },
      { q: '(d) Hitung jisim maksimum beban yang boleh diangkat.', m: 1, j: '$m = {F_2}/{g} = {2 400}/{9.81} = 245 "kg"$' },
      { q: '(e) Mengapakah minyak digunakan dan bukan udara?', m: 1, j: 'Cecair tidak boleh dimampatkan, maka tekanan dipindahkan sepenuhnya. Udara boleh dimampatkan.' }
    ] },
    { t: 'Sebuah bongkah kayu berjisim 0.60 kg dan berisi padu $8.0 × 10^{-4} "m"^3$ ditekan sehingga tenggelam sepenuhnya di dalam air, kemudian dilepaskan. [$ρ_"air" = 1 000 "kg m"^{-3}$]', b: [
      { q: '(a) Nyatakan Prinsip Archimedes.', m: 1, j: 'Objek yang direndam sebahagian atau sepenuhnya dalam bendalir mengalami daya apungan yang sama dengan berat bendalir yang disesarkan.' },
      { q: '(b) Hitung berat bongkah.', m: 1, j: '$W = mg = 0.60 × 9.81 = 5.89 "N"$' },
      { q: '(c) Hitung daya apungan apabila bongkah tenggelam sepenuhnya.', m: 2, j: '$F_B = ρVg = 1 000 × 8.0 × 10^{-4} × 9.81 = 7.85 "N"$' },
      { q: '(d) Terangkan gerakan bongkah sebaik sahaja dilepaskan.', m: 1, j: 'Daya apungan (7.85 N) lebih besar daripada berat (5.89 N), maka terdapat daya paduan ke atas dan bongkah memecut ke atas.' },
      { q: '(e) Hitung isi padu bongkah yang tenggelam apabila bongkah terapung pegun.', m: 2, j: 'Berat = daya apungan: $mg = ρVg$, maka $V = {m}/{ρ} = {0.60}/{1 000} = 6.0 × 10^{-4} "m"^3$ (75 % daripada isi padu bongkah).' }
    ] }
  ]
});

BAB.push({
  id: 't5-b3', ting: 5, no: 3, tema: 'Tema 2 · Elektrik dan Keelektromagnetan', tajuk: 'Elektrik',
  intro: 'Bab ini merangkumi arus dan beza keupayaan, rintangan, daya gerak elektrik dan rintangan dalam, serta tenaga dan kuasa elektrik.',
  sim: {
    t: 'Sel kering dengan rintangan dalam',
    d: 'Sebuah sel dengan d.g.e. $ε$ dan rintangan dalam $r$ disambungkan kepada perintang luar $R$. Ubah ketiga-tiga nilai dan perhatikan titik operasi bergerak pada graf $V$ melawan $I$.',
    cuba: [
      { s: 'Kurangkan rintangan luar $R$. Apakah yang berlaku kepada arus dan voltan terminal?', j: 'Arus bertambah, voltan hilang $Ir$ bertambah, maka voltan terminal $V = ε − Ir$ berkurang.' },
      { s: 'Tetapkan $r = 0$. Bagaimanakah rupa graf $V$ melawan $I$?', j: 'Garis mengufuk: voltan terminal sentiasa sama dengan d.g.e. kerana tiada voltan hilang.' },
      { s: 'Apakah maksud pintasan pada paksi $V$ dan kecerunan graf?', j: 'Pintasan pada paksi $V$ ialah d.g.e. sel (apabila $I = 0$). Kecerunan graf ialah $−r$.' }
    ]
  },
  sub: [
    { n: '3.1', t: 'Arus dan Beza Keupayaan', p: [
      '**Medan elektrik** ialah kawasan di sekitar zarah bercas di mana sebarang cas elektrik yang berada di dalamnya mengalami daya elektrik.',
      'Kekuatan medan elektrik: $E = {F}/{q}$. Di antara dua plat selari: $E = {V}/{d}$.',
      '**Arus**, $I$ ialah kadar pengaliran cas: ==$I = {Q}/{t}$==. Cas dibawa oleh elektron: $Q = ne$ dengan $e = 1.60 × 10^{-19} "C"$.',
      '**Beza keupayaan**, $V$ ialah kerja yang dilakukan untuk menggerakkan satu coulomb cas di antara dua titik: ==$V = {W}/{Q}$==.'
    ] },
    { n: '3.2', t: 'Rintangan', p: [
      '**Hukum Ohm**: beza keupayaan merentasi konduktor berkadar terus dengan arus yang mengalir melaluinya jika suhu dan keadaan fizikal malar: ==$V = IR$==.',
      'Konduktor ohm menghasilkan graf $V$ melawan $I$ berbentuk garis lurus melalui asalan. Mentol filamen ialah konduktor bukan ohm kerana rintangannya bertambah apabila suhu meningkat.',
      'Rintangan dawai: ==$R = {ρl}/{A}$==, dengan $ρ$ = kerintangan, $l$ = panjang dan $A$ = luas keratan rentas. Rintangan juga bergantung pada suhu.',
      'Litar sesiri: arus sama, $R = R_1 + R_2 + R_3$. Litar selari: beza keupayaan sama, ${1}/{R} = {1}/{R_1} + {1}/{R_2} + {1}/{R_3}$.',
      'Unsur pemanas diperbuat daripada nikrom kerana kerintangannya tinggi; dawai penyambung diperbuat daripada kuprum kerana kerintangannya rendah.'
    ] },
    { n: '3.3', t: 'Daya Gerak Elektrik dan Rintangan Dalam', p: [
      '**Daya gerak elektrik (d.g.e.)**, $ε$ ialah tenaga yang dibekalkan atau kerja yang dilakukan oleh sumber tenaga elektrik untuk menggerakkan satu coulomb cas dalam satu litar lengkap.',
      'D.g.e. dibaca oleh voltmeter apabila litar terbuka (tiada arus). Apabila arus mengalir, bacaan voltmeter merentasi terminal lebih kecil daripada d.g.e.',
      '**Rintangan dalam**, $r$ ialah rintangan disebabkan oleh bahan elektrolit di dalam sel. Ia menyebabkan voltan hilang sebanyak $Ir$.',
      'Persamaan litar: ==$ε = V + Ir = I(R + r)$==.',
      'Graf $V$ melawan $I$: pintasan pada paksi $V$ ialah $ε$ dan kecerunan ialah $−r$.',
      'Sel disusun sesiri: d.g.e. dan rintangan dalam bertambah. Sel serupa disusun selari: d.g.e. sama, rintangan dalam berkesan berkurang.'
    ] },
    { n: '3.4', t: 'Tenaga dan Kuasa Elektrik', p: [
      'Tenaga elektrik: $E = VQ = VIt$. Kuasa elektrik ialah kadar penggunaan tenaga: ==$P = VI = I^2R = {V^2}/{R}$==.',
      'Label “240 V, 1 000 W” bermaksud perkakas itu menggunakan 1 000 J tenaga elektrik sesaat apabila disambungkan kepada bekalan 240 V.',
      'Kos penggunaan: tenaga (kWj) = kuasa (kW) × masa (j); kos = bilangan unit × tarif. 1 unit = 1 kWj.',
      'Fius dipilih dengan kadaran sedikit lebih tinggi daripada arus kerja perkakas. Perkakas cekap tenaga (contohnya lampu LED) mengurangkan kos dan pembaziran.'
    ] }
  ],
  rumus: [
    ['$I = {Q}/{t}$', 'Arus = cas ÷ masa'],
    ['$Q = ne$', '$n$ = bilangan elektron, $e = 1.60 × 10^{-19} "C"$'],
    ['$V = {W}/{Q}$', 'Beza keupayaan = kerja ÷ cas'],
    ['$V = IR$', 'Hukum Ohm'],
    ['$R = {ρl}/{A}$', '$ρ$ = kerintangan (Ω m), $l$ = panjang, $A$ = luas keratan rentas'],
    ['$R = R_1 + R_2$', 'Rintangan berkesan litar sesiri'],
    ['${1}/{R} = {1}/{R_1} + {1}/{R_2}$', 'Rintangan berkesan litar selari'],
    ['$ε = V + Ir$', 'D.g.e. = voltan terminal + voltan hilang'],
    ['$P = VI = I^2R = {V^2}/{R}$', 'Kuasa elektrik'],
    ['$E = Pt = VIt$', 'Tenaga elektrik; dalam kWj jika $P$ dalam kW dan $t$ dalam jam']
  ],
  istilah: [
    ['Arus', 'Kadar pengaliran cas dalam suatu konduktor.'],
    ['Beza keupayaan', 'Kerja yang dilakukan untuk menggerakkan satu coulomb cas di antara dua titik.'],
    ['Rintangan', 'Nisbah beza keupayaan merentasi konduktor kepada arus yang mengalir melaluinya.'],
    ['Kerintangan', 'Ukuran keupayaan sesuatu bahan konduktor untuk menentang pengaliran arus elektrik; unit Ω m.'],
    ['Daya gerak elektrik', 'Tenaga yang dibekalkan atau kerja yang dilakukan oleh sumber tenaga elektrik untuk menggerakkan satu coulomb cas dalam satu litar lengkap.'],
    ['Rintangan dalam', 'Rintangan yang disebabkan oleh bahan elektrolit di dalam sel kering.'],
    ['Kuasa elektrik', 'Kadar penggunaan tenaga elektrik.']
  ],
  rumusan: [
    'Arus ialah kadar pengaliran cas; beza keupayaan ialah kerja per unit cas.',
    'Konduktor ohm mematuhi $V = IR$; rintangan dawai bergantung pada panjang, luas keratan rentas, kerintangan dan suhu.',
    'Sesiri: arus sama dan rintangan ditambah. Selari: voltan sama dan rintangan berkesan berkurang.',
    'D.g.e. lebih besar daripada voltan terminal kerana voltan hilang pada rintangan dalam: $ε = V + Ir$.',
    'Kuasa $P = VI$ dan tenaga $E = Pt$; kos elektrik dihitung dalam unit kWj.'
  ],
  silap: [
    'Tertukar rumus sesiri dengan selari, atau terlupa menyongsangkan ${1}/{R}$ pada langkah akhir.',
    'Menganggap d.g.e. sama dengan bacaan voltmeter apabila arus mengalir. Bacaan itu ialah voltan terminal.',
    'Menggunakan watt dan saat semasa menghitung kos. Tukar kepada kW dan jam.',
    'Mengambil kecerunan graf $V$–$I$ sel sebagai $r$. Kecerunan ialah $−r$, maka $r$ = magnitud kecerunan.'
  ],
  kuiz: [
    { q: 'Arus 0.5 A mengalir melalui sebuah mentol selama 4 minit. Berapakah jumlah cas yang mengalir?', o: ['2 C', '8 C', '120 C', '480 C'], a: 2, e: '$Q = It = 0.5 × (4 × 60) = 120 "C"$.' },
    { q: 'Sebanyak 36 J kerja dilakukan untuk menggerakkan 6 C cas merentasi sebuah perintang. Berapakah beza keupayaan merentasi perintang itu?', o: ['0.17 V', '6 V', '30 V', '216 V'], a: 1, e: '$V = {W}/{Q} = {36}/{6} = 6 "V"$.' },
    { q: 'Dawai X dan dawai Y diperbuat daripada bahan yang sama. Dawai Y dua kali lebih panjang dan luas keratan rentasnya dua kali lebih besar daripada dawai X. Rintangan dawai Y ialah', o: ['separuh rintangan X', 'sama dengan rintangan X', 'dua kali rintangan X', 'empat kali rintangan X'], a: 1, e: '$R = {ρl}/{A}$. Menggandakan $l$ dan $A$ serentak tidak mengubah nisbah ${l}/{A}$.' },
    { q: 'Perintang 6 Ω dan 3 Ω disambung secara selari. Berapakah rintangan berkesan?', o: ['2 Ω', '4.5 Ω', '9 Ω', '18 Ω'], a: 0, e: '${1}/{R} = {1}/{6} + {1}/{3} = {1}/{2}$, maka $R = 2 "Ω"$.' },
    { q: 'Sebuah sel dengan d.g.e. 6.0 V dan rintangan dalam 0.5 Ω disambungkan kepada perintang 2.5 Ω. Berapakah voltan terminal sel itu?', o: ['1.0 V', '2.0 V', '5.0 V', '6.0 V'], a: 2, e: '$I = {ε}/{R + r} = {6.0}/{3.0} = 2.0 "A"$. $V = IR = 2.0 × 2.5 = 5.0 "V"$.' },
    { q: 'Graf $V$ melawan $I$ bagi sebuah sel kering ialah garis lurus berkecerunan negatif. Apakah yang diwakili oleh pintasan pada paksi $V$?', o: ['Rintangan dalam', 'Daya gerak elektrik', 'Voltan hilang', 'Kuasa sel'], a: 1, e: 'Apabila $I = 0$, $V = ε$. Kecerunan graf pula ialah $−r$.' },
    { q: 'Sebuah penyaman udara 1.5 kW digunakan 8 jam sehari selama 30 hari. Jika tarif ialah RM0.30 seunit, berapakah kos penggunaannya?', o: ['RM3.60', 'RM36.00', 'RM108.00', 'RM360.00'], a: 2, e: 'Tenaga $= 1.5 × 8 × 30 = 360 "kWj"$. Kos $= 360 × 0.30 = "RM"108.00$.' },
    { q: 'Sebuah mentol berlabel 240 V mempunyai rintangan 960 Ω semasa menyala. Berapakah kuasanya?', o: ['4 W', '60 W', '240 W', '960 W'], a: 1, e: '$P = {V^2}/{R} = {240^2}/{960} = 60 "W"$.' }
  ],
  struktur: [
    { t: 'Sebuah bateri dengan d.g.e. 9.0 V dan rintangan dalam 1.0 Ω disambungkan kepada perintang 4.0 Ω yang sesiri dengan gabungan selari perintang 6.0 Ω dan 3.0 Ω.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan daya gerak elektrik?', m: 1, j: 'Tenaga yang dibekalkan atau kerja yang dilakukan oleh sumber tenaga elektrik untuk menggerakkan satu coulomb cas dalam satu litar lengkap.' },
      { q: '(b) Hitung rintangan berkesan litar luar.', m: 2, j: 'Selari: ${1}/{R} = {1}/{6.0} + {1}/{3.0}$, maka $R = 2.0 "Ω"$. Jumlah $= 4.0 + 2.0 = 6.0 "Ω"$.' },
      { q: '(c) Hitung arus yang mengalir daripada bateri.', m: 2, j: '$I = {ε}/{R + r} = {9.0}/{6.0 + 1.0} = 1.29 "A"$' },
      { q: '(d) Hitung beza keupayaan merentasi terminal bateri.', m: 2, j: '$V = ε − Ir = 9.0 − (1.29)(1.0) = 7.71 "V"$' },
      { q: '(e) Mengapakah nilai di (d) lebih kecil daripada d.g.e.?', m: 1, j: 'Sebahagian tenaga digunakan untuk menggerakkan cas melalui rintangan dalam bateri (voltan hilang, $Ir$).' }
    ] },
    { t: 'Sebuah cerek elektrik berlabel “240 V, 2 000 W”.', b: [
      { q: '(a) Apakah maksud label itu?', m: 1, j: 'Cerek menggunakan 2 000 J tenaga elektrik sesaat apabila disambungkan kepada bekalan 240 V.' },
      { q: '(b) Hitung arus yang mengalir melalui cerek semasa digunakan.', m: 2, j: '$I = {P}/{V} = {2 000}/{240} = 8.33 "A"$' },
      { q: '(c) Fius 5 A, 10 A dan 13 A disediakan. Pilih fius yang paling sesuai dan beri sebab.', m: 2, j: 'Fius 10 A, kerana kadarannya sedikit lebih tinggi daripada arus kerja 8.33 A. Fius 5 A akan terbakar dalam penggunaan biasa.' },
      { q: '(d) Hitung rintangan unsur pemanas.', m: 2, j: '$R = {V^2}/{P} = {240^2}/{2 000} = 28.8 "Ω"$' },
      { q: '(e) Cerek digunakan 30 minit sehari selama 30 hari. Hitung kos pada tarif RM0.30 seunit.', m: 2, j: 'Tenaga $= 2 "kW" × 0.5 "j" × 30 = 30 "kWj"$. Kos $= 30 × 0.30 = "RM"9.00$.' }
    ] }
  ]
});

BAB.push({
  id: 't5-b4', ting: 5, no: 4, tema: 'Tema 2 · Elektrik dan Keelektromagnetan', tajuk: 'Keelektromagnetan',
  intro: 'Arus elektrik dan medan magnet saling berkait. Bab ini menerangkan daya ke atas konduktor pembawa arus, aruhan elektromagnet dan transformer.',
  sim: {
    t: 'Transformer: nisbah lilitan dan voltan',
    d: 'Ubah voltan primer, bilangan lilitan kedua-dua gegelung dan rintangan beban. Bandingkan amplitud gelombang voltan input dengan output, serta arus dalam kedua-dua gegelung bagi transformer unggul.',
    cuba: [
      { s: 'Tetapkan $N_P = 2000$, $N_S = 100$ dan $V_P = 240 "V"$. Berapakah $V_S$ dan apakah jenis transformer ini?', j: '12 V. Ini transformer injak turun kerana $N_S < N_P$.' },
      { s: 'Jadikan $N_S$ lebih besar daripada $N_P$. Bandingkan arus primer dengan arus sekunder.', j: 'Voltan dinaikkan (injak naik) tetapi arus sekunder lebih kecil daripada arus primer, kerana bagi transformer unggul $V_PI_P = V_SI_S$.' },
      { s: 'Mengapakah transformer tidak berfungsi dengan arus terus?', j: 'Arus terus yang mantap menghasilkan medan magnet yang tidak berubah. Tanpa perubahan fluks magnet, tiada d.g.e. diaruhkan dalam gegelung sekunder.' }
    ]
  },
  sub: [
    { n: '4.1', t: 'Daya ke atas Konduktor Pembawa Arus dalam Medan Magnet', p: [
      'Konduktor pembawa arus di dalam medan magnet mengalami daya. Daya ini terhasil daripada **medan lastik**, iaitu medan magnet paduan antara medan arus dengan medan magnet kekal.',
      'Arah daya ditentukan dengan **Petua Tangan Kiri Fleming**: ibu jari = daya (gerakan), jari telunjuk = medan magnet, jari tengah = arus.',
      'Magnitud daya bertambah apabila arus ditambah atau medan magnet yang lebih kuat digunakan.',
      'Gegelung pembawa arus di dalam medan magnet mengalami sepasang daya yang menghasilkan **kesan putaran**; inilah prinsip motor arus terus.',
      'Dalam motor arus terus, **komutator** menyongsangkan arah arus dalam gegelung setiap separuh putaran supaya gegelung terus berputar pada arah yang sama. Berus karbon menyambungkan komutator dengan litar luar.',
      'Laju putaran motor bertambah dengan arus, bilangan lilitan gegelung dan kekuatan medan magnet. Motor tanpa berus lebih senyap dan kos penyelenggaraannya lebih rendah.'
    ] },
    { n: '4.2', t: 'Aruhan Elektromagnet', p: [
      '**Aruhan elektromagnet** ialah penghasilan d.g.e. aruhan merentasi konduktor apabila terdapat gerakan relatif antara konduktor dengan medan magnet, atau apabila konduktor berada dalam medan magnet yang berubah.',
      '**Hukum Faraday**: magnitud d.g.e. aruhan berkadar terus dengan kadar pemotongan fluks magnet.',
      '**Hukum Lenz**: arus aruhan sentiasa mengalir pada arah yang menentang perubahan fluks magnet yang menghasilkannya.',
      'Arah arus aruhan dalam dawai lurus ditentukan dengan **Petua Tangan Kanan Fleming**. Bagi solenoid, kekutuban hujung solenoid ditentukan dengan Hukum Lenz.',
      'D.g.e. aruhan bertambah apabila magnet digerakkan lebih laju, bilangan lilitan ditambah atau magnet yang lebih kuat digunakan.',
      'Penjana arus terus menggunakan komutator; penjana arus ulang-alik menggunakan gelang gelincir.'
    ] },
    { n: '4.3', t: 'Transformer', p: [
      'Transformer mengubah voltan arus ulang-alik. Arus ulang-alik dalam gegelung primer menghasilkan medan magnet yang berubah-ubah; teras besi lembut memautkan fluks ini kepada gegelung sekunder dan mengaruhkan d.g.e. di dalamnya.',
      'Nisbah voltan: ==${V_S}/{V_P} = {N_S}/{N_P}$==. **Injak naik**: $N_S > N_P$. **Injak turun**: $N_S < N_P$.',
      'Transformer unggul (kecekapan 100 %): $V_PI_P = V_SI_S$.',
      'Kecekapan: $η = {V_SI_S}/{V_PI_P} × 100 "%"$.',
      'Punca kehilangan tenaga dan cara mengatasinya: rintangan gegelung (dawai kuprum tebal), arus pusar (teras berlamina), histeresis (teras besi lembut), kebocoran fluks (gegelung sekunder dililit di atas gegelung primer).',
      'Tenaga elektrik dihantar pada voltan tinggi supaya arus dalam kabel kecil dan kehilangan kuasa $P = I^2R$ berkurang. Arus pusar juga dimanfaatkan dalam dapur aruhan.'
    ] }
  ],
  rumus: [
    ['${V_S}/{V_P} = {N_S}/{N_P}$', 'Nisbah voltan sama dengan nisbah bilangan lilitan'],
    ['$V_PI_P = V_SI_S$', 'Transformer unggul: kuasa input = kuasa output'],
    ['$η = {V_SI_S}/{V_PI_P} × 100 "%"$', 'Kecekapan transformer'],
    ['$P = I^2R$', 'Kehilangan kuasa dalam kabel penghantaran berintangan $R$']
  ],
  istilah: [
    ['Medan lastik', 'Medan magnet paduan yang terhasil daripada interaksi antara medan magnet konduktor pembawa arus dengan medan magnet kekal.'],
    ['Aruhan elektromagnet', 'Penghasilan d.g.e. aruhan merentasi konduktor apabila terdapat gerakan relatif antara konduktor dengan medan magnet.'],
    ['Hukum Faraday', 'Magnitud d.g.e. aruhan berkadar terus dengan kadar pemotongan fluks magnet.'],
    ['Hukum Lenz', 'Arus aruhan sentiasa mengalir pada arah yang menentang perubahan fluks magnet yang menghasilkannya.'],
    ['Arus pusar', 'Arus aruhan yang beredar di dalam teras besi akibat fluks magnet yang berubah-ubah, dan memanaskan teras.'],
    ['Transformer unggul', 'Transformer yang tidak mengalami kehilangan tenaga; kecekapannya 100 %.']
  ],
  rumusan: [
    'Konduktor pembawa arus dalam medan magnet mengalami daya; arahnya ditentukan dengan Petua Tangan Kiri Fleming.',
    'Motor arus terus menukarkan tenaga elektrik kepada tenaga kinetik; komutator mengekalkan arah putaran.',
    'Gerakan relatif antara konduktor dengan medan magnet mengaruhkan d.g.e.; magnitudnya mengikut Hukum Faraday dan arahnya mengikut Hukum Lenz.',
    'Transformer hanya berfungsi dengan arus ulang-alik dan mematuhi ${V_S}/{V_P} = {N_S}/{N_P}$.',
    'Kehilangan tenaga dalam transformer dikurangkan dengan dawai kuprum tebal, teras berlamina dan teras besi lembut.',
    'Penghantaran pada voltan tinggi mengurangkan arus dan kehilangan kuasa dalam kabel.'
  ],
  silap: [
    'Tertukar tangan: tangan kiri untuk motor (daya), tangan kanan untuk penjana (arus aruhan).',
    'Menyongsangkan nisbah lilitan. Semak dengan logik: lebih banyak lilitan sekunder bermaksud voltan sekunder lebih tinggi.',
    'Menyatakan transformer injak naik “menambah kuasa”. Kuasa output tidak boleh melebihi kuasa input.',
    'Menulis “teras berlamina mengurangkan rintangan”. Teras berlamina mengurangkan arus pusar.'
  ],
  kuiz: [
    { q: 'Dalam Petua Tangan Kiri Fleming, ibu jari mewakili', o: ['arah arus', 'arah medan magnet', 'arah daya', 'arah d.g.e. aruhan'], a: 2, e: 'Ibu jari = daya (gerakan), jari telunjuk = medan magnet, jari tengah = arus.' },
    { q: 'Apakah fungsi komutator dalam motor arus terus?', o: ['Menambah kekuatan medan magnet', 'Menyongsangkan arah arus dalam gegelung setiap separuh putaran', 'Mengurangkan geseran', 'Menukarkan arus terus kepada arus ulang-alik dalam litar luar'], a: 1, e: 'Dengan menyongsangkan arus setiap separuh putaran, daya putaran sentiasa bertindak pada arah yang sama.' },
    { q: 'Kutub utara sebuah magnet bar digerakkan ke arah satu hujung solenoid. Apakah kutub yang terbentuk pada hujung solenoid itu?', o: ['Kutub utara, untuk menolak magnet', 'Kutub selatan, untuk menarik magnet', 'Tiada kutub terbentuk', 'Kutub berubah-ubah secara rawak'], a: 0, e: 'Menurut Hukum Lenz, arus aruhan menentang perubahan yang menghasilkannya, maka hujung itu menjadi kutub utara untuk menolak magnet yang mendekat.' },
    { q: 'Tindakan manakah yang **tidak** menambah d.g.e. aruhan dalam solenoid?', o: ['Menggerakkan magnet dengan lebih laju', 'Menambah bilangan lilitan solenoid', 'Menggunakan magnet yang lebih kuat', 'Membiarkan magnet pegun di dalam solenoid'], a: 3, e: 'Tanpa gerakan relatif, tiada pemotongan fluks magnet dan tiada d.g.e. aruhan.' },
    { q: 'Sebuah transformer mempunyai 1 200 lilitan primer dan 60 lilitan sekunder. Jika voltan primer ialah 240 V, berapakah voltan sekunder?', o: ['4.8 V', '12 V', '20 V', '4 800 V'], a: 1, e: '$V_S = V_P × {N_S}/{N_P} = 240 × {60}/{1 200} = 12 "V"$.' },
    { q: 'Sebuah transformer unggul menurunkan voltan daripada 240 V kepada 12 V. Jika arus sekunder ialah 4 A, berapakah arus primer?', o: ['0.2 A', '0.8 A', '4 A', '80 A'], a: 0, e: '$I_P = {V_SI_S}/{V_P} = {12 × 4}/{240} = 0.2 "A"$.' },
    { q: 'Input sebuah transformer ialah 240 V, 0.25 A dan outputnya 12 V, 4.5 A. Berapakah kecekapannya?', o: ['75 %', '80 %', '90 %', '111 %'], a: 2, e: '$η = {12 × 4.5}/{240 × 0.25} × 100 "%" = {54}/{60} × 100 "%" = 90 "%"$.' },
    { q: 'Teras transformer dibina daripada kepingan besi lembut berlamina untuk', o: ['mengurangkan rintangan gegelung', 'mengurangkan arus pusar', 'menambah bilangan lilitan', 'menukarkan arus ulang-alik kepada arus terus'], a: 1, e: 'Lapisan penebat antara lamina mengehadkan arus pusar, maka mengurangkan pemanasan teras.' }
  ],
  struktur: [
    { t: 'Sebuah transformer disambungkan kepada bekalan 240 V a.u. untuk menyalakan sebuah mentol 12 V, 36 W pada kecerahan normal. Gegelung primer mempunyai 2 000 lilitan.', b: [
      { q: '(a) Nyatakan jenis transformer ini.', m: 1, j: 'Transformer injak turun.' },
      { q: '(b) Hitung bilangan lilitan gegelung sekunder.', m: 2, j: '$N_S = N_P × {V_S}/{V_P} = 2 000 × {12}/{240} = 100$ lilitan' },
      { q: '(c) Kecekapan transformer ialah 90 %. Hitung arus dalam gegelung primer.', m: 3, j: 'Kuasa input $= {36}/{0.90} = 40 "W"$. $I_P = {40}/{240} = 0.167 "A"$' },
      { q: '(d) Nyatakan dua punca kehilangan tenaga dalam transformer dan cara mengurangkannya.', m: 2, j: 'Mana-mana dua: rintangan gegelung (guna dawai kuprum tebal); arus pusar dalam teras (guna teras berlamina); histeresis (guna teras besi lembut); kebocoran fluks (lilit gegelung sekunder di atas gegelung primer).' },
      { q: '(e) Mengapakah transformer tidak berfungsi dengan bekalan arus terus?', m: 1, j: 'Arus terus menghasilkan medan magnet yang malar; tiada perubahan fluks magnet, maka tiada d.g.e. diaruhkan dalam gegelung sekunder.' }
    ] },
    { t: 'Sebatang magnet bar dijatuhkan melalui sebuah solenoid yang disambungkan kepada galvanometer berpusat sifar.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan aruhan elektromagnet?', m: 1, j: 'Penghasilan d.g.e. aruhan merentasi konduktor apabila terdapat gerakan relatif antara konduktor dengan medan magnet.' },
      { q: '(b) Nyatakan Hukum Faraday.', m: 1, j: 'Magnitud d.g.e. aruhan berkadar terus dengan kadar pemotongan fluks magnet.' },
      { q: '(c) Terangkan mengapa penunjuk galvanometer terpesong pada satu arah semasa magnet memasuki solenoid dan pada arah bertentangan semasa magnet keluar.', m: 3, j: 'Semasa magnet masuk, fluks magnet yang memaut solenoid bertambah; arus aruhan mengalir pada arah yang menentang pertambahan itu (Hukum Lenz). Semasa magnet keluar, fluks berkurang, maka arus aruhan mengalir pada arah bertentangan untuk menentang pengurangan itu.' },
      { q: '(d) Nyatakan dua cara untuk menambah pesongan galvanometer.', m: 2, j: 'Mana-mana dua: jatuhkan magnet dari kedudukan lebih tinggi (lebih laju); tambah bilangan lilitan solenoid; gunakan magnet yang lebih kuat.' }
    ] }
  ]
});

BAB.push({
  id: 't5-b5', ting: 5, no: 5, tema: 'Tema 3 · Fizik Gunaan', tajuk: 'Elektronik',
  intro: 'Bab ini memperkenalkan sinar katod, diod semikonduktor dan transistor, iaitu komponen asas dalam semua peranti elektronik moden.',
  sim: {
    t: 'Rektifikasi: daripada arus ulang-alik kepada arus terus',
    d: 'Pilih rektifikasi gelombang separuh atau gelombang penuh dan sambungkan kapasitor perata. Bandingkan bentuk gelombang voltan input dengan voltan output merentasi beban, seperti pada skrin osiloskop.',
    cuba: [
      { s: 'Pilih rektifikasi gelombang separuh tanpa kapasitor. Mengapakah separuh kitar negatif hilang?', j: 'Semasa separuh kitar negatif, diod berada dalam keadaan pincang songsang dan tidak membenarkan arus mengalir.' },
      { s: 'Tukar kepada rektifikasi gelombang penuh. Apakah bezanya?', j: 'Kedua-dua separuh kitar menghasilkan arus pada arah yang sama melalui beban, kerana dua daripada empat diod mengalirkan arus pada setiap separuh kitar.' },
      { s: 'Sambungkan kapasitor dan tambah kapasitans. Apakah yang berlaku kepada output?', j: 'Output menjadi lebih licin. Kapasitor dicas apabila voltan meningkat dan menyahcas melalui beban apabila voltan menurun; kapasitans yang lebih besar menyahcas dengan lebih perlahan.' }
    ]
  },
  sub: [
    { n: '5.1', t: 'Elektron', p: [
      '**Pancaran termion** ialah pemancaran elektron bebas daripada permukaan logam yang dipanaskan.',
      '**Sinar katod** ialah alur elektron berhalaju tinggi di dalam tiub vakum. Vakum diperlukan supaya elektron tidak berlanggar dengan molekul udara.',
      'Ciri sinar katod: bercas negatif, bergerak lurus, mempunyai momentum dan tenaga kinetik, dipesongkan oleh medan elektrik (ke arah plat positif) dan oleh medan magnet.',
      'Elektron dipecutkan oleh beza keupayaan $V$ antara katod dengan anod. Tenaga keupayaan elektrik bertukar kepada tenaga kinetik: ==$eV = {1}/{2}mv_{maks}^2$==.',
      'Maka $v_{maks} = sqrt{{2eV}/{m}}$. Menggandakan $V$ empat kali menggandakan halaju dua kali.'
    ] },
    { n: '5.2', t: 'Diod Semikonduktor', p: [
      '**Diod semikonduktor** ialah komponen yang membenarkan arus mengalir dalam satu arah sahaja, dari anod ke katod. Ia dibina daripada simpang p-n.',
      '**Pincang depan**: anod disambungkan kepada terminal positif; rintangan diod rendah dan arus mengalir. **Pincang songsang**: sambungan diterbalikkan; rintangan sangat tinggi dan arus tidak mengalir.',
      '**Rektifikasi** ialah penukaran arus ulang-alik kepada arus terus. Rektifikasi gelombang separuh menggunakan satu diod; rektifikasi gelombang penuh menggunakan empat diod dalam susunan tetimbang.',
      '**Kapasitor** yang disambungkan selari dengan beban bertindak sebagai perata arus: dicas apabila voltan meningkat dan menyahcas apabila voltan menurun, maka output menjadi lebih licin.',
      'Diod pemancar cahaya (LED) memancarkan cahaya apabila dipincang depan.'
    ] },
    { n: '5.3', t: 'Transistor', p: [
      'Transistor mempunyai tiga terminal: **pengeluar (E)**, **tapak (B)** dan **pengumpul (C)**. Dua jenis: npn dan pnp.',
      'Arus tapak $I_B$ yang kecil mengawal arus pengumpul $I_C$ yang besar; $I_E = I_B + I_C$. Tanpa arus tapak, tiada arus pengumpul.',
      'Sebagai **amplifier arus**: perubahan kecil pada $I_B$ menghasilkan perubahan besar pada $I_C$. Faktor penggandaan arus $β = {I_C}/{I_B}$.',
      'Sebagai **suis automatik**: transistor hidup apabila voltan tapak–pengeluar mencapai voltan minimum. Voltan ini dibekalkan oleh pembahagi voltan: ==$V_"out" = {R_2}/{R_1 + R_2} × V$==.',
      '**Perintang peka cahaya (LDR)**: rintangan tinggi dalam gelap dan rendah dalam cahaya terang. **Termistor**: rintangan berkurang apabila suhu meningkat.',
      'Suis kawalan cahaya menggunakan LDR; penggera suhu atau kebakaran menggunakan termistor.'
    ] }
  ],
  rumus: [
    ['$eV = {1}/{2}mv_{maks}^2$', 'Tenaga keupayaan elektrik = tenaga kinetik maksimum elektron'],
    ['$v_{maks} = sqrt{{2eV}/{m}}$', 'Halaju maksimum elektron; $e = 1.60 × 10^{-19} "C"$, $m = 9.11 × 10^{-31} "kg"$'],
    ['$I_E = I_B + I_C$', 'Arus pengeluar = arus tapak + arus pengumpul'],
    ['$β = {I_C}/{I_B}$', 'Faktor penggandaan arus transistor'],
    ['$V_"out" = {R_2}/{R_1 + R_2} × V$', 'Pembahagi voltan; $V_"out"$ merentasi $R_2$']
  ],
  istilah: [
    ['Pancaran termion', 'Pemancaran elektron daripada permukaan logam yang dipanaskan.'],
    ['Sinar katod', 'Alur elektron berhalaju tinggi di dalam tiub vakum.'],
    ['Pincang depan', 'Sambungan diod yang membenarkan arus mengalir: anod kepada terminal positif, katod kepada terminal negatif.'],
    ['Rektifikasi', 'Proses menukarkan arus ulang-alik kepada arus terus.'],
    ['Perata arus', 'Fungsi kapasitor yang melicinkan output arus terus selepas rektifikasi.'],
    ['Pembahagi voltan', 'Susunan dua perintang sesiri yang membahagikan voltan bekalan mengikut nisbah rintangan.']
  ],
  rumusan: [
    'Elektron dibebaskan melalui pancaran termion dan dipecutkan untuk membentuk sinar katod; $eV = {1}/{2}mv_{maks}^2$.',
    'Sinar katod bercas negatif dan dipesongkan oleh medan elektrik dan medan magnet.',
    'Diod mengalirkan arus dalam satu arah sahaja dan digunakan untuk rektifikasi; kapasitor melicinkan output.',
    'Dalam transistor, arus tapak yang kecil mengawal arus pengumpul yang besar.',
    'Transistor berfungsi sebagai amplifier arus dan sebagai suis automatik bersama pembahagi voltan, LDR atau termistor.'
  ],
  silap: [
    'Menyatakan sinar katod dipesongkan ke plat negatif. Elektron bercas negatif, maka dipesongkan ke plat positif.',
    'Tertukar bilangan diod: gelombang separuh satu diod, gelombang penuh (tetimbang) empat diod.',
    'Tertukar sifat LDR. Dalam gelap rintangannya tinggi, maka voltan merentasinya tinggi.',
    'Menghitung voltan pembahagi merentasi perintang yang salah. Kenal pasti dahulu perintang yang bersambung merentasi tapak–pengeluar.'
  ],
  kuiz: [
    { q: 'Pancaran termion ialah', o: ['pemancaran elektron daripada permukaan logam yang dipanaskan', 'pemancaran elektron daripada logam yang disinari cahaya', 'pemancaran cahaya daripada skrin berpendarfluor', 'pengaliran elektron dalam konduktor'], a: 0, e: 'Haba membekalkan tenaga yang cukup kepada elektron bebas untuk terlepas dari permukaan logam.' },
    { q: 'Pernyataan manakah tentang sinar katod yang **salah**?', o: ['Bergerak dalam garis lurus', 'Bercas positif', 'Dipesongkan oleh medan magnet', 'Mempunyai tenaga kinetik'], a: 1, e: 'Sinar katod ialah alur elektron, maka bercas negatif.' },
    { q: 'Beza keupayaan yang memecutkan elektron dalam tiub sinar katod ditambah menjadi empat kali ganda. Halaju maksimum elektron menjadi', o: ['separuh', 'dua kali ganda', 'empat kali ganda', 'enam belas kali ganda'], a: 1, e: '$v = sqrt{{2eV}/{m}}$, maka $v ∝ sqrt{V}$. Empat kali $V$ menghasilkan dua kali $v$.' },
    { q: 'Sebuah diod berada dalam keadaan pincang depan apabila', o: ['anod disambungkan kepada terminal positif bekalan', 'anod disambungkan kepada terminal negatif bekalan', 'kedua-dua terminal dibumikan', 'diod disambungkan kepada arus ulang-alik'], a: 0, e: 'Dalam pincang depan, anod pada terminal positif dan katod pada terminal negatif; arus mengalir.' },
    { q: 'Berapakah bilangan diod dalam litar rektifikasi gelombang penuh jenis tetimbang?', o: ['1', '2', '4', '6'], a: 2, e: 'Litar tetimbang menggunakan empat diod; dua diod mengalirkan arus pada setiap separuh kitar.' },
    { q: 'Apakah fungsi kapasitor dalam litar rektifikasi?', o: ['Menukarkan arus terus kepada arus ulang-alik', 'Melicinkan arus output', 'Menambah voltan puncak', 'Menghalang arus daripada mengalir'], a: 1, e: 'Kapasitor menyimpan cas apabila voltan meningkat dan membekalkan arus kepada beban apabila voltan menurun.' },
    { q: 'Arus tapak sebuah transistor ialah 50 μA dan arus pengumpul ialah 5 mA. Berapakah faktor penggandaan arus?', o: ['10', '100', '250', '1 000'], a: 1, e: '$β = {I_C}/{I_B} = {5 × 10^{-3}}/{50 × 10^{-6}} = 100$.' },
    { q: 'Dua perintang, $R_1 = 10 "kΩ"$ dan $R_2 = 5 "kΩ"$, disambung sesiri kepada bekalan 6 V. Berapakah beza keupayaan merentasi $R_2$?', o: ['1.0 V', '2.0 V', '3.0 V', '4.0 V'], a: 1, e: '$V = {R_2}/{R_1 + R_2} × 6 = {5}/{15} × 6 = 2.0 "V"$.' }
  ],
  struktur: [
    { t: 'Dalam satu litar suis kawalan cahaya, perintang $R = 10 "kΩ"$ dan sebuah LDR disambung sesiri merentasi bekalan 6 V. LDR bersambung merentasi tapak–pengeluar sebuah transistor npn, dan sebuah LED berada dalam litar pengumpul.', b: [
      { q: '(a) Apakah fungsi transistor dalam litar ini?', m: 1, j: 'Sebagai suis automatik.' },
      { q: '(b) Dalam gelap, rintangan LDR ialah 40 kΩ. Hitung beza keupayaan merentasi LDR.', m: 2, j: '$V = {40}/{10 + 40} × 6 = 4.8 "V"$' },
      { q: '(c) Dalam cahaya terang, rintangan LDR ialah 1 kΩ. Hitung beza keupayaan merentasi LDR.', m: 2, j: '$V = {1}/{10 + 1} × 6 = 0.55 "V"$' },
      { q: '(d) Terangkan mengapa LED menyala dalam gelap sahaja.', m: 2, j: 'Dalam gelap, rintangan LDR tinggi, maka voltan merentasinya (voltan tapak) tinggi dan melebihi voltan minimum untuk menghidupkan transistor. Arus tapak mengalir, arus pengumpul yang besar mengalir dan LED menyala. Dalam cahaya terang, voltan tapak terlalu rendah dan transistor mati.' },
      { q: '(e) Nyatakan pengubahsuaian untuk menjadikan litar ini penggera kebakaran.', m: 2, j: 'Gantikan LED dengan penggera, perintang $R$ dengan termistor dan LDR dengan perintang. Apabila suhu meningkat, rintangan termistor berkurang, voltan tapak meningkat dan transistor dihidupkan.' }
    ] },
    { t: 'Bekalan arus ulang-alik disambungkan kepada satu diod yang sesiri dengan perintang beban.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan rektifikasi?', m: 1, j: 'Proses menukarkan arus ulang-alik kepada arus terus.' },
      { q: '(b) Huraikan bentuk gelombang output merentasi perintang beban.', m: 2, j: 'Hanya separuh kitar positif yang muncul; semasa separuh kitar negatif, voltan output ialah sifar kerana diod berada dalam pincang songsang (rektifikasi gelombang separuh).' },
      { q: '(c) Berapakah bilangan diod yang diperlukan untuk rektifikasi gelombang penuh jenis tetimbang, dan apakah kelebihannya?', m: 2, j: 'Empat diod. Kedua-dua separuh kitar digunakan, maka output lebih licin dan lebih cekap.' },
      { q: '(d) Terangkan bagaimana kapasitor melicinkan output.', m: 2, j: 'Kapasitor disambungkan selari dengan beban. Apabila voltan meningkat, kapasitor dicas dan menyimpan tenaga. Apabila voltan menurun, kapasitor menyahcas melalui beban dan mengekalkan voltan merentasinya, maka output tidak jatuh ke sifar.' }
    ] }
  ]
});

BAB.push({
  id: 't5-b6', ting: 5, no: 6, tema: 'Tema 4 · Fizik Moden', tajuk: 'Fizik Nuklear',
  intro: 'Nukleus yang tidak stabil mereput dan membebaskan sinaran. Bab ini menerangkan reputan radioaktif, separuh hayat dan tenaga nuklear daripada pembelahan dan pelakuran nukleus.',
  sim: {
    t: 'Reputan radioaktif dan separuh hayat',
    d: 'Setiap titik mewakili satu nukleus radioaktif. Titik berwarna biru belum mereput; titik kelabu telah mereput. Mainkan reputan dan bandingkan lengkung jingga (bilangan sebenar) dengan lengkung putus-putus (ramalan teori).',
    cuba: [
      { s: 'Berapakah nukleus yang tinggal selepas satu separuh hayat? Selepas dua separuh hayat?', j: 'Kira-kira 200, kemudian kira-kira 100. Separuh daripada baki mereput dalam setiap separuh hayat.' },
      { s: 'Tekan “Semula” dan ulang beberapa kali. Adakah lengkung jingga sentiasa sama?', j: 'Tidak tepat sama. Reputan radioaktif ialah proses rawak; kita tidak dapat meramalkan nukleus mana yang akan mereput, tetapi bagi bilangan nukleus yang besar coraknya mengikut lengkung teori.' },
      { s: 'Ubah separuh hayat. Apakah yang berubah?', j: 'Reputan berlaku lebih perlahan bagi separuh hayat yang lebih panjang, tetapi bentuk lengkung terhadap bilangan separuh hayat tetap sama: $N = N_0({1}/{2})^n$.' }
    ]
  },
  sub: [
    { n: '6.1', t: 'Reputan Radioaktif', p: [
      '**Reputan radioaktif** ialah proses rawak dan spontan apabila nukleus yang tidak stabil memancarkan sinaran radioaktif untuk menjadi nukleus yang lebih stabil.',
      '**Reputan alfa**: nukleus memancarkan zarah alfa (nukleus helium, $nuk{4}{2}{He}$). Nombor nukleon berkurang 4 dan nombor proton berkurang 2. Contoh: $nuk{226}{88}{Ra} → nuk{222}{86}{Rn} + nuk{4}{2}{He}$.',
      '**Reputan beta**: satu neutron bertukar menjadi satu proton dan satu elektron ($nuk{0}{−1}{e}$). Nombor nukleon tidak berubah dan nombor proton bertambah 1. Contoh: $nuk{14}{6}{C} → nuk{14}{7}{N} + nuk{0}{−1}{e}$.',
      '**Reputan gama**: nukleus dalam keadaan teruja membebaskan sinar gama (gelombang elektromagnet). Nombor nukleon dan nombor proton tidak berubah.',
      '**Separuh hayat**, $T_{{1}/{2}}$ ialah masa yang diambil untuk separuh daripada bilangan asal nukleus radioaktif mereput. Bilangan yang belum mereput selepas $n$ separuh hayat: ==$N = N_0({1}/{2})^n$==, dengan $n = {t}/{T_{{1}/{2}}}$.',
      'Kegunaan: pentarikhan karbon-14 (separuh hayat 5 730 tahun) bagi bahan organik purba; uranium-238 bagi usia batuan.'
    ] },
    { n: '6.2', t: 'Tenaga Nuklear', p: [
      '**Pembelahan nukleus**: nukleus berat dibedil dengan neutron lalu terbelah menjadi dua nukleus yang lebih ringan, beberapa neutron dan tenaga yang besar. Contoh: $nuk{235}{92}{U} + nuk{1}{0}{n} → nuk{141}{56}{Ba} + nuk{92}{36}{Kr} + 3 nuk{1}{0}{n} + "tenaga"$.',
      '**Tindak balas berantai**: neutron yang dibebaskan membedil nukleus uranium-235 yang lain, dan proses ini berterusan.',
      '**Pelakuran nukleus**: dua nukleus ringan bercantum membentuk nukleus yang lebih berat pada suhu dan tekanan yang sangat tinggi, seperti di Matahari. Contoh: $nuk{2}{1}{H} + nuk{3}{1}{H} → nuk{4}{2}{He} + nuk{1}{0}{n} + "tenaga"$.',
      'Tenaga terhasil daripada **cacat jisim**, $Δm$ (jisim sebelum − jisim selepas): ==$E = mc^2$==. Gunakan $1 "u.j.a." = 1.66 × 10^{-27} "kg"$.',
      'Dalam reaktor nuklear: **moderator** (grafit atau air) memperlahankan neutron; **rod pengawal** (boron atau kadmium) menyerap neutron berlebihan untuk mengawal kadar tindak balas; **agen penyejuk** memindahkan haba; **dinding konkrit tebal** menghalang kebocoran sinaran.',
      'Haba daripada reaktor mendidihkan air menjadi stim bertekanan tinggi yang memutarkan turbin dan penjana untuk menghasilkan tenaga elektrik.'
    ] }
  ],
  rumus: [
    ['$nuk{A}{Z}{X} → nuk{A−4}{Z−2}{Y} + nuk{4}{2}{He}$', 'Reputan alfa'],
    ['$nuk{A}{Z}{X} → nuk{A}{Z+1}{Y} + nuk{0}{−1}{e}$', 'Reputan beta'],
    ['$N = N_0({1}/{2})^n$', '$N_0$ = bilangan asal, $n$ = bilangan separuh hayat'],
    ['$n = {t}/{T_{{1}/{2}}}$', '$t$ = masa reputan, $T_{{1}/{2}}$ = separuh hayat'],
    ['$E = mc^2$', '$m$ = cacat jisim dalam kg, $c = 3.00 × 10^8 "m s"^{-1}$']
  ],
  istilah: [
    ['Reputan radioaktif', 'Proses rawak dan spontan apabila nukleus tidak stabil memancarkan sinaran radioaktif untuk menjadi lebih stabil.'],
    ['Separuh hayat', 'Masa yang diambil untuk separuh daripada bilangan asal nukleus radioaktif mereput.'],
    ['Pembelahan nukleus', 'Tindak balas nuklear apabila satu nukleus berat membelah menjadi dua atau lebih nukleus yang lebih ringan sambil membebaskan tenaga yang banyak.'],
    ['Pelakuran nukleus', 'Tindak balas nuklear apabila nukleus kecil dan ringan bercantum membentuk nukleus yang lebih berat sambil membebaskan tenaga yang banyak.'],
    ['Cacat jisim', 'Perbezaan antara jumlah jisim sebelum tindak balas dengan jumlah jisim selepas tindak balas.'],
    ['Tindak balas berantai', 'Tindak balas pembelahan yang berterusan apabila neutron yang terhasil membedil nukleus lain.']
  ],
  rumusan: [
    'Reputan radioaktif bersifat rawak dan spontan; ia tidak dipengaruhi oleh suhu, tekanan atau tindak balas kimia.',
    'Reputan alfa: $A − 4$, $Z − 2$. Reputan beta: $A$ tetap, $Z + 1$. Reputan gama: $A$ dan $Z$ tetap.',
    'Selepas setiap separuh hayat, bilangan nukleus yang belum mereput (dan keaktifan) menjadi separuh.',
    'Pembelahan membelah nukleus berat; pelakuran mencantumkan nukleus ringan. Kedua-duanya membebaskan tenaga $E = mc^2$ daripada cacat jisim.',
    'Reaktor nuklear mengawal tindak balas berantai dengan moderator dan rod pengawal.'
  ],
  silap: [
    'Menganggap nombor nukleon berubah dalam reputan beta. Hanya nombor proton bertambah 1.',
    'Menghitung pecahan yang telah mereput sedangkan soalan meminta pecahan yang tinggal, atau sebaliknya.',
    'Tidak menukar cacat jisim daripada u.j.a. kepada kg sebelum menggunakan $E = mc^2$.',
    'Tertukar fungsi moderator (memperlahankan neutron) dengan rod pengawal (menyerap neutron).'
  ],
  kuiz: [
    { q: 'Zarah alfa ialah', o: ['elektron berhalaju tinggi', 'nukleus helium', 'gelombang elektromagnet', 'neutron'], a: 1, e: 'Zarah alfa terdiri daripada 2 proton dan 2 neutron, iaitu nukleus helium $nuk{4}{2}{He}$.' },
    { q: 'Apakah perubahan pada nukleus apabila mengalami reputan beta?', o: ['Nombor nukleon berkurang 4', 'Nombor proton berkurang 1', 'Nombor proton bertambah 1 dan nombor nukleon tidak berubah', 'Tiada perubahan pada nombor proton'], a: 2, e: 'Satu neutron bertukar menjadi satu proton dan satu elektron. Nombor proton bertambah 1; nombor nukleon kekal.' },
    { q: 'Dalam persamaan $nuk{226}{88}{Ra} → nuk{222}{86}{Rn} + "X"$, apakah X?', o: ['Zarah alfa', 'Zarah beta', 'Sinar gama', 'Neutron'], a: 0, e: 'Nombor nukleon berkurang 4 dan nombor proton berkurang 2, maka X ialah $nuk{4}{2}{He}$.' },
    { q: 'Iodin-131 mempunyai separuh hayat 8 hari. Jika jisim asal ialah 80 g, berapakah jisim iodin-131 yang tinggal selepas 24 hari?', o: ['5 g', '10 g', '20 g', '40 g'], a: 1, e: '24 hari = 3 separuh hayat. $80 → 40 → 20 → 10 "g"$.' },
    { q: 'Torium-232 ($Z = 90$) mereput melalui satu siri reputan menjadi plumbum-208 ($Z = 82$). Berapakah bilangan zarah alfa dan zarah beta yang dipancarkan?', o: ['4 alfa dan 6 beta', '6 alfa dan 4 beta', '6 alfa dan 8 beta', '8 alfa dan 6 beta'], a: 1, e: 'Alfa: ${232 − 208}/{4} = 6$. Proton: $90 − 2(6) + y = 82$, maka $y = 4$ zarah beta.' },
    { q: 'Apakah fungsi moderator dalam reaktor nuklear?', o: ['Menyerap neutron berlebihan', 'Memperlahankan neutron', 'Menyejukkan teras reaktor', 'Menghalang kebocoran sinaran'], a: 1, e: 'Neutron perlahan lebih mudah diserap oleh nukleus uranium-235 untuk menghasilkan pembelahan.' },
    { q: 'Apakah fungsi rod pengawal boron dalam reaktor nuklear?', o: ['Memperlahankan neutron', 'Membekalkan neutron', 'Menyerap neutron berlebihan untuk mengawal kadar tindak balas', 'Menukarkan haba kepada tenaga elektrik'], a: 2, e: 'Dengan menyerap neutron berlebihan, rod pengawal mengawal kadar tindak balas berantai.' },
    { q: 'Cacat jisim dalam satu tindak balas nuklear ialah 0.200 u.j.a. Berapakah tenaga yang dibebaskan? [$1 "u.j.a." = 1.66 × 10^{-27} "kg"$]', o: ['$9.96 × 10^{-20} "J"$', '$3.32 × 10^{-28} "J"$', '$2.99 × 10^{-11} "J"$', '$1.80 × 10^{16} "J"$'], a: 2, e: '$E = mc^2 = (0.200 × 1.66 × 10^{-27})(3.00 × 10^8)^2 = 2.99 × 10^{-11} "J"$.' },
    { q: 'Tindak balas nuklear manakah yang membekalkan tenaga Matahari?', o: ['Pembelahan nukleus', 'Pelakuran nukleus', 'Reputan alfa', 'Reputan gama'], a: 1, e: 'Suhu dan tekanan yang sangat tinggi di teras Matahari membolehkan nukleus hidrogen bercantum.' }
  ],
  struktur: [
    { t: 'Keaktifan awal satu sampel radioaktif ialah 800 bilangan per minit. Selepas 15 jam, keaktifannya menjadi 100 bilangan per minit.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan separuh hayat?', m: 1, j: 'Masa yang diambil untuk separuh daripada bilangan asal nukleus radioaktif mereput.' },
      { q: '(b) Hitung separuh hayat sampel itu.', m: 2, j: '$800 → 400 → 200 → 100$: tiga separuh hayat dalam 15 jam, maka $T_{{1}/{2}} = 5$ jam.' },
      { q: '(c) Hitung keaktifan sampel selepas 25 jam.', m: 2, j: '$n = {25}/{5} = 5$. Keaktifan $= 800 × ({1}/{2})^5 = 25$ bilangan per minit.' },
      { q: '(d) Mengapakah reputan radioaktif dikatakan rawak dan spontan?', m: 2, j: 'Rawak: tidak dapat diramalkan nukleus mana akan mereput atau bila. Spontan: berlaku dengan sendiri tanpa dipengaruhi oleh keadaan luar seperti suhu dan tekanan.' }
    ] },
    { t: 'Satu tindak balas pembelahan uranium-235 diwakili oleh $nuk{235}{92}{U} + nuk{1}{0}{n} → nuk{141}{56}{Ba} + nuk{92}{36}{Kr} + 3 nuk{1}{0}{n} + "tenaga"$. Cacat jisim tindak balas ini ialah 0.186 u.j.a.', b: [
      { q: '(a) Apakah yang dimaksudkan dengan pembelahan nukleus?', m: 1, j: 'Tindak balas nuklear apabila satu nukleus berat membelah menjadi dua atau lebih nukleus yang lebih ringan sambil membebaskan tenaga yang banyak.' },
      { q: '(b) Hitung tenaga yang dibebaskan dalam satu pembelahan. [$1 "u.j.a." = 1.66 × 10^{-27} "kg"$]', m: 3, j: '$m = 0.186 × 1.66 × 10^{-27} = 3.09 × 10^{-28} "kg"$. $E = mc^2 = (3.09 × 10^{-28})(3.00 × 10^8)^2 = 2.78 × 10^{-11} "J"$' },
      { q: '(c) Terangkan bagaimana tindak balas berantai berlaku.', m: 2, j: 'Tiga neutron yang dibebaskan membedil nukleus uranium-235 yang lain dan menyebabkan pembelahan seterusnya. Setiap pembelahan membebaskan lebih banyak neutron, maka bilangan pembelahan bertambah dengan cepat.' },
      { q: '(d) Nyatakan fungsi rod pengawal dalam reaktor nuklear.', m: 1, j: 'Menyerap neutron berlebihan untuk mengawal kadar tindak balas berantai.' }
    ] }
  ]
});

BAB.push({
  id: 't5-b7', ting: 5, no: 7, tema: 'Tema 4 · Fizik Moden', tajuk: 'Fizik Kuantum',
  intro: 'Pada skala atom, tenaga cahaya wujud dalam paket diskrit yang dinamakan foton. Bab ini merangkumi teori kuantum cahaya, kesan fotoelektrik dan teori fotoelektrik Einstein.',
  sim: {
    t: 'Kesan fotoelektrik',
    d: 'Cahaya menyinari permukaan logam. Ubah panjang gelombang dan keamatan cahaya, serta jenis logam. Graf menunjukkan tenaga kinetik maksimum fotoelektron melawan frekuensi; titik jingga ialah keadaan semasa.',
    cuba: [
      { s: 'Pilih natrium dan tetapkan $λ = 680 "nm"$ (cahaya merah). Tambah keamatan sehingga maksimum. Adakah fotoelektron terpancar?', j: 'Tidak, walau setinggi mana keamatan cahaya. Tenaga satu foton (1.83 eV) lebih kecil daripada fungsi kerja natrium (2.28 eV).' },
      { s: 'Kurangkan $λ$ sehingga fotoelektron mula terpancar. Berapakah panjang gelombang ambang natrium?', j: 'Kira-kira 545 nm (fotoelektron terpancar pada 540 nm tetapi tidak pada 550 nm).' },
      { s: 'Semasa fotoelektron terpancar, tambah keamatan. Apakah yang berubah dan apakah yang tidak berubah?', j: 'Bilangan fotoelektron yang terpancar sesaat bertambah, tetapi $K_{maks}$ tidak berubah kerana tenaga setiap foton masih sama.' },
      { s: 'Tukar kepada zink. Mengapakah cahaya nampak tidak dapat memancarkan fotoelektron?', j: 'Fungsi kerja zink (4.31 eV) lebih tinggi. Hanya sinaran ultraungu dengan panjang gelombang kurang daripada kira-kira 288 nm mempunyai tenaga foton yang mencukupi.' }
    ]
  },
  sub: [
    { n: '7.1', t: 'Teori Kuantum Cahaya', p: [
      '**Jasad hitam** ialah jasad unggul yang berupaya menyerap semua sinaran elektromagnet yang jatuh padanya. Apabila suhu meningkat, keamatan sinaran bertambah dan puncak spektrum beralih ke panjang gelombang yang lebih pendek.',
      'Teori klasik gagal menerangkan spektrum jasad hitam. Max Planck mencadangkan bahawa tenaga dipancarkan dalam paket diskrit yang dinamakan **kuantum tenaga**.',
      '**Foton** ialah kuantum tenaga cahaya: ==$E = hf = {hc}/{λ}$==, dengan pemalar Planck $h = 6.63 × 10^{-34} "J s"$.',
      'Kuasa sumber cahaya: $P = nhf$, dengan $n$ = bilangan foton yang dipancarkan sesaat.',
      'Cahaya dan zarah menunjukkan **sifat kedualan gelombang–zarah**. Hipotesis de Broglie: zarah berjisim seperti elektron bersifat gelombang dengan panjang gelombang ==$λ = {h}/{p} = {h}/{mv}$==.',
      'Pembelauan elektron membuktikan sifat gelombang elektron. Mikroskop elektron mempunyai resolusi tinggi kerana panjang gelombang de Broglie elektron jauh lebih pendek daripada panjang gelombang cahaya nampak.'
    ] },
    { n: '7.2', t: 'Kesan Fotoelektrik', p: [
      '**Kesan fotoelektrik** ialah pemancaran elektron daripada permukaan logam apabila disinari oleh cahaya yang mempunyai frekuensi tertentu. Elektron itu dinamakan fotoelektron.',
      'Ciri 1: fotoelektron hanya terpancar jika frekuensi cahaya melebihi **frekuensi ambang**, $f_0$ logam itu.',
      'Ciri 2: tenaga kinetik maksimum fotoelektron bertambah dengan frekuensi cahaya dan tidak bergantung pada keamatan cahaya.',
      'Ciri 3: fotoelektron terpancar secara serta-merta apabila logam disinari.',
      'Ciri 4: keamatan cahaya yang lebih tinggi menambah bilangan fotoelektron sesaat (arus fotoelektrik), bukan tenaga kinetiknya.'
    ] },
    { n: '7.3', t: 'Teori Fotoelektrik Einstein', p: [
      'Satu foton memindahkan kesemua tenaganya kepada satu elektron. Persamaan Fotoelektrik Einstein: ==$hf = W + {1}/{2}mv_{maks}^2$==.',
      '**Fungsi kerja**, $W$ ialah tenaga minimum yang diperlukan untuk fotoelektron terlepas dari permukaan logam: $W = hf_0 = {hc}/{λ_0}$.',
      'Jika $hf < W$, tiada fotoelektron terpancar walaupun keamatan cahaya tinggi.',
      'Graf $K_{maks}$ melawan $f$: kecerunan = $h$, pintasan pada paksi frekuensi = $f_0$, dan pintasan pada paksi $K_{maks}$ = $−W$.',
      'Logam yang berbeza mempunyai fungsi kerja yang berbeza, tetapi graf semuanya mempunyai kecerunan yang sama, iaitu $h$.',
      'Aplikasi: sel foto dalam pintu automatik, sel suria, pengesan imej kamera digital, pengesan cahaya dalam lampu jalan automatik.'
    ] }
  ],
  rumus: [
    ['$E = hf$', 'Tenaga satu foton; $h = 6.63 × 10^{-34} "J s"$'],
    ['$E = {hc}/{λ}$', 'Tenaga foton dalam sebutan panjang gelombang'],
    ['$P = nhf$', '$n$ = bilangan foton yang dipancarkan sesaat'],
    ['$λ = {h}/{p} = {h}/{mv}$', 'Panjang gelombang de Broglie'],
    ['$λ = {h}/{sqrt{2mK}}$', 'Panjang gelombang de Broglie bagi zarah bertenaga kinetik $K$'],
    ['$hf = W + K_{maks}$', 'Persamaan Fotoelektrik Einstein; $K_{maks} = {1}/{2}mv_{maks}^2$'],
    ['$W = hf_0 = {hc}/{λ_0}$', 'Fungsi kerja; $f_0$ = frekuensi ambang, $λ_0$ = panjang gelombang ambang']
  ],
  istilah: [
    ['Jasad hitam', 'Jasad unggul yang berupaya menyerap semua sinaran elektromagnet yang jatuh padanya.'],
    ['Kuantum tenaga', 'Paket tenaga yang diskrit dan bukan tenaga yang selanjar.'],
    ['Foton', 'Kuantum tenaga cahaya dengan tenaga $E = hf$.'],
    ['Kesan fotoelektrik', 'Pemancaran elektron daripada permukaan logam apabila disinari cahaya yang mempunyai frekuensi tertentu.'],
    ['Frekuensi ambang', 'Frekuensi minimum foton cahaya yang dapat menghasilkan kesan fotoelektrik.'],
    ['Fungsi kerja', 'Tenaga minimum yang diperlukan untuk fotoelektron terlepas dari permukaan logam.'],
    ['Panjang gelombang de Broglie', 'Panjang gelombang yang dikaitkan dengan zarah bermomentum $p$: $λ = {h}/{p}$.']
  ],
  rumusan: [
    'Tenaga cahaya terkuantum dalam foton bertenaga $E = hf = {hc}/{λ}$.',
    'Kesan fotoelektrik menunjukkan sifat zarah cahaya; pembelauan elektron menunjukkan sifat gelombang zarah.',
    'Fotoelektron terpancar hanya jika $f > f_0$; frekuensi menentukan $K_{maks}$ dan keamatan menentukan bilangan fotoelektron.',
    'Persamaan Einstein $hf = W + K_{maks}$ ialah pernyataan keabadian tenaga bagi satu foton dan satu elektron.',
    'Graf $K_{maks}$ melawan $f$ mempunyai kecerunan $h$ dan pintasan frekuensi $f_0$.',
    'Panjang gelombang de Broglie $λ = {h}/{mv}$ hanya ketara bagi zarah yang sangat kecil seperti elektron.'
  ],
  silap: [
    'Menyatakan keamatan cahaya yang lebih tinggi menambah tenaga kinetik fotoelektron. Keamatan hanya menambah bilangan fotoelektron.',
    'Tidak menukar nm kepada m atau eV kepada J ($1 "eV" = 1.60 × 10^{-19} "J"$).',
    'Tertukar frekuensi ambang dengan panjang gelombang ambang: pancaran berlaku jika $f > f_0$, iaitu $λ < λ_0$.',
    'Menggunakan jisim foton dalam rumus de Broglie. Bagi foton gunakan $p = {h}/{λ}$.'
  ],
  kuiz: [
    { q: 'Berapakah tenaga satu foton cahaya dengan panjang gelombang 500 nm? [$h = 6.63 × 10^{-34} "J s"$, $c = 3.00 × 10^8 "m s"^{-1}$]', o: ['$1.33 × 10^{-27} "J"$', '$3.98 × 10^{-19} "J"$', '$3.98 × 10^{-28} "J"$', '$9.95 × 10^{-32} "J"$'], a: 1, e: '$E = {hc}/{λ} = {(6.63 × 10^{-34})(3.00 × 10^8)}/{500 × 10^{-9}} = 3.98 × 10^{-19} "J"$.' },
    { q: 'Jasad hitam ialah jasad unggul yang', o: ['memantulkan semua sinaran yang jatuh padanya', 'menyerap semua sinaran elektromagnet yang jatuh padanya', 'tidak memancarkan sebarang sinaran', 'hanya menyerap cahaya nampak'], a: 1, e: 'Jasad hitam menyerap semua sinaran elektromagnet yang jatuh padanya dan juga pemancar sinaran yang unggul.' },
    { q: 'Cahaya dengan frekuensi melebihi frekuensi ambang menyinari satu logam. Apakah kesan menambah keamatan cahaya itu?', o: ['Tenaga kinetik maksimum fotoelektron bertambah', 'Bilangan fotoelektron yang terpancar sesaat bertambah', 'Frekuensi ambang logam berkurang', 'Fungsi kerja logam bertambah'], a: 1, e: 'Keamatan yang lebih tinggi bermaksud lebih banyak foton sesaat, maka lebih banyak fotoelektron. Tenaga setiap foton tidak berubah.' },
    { q: 'Fungsi kerja satu logam ialah $3.65 × 10^{-19} "J"$. Berapakah frekuensi ambangnya?', o: ['$1.82 × 10^{14} "Hz"$', '$5.51 × 10^{14} "Hz"$', '$2.42 × 10^{-52} "Hz"$', '$5.51 × 10^{15} "Hz"$'], a: 1, e: '$f_0 = {W}/{h} = {3.65 × 10^{-19}}/{6.63 × 10^{-34}} = 5.51 × 10^{14} "Hz"$.' },
    { q: 'Cahaya berfrekuensi $1.0 × 10^{15} "Hz"$ menyinari logam yang fungsi kerjanya $3.65 × 10^{-19} "J"$. Berapakah tenaga kinetik maksimum fotoelektron?', o: ['$2.98 × 10^{-19} "J"$', '$3.65 × 10^{-19} "J"$', '$6.63 × 10^{-19} "J"$', '$1.03 × 10^{-18} "J"$'], a: 0, e: '$K_{maks} = hf − W = 6.63 × 10^{-19} − 3.65 × 10^{-19} = 2.98 × 10^{-19} "J"$.' },
    { q: 'Apakah yang diwakili oleh kecerunan graf $K_{maks}$ melawan $f$?', o: ['Fungsi kerja', 'Frekuensi ambang', 'Pemalar Planck', 'Cas elektron'], a: 2, e: 'Daripada $K_{maks} = hf − W$, kecerunan ialah $h$ dan pintasan pada paksi frekuensi ialah $f_0$.' },
    { q: 'Berapakah panjang gelombang de Broglie bagi elektron yang bergerak dengan halaju $2.0 × 10^6 "m s"^{-1}$? [$m = 9.11 × 10^{-31} "kg"$]', o: ['$3.64 × 10^{-10} "m"$', '$1.21 × 10^{-9} "m"$', '$3.64 × 10^{-4} "m"$', '$2.75 × 10^{9} "m"$'], a: 0, e: '$λ = {h}/{mv} = {6.63 × 10^{-34}}/{(9.11 × 10^{-31})(2.0 × 10^6)} = 3.64 × 10^{-10} "m"$.' },
    { q: 'Fenomena manakah yang menunjukkan sifat gelombang bagi elektron?', o: ['Kesan fotoelektrik', 'Pancaran termion', 'Pembelauan elektron', 'Pemesongan dalam medan elektrik'], a: 2, e: 'Pembelauan ialah fenomena gelombang. Corak pembelauan elektron mengesahkan hipotesis de Broglie.' },
    { q: 'Sebuah laser 5.0 mW memancarkan cahaya dengan panjang gelombang 633 nm. Berapakah bilangan foton yang dipancarkan sesaat?', o: ['$3.14 × 10^{-19}$', '$1.59 × 10^{13}$', '$1.59 × 10^{16}$', '$1.59 × 10^{19}$'], a: 2, e: '$n = {Pλ}/{hc} = {(5.0 × 10^{-3})(633 × 10^{-9})}/{(6.63 × 10^{-34})(3.00 × 10^8)} = 1.59 × 10^{16}$ foton sesaat.' }
  ],
  struktur: [
    { t: 'Permukaan logam natrium dengan fungsi kerja 2.28 eV disinari cahaya dengan panjang gelombang 400 nm. [$h = 6.63 × 10^{-34} "J s"$, $c = 3.00 × 10^8 "m s"^{-1}$, $1 "eV" = 1.60 × 10^{-19} "J"$]', b: [
      { q: '(a) Apakah yang dimaksudkan dengan fungsi kerja?', m: 1, j: 'Tenaga minimum yang diperlukan untuk fotoelektron terlepas dari permukaan logam.' },
      { q: '(b) Nyatakan fungsi kerja natrium dalam unit joule.', m: 1, j: '$W = 2.28 × 1.60 × 10^{-19} = 3.65 × 10^{-19} "J"$' },
      { q: '(c) Hitung tenaga satu foton cahaya itu.', m: 2, j: '$E = {hc}/{λ} = {(6.63 × 10^{-34})(3.00 × 10^8)}/{400 × 10^{-9}} = 4.97 × 10^{-19} "J"$' },
      { q: '(d) Hitung tenaga kinetik maksimum fotoelektron.', m: 2, j: '$K_{maks} = E − W = 4.97 × 10^{-19} − 3.65 × 10^{-19} = 1.32 × 10^{-19} "J"$' },
      { q: '(e) Cahaya itu digantikan dengan cahaya merah berpanjang gelombang 680 nm yang lebih tinggi keamatannya. Terangkan apa yang berlaku.', m: 2, j: 'Tenaga foton cahaya merah $= {hc}/{λ} = 2.93 × 10^{-19} "J"$, lebih kecil daripada fungsi kerja natrium. Tiada fotoelektron terpancar walaupun keamatannya tinggi, kerana setiap foton tidak mempunyai tenaga yang mencukupi.' }
    ] },
    { t: 'Satu alur elektron dipecutkan dari keadaan rehat melalui beza keupayaan 150 V. [$m = 9.11 × 10^{-31} "kg"$, $e = 1.60 × 10^{-19} "C"$, $h = 6.63 × 10^{-34} "J s"$]', b: [
      { q: '(a) Nyatakan hipotesis de Broglie.', m: 1, j: 'Zarah berjisim seperti elektron boleh bersifat gelombang, dengan panjang gelombang $λ = {h}/{p}$.' },
      { q: '(b) Hitung momentum elektron selepas dipecutkan.', m: 2, j: '$K = eV$ dan $p = sqrt{2mK} = sqrt{2(9.11 × 10^{-31})(1.60 × 10^{-19})(150)} = 6.61 × 10^{-24} "kg m s"^{-1}$' },
      { q: '(c) Hitung panjang gelombang de Broglie elektron itu.', m: 2, j: '$λ = {h}/{p} = {6.63 × 10^{-34}}/{6.61 × 10^{-24}} = 1.00 × 10^{-10} "m"$' },
      { q: '(d) Mengapakah mikroskop elektron mempunyai resolusi yang lebih tinggi daripada mikroskop cahaya?', m: 1, j: 'Panjang gelombang de Broglie elektron jauh lebih pendek daripada panjang gelombang cahaya nampak, maka butiran yang lebih halus dapat dibezakan.' },
      { q: '(e) Mengapakah sifat gelombang sebiji bola sepak yang bergerak tidak dapat diperhatikan?', m: 1, j: 'Jisim bola sangat besar, maka panjang gelombang de Broglienya terlalu pendek untuk dikesan.' }
    ] }
  ]
});
