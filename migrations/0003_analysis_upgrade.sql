alter table analisis
  add column if not exists timeframe text not null default 'H4',
  add column if not exists bias text not null default 'Netral',
  add column if not exists support text not null default '',
  add column if not exists resistance text not null default '',
  add column if not exists target text not null default '',
  add column if not exists invalidation text not null default '',
  add column if not exists scenario_bullish text not null default '',
  add column if not exists scenario_bearish text not null default '',
  add column if not exists updated_at timestamptz not null default now();

update analisis
set bias = case
  when lower(title) like '%bullish%' then 'Bullish'
  when lower(title) like '%bearish%' then 'Bearish'
  else 'Netral'
end
where bias = 'Netral';

create index if not exists analisis_bias_idx on analisis (bias);
create index if not exists analisis_updated_idx on analisis (updated_at desc);

update analisis set timeframe='H4', bias='Bullish', support='2.380', resistance='2.420 · 2.450', target='2.450', invalidation='Close H4 di bawah 2.380', scenario_bullish='Pertahankan harga di atas 2.380; acceptance di atas 2.420 membuka ruang menuju 2.450.', scenario_bearish='Penolakan kuat di 2.420 lalu break 2.380 meningkatkan risiko koreksi.' where slug='xauusd-29-agu-2026';
update analisis set timeframe='H4', bias='Bullish', support='104.000 · 102.500', resistance='108.000 · 110.000', target='110.000', invalidation='Close H4 di bawah 102.500', scenario_bullish='Higher-low bertahan dan breakout resistance dengan volume menguat.', scenario_bearish='Break support utama membatalkan struktur bullish jangka menengah.' where slug='btcusd-29-agu-2026';
update analisis set timeframe='H4', bias='Bearish', support='1.1600', resistance='1.1750 · 1.1820', target='1.1500', invalidation='Close H4 di atas 1.1820', scenario_bullish='Support bertahan dan harga reclaim resistance terdekat.', scenario_bearish='Break 1.1600 dengan momentum kuat membuka ruang ke support berikutnya.' where slug='eurusd-28-agu-2026';
update analisis set timeframe='H4', bias='Netral', support='2.360 · 2.380', resistance='2.410 · 2.430', target='Range breakout', invalidation='Close di luar range tanpa retest', scenario_bullish='Break dan retest di atas resistance membuka peluang continuation.', scenario_bearish='Break bawah range meningkatkan peluang koreksi lebih dalam.' where slug='xauusd-27-agu-2026';
update analisis set timeframe='H4', bias='Bearish', support='1.3400', resistance='1.3550 · 1.3620', target='1.3300', invalidation='Close H4 di atas 1.3620', scenario_bullish='Reclaim resistance dengan struktur higher-low mengubah bias.', scenario_bearish='Lower-high berlanjut dan support jebol menguatkan tekanan jual.' where slug='gbpusd-26-agu-2026';
update analisis set timeframe='H4', bias='Netral', support='108.000 · 106.500', resistance='112.000 · 114.000', target='Breakout range', invalidation='False breakout kembali ke range', scenario_bullish='Break resistance psikologis dengan volume tinggi membuka continuation.', scenario_bearish='Rejection resistance dapat memicu pullback ke support.' where slug='btcusd-25-agu-2026';
