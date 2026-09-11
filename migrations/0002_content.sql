create table if not exists analisis (
  id serial primary key,
  slug text not null unique,
  pair text not null,
  title text not null,
  excerpt text not null,
  body text not null,
  image_url text not null default '',
  accent text not null default 'blue',
  published_at date not null default current_date,
  created_at timestamptz not null default now()
);

create index if not exists analisis_published_idx on analisis (published_at desc);

create table if not exists edukasi (
  id serial primary key,
  slug text not null unique,
  level text not null,
  title text not null,
  description text not null,
  body text not null,
  image_url text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists edukasi_level_idx on edukasi (level);

insert into analisis (slug, pair, title, excerpt, body, image_url, accent, published_at)
values
(
  'xauusd-29-agu-2026',
  'XAU/USD',
  'XAUUSD Analysis 29 Agustus 2026',
  'Potensi kenaikan menuju area resistance utama.',
  $b$Harga emas (XAUUSD) melanjutkan momentum bullish setelah berhasil bertahan di atas area support kunci pada kisaran 2.380.

Selama harga bertahan di atas level tersebut, peluang kenaikan lanjutan menuju area resistance berikutnya masih terbuka.

Perhatikan reaksi harga saat mendekati zona resistance, karena berpotensi terjadi koreksi jangka pendek sebelum melanjutkan tren utama.$b$,
  '/images/analisis-xauusd.jpg',
  'blue',
  '2026-08-29'
),
(
  'btcusd-29-agu-2026',
  'BTC/USD',
  'BTCUSD Analysis 29 Agustus 2026',
  'Struktur market masih bullish selama tidak break support.',
  $b$Bitcoin masih bergerak dalam struktur higher-low yang menandakan tren naik jangka menengah masih berlaku.

Selama harga tidak menembus ke bawah area support utama, bias tetap condong ke sisi bullish.

Volume yang meningkat saat kenaikan menjadi konfirmasi tambahan minat beli masih cukup kuat.$b$,
  '/images/analisis-btcusd.jpg',
  'orange',
  '2026-08-29'
),
(
  'eurusd-28-agu-2026',
  'EUR/USD',
  'EURUSD Analysis 28 Agustus 2026',
  'Peluang reversal jika menembus area support.',
  $b$EURUSD bergerak mendekati area support jangka pendek setelah mengalami tekanan jual beberapa hari terakhir.

Apabila area ini berhasil ditembus dengan momentum yang kuat, peluang reversal ke bawah semakin terbuka.

Sebaliknya, penolakan di area ini bisa membawa harga kembali menguji resistance terdekat.$b$,
  '/images/analisis-eurusd.jpg',
  'green',
  '2026-08-28'
),
(
  'xauusd-27-agu-2026',
  'XAU/USD',
  'XAUUSD Analysis 27 Agustus 2026',
  'Konsolidasi jelang rilis data inflasi AS.',
  $b$Emas bergerak sideways dalam range yang cukup sempit menjelang rilis data inflasi Amerika Serikat.

Pelaku pasar tampak menahan posisi besar sambil menunggu arah baru pasca rilis data.

Breakout dari range konsolidasi ini berpotensi menentukan arah pergerakan jangka pendek.$b$,
  '/images/analisis-xauusd-2.jpg',
  'blue',
  '2026-08-27'
),
(
  'gbpusd-26-agu-2026',
  'GBP/USD',
  'GBPUSD Analysis 26 Agustus 2026',
  'Tekanan jual masih mendominasi pergerakan jangka pendek.',
  $b$GBPUSD masih tertekan dan bergerak dalam struktur lower-high pada timeframe H4.

Selama belum ada penembusan ke atas resistance terdekat, bias jangka pendek masih bearish.

Level support di bawah perlu diwaspadai sebagai area potensi pantulan teknikal.$b$,
  '/images/analisis-gbpusd.jpg',
  'red',
  '2026-08-26'
),
(
  'btcusd-25-agu-2026',
  'BTC/USD',
  'BTCUSD Analysis 25 Agustus 2026',
  'Menguji area resistance psikologis penting.',
  $b$Bitcoin mendekati level resistance psikologis yang selama ini menjadi acuan banyak pelaku pasar.

Penembusan yang disertai volume tinggi bisa membuka ruang kenaikan lanjutan.

Namun, penolakan di area ini berpotensi memicu koreksi jangka pendek terlebih dahulu.$b$,
  '/images/analisis-btcusd-2.jpg',
  'orange',
  '2026-08-25'
);

insert into edukasi (slug, level, title, description, body, image_url)
values
(
  'pip-lot-leverage',
  'Pemula',
  'Apa itu Pip, Lot, dan Leverage?',
  'Pahami istilah dasar yang wajib diketahui sebelum mulai trading forex maupun emas.',
  $b$Pip adalah satuan perubahan harga terkecil di pasar forex, biasanya berada di digit keempat di belakang koma (contoh: EURUSD bergerak dari 1.0850 ke 1.0851 berarti naik 1 pip). Khusus pasangan yang melibatkan Yen Jepang, pip berada di digit kedua karena konvensi penulisan harganya berbeda.

Lot adalah satuan volume transaksi. Satu standard lot setara 100.000 unit mata uang dasar, mini lot 10.000 unit, dan micro lot 1.000 unit. Semakin besar lot yang dipakai, semakin besar pula nilai pergerakan setiap pip terhadap saldo akun.

Leverage adalah fasilitas dari broker yang memungkinkan trader membuka posisi jauh lebih besar dari modal yang disetorkan, misalnya dengan rasio 1:100 atau 1:500. Leverage memperbesar potensi profit, tapi juga memperbesar potensi kerugian dengan proporsi yang sama — sehingga pemahaman manajemen risiko wajib dikuasai sebelum menggunakannya.$b$,
  '/images/edukasi-pip.jpg'
),
(
  'cara-membaca-candlestick',
  'Pemula',
  'Cara Membaca Candlestick',
  'Kenali pola candlestick dasar untuk membaca sentimen pasar secara visual.',
  $b$Satu candlestick menggambarkan pergerakan harga dalam satu periode waktu tertentu, terdiri dari body (selisih harga open dan close) serta wick atau sumbu (harga tertinggi dan terendah selama periode itu). Candle hijau/putih biasanya menandakan harga close lebih tinggi dari open (bullish), sedangkan candle merah/hitam menandakan sebaliknya (bearish).

Beberapa pola satu candle yang sering diperhatikan trader antara lain doji (body sangat kecil, tanda keraguan pasar), hammer (wick bawah panjang setelah tren turun, tanda potensi pembalikan), dan candle engulfing (candle besar yang menelan candle sebelumnya, tanda perubahan momentum).

Pola candlestick paling berguna bila dibaca bersama konteks lain, seperti posisinya terhadap area support/resistance atau tren di timeframe yang lebih besar — bukan sebagai sinyal berdiri sendiri.$b$,
  '/images/edukasi-candlestick.jpg'
),
(
  'support-resistance-dalam-praktik',
  'Menengah',
  'Support & Resistance dalam Praktik',
  'Teknik menentukan area kunci yang sering jadi acuan pantulan maupun breakout harga.',
  $b$Support adalah area harga di mana tekanan beli cenderung cukup kuat untuk menahan penurunan lebih lanjut, sementara resistance adalah area di mana tekanan jual cenderung menahan kenaikan. Level ini terbentuk dari titik-titik harga yang berulang kali menjadi tempat pembalikan di masa lalu.

Cara praktis menentukannya: tarik garis atau zona pada beberapa swing high/low yang saling berdekatan, bukan satu garis tunggal yang terlalu presisi. Semakin sering suatu area disentuh dan direspons harga, semakin banyak pelaku pasar yang menganggapnya signifikan.

Saat harga menembus (breakout) area tersebut, sering terjadi retest — harga kembali mendekati level yang baru saja ditembus sebelum melanjutkan arah breakout. Trader juga perlu waspada terhadap false breakout, yaitu penembusan yang gagal berlanjut dan harga kembali ke dalam rentang sebelumnya.$b$,
  '/images/edukasi-sr.jpg'
),
(
  'manajemen-risiko-lot-size',
  'Menengah',
  'Manajemen Risiko: Menentukan Lot Size',
  'Cara menghitung ukuran posisi berdasarkan modal dan toleransi risiko.',
  $b$Konsep dasar manajemen risiko adalah membatasi kerugian per transaksi pada persentase kecil dari total modal — banyak trader menggunakan acuan umum di kisaran 1–2% per posisi, meski angka ini bersifat pilihan pribadi, bukan aturan baku.

Ukuran lot yang tepat bisa dihitung dari tiga hal: nilai modal, persentase risiko yang ditetapkan, dan jarak stop loss dalam pip. Semakin jauh jarak stop loss, semakin kecil lot yang digunakan agar nilai risiko dalam rupiah/dolar tetap konsisten.

Manajemen risiko yang konsisten membantu trader bertahan menghadapi rangkaian kerugian (drawdown) tanpa menghabiskan modal secara signifikan. Ini bersifat kerangka berpikir umum, bukan rekomendasi angka spesifik untuk akun siapa pun — sesuaikan dengan toleransi risiko dan kondisi modal masing-masing.$b$,
  '/images/edukasi-risk.jpg'
),
(
  'korelasi-xauusd-dxy',
  'Lanjutan',
  'Memahami Korelasi XAUUSD dan DXY',
  'Kenapa pergerakan emas sering berlawanan arah dengan indeks dolar AS.',
  $b$DXY (US Dollar Index) mengukur kekuatan dolar AS terhadap sekeranjang mata uang utama dunia. Karena harga emas (XAUUSD) dikuotasi dalam dolar, pelemahan dolar membuat emas relatif lebih murah bagi pemegang mata uang lain, yang berpotensi mendorong permintaan dan harga emas naik — begitu pula sebaliknya.

Hubungan ini dikenal sebagai korelasi negatif, tetapi sifatnya kecenderungan umum, bukan hukum pasti yang berlaku setiap saat. Ada periode di mana korelasi ini melemah atau bahkan berbalik untuk sementara.

Salah satu contohnya adalah saat krisis atau ketidakpastian global memuncak: dolar dan emas bisa sama-sama dicari sebagai aset safe haven, sehingga keduanya menguat bersamaan. Karena itu, DXY sebaiknya dijadikan salah satu konteks pendukung, bukan satu-satunya acuan analisis XAUUSD.$b$,
  '/images/edukasi-dxy.jpg'
),
(
  'trading-berdasarkan-kalender-ekonomi',
  'Lanjutan',
  'Trading Berdasarkan Kalender Ekonomi',
  'Strategi menghadapi volatilitas tinggi saat rilis data ekonomi penting.',
  $b$Kalender ekonomi mencatat jadwal rilis data dan kebijakan penting — seperti data inflasi, ketenagakerjaan, atau keputusan suku bunga bank sentral — yang berpotensi memicu pergerakan harga signifikan dalam waktu singkat.

Tiga angka yang biasa ditampilkan adalah forecast (perkiraan konsensus pasar), previous (data periode sebelumnya), dan actual (angka yang benar-benar dirilis). Semakin jauh selisih actual dari forecast, semakin besar potensi reaksi pasar, terutama untuk data dengan level dampak tinggi.

Karena pergerakan harga di sekitar rilis data berdampak tinggi bisa sangat cepat dan tidak terduga (termasuk risiko slippage dan spread melebar), banyak trader memilih memperlebar stop loss, mengurangi ukuran posisi, atau menghindari membuka posisi baru tepat menjelang rilis data tersebut.$b$,
  '/images/edukasi-calendar.jpg'
);
