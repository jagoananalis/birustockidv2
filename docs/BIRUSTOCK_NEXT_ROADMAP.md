# Birustock — Next Development Roadmap

## Baseline yang sudah dinaikkan pada update ini

### P0 — Production hardening
- Founder PIN dan session secret tidak lagi ditulis sebagai kredensial production.
- Production wajib menyediakan `FOUNDER_PIN` dan `FOUNDER_SESSION_SECRET` dari konfigurasi server.
- Mode development tetap memiliki fallback lokal agar preview tidak buntu.
- Pesan demo PIN di UI dihapus.

### P1 — Content system
- News dipindahkan dari static TypeScript data ke database.
- News memiliki CRUD melalui Founder Studio.
- Contact form benar-benar menyimpan pesan ke database.
- Analisis memiliki metadata terstruktur: timeframe, bias, support, resistance, target, invalidation, dan dua skenario.
- Detail analisis menampilkan metadata tersebut secara visual.
- Homepage dan halaman News sekarang membaca data News dari database.
- Founder Studio berubah menjadi command center dengan Dashboard, Analisis, News, dan Edukasi.

## Tahap berikutnya

### Sprint 1 — Security & publishing
1. Ganti PIN founder dengan Better Auth + role/allowlist founder.
2. Tambahkan audit log untuk create/update/delete.
3. Tambahkan rate limit dan lockout pada login founder.
4. Pindahkan upload gambar ke object storage; jangan menyimpan data URI sebagai solusi jangka panjang.
5. Tambahkan status konten: draft, scheduled, published, archived.

### Sprint 2 — CMS profesional
1. Rich text editor.
2. Preview sebelum publish.
3. SEO title/description.
4. Slug manual + auto slug.
5. Tag dan kategori.
6. Media library.
7. Search dan filter pada Studio.
8. Bulk-safe archive, bukan hard delete default.

### Sprint 3 — Analysis Engine
Model analisis standar:
- Instrument
- Bias
- Timeframe
- Support
- Resistance
- Target
- Invalidation
- Bullish scenario
- Bearish scenario
- Commentary
- Last updated

Tambahkan chart harga dan penanda level agar value analysis menjadi produk utama Birustock.

### Sprint 4 — Market Intelligence
- Market snapshot untuk XAUUSD, BTCUSD, EURUSD, GBPUSD, DXY.
- Mini chart.
- Daily change.
- High/low.
- Market session status.
- Economic-event impact.

### Sprint 5 — Economic Calendar 2.0
- Provider ingestion terjadwal.
- Normalisasi event ke database.
- Cache server-side.
- Filter currency dan impact.
- Countdown event terdekat.
- Riwayat actual/forecast/previous.
- Related markets.

### Sprint 6 — User product
- Account.
- Bookmark analysis/news/education.
- Watchlist instrument.
- Personal market feed.
- Notification event penting.
- Reading/progress history.

### Sprint 7 — Trading Academy
- Learning path Pemula → Menengah → Lanjutan.
- Modul berurutan.
- Progress.
- Quiz.
- Completion state.
- Recommended next lesson.

### Sprint 8 — Distribution engine
Satu publikasi menghasilkan:
- Web article.
- Social snippet.
- Telegram-ready summary.
- SEO metadata.
- OG preview.

## Definition of Done untuk platform

Birustock siap dianggap production-grade ketika:

- Tidak ada credential production di source code.
- Semua content utama berasal dari database/CMS.
- Semua mutation terlindungi dan tervalidasi server-side.
- Contact benar-benar tersimpan/terkirim.
- News dan analysis mempunyai freshness yang jelas.
- Analysis mempunyai struktur data yang konsisten.
- Calendar tidak bergantung langsung pada scraping frontend.
- Mobile tidak overflow dan semua tap target nyaman.
- SEO metadata lengkap.
- Error/loading/empty states tersedia.
- Backup database dan observability tersedia.
