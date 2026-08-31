export type EdukasiItem = {
  slug: string;
  level: "Pemula" | "Menengah" | "Lanjutan";
  title: string;
  desc: string;
  body: string[];
};

export const EDUKASI: EdukasiItem[] = [
  {
    slug: "pip-lot-leverage",
    level: "Pemula",
    title: "Apa itu Pip, Lot, dan Leverage?",
    desc: "Pahami istilah dasar yang wajib diketahui sebelum mulai trading forex maupun emas.",
    body: [
      "Pip adalah satuan perubahan harga terkecil di pasar forex, biasanya berada di digit keempat di belakang koma (contoh: EURUSD bergerak dari 1.0850 ke 1.0851 berarti naik 1 pip). Khusus pasangan yang melibatkan Yen Jepang, pip berada di digit kedua karena konvensi penulisan harganya berbeda.",
      "Lot adalah satuan volume transaksi. Satu standard lot setara 100.000 unit mata uang dasar, mini lot 10.000 unit, dan micro lot 1.000 unit. Semakin besar lot yang dipakai, semakin besar pula nilai pergerakan setiap pip terhadap saldo akun.",
      "Leverage adalah fasilitas dari broker yang memungkinkan trader membuka posisi jauh lebih besar dari modal yang disetorkan, misalnya dengan rasio 1:100 atau 1:500. Leverage memperbesar potensi profit, tapi juga memperbesar potensi kerugian dengan proporsi yang sama — sehingga pemahaman manajemen risiko wajib dikuasai sebelum menggunakannya.",
    ],
  },
  {
    slug: "cara-membaca-candlestick",
    level: "Pemula",
    title: "Cara Membaca Candlestick",
    desc: "Kenali pola candlestick dasar untuk membaca sentimen pasar secara visual.",
    body: [
      "Satu candlestick menggambarkan pergerakan harga dalam satu periode waktu tertentu, terdiri dari body (selisih harga open dan close) serta wick atau sumbu (harga tertinggi dan terendah selama periode itu). Candle hijau/putih biasanya menandakan harga close lebih tinggi dari open (bullish), sedangkan candle merah/hitam menandakan sebaliknya (bearish).",
      "Beberapa pola satu candle yang sering diperhatikan trader antara lain doji (body sangat kecil, tanda keraguan pasar), hammer (wick bawah panjang setelah tren turun, tanda potensi pembalikan), dan candle engulfing (candle besar yang menelan candle sebelumnya, tanda perubahan momentum).",
      "Pola candlestick paling berguna bila dibaca bersama konteks lain, seperti posisinya terhadap area support/resistance atau tren di timeframe yang lebih besar — bukan sebagai sinyal berdiri sendiri.",
    ],
  },
  {
    slug: "support-resistance-dalam-praktik",
    level: "Menengah",
    title: "Support & Resistance dalam Praktik",
    desc: "Teknik menentukan area kunci yang sering jadi acuan pantulan maupun breakout harga.",
    body: [
      "Support adalah area harga di mana tekanan beli cenderung cukup kuat untuk menahan penurunan lebih lanjut, sementara resistance adalah area di mana tekanan jual cenderung menahan kenaikan. Level ini terbentuk dari titik-titik harga yang berulang kali menjadi tempat pembalikan di masa lalu.",
      "Cara praktis menentukannya: tarik garis atau zona pada beberapa swing high/low yang saling berdekatan, bukan satu garis tunggal yang terlalu presisi. Semakin sering suatu area disentuh dan direspons harga, semakin banyak pelaku pasar yang menganggapnya signifikan.",
      "Saat harga menembus (breakout) area tersebut, sering terjadi retest — harga kembali mendekati level yang baru saja ditembus sebelum melanjutkan arah breakout. Trader juga perlu waspada terhadap false breakout, yaitu penembusan yang gagal berlanjut dan harga kembali ke dalam rentang sebelumnya.",
    ],
  },
  {
    slug: "manajemen-risiko-lot-size",
    level: "Menengah",
    title: "Manajemen Risiko: Menentukan Lot Size",
    desc: "Cara menghitung ukuran posisi berdasarkan modal dan toleransi risiko.",
    body: [
      "Konsep dasar manajemen risiko adalah membatasi kerugian per transaksi pada persentase kecil dari total modal — banyak trader menggunakan acuan umum di kisaran 1–2% per posisi, meski angka ini bersifat pilihan pribadi, bukan aturan baku.",
      "Ukuran lot yang tepat bisa dihitung dari tiga hal: nilai modal, persentase risiko yang ditetapkan, dan jarak stop loss dalam pip. Semakin jauh jarak stop loss, semakin kecil lot yang digunakan agar nilai risiko dalam rupiah/dolar tetap konsisten.",
      "Manajemen risiko yang konsisten membantu trader bertahan menghadapi rangkaian kerugian (drawdown) tanpa menghabiskan modal secara signifikan. Ini bersifat kerangka berpikir umum, bukan rekomendasi angka spesifik untuk akun siapa pun — sesuaikan dengan toleransi risiko dan kondisi modal masing-masing.",
    ],
  },
  {
    slug: "korelasi-xauusd-dxy",
    level: "Lanjutan",
    title: "Memahami Korelasi XAUUSD dan DXY",
    desc: "Kenapa pergerakan emas sering berlawanan arah dengan indeks dolar AS.",
    body: [
      "DXY (US Dollar Index) mengukur kekuatan dolar AS terhadap sekeranjang mata uang utama dunia. Karena harga emas (XAUUSD) dikuotasi dalam dolar, pelemahan dolar membuat emas relatif lebih murah bagi pemegang mata uang lain, yang berpotensi mendorong permintaan dan harga emas naik — begitu pula sebaliknya.",
      "Hubungan ini dikenal sebagai korelasi negatif, tetapi sifatnya kecenderungan umum, bukan hukum pasti yang berlaku setiap saat. Ada periode di mana korelasi ini melemah atau bahkan berbalik untuk sementara.",
      "Salah satu contohnya adalah saat krisis atau ketidakpastian global memuncak: dolar dan emas bisa sama-sama dicari sebagai aset safe haven, sehingga keduanya menguat bersamaan. Karena itu, DXY sebaiknya dijadikan salah satu konteks pendukung, bukan satu-satunya acuan analisis XAUUSD.",
    ],
  },
  {
    slug: "trading-berdasarkan-kalender-ekonomi",
    level: "Lanjutan",
    title: "Trading Berdasarkan Kalender Ekonomi",
    desc: "Strategi menghadapi volatilitas tinggi saat rilis data ekonomi penting.",
    body: [
      "Kalender ekonomi mencatat jadwal rilis data dan kebijakan penting — seperti data inflasi, ketenagakerjaan, atau keputusan suku bunga bank sentral — yang berpotensi memicu pergerakan harga signifikan dalam waktu singkat.",
      "Tiga angka yang biasa ditampilkan adalah forecast (perkiraan konsensus pasar), previous (data periode sebelumnya), dan actual (angka yang benar-benar dirilis). Semakin jauh selisih actual dari forecast, semakin besar potensi reaksi pasar, terutama untuk data dengan level dampak tinggi.",
      "Karena pergerakan harga di sekitar rilis data berdampak tinggi bisa sangat cepat dan tidak terduga (termasuk risiko slippage dan spread melebar), banyak trader memilih memperlebar stop loss, mengurangi ukuran posisi, atau menghindari membuka posisi baru tepat menjelang rilis data tersebut.",
    ],
  },
];

export function getEdukasi(slug: string) {
  return EDUKASI.find((item) => item.slug === slug);
}
