import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, V as notFound, _ as createFileRoute, b as useRouter, d as HeadContent, f as useRouterState, g as lazyRouteComponent, h as Outlet, l as require_react_dom, m as createRouter, u as Scripts, v as createRootRoute, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as string, i as object, n as literal, o as union, r as number, t as _enum } from "../_libs/zod.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-C1p7zOu_.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-CAEaP7dO.js
var IMPACT_LABEL = {
	high: "Tinggi",
	medium: "Sedang",
	low: "Rendah"
};
var getEconomicCalendar = createServerFn({ method: "GET" }).handler(createSsrRpc("fa71a036047dd102bc5b3fd67981570b4c7f2e0c5c007bf9bad5551fa5f44fa4"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/content-HI3JfIjY.js
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
var listAnalisis = createServerFn({ method: "GET" }).handler(createSsrRpc("1dc88dcae6fe93eb94da4f3255130a984568fe840a3aa7eb5146fa345a1ab4ea"));
var getAnalisisBySlug = createServerFn({ method: "GET" }).validator((input) => object({ slug: string().min(1) }).parse(input)).handler(createSsrRpc("092e128ca51c95ecc93f0f3ac39022d05791f4f6311ab25cbcc4845d5ccc387b"));
var listEdukasi = createServerFn({ method: "GET" }).handler(createSsrRpc("c20dcc3d04cd6bdb88ea6f9cde598d25b918ba68922ded5fc37a52a6fe1fa0d4"));
var getEdukasiBySlug = createServerFn({ method: "GET" }).validator((input) => object({ slug: string().min(1) }).parse(input)).handler(createSsrRpc("edf0778ed7ece0bfa4e25c36eca9927d2ac4d77a1b8a8854aa8cd6b2eaa0a2b1"));
var founderLogin = createServerFn({ method: "POST" }).validator((input) => object({ pin: string().min(1).max(40) }).parse(input)).handler(createSsrRpc("f74c799288d9ea38826f8c2c61ad50adfe4894fa9cad1367c550c97ba8934579"));
var founderPing = createServerFn({ method: "POST" }).validator((input) => object({ token: string() }).parse(input)).handler(createSsrRpc("c66a82137fba7211c3f3d4ee4727a45e0ce30f984601c4e247ebdd3bd41c04a9"));
var saveAnalisis = createServerFn({ method: "POST" }).validator((input) => analisisInput.parse(input)).handler(createSsrRpc("629ca2ebc883d005029759f80a2265f5ae3c510cb6a2c5c22c474971971be1e4"));
var saveEdukasi = createServerFn({ method: "POST" }).validator((input) => edukasiInput.parse(input)).handler(createSsrRpc("3b7df172ee582f3298b705676b823c89063695891b34fa4fbe609906ef0d8f2b"));
var deleteAnalisis = createServerFn({ method: "POST" }).validator((input) => object({
	token: string(),
	id: number().int()
}).parse(input)).handler(createSsrRpc("45abc34176a546a7800414b01241348ac9bcc69a209b026df6129d19c54b7012"));
var deleteEdukasi = createServerFn({ method: "POST" }).validator((input) => object({
	token: string(),
	id: number().int()
}).parse(input)).handler(createSsrRpc("bb110a240bad51eda4b44814f742e267c3ddcda94538c2689fcf671f66cfa71a"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/news-BXDftyj_.js
var NEWS = [
	{
		slug: "fed-pertahankan-suku-bunga",
		date: "22 Mei 2024",
		category: "Ekonomi Global",
		thumb: "capitol",
		title: "The Fed Pertahankan Suku Bunga, Pasar Menunggu Data Inflasi",
		excerpt: "Bank sentral Amerika Serikat memutuskan mempertahankan suku bunga acuan, sembari pasar menanti rilis data inflasi berikutnya sebagai penentu arah kebijakan.",
		body: [
			"The Federal Reserve memutuskan untuk mempertahankan suku bunga acuan pada level saat ini, sesuai dengan ekspektasi mayoritas pelaku pasar.",
			"Dalam pernyataannya, bank sentral menekankan bahwa keputusan ke depan akan sangat bergantung pada perkembangan data inflasi dan tenaga kerja.",
			"Pasar keuangan global merespons dengan volatilitas terbatas, sembari menunggu rilis data inflasi berikutnya sebagai indikator arah kebijakan suku bunga selanjutnya."
		]
	},
	{
		slug: "emas-menguat-ketidakpastian-global",
		date: "22 Mei 2024",
		category: "Emas",
		thumb: "gold",
		title: "Emas Menguat di Tengah Ketidakpastian Global",
		excerpt: "Harga emas mencatat penguatan seiring meningkatnya permintaan aset safe haven di tengah ketidakpastian ekonomi dan geopolitik global.",
		body: [
			"Harga emas dunia bergerak menguat, didorong oleh meningkatnya minat investor terhadap aset safe haven.",
			"Ketidakpastian geopolitik serta ekspektasi kebijakan moneter yang beragam turut menjadi faktor pendukung penguatan harga emas.",
			"Analis menilai tren ini berpotensi berlanjut selama sentimen ketidakpastian global masih membayangi pasar."
		]
	},
	{
		slug: "etf-bitcoin-inflow-tertinggi",
		date: "21 Mei 2024",
		category: "Kripto",
		thumb: "bitcoin",
		title: "ETF Bitcoin Spot Catat Inflow Tertinggi dalam 2 Minggu",
		excerpt: "Produk ETF Bitcoin spot mencatatkan arus masuk dana tertinggi dalam dua minggu terakhir, menandakan minat institusi yang kembali meningkat.",
		body: [
			"Sejumlah produk ETF Bitcoin spot mencatatkan arus masuk dana (inflow) tertinggi dalam dua minggu terakhir.",
			"Peningkatan ini mengindikasikan minat investor institusi terhadap aset kripto kembali menguat.",
			"Para pelaku pasar akan memantau apakah tren inflow ini dapat berlanjut dan memberi dampak positif terhadap harga Bitcoin secara keseluruhan."
		]
	},
	{
		slug: "data-tenaga-kerja-as",
		date: "19 Mei 2024",
		category: "Ekonomi Global",
		thumb: "capitol",
		title: "Data Tenaga Kerja AS Jadi Sorotan Pelaku Pasar Minggu Ini",
		excerpt: "Rilis data tenaga kerja Amerika Serikat pekan ini diperkirakan akan menjadi katalis penting bagi pergerakan dolar dan pasar global.",
		body: [
			"Pelaku pasar tengah menantikan rilis data tenaga kerja Amerika Serikat yang dijadwalkan pekan ini.",
			"Data ini berpotensi memberikan gambaran lebih jelas mengenai kondisi ekonomi AS dan arah kebijakan moneter ke depan.",
			"Pergerakan dolar AS dan pasar global diperkirakan akan cukup sensitif terhadap hasil rilis data tersebut."
		]
	}
];
function getNews(slug) {
	return NEWS.find((item) => item.slug === slug);
}
function getNewsCategories() {
	return [...new Set(NEWS.map((item) => item.category))];
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bk59tAoS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = require_react_dom();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/**
* Official-style Birustock mark: three stacked parallelograms forming a
* geometric B — cyan top bar, mid blue bar, navy triangle — with a soft shadow.
*/
function BrandMark({ className }) {
	const uid = (0, import_react.useId)().replace(/:/g, "");
	const top = `gTop-${uid}`;
	const mid = `gMid-${uid}`;
	const bot = `gBot-${uid}`;
	const shadow = `sh-${uid}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: cn("brand-mark", className),
		viewBox: "0 0 68 86",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		focusable: "false",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: top,
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0",
						stopColor: "#5AC8FA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "#1A7CFF"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: mid,
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0",
						stopColor: "#2B7BFF"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "#0D4FD8"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: bot,
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0",
						stopColor: "#1A5FE8"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "#0836B8"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
					id: shadow,
					x: "-25%",
					y: "-12%",
					width: "160%",
					height: "150%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", {
						dx: "1",
						dy: "1.6",
						stdDeviation: "1.2",
						floodColor: "#0A3A90",
						floodOpacity: "0.28"
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				filter: `url(#${shadow})`,
				fill: `url(#${top})`,
				d: "M7 36 L14 12 L60 6 L53 30 Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				filter: `url(#${shadow})`,
				fill: `url(#${mid})`,
				d: "M7 58 L13 38 L52 32 L46 52 Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				filter: `url(#${shadow})`,
				fill: `url(#${bot})`,
				d: "M7 80 L13 60 L40 54 L24 80 Z"
			})
		]
	});
}
function BrandLockup({ size = "md", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("brand-lockup", size === "lg" && "brand-lockup-lg", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "brand-divider",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "brand-wordmark",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "brand-name",
					children: "Birustock"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "brand-sub",
					children: "Indonesia"
				})]
			})
		]
	});
}
var FOOTER_LINKS = [
	{
		to: "/analisis",
		label: "Analisis"
	},
	{
		to: "/news",
		label: "News"
	},
	{
		to: "/edukasi",
		label: "Edukasi"
	},
	{
		to: "/kontak",
		label: "Kontak"
	},
	{
		to: "/kalender-ekonomi",
		label: "Kalender Ekonomi"
	},
	{
		to: "/profil",
		label: "Profil"
	}
];
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-line bg-bg-alt pt-12 pb-7",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-site",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 pb-8 md:grid-cols-[1.2fr_1fr_1.4fr]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "Birustock Indonesia — Beranda",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3.5 text-[13px] text-subtle",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Birustock ID. All rights reserved."
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "mb-3.5 text-xs font-bold tracking-[0.08em] text-subtle",
						children: "LINK CEPAT"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-x-6 gap-y-2.5",
						children: FOOTER_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: "text-sm text-muted transition-colors hover:text-primary",
							children: item.label
						}, item.to))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "mb-3.5 text-xs font-bold tracking-[0.08em] text-subtle",
						children: "DISCLAIMER"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] leading-relaxed text-muted",
						children: "Konten ini hanya bersifat informatif dan tidak dimaksudkan sebagai saran atau rekomendasi investasi. Trading memiliki risiko kerugian."
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-[13px] text-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Birustock Indonesia — Analisis. Edukasi. Insight." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/studio",
					className: "hover:text-primary",
					children: "Studio Founder"
				})]
			})]
		})
	});
}
function IconTikTok({ size = 20, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16.5 2h-3v13.2a2.8 2.8 0 1 1-2-2.68V9.4a5.8 5.8 0 1 0 5 5.75V9.1a7.4 7.4 0 0 0 4.5 1.53v-3a4.4 4.4 0 0 1-4.5-4.4V2z" })
	});
}
function IconTelegram({ size = 20, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 4 3 11.2l6 2.1M21 4 14.8 20l-5.8-6.7M21 4 9 13.3" })
	});
}
function IconInstagram({ size = 20, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		"aria-hidden": "true",
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "3",
				width: "18",
				height: "18",
				rx: "5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "17.2",
				cy: "6.8",
				r: "1.1",
				fill: "currentColor",
				stroke: "none"
			})
		]
	});
}
function IconSearch({ size = 20, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		strokeLinecap: "round",
		"aria-hidden": "true",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "10.5",
			cy: "10.5",
			r: "6.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "21",
			y1: "21",
			x2: "15.5",
			y2: "15.5"
		})]
	});
}
function IconArrowRight({ size = 16, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "4",
			y1: "12",
			x2: "19",
			y2: "12"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "13 6 19 12 13 18" })]
	});
}
function IconTrendUp({ size = 20, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "3 17 10 10 14 14 21 6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "15 6 21 6 21 12" })]
	});
}
function IconDocument({ size = 20, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 2.5h8l4 4V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 2.5V7h4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "8",
				y1: "12",
				x2: "16",
				y2: "12"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "8",
				y1: "15.5",
				x2: "16",
				y2: "15.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "8",
				y1: "19",
				x2: "13",
				y2: "19"
			})
		]
	});
}
function IconGraduation({ size = 20, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6.5 11v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21.5 9v6" })
		]
	});
}
function IconCalendar({ size = 20, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		className,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "5",
				width: "18",
				height: "16",
				rx: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "3",
				y1: "10",
				x2: "21",
				y2: "10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "8",
				y1: "2.5",
				x2: "8",
				y2: "6.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "16",
				y1: "2.5",
				x2: "16",
				y2: "6.5"
			})
		]
	});
}
function CandlestickPattern() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 580 120",
		xmlns: "http://www.w3.org/2000/svg",
		preserveAspectRatio: "xMidYMid meet",
		"aria-hidden": "true",
		children: [
			22,
			34,
			18,
			40,
			28,
			46,
			30,
			52,
			24,
			38,
			44,
			20,
			32,
			48,
			26,
			36
		].map((h, i) => {
			const x = 20 + i * 34;
			const wickTop = 60 - h / 2 - 14;
			const wickBottom = 60 + h / 2 + 14;
			const y = 60 - h / 2;
			const fill = i % 3 !== 0 ? "#8eb4ff" : "#3a3a44";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x + 6,
				y1: wickTop,
				x2: x + 6,
				y2: wickBottom,
				stroke: fill,
				strokeWidth: "1.5"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x,
				y,
				width: "12",
				height: h,
				fill,
				rx: "1.5"
			})] }, i);
		})
	});
}
function NewsThumb({ type }) {
	if (type === "capitol") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		width: "100%",
		height: "100%",
		preserveAspectRatio: "xMidYMid slice",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "64",
				height: "64",
				fill: "#1e2a4a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "20",
				r: "7",
				fill: "#d7dee8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "29",
				y: "12",
				width: "6",
				height: "6",
				fill: "#d7dee8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "14,30 32,20 50,30",
				fill: "#c3ccdb"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "16",
				y: "30",
				width: "4",
				height: "18",
				fill: "#c3ccdb"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "24",
				y: "30",
				width: "4",
				height: "18",
				fill: "#c3ccdb"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "32",
				y: "30",
				width: "4",
				height: "18",
				fill: "#c3ccdb"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "40",
				y: "30",
				width: "4",
				height: "18",
				fill: "#c3ccdb"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "12",
				y: "48",
				width: "40",
				height: "5",
				fill: "#c3ccdb"
			})
		]
	});
	if (type === "gold") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		width: "100%",
		height: "100%",
		preserveAspectRatio: "xMidYMid slice",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "goldGrad",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0",
					stopColor: "#f6d778"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#c8952f"
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "64",
				height: "64",
				fill: "#2b2118"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				transform: "translate(8,36)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "0,10 6,0 42,0 48,10 42,18 6,18",
					fill: "url(#goldGrad)",
					stroke: "#8a6416",
					strokeWidth: "1"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				transform: "translate(12,20)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "0,10 5,2 37,2 42,10 37,16 5,16",
					fill: "url(#goldGrad)",
					stroke: "#8a6416",
					strokeWidth: "1"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		width: "100%",
		height: "100%",
		preserveAspectRatio: "xMidYMid slice",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "64",
				height: "64",
				fill: "#1b1607"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "32",
				cy: "32",
				r: "18",
				fill: "#f7931a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "32",
				y: "39",
				fontFamily: "Arial, sans-serif",
				fontSize: "22",
				fontWeight: "700",
				fill: "#1b1607",
				textAnchor: "middle",
				children: "B"
			})
		]
	});
}
var SOCIAL_ICONS = {
	tiktok: IconTikTok,
	telegram: IconTelegram,
	instagram: IconInstagram
};
function SocialIcon({ id, size = 20 }) {
	const Icon = SOCIAL_ICONS[id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size });
}
var NAV_ITEMS = [
	{
		to: "/",
		label: "Beranda"
	},
	{
		to: "/analisis",
		label: "Analisis"
	},
	{
		to: "/news",
		label: "News"
	},
	{
		to: "/edukasi",
		label: "Edukasi"
	},
	{
		to: "/kalender-ekonomi",
		label: "Kalender Ekonomi"
	},
	{
		to: "/profil",
		label: "Profil"
	},
	{
		to: "/kontak",
		label: "Kontak"
	}
];
var SOCIAL_LINKS = [
	{
		href: "https://www.tiktok.com/@birustock.id",
		label: "TikTok",
		id: "tiktok"
	},
	{
		href: "https://t.me/birustockid",
		label: "Telegram",
		id: "telegram"
	},
	{
		href: "https://www.instagram.com/birustock.id",
		label: "Instagram",
		id: "instagram"
	}
];
function isNavActive(pathname, href) {
	if (href === "/") return pathname === "/";
	return pathname === href || pathname.startsWith(`${href}/`);
}
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const toggleRef = (0, import_react.useRef)(null);
	const drawerRef = (0, import_react.useRef)(null);
	const menuId = (0, import_react.useId)();
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		const body = document.body;
		if (open) {
			const scrollbar = window.innerWidth - document.documentElement.clientWidth;
			body.classList.add("nav-locked");
			if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
		} else {
			body.classList.remove("nav-locked");
			body.style.paddingRight = "";
		}
		return () => {
			body.classList.remove("nav-locked");
			body.style.paddingRight = "";
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const drawer = drawerRef.current;
		if (!drawer) return;
		const focusable = () => Array.from(drawer.querySelectorAll("a[href], button:not([disabled])")).filter((el) => !el.hasAttribute("disabled"));
		(focusable()[0] ?? toggleRef.current)?.focus();
		const onKey = (e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				setOpen(false);
				toggleRef.current?.focus();
				return;
			}
			if (e.key !== "Tab") return;
			const list = focusable();
			if (list.length === 0) return;
			const first = list[0];
			const last = list[list.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open]);
	const closeMenu = () => {
		setOpen(false);
		toggleRef.current?.focus();
	};
	const menu = mounted ? (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mobile-overlay", open && "is-open"),
		onClick: closeMenu,
		"aria-hidden": "true"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: drawerRef,
		id: menuId,
		className: cn("mobile-drawer", open && "is-open"),
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Menu navigasi",
		inert: !open,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "mobile-nav",
			"aria-label": "Navigasi seluler",
			children: NAV_ITEMS.map((item) => {
				const active = isNavActive(pathname, item.to);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					className: "mobile-nav-link",
					"aria-current": active ? "page" : void 0,
					onClick: () => setOpen(false),
					children: item.label
				}, item.to);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mobile-drawer-foot",
			children: SOCIAL_LINKS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: s.href,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "mobile-social",
				"aria-label": s.label,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
					id: s.id,
					size: 20
				})
			}, s.id))
		})]
	})] }), document.body) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "site-header",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-site header-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "shrink-0",
					"aria-label": "Birustock Indonesia — Beranda",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "desktop-nav",
					"aria-label": "Navigasi utama",
					children: NAV_ITEMS.map((item) => {
						const active = isNavActive(pathname, item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: "nav-link",
							"aria-current": active ? "page" : void 0,
							children: item.label
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "header-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "header-social",
							children: SOCIAL_LINKS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: s.href,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "header-icon-btn",
								"aria-label": s.label,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
									id: s.id,
									size: 18
								})
							}, s.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/news",
							className: "header-icon-btn",
							"aria-label": "Cari berita",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSearch, { size: 18 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							ref: toggleRef,
							type: "button",
							className: "nav-toggle",
							"aria-expanded": open,
							"aria-controls": menuId,
							"aria-label": open ? "Tutup menu" : "Buka menu",
							onClick: () => setOpen((v) => !v),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "nav-toggle-box",
								"aria-hidden": "true",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nav-toggle-line" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nav-toggle-line" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nav-toggle-line" })
								]
							})
						})
					]
				})
			]
		})
	}), menu] });
}
function SiteShell({ children }) {
	const [booting, setBooting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (sessionStorage.getItem("bs-booted")) return;
		setBooting(true);
		const t = window.setTimeout(() => {
			sessionStorage.setItem("bs-booted", "1");
			setBooting(false);
		}, 1400);
		return () => window.clearTimeout(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-ink",
		children: [
			booting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "boot-screen",
				role: "status",
				"aria-label": "Memuat Birustock",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "boot-mark",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, { size: "lg" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "boot-bar",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "boot-bar-fill" })
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function RoutePending() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "route-pending",
		role: "progressbar",
		"aria-label": "Memuat halaman",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "route-pending-fill" })
	});
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-accent-red",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Terjadi kesalahan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "Terjadi kesalahan tak terduga. Muat ulang halaman."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-site py-16 text-center stagger",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 mb-3 text-4xl font-extrabold tracking-tight text-ink",
					children: "Halaman tidak ditemukan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-6 text-muted",
					children: "Halaman yang kamu cari tidak tersedia atau sudah dipindahkan."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "btn btn-primary",
					children: "Kembali ke Beranda"
				})
			]
		})
	});
}
var styles_default = "/assets/styles-DB4OqunX.css";
var APP_NAME = "Birustock Indonesia";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Analisis teknikal, berita pasar, dan edukasi trading Crypto, Forex, dan Gold oleh Birustock Indonesia."
			},
			{
				name: "theme-color",
				content: "#070708"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	notFoundComponent: NotFoundPage,
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "id",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$10 = () => import("./routes-Lu7mqtXV.mjs");
var Route$10 = createFileRoute("/")({
	loader: async () => {
		const [analisis, calendar] = await Promise.all([listAnalisis(), getEconomicCalendar()]);
		return {
			analisis,
			calendar
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "Beranda | Birustock Indonesia" }, {
		name: "description",
		content: "Insight pasar, keputusan lebih baik. Analisis teknikal, berita, dan edukasi trading Crypto, Forex, dan Gold."
	}] })
});
var $$splitComponentImporter$9 = () => import("./analisis-daFo-Tf6.mjs");
var Route$9 = createFileRoute("/analisis")({
	loader: () => listAnalisis(),
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({ meta: [{ title: "Analisis Terbaru | Birustock Indonesia" }] })
});
var $$splitComponentImporter$8 = () => import("./edukasi-CqlW-H1T.mjs");
var Route$8 = createFileRoute("/edukasi")({
	loader: () => listEdukasi(),
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({ meta: [{ title: "Edukasi Trading | Birustock Indonesia" }] })
});
var $$splitComponentImporter$7 = () => import("./kalender-ekonomi-BRtQLD9H.mjs");
var Route$7 = createFileRoute("/kalender-ekonomi")({
	loader: () => getEconomicCalendar(),
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [{ title: "Kalender Ekonomi | Birustock Indonesia" }] })
});
var $$splitComponentImporter$6 = () => import("./kontak-Bs0ElWAB.mjs");
var Route$6 = createFileRoute("/kontak")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Kontak | Birustock Indonesia" }] })
});
var $$splitComponentImporter$5 = () => import("./news-DiJ0AGxx.mjs");
var Route$5 = createFileRoute("/news")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "News Terbaru | Birustock Indonesia" }] })
});
var $$splitComponentImporter$4 = () => import("./profil-feWeexwu.mjs");
var Route$4 = createFileRoute("/profil")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Profil | Birustock Indonesia" }] })
});
var $$splitComponentImporter$3 = () => import("./studio-CCcVRyFU.mjs");
var Route$3 = createFileRoute("/studio")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Studio Founder | Birustock Indonesia" }] })
});
var $$splitComponentImporter$2 = () => import("./analisis._slug-B0A8eGMa.mjs");
var Route$2 = createFileRoute("/analisis/$slug")({
	loader: async ({ params }) => {
		const item = await getAnalisisBySlug({ data: { slug: params.slug } });
		if (!item) throw notFound();
		return item;
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Analisis"} | Birustock Indonesia` }, {
		name: "description",
		content: loaderData?.excerpt ?? ""
	}] })
});
var $$splitComponentImporter$1 = () => import("./edukasi._slug-kcLFpXnY.mjs");
var Route$1 = createFileRoute("/edukasi/$slug")({
	loader: async ({ params }) => {
		const item = await getEdukasiBySlug({ data: { slug: params.slug } });
		if (!item) throw notFound();
		return item;
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Edukasi"} | Birustock Indonesia` }, {
		name: "description",
		content: loaderData?.description ?? ""
	}] })
});
var $$splitComponentImporter = () => import("./news._slug-DcIP88fF.mjs");
var Route = createFileRoute("/news/$slug")({
	loader: ({ params }) => {
		const item = getNews(params.slug);
		if (!item) throw notFound();
		return item;
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "News"} | Birustock Indonesia` }, {
		name: "description",
		content: loaderData?.excerpt ?? ""
	}] })
});
var IndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var AnalisisRoute = Route$9.update({
	id: "/analisis",
	path: "/analisis",
	getParentRoute: () => Route$11
});
var EdukasiRoute = Route$8.update({
	id: "/edukasi",
	path: "/edukasi",
	getParentRoute: () => Route$11
});
var KalenderEkonomiRoute = Route$7.update({
	id: "/kalender-ekonomi",
	path: "/kalender-ekonomi",
	getParentRoute: () => Route$11
});
var KontakRoute = Route$6.update({
	id: "/kontak",
	path: "/kontak",
	getParentRoute: () => Route$11
});
var NewsRoute = Route$5.update({
	id: "/news",
	path: "/news",
	getParentRoute: () => Route$11
});
var ProfilRoute = Route$4.update({
	id: "/profil",
	path: "/profil",
	getParentRoute: () => Route$11
});
var StudioRoute = Route$3.update({
	id: "/studio",
	path: "/studio",
	getParentRoute: () => Route$11
});
var AnalisisSlugRoute = Route$2.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => AnalisisRoute
});
var EdukasiSlugRoute = Route$1.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => EdukasiRoute
});
var NewsSlugRoute = Route.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => NewsRoute
});
var AnalisisRouteChildren = { AnalisisSlugRoute };
var AnalisisRouteWithChildren = AnalisisRoute._addFileChildren(AnalisisRouteChildren);
var EdukasiRouteChildren = { EdukasiSlugRoute };
var EdukasiRouteWithChildren = EdukasiRoute._addFileChildren(EdukasiRouteChildren);
var NewsRouteChildren = { NewsSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	AnalisisRoute: AnalisisRouteWithChildren,
	EdukasiRoute: EdukasiRouteWithChildren,
	KalenderEkonomiRoute,
	KontakRoute,
	NewsRoute: NewsRoute._addFileChildren(NewsRouteChildren),
	ProfilRoute,
	StudioRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPendingComponent: RoutePending,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { IMPACT_LABEL as A, deleteEdukasi as C, listEdukasi as D, listAnalisis as E, saveAnalisis as O, deleteAnalisis as S, founderPing as T, IconTrendUp as _, Route$7 as a, NEWS as b, Route$10 as c, IconCalendar as d, IconDocument as f, IconTikTok as g, IconTelegram as h, Route$2 as i, saveEdukasi as k, CandlestickPattern as l, IconInstagram as m, Route as n, Route$8 as o, IconGraduation as p, Route$1 as r, Route$9 as s, router_exports as t, IconArrowRight as u, NewsThumb as v, founderLogin as w, getNewsCategories as x, cn as y };
