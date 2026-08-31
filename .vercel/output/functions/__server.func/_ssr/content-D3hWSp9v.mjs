import { t as createServerFn } from "./ssr.mjs";
import { a as string, i as object, r as number, t as _enum } from "../_libs/zod.mjs";
import { n as slugify } from "./format-Pwj4vlNf.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content-D3hWSp9v.js
var _0002_content_default = "create table if not exists analisis (\n  id serial primary key,\n  slug text not null unique,\n  pair text not null,\n  title text not null,\n  excerpt text not null,\n  body text not null,\n  image_url text not null default '',\n  accent text not null default 'blue',\n  published_at date not null default current_date,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists analisis_published_idx on analisis (published_at desc);\n\ncreate table if not exists edukasi (\n  id serial primary key,\n  slug text not null unique,\n  level text not null,\n  title text not null,\n  description text not null,\n  body text not null,\n  image_url text not null default '',\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists edukasi_level_idx on edukasi (level);\n\ninsert into analisis (slug, pair, title, excerpt, body, image_url, accent, published_at)\nvalues\n(\n  'xauusd-29-agu-2026',\n  'XAU/USD',\n  'XAUUSD Analysis 29 Agustus 2026',\n  'Potensi kenaikan menuju area resistance utama.',\n  $b$Harga emas (XAUUSD) melanjutkan momentum bullish setelah berhasil bertahan di atas area support kunci pada kisaran 2.380.\n\nSelama harga bertahan di atas level tersebut, peluang kenaikan lanjutan menuju area resistance berikutnya masih terbuka.\n\nPerhatikan reaksi harga saat mendekati zona resistance, karena berpotensi terjadi koreksi jangka pendek sebelum melanjutkan tren utama.$b$,\n  '/images/analisis-xauusd.jpg',\n  'blue',\n  '2026-08-29'\n),\n(\n  'btcusd-29-agu-2026',\n  'BTC/USD',\n  'BTCUSD Analysis 29 Agustus 2026',\n  'Struktur market masih bullish selama tidak break support.',\n  $b$Bitcoin masih bergerak dalam struktur higher-low yang menandakan tren naik jangka menengah masih berlaku.\n\nSelama harga tidak menembus ke bawah area support utama, bias tetap condong ke sisi bullish.\n\nVolume yang meningkat saat kenaikan menjadi konfirmasi tambahan minat beli masih cukup kuat.$b$,\n  '/images/analisis-btcusd.jpg',\n  'orange',\n  '2026-08-29'\n),\n(\n  'eurusd-28-agu-2026',\n  'EUR/USD',\n  'EURUSD Analysis 28 Agustus 2026',\n  'Peluang reversal jika menembus area support.',\n  $b$EURUSD bergerak mendekati area support jangka pendek setelah mengalami tekanan jual beberapa hari terakhir.\n\nApabila area ini berhasil ditembus dengan momentum yang kuat, peluang reversal ke bawah semakin terbuka.\n\nSebaliknya, penolakan di area ini bisa membawa harga kembali menguji resistance terdekat.$b$,\n  '/images/analisis-eurusd.jpg',\n  'green',\n  '2026-08-28'\n),\n(\n  'xauusd-27-agu-2026',\n  'XAU/USD',\n  'XAUUSD Analysis 27 Agustus 2026',\n  'Konsolidasi jelang rilis data inflasi AS.',\n  $b$Emas bergerak sideways dalam range yang cukup sempit menjelang rilis data inflasi Amerika Serikat.\n\nPelaku pasar tampak menahan posisi besar sambil menunggu arah baru pasca rilis data.\n\nBreakout dari range konsolidasi ini berpotensi menentukan arah pergerakan jangka pendek.$b$,\n  '/images/analisis-xauusd-2.jpg',\n  'blue',\n  '2026-08-27'\n),\n(\n  'gbpusd-26-agu-2026',\n  'GBP/USD',\n  'GBPUSD Analysis 26 Agustus 2026',\n  'Tekanan jual masih mendominasi pergerakan jangka pendek.',\n  $b$GBPUSD masih tertekan dan bergerak dalam struktur lower-high pada timeframe H4.\n\nSelama belum ada penembusan ke atas resistance terdekat, bias jangka pendek masih bearish.\n\nLevel support di bawah perlu diwaspadai sebagai area potensi pantulan teknikal.$b$,\n  '/images/analisis-gbpusd.jpg',\n  'red',\n  '2026-08-26'\n),\n(\n  'btcusd-25-agu-2026',\n  'BTC/USD',\n  'BTCUSD Analysis 25 Agustus 2026',\n  'Menguji area resistance psikologis penting.',\n  $b$Bitcoin mendekati level resistance psikologis yang selama ini menjadi acuan banyak pelaku pasar.\n\nPenembusan yang disertai volume tinggi bisa membuka ruang kenaikan lanjutan.\n\nNamun, penolakan di area ini berpotensi memicu koreksi jangka pendek terlebih dahulu.$b$,\n  '/images/analisis-btcusd-2.jpg',\n  'orange',\n  '2026-08-25'\n);\n\ninsert into edukasi (slug, level, title, description, body, image_url)\nvalues\n(\n  'pip-lot-leverage',\n  'Pemula',\n  'Apa itu Pip, Lot, dan Leverage?',\n  'Pahami istilah dasar yang wajib diketahui sebelum mulai trading forex maupun emas.',\n  $b$Pip adalah satuan perubahan harga terkecil di pasar forex, biasanya berada di digit keempat di belakang koma (contoh: EURUSD bergerak dari 1.0850 ke 1.0851 berarti naik 1 pip). Khusus pasangan yang melibatkan Yen Jepang, pip berada di digit kedua karena konvensi penulisan harganya berbeda.\n\nLot adalah satuan volume transaksi. Satu standard lot setara 100.000 unit mata uang dasar, mini lot 10.000 unit, dan micro lot 1.000 unit. Semakin besar lot yang dipakai, semakin besar pula nilai pergerakan setiap pip terhadap saldo akun.\n\nLeverage adalah fasilitas dari broker yang memungkinkan trader membuka posisi jauh lebih besar dari modal yang disetorkan, misalnya dengan rasio 1:100 atau 1:500. Leverage memperbesar potensi profit, tapi juga memperbesar potensi kerugian dengan proporsi yang sama — sehingga pemahaman manajemen risiko wajib dikuasai sebelum menggunakannya.$b$,\n  '/images/edukasi-pip.jpg'\n),\n(\n  'cara-membaca-candlestick',\n  'Pemula',\n  'Cara Membaca Candlestick',\n  'Kenali pola candlestick dasar untuk membaca sentimen pasar secara visual.',\n  $b$Satu candlestick menggambarkan pergerakan harga dalam satu periode waktu tertentu, terdiri dari body (selisih harga open dan close) serta wick atau sumbu (harga tertinggi dan terendah selama periode itu). Candle hijau/putih biasanya menandakan harga close lebih tinggi dari open (bullish), sedangkan candle merah/hitam menandakan sebaliknya (bearish).\n\nBeberapa pola satu candle yang sering diperhatikan trader antara lain doji (body sangat kecil, tanda keraguan pasar), hammer (wick bawah panjang setelah tren turun, tanda potensi pembalikan), dan candle engulfing (candle besar yang menelan candle sebelumnya, tanda perubahan momentum).\n\nPola candlestick paling berguna bila dibaca bersama konteks lain, seperti posisinya terhadap area support/resistance atau tren di timeframe yang lebih besar — bukan sebagai sinyal berdiri sendiri.$b$,\n  '/images/edukasi-candlestick.jpg'\n),\n(\n  'support-resistance-dalam-praktik',\n  'Menengah',\n  'Support & Resistance dalam Praktik',\n  'Teknik menentukan area kunci yang sering jadi acuan pantulan maupun breakout harga.',\n  $b$Support adalah area harga di mana tekanan beli cenderung cukup kuat untuk menahan penurunan lebih lanjut, sementara resistance adalah area di mana tekanan jual cenderung menahan kenaikan. Level ini terbentuk dari titik-titik harga yang berulang kali menjadi tempat pembalikan di masa lalu.\n\nCara praktis menentukannya: tarik garis atau zona pada beberapa swing high/low yang saling berdekatan, bukan satu garis tunggal yang terlalu presisi. Semakin sering suatu area disentuh dan direspons harga, semakin banyak pelaku pasar yang menganggapnya signifikan.\n\nSaat harga menembus (breakout) area tersebut, sering terjadi retest — harga kembali mendekati level yang baru saja ditembus sebelum melanjutkan arah breakout. Trader juga perlu waspada terhadap false breakout, yaitu penembusan yang gagal berlanjut dan harga kembali ke dalam rentang sebelumnya.$b$,\n  '/images/edukasi-sr.jpg'\n),\n(\n  'manajemen-risiko-lot-size',\n  'Menengah',\n  'Manajemen Risiko: Menentukan Lot Size',\n  'Cara menghitung ukuran posisi berdasarkan modal dan toleransi risiko.',\n  $b$Konsep dasar manajemen risiko adalah membatasi kerugian per transaksi pada persentase kecil dari total modal — banyak trader menggunakan acuan umum di kisaran 1–2% per posisi, meski angka ini bersifat pilihan pribadi, bukan aturan baku.\n\nUkuran lot yang tepat bisa dihitung dari tiga hal: nilai modal, persentase risiko yang ditetapkan, dan jarak stop loss dalam pip. Semakin jauh jarak stop loss, semakin kecil lot yang digunakan agar nilai risiko dalam rupiah/dolar tetap konsisten.\n\nManajemen risiko yang konsisten membantu trader bertahan menghadapi rangkaian kerugian (drawdown) tanpa menghabiskan modal secara signifikan. Ini bersifat kerangka berpikir umum, bukan rekomendasi angka spesifik untuk akun siapa pun — sesuaikan dengan toleransi risiko dan kondisi modal masing-masing.$b$,\n  '/images/edukasi-risk.jpg'\n),\n(\n  'korelasi-xauusd-dxy',\n  'Lanjutan',\n  'Memahami Korelasi XAUUSD dan DXY',\n  'Kenapa pergerakan emas sering berlawanan arah dengan indeks dolar AS.',\n  $b$DXY (US Dollar Index) mengukur kekuatan dolar AS terhadap sekeranjang mata uang utama dunia. Karena harga emas (XAUUSD) dikuotasi dalam dolar, pelemahan dolar membuat emas relatif lebih murah bagi pemegang mata uang lain, yang berpotensi mendorong permintaan dan harga emas naik — begitu pula sebaliknya.\n\nHubungan ini dikenal sebagai korelasi negatif, tetapi sifatnya kecenderungan umum, bukan hukum pasti yang berlaku setiap saat. Ada periode di mana korelasi ini melemah atau bahkan berbalik untuk sementara.\n\nSalah satu contohnya adalah saat krisis atau ketidakpastian global memuncak: dolar dan emas bisa sama-sama dicari sebagai aset safe haven, sehingga keduanya menguat bersamaan. Karena itu, DXY sebaiknya dijadikan salah satu konteks pendukung, bukan satu-satunya acuan analisis XAUUSD.$b$,\n  '/images/edukasi-dxy.jpg'\n),\n(\n  'trading-berdasarkan-kalender-ekonomi',\n  'Lanjutan',\n  'Trading Berdasarkan Kalender Ekonomi',\n  'Strategi menghadapi volatilitas tinggi saat rilis data ekonomi penting.',\n  $b$Kalender ekonomi mencatat jadwal rilis data dan kebijakan penting — seperti data inflasi, ketenagakerjaan, atau keputusan suku bunga bank sentral — yang berpotensi memicu pergerakan harga signifikan dalam waktu singkat.\n\nTiga angka yang biasa ditampilkan adalah forecast (perkiraan konsensus pasar), previous (data periode sebelumnya), dan actual (angka yang benar-benar dirilis). Semakin jauh selisih actual dari forecast, semakin besar potensi reaksi pasar, terutama untuk data dengan level dampak tinggi.\n\nKarena pergerakan harga di sekitar rilis data berdampak tinggi bisa sangat cepat dan tidak terduga (termasuk risiko slippage dan spread melebar), banyak trader memilih memperlebar stop loss, mengurangi ukuran posisi, atau menghindari membuka posisi baru tepat menjelang rilis data tersebut.$b$,\n  '/images/edukasi-calendar.jpg'\n);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_content.sql": _0002_content_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
var ACCENTS = [
	"blue",
	"orange",
	"green",
	"red"
];
var LEVELS = [
	"Pemula",
	"Menengah",
	"Lanjutan"
];
function asAccent(value) {
	return ACCENTS.includes(value) ? value : "blue";
}
function asLevel(value) {
	return LEVELS.includes(value) ? value : "Pemula";
}
function mapAnalisis(row) {
	return {
		id: row.id,
		slug: row.slug,
		pair: row.pair,
		title: row.title,
		excerpt: row.excerpt,
		body: row.body,
		imageUrl: row.image_url,
		accent: asAccent(row.accent),
		publishedAt: String(row.published_at).slice(0, 10)
	};
}
function mapEdukasi(row) {
	return {
		id: row.id,
		slug: row.slug,
		level: asLevel(row.level),
		title: row.title,
		description: row.description,
		body: row.body,
		imageUrl: row.image_url
	};
}
var imageUrlSchema = string().max(4e5).refine((v) => v === "" || v.startsWith("/") || v.startsWith("https://") || v.startsWith("http://") || v.startsWith("data:image/"), "URL gambar tidak valid");
var analisisInput = object({
	token: string().min(1),
	id: number().int().optional(),
	slug: string().optional(),
	pair: string().min(2).max(24),
	title: string().min(4).max(140),
	excerpt: string().min(8).max(240),
	body: string().min(20).max(12e3),
	imageUrl: imageUrlSchema,
	accent: _enum([
		"blue",
		"orange",
		"green",
		"red"
	]),
	publishedAt: string().regex(/^\d{4}-\d{2}-\d{2}$/)
});
var edukasiInput = object({
	token: string().min(1),
	id: number().int().optional(),
	slug: string().optional(),
	level: _enum([
		"Pemula",
		"Menengah",
		"Lanjutan"
	]),
	title: string().min(4).max(140),
	description: string().min(8).max(280),
	body: string().min(20).max(12e3),
	imageUrl: imageUrlSchema
});
async function uniqueSlug(base, table, excludeId) {
	const sql = await getSql();
	let candidate = base || "update";
	for (let i = 0; i < 20; i += 1) {
		const rows = table === "analisis" ? await sql`select id from analisis where slug = ${candidate}` : await sql`select id from edukasi where slug = ${candidate}`;
		if (!(rows[0] && rows[0].id !== excludeId)) return candidate;
		candidate = `${base}-${i + 2}`;
	}
	return `${base}-${Date.now().toString(36)}`;
}
var listAnalisis_createServerFn_handler = createServerRpc({
	id: "1dc88dcae6fe93eb94da4f3255130a984568fe840a3aa7eb5146fa345a1ab4ea",
	name: "listAnalisis",
	filename: "src/lib/content.ts"
}, (opts) => listAnalisis.__executeServer(opts));
var listAnalisis = createServerFn({ method: "GET" }).handler(listAnalisis_createServerFn_handler, async () => {
	return (await (await getSql())`
    select id, slug, pair, title, excerpt, body, image_url, accent, published_at
    from analisis
    order by published_at desc, id desc
  `).map(mapAnalisis);
});
var getAnalisisBySlug_createServerFn_handler = createServerRpc({
	id: "092e128ca51c95ecc93f0f3ac39022d05791f4f6311ab25cbcc4845d5ccc387b",
	name: "getAnalisisBySlug",
	filename: "src/lib/content.ts"
}, (opts) => getAnalisisBySlug.__executeServer(opts));
var getAnalisisBySlug = createServerFn({ method: "GET" }).validator((input) => object({ slug: string().min(1) }).parse(input)).handler(getAnalisisBySlug_createServerFn_handler, async ({ data }) => {
	const rows = await (await getSql())`
      select id, slug, pair, title, excerpt, body, image_url, accent, published_at
      from analisis
      where slug = ${data.slug}
      limit 1
    `;
	return rows[0] ? mapAnalisis(rows[0]) : null;
});
var listEdukasi_createServerFn_handler = createServerRpc({
	id: "c20dcc3d04cd6bdb88ea6f9cde598d25b918ba68922ded5fc37a52a6fe1fa0d4",
	name: "listEdukasi",
	filename: "src/lib/content.ts"
}, (opts) => listEdukasi.__executeServer(opts));
var listEdukasi = createServerFn({ method: "GET" }).handler(listEdukasi_createServerFn_handler, async () => {
	return (await (await getSql())`
    select id, slug, level, title, description, body, image_url
    from edukasi
    order by
      case level when 'Pemula' then 1 when 'Menengah' then 2 else 3 end,
      id asc
  `).map(mapEdukasi);
});
var getEdukasiBySlug_createServerFn_handler = createServerRpc({
	id: "edf0778ed7ece0bfa4e25c36eca9927d2ac4d77a1b8a8854aa8cd6b2eaa0a2b1",
	name: "getEdukasiBySlug",
	filename: "src/lib/content.ts"
}, (opts) => getEdukasiBySlug.__executeServer(opts));
var getEdukasiBySlug = createServerFn({ method: "GET" }).validator((input) => object({ slug: string().min(1) }).parse(input)).handler(getEdukasiBySlug_createServerFn_handler, async ({ data }) => {
	const rows = await (await getSql())`
      select id, slug, level, title, description, body, image_url
      from edukasi
      where slug = ${data.slug}
      limit 1
    `;
	return rows[0] ? mapEdukasi(rows[0]) : null;
});
var founderLogin_createServerFn_handler = createServerRpc({
	id: "f74c799288d9ea38826f8c2c61ad50adfe4894fa9cad1367c550c97ba8934579",
	name: "founderLogin",
	filename: "src/lib/content.ts"
}, (opts) => founderLogin.__executeServer(opts));
var founderLogin = createServerFn({ method: "POST" }).validator((input) => object({ pin: string().min(1).max(40) }).parse(input)).handler(founderLogin_createServerFn_handler, async ({ data }) => {
	const { verifyFounderPin, signFounderToken } = await import("./founder.server-Bcm-T7JU.mjs");
	if (!verifyFounderPin(data.pin)) throw new Error("PIN tidak sesuai.");
	return { token: signFounderToken() };
});
var founderPing_createServerFn_handler = createServerRpc({
	id: "c66a82137fba7211c3f3d4ee4727a45e0ce30f984601c4e247ebdd3bd41c04a9",
	name: "founderPing",
	filename: "src/lib/content.ts"
}, (opts) => founderPing.__executeServer(opts));
var founderPing = createServerFn({ method: "POST" }).validator((input) => object({ token: string() }).parse(input)).handler(founderPing_createServerFn_handler, async ({ data }) => {
	const { verifyFounderToken } = await import("./founder.server-Bcm-T7JU.mjs");
	return { ok: verifyFounderToken(data.token) };
});
var saveAnalisis_createServerFn_handler = createServerRpc({
	id: "629ca2ebc883d005029759f80a2265f5ae3c510cb6a2c5c22c474971971be1e4",
	name: "saveAnalisis",
	filename: "src/lib/content.ts"
}, (opts) => saveAnalisis.__executeServer(opts));
var saveAnalisis = createServerFn({ method: "POST" }).validator((input) => analisisInput.parse(input)).handler(saveAnalisis_createServerFn_handler, async ({ data }) => {
	const { assertFounder } = await import("./founder.server-Bcm-T7JU.mjs");
	assertFounder(data.token);
	const sql = await getSql();
	const slug = await uniqueSlug(slugify(data.slug || `${data.pair}-${data.publishedAt}-${data.title}`), "analisis", data.id);
	if (data.id) {
		await sql`
        update analisis
        set slug = ${slug},
            pair = ${data.pair.trim()},
            title = ${data.title.trim()},
            excerpt = ${data.excerpt.trim()},
            body = ${data.body.trim()},
            image_url = ${data.imageUrl},
            accent = ${data.accent},
            published_at = ${data.publishedAt}
        where id = ${data.id}
      `;
		return {
			id: data.id,
			slug
		};
	}
	return {
		id: (await sql`
      insert into analisis (slug, pair, title, excerpt, body, image_url, accent, published_at)
      values (
        ${slug},
        ${data.pair.trim()},
        ${data.title.trim()},
        ${data.excerpt.trim()},
        ${data.body.trim()},
        ${data.imageUrl},
        ${data.accent},
        ${data.publishedAt}
      )
      returning id
    `)[0]?.id ?? 0,
		slug
	};
});
var saveEdukasi_createServerFn_handler = createServerRpc({
	id: "3b7df172ee582f3298b705676b823c89063695891b34fa4fbe609906ef0d8f2b",
	name: "saveEdukasi",
	filename: "src/lib/content.ts"
}, (opts) => saveEdukasi.__executeServer(opts));
var saveEdukasi = createServerFn({ method: "POST" }).validator((input) => edukasiInput.parse(input)).handler(saveEdukasi_createServerFn_handler, async ({ data }) => {
	const { assertFounder } = await import("./founder.server-Bcm-T7JU.mjs");
	assertFounder(data.token);
	const sql = await getSql();
	const slug = await uniqueSlug(slugify(data.slug || data.title), "edukasi", data.id);
	if (data.id) {
		await sql`
        update edukasi
        set slug = ${slug},
            level = ${data.level},
            title = ${data.title.trim()},
            description = ${data.description.trim()},
            body = ${data.body.trim()},
            image_url = ${data.imageUrl}
        where id = ${data.id}
      `;
		return {
			id: data.id,
			slug
		};
	}
	return {
		id: (await sql`
      insert into edukasi (slug, level, title, description, body, image_url)
      values (
        ${slug},
        ${data.level},
        ${data.title.trim()},
        ${data.description.trim()},
        ${data.body.trim()},
        ${data.imageUrl}
      )
      returning id
    `)[0]?.id ?? 0,
		slug
	};
});
var deleteAnalisis_createServerFn_handler = createServerRpc({
	id: "45abc34176a546a7800414b01241348ac9bcc69a209b026df6129d19c54b7012",
	name: "deleteAnalisis",
	filename: "src/lib/content.ts"
}, (opts) => deleteAnalisis.__executeServer(opts));
var deleteAnalisis = createServerFn({ method: "POST" }).validator((input) => object({
	token: string(),
	id: number().int()
}).parse(input)).handler(deleteAnalisis_createServerFn_handler, async ({ data }) => {
	const { assertFounder } = await import("./founder.server-Bcm-T7JU.mjs");
	assertFounder(data.token);
	await (await getSql())`delete from analisis where id = ${data.id}`;
	return { ok: true };
});
var deleteEdukasi_createServerFn_handler = createServerRpc({
	id: "bb110a240bad51eda4b44814f742e267c3ddcda94538c2689fcf671f66cfa71a",
	name: "deleteEdukasi",
	filename: "src/lib/content.ts"
}, (opts) => deleteEdukasi.__executeServer(opts));
var deleteEdukasi = createServerFn({ method: "POST" }).validator((input) => object({
	token: string(),
	id: number().int()
}).parse(input)).handler(deleteEdukasi_createServerFn_handler, async ({ data }) => {
	const { assertFounder } = await import("./founder.server-Bcm-T7JU.mjs");
	assertFounder(data.token);
	await (await getSql())`delete from edukasi where id = ${data.id}`;
	return { ok: true };
});
//#endregion
export { deleteAnalisis_createServerFn_handler, deleteEdukasi_createServerFn_handler, founderLogin_createServerFn_handler, founderPing_createServerFn_handler, getAnalisisBySlug_createServerFn_handler, getEdukasiBySlug_createServerFn_handler, listAnalisis_createServerFn_handler, listEdukasi_createServerFn_handler, saveAnalisis_createServerFn_handler, saveEdukasi_createServerFn_handler };
