create table if not exists news (
  id serial primary key,
  slug text not null unique,
  category text not null,
  title text not null,
  excerpt text not null,
  body text not null,
  thumb text not null default 'capitol',
  published_at date not null default current_date,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists news_published_idx on news (published_at desc, id desc);
create index if not exists news_category_idx on news (category);

insert into news (slug, category, title, excerpt, body, thumb, published_at) values
('fed-pertahankan-suku-bunga', 'Ekonomi Global', 'The Fed Pertahankan Suku Bunga, Pasar Menunggu Data Inflasi', 'Bank sentral Amerika Serikat memutuskan mempertahankan suku bunga acuan, sembari pasar menanti rilis data inflasi berikutnya sebagai penentu arah kebijakan.', $news$The Federal Reserve memutuskan untuk mempertahankan suku bunga acuan pada level saat ini, sesuai dengan ekspektasi mayoritas pelaku pasar.

Dalam pernyataannya, bank sentral menekankan bahwa keputusan ke depan akan sangat bergantung pada perkembangan data inflasi dan tenaga kerja.

Pasar keuangan global merespons dengan volatilitas terbatas, sembari menunggu rilis data inflasi berikutnya sebagai indikator arah kebijakan suku bunga selanjutnya.$news$, 'capitol', '2024-05-22'),
('emas-menguat-ketidakpastian-global', 'Emas', 'Emas Menguat di Tengah Ketidakpastian Global', 'Harga emas mencatat penguatan seiring meningkatnya permintaan aset safe haven di tengah ketidakpastian ekonomi dan geopolitik global.', $news$Harga emas dunia bergerak menguat, didorong oleh meningkatnya minat investor terhadap aset safe haven.

Ketidakpastian geopolitik serta ekspektasi kebijakan moneter yang beragam turut menjadi faktor pendukung penguatan harga emas.

Analis menilai tren ini berpotensi berlanjut selama sentimen ketidakpastian global masih membayangi pasar.$news$, 'gold', '2024-05-22'),
('etf-bitcoin-inflow-tertinggi', 'Kripto', 'ETF Bitcoin Spot Catat Inflow Tertinggi dalam 2 Minggu', 'Produk ETF Bitcoin spot mencatatkan arus masuk dana tertinggi dalam dua minggu terakhir, menandakan minat institusi yang kembali meningkat.', $news$Sejumlah produk ETF Bitcoin spot mencatatkan arus masuk dana (inflow) tertinggi dalam dua minggu terakhir.

Peningkatan ini mengindikasikan minat investor institusi terhadap aset kripto kembali menguat.

Para pelaku pasar akan memantau apakah tren inflow ini dapat berlanjut dan memberi dampak positif terhadap harga Bitcoin secara keseluruhan.$news$, 'bitcoin', '2024-05-21'),
('data-tenaga-kerja-as', 'Ekonomi Global', 'Data Tenaga Kerja AS Jadi Sorotan Pelaku Pasar Minggu Ini', 'Rilis data tenaga kerja Amerika Serikat pekan ini diperkirakan akan menjadi katalis penting bagi pergerakan dolar dan pasar global.', $news$Pelaku pasar tengah menantikan rilis data tenaga kerja Amerika Serikat yang dijadwalkan pekan ini.

Data ini berpotensi memberikan gambaran lebih jelas mengenai kondisi ekonomi AS dan arah kebijakan moneter ke depan.

Pergerakan dolar AS dan pasar global diperkirakan akan cukup sensitif terhadap hasil rilis data tersebut.$news$, 'capitol', '2024-05-19')
on conflict (slug) do nothing;
