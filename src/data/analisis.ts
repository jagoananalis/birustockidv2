export type AnalisisItem = {
  slug: string;
  pair: string;
  date: string;
  title: string;
  excerpt: string;
  icon: "trendUp" | "trendDown" | "bitcoin" | "euro";
  accent: "blue" | "orange" | "green" | "red";
  body: string[];
};

export const ANALISIS: AnalisisItem[] = [
  {
    slug: "xauusd-22-mei-2024",
    pair: "XAU/USD",
    date: "22 Mei 2024",
    title: "XAUUSD Analysis 22 Mei 2024",
    excerpt: "Potensi kenaikan menuju area resistance utama.",
    icon: "trendUp",
    accent: "blue",
    body: [
      "Harga emas (XAUUSD) melanjutkan momentum bullish setelah berhasil bertahan di atas area support kunci pada kisaran 2.380.",
      "Selama harga bertahan di atas level tersebut, peluang kenaikan lanjutan menuju area resistance berikutnya masih terbuka.",
      "Perhatikan reaksi harga saat mendekati zona resistance, karena berpotensi terjadi koreksi jangka pendek sebelum melanjutkan tren utama.",
    ],
  },
  {
    slug: "btcusd-22-mei-2024",
    pair: "BTC/USD",
    date: "22 Mei 2024",
    title: "BTCUSD Analysis 22 Mei 2024",
    excerpt: "Struktur market masih bullish selama tidak break support.",
    icon: "bitcoin",
    accent: "orange",
    body: [
      "Bitcoin masih bergerak dalam struktur higher-low yang menandakan tren naik jangka menengah masih berlaku.",
      "Selama harga tidak menembus ke bawah area support utama, bias tetap condong ke sisi bullish.",
      "Volume yang meningkat saat kenaikan menjadi konfirmasi tambahan minat beli masih cukup kuat.",
    ],
  },
  {
    slug: "eurusd-21-mei-2024",
    pair: "EUR/USD",
    date: "21 Mei 2024",
    title: "EURUSD Analysis 21 Mei 2024",
    excerpt: "Peluang reversal jika menembus area support.",
    icon: "euro",
    accent: "green",
    body: [
      "EURUSD bergerak mendekati area support jangka pendek setelah mengalami tekanan jual beberapa hari terakhir.",
      "Apabila area ini berhasil ditembus dengan momentum yang kuat, peluang reversal ke bawah semakin terbuka.",
      "Sebaliknya, penolakan di area ini bisa membawa harga kembali menguji resistance terdekat.",
    ],
  },
  {
    slug: "xauusd-20-mei-2024",
    pair: "XAU/USD",
    date: "20 Mei 2024",
    title: "XAUUSD Analysis 20 Mei 2024",
    excerpt: "Konsolidasi jelang rilis data inflasi AS.",
    icon: "trendUp",
    accent: "blue",
    body: [
      "Emas bergerak sideways dalam range yang cukup sempit menjelang rilis data inflasi Amerika Serikat.",
      "Pelaku pasar tampak menahan posisi besar sambil menunggu arah baru pasca rilis data.",
      "Breakout dari range konsolidasi ini berpotensi menentukan arah pergerakan jangka pendek.",
    ],
  },
  {
    slug: "gbpusd-19-mei-2024",
    pair: "GBP/USD",
    date: "19 Mei 2024",
    title: "GBPUSD Analysis 19 Mei 2024",
    excerpt: "Tekanan jual masih mendominasi pergerakan jangka pendek.",
    icon: "trendDown",
    accent: "red",
    body: [
      "GBPUSD masih tertekan dan bergerak dalam struktur lower-high pada timeframe H4.",
      "Selama belum ada penembusan ke atas resistance terdekat, bias jangka pendek masih bearish.",
      "Level support di bawah perlu diwaspadai sebagai area potensi pantulan teknikal.",
    ],
  },
  {
    slug: "btcusd-18-mei-2024",
    pair: "BTC/USD",
    date: "18 Mei 2024",
    title: "BTCUSD Analysis 18 Mei 2024",
    excerpt: "Menguji area resistance psikologis penting.",
    icon: "bitcoin",
    accent: "orange",
    body: [
      "Bitcoin mendekati level resistance psikologis yang selama ini menjadi acuan banyak pelaku pasar.",
      "Penembusan yang disertai volume tinggi bisa membuka ruang kenaikan lanjutan.",
      "Namun, penolakan di area ini berpotensi memicu koreksi jangka pendek terlebih dahulu.",
    ],
  },
];

export function getAnalisis(slug: string) {
  return ANALISIS.find((item) => item.slug === slug);
}

export function getAnalisisPairs() {
  return [...new Set(ANALISIS.map((item) => item.pair))];
}
