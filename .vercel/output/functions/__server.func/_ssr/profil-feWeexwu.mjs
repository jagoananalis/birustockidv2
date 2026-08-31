import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as IconTrendUp, d as IconCalendar, f as IconDocument, l as CandlestickPattern, p as IconGraduation } from "./router-Bk59tAoS.mjs";
import { t as PageHero } from "./page-hero-qufPRcPX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profil-feWeexwu.js
var import_jsx_runtime = require_jsx_runtime();
function ProfilPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Tentang Kami",
			title: "Profil Birustock Indonesia",
			description: "Mengenal lebih dekat siapa kami dan apa yang kami kerjakan setiap hari untuk komunitas trader Indonesia."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 max-md:py-11",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-site",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center gap-12 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stagger",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-4 text-2xl font-extrabold tracking-tight",
								children: "Siapa Kami"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-4 leading-relaxed text-muted",
								children: "Birustock Indonesia adalah platform edukasi dan analisis pasar yang berfokus pada Forex, Emas (XAUUSD), dan Kripto. Kami hadir melalui konten TikTok dan website untuk membantu trader Indonesia memahami pergerakan pasar dengan cara yang mudah dicerna."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "leading-relaxed text-muted",
								children: "Setiap analisis yang kami bagikan disusun berdasarkan pembacaan teknikal, bukan ajakan investasi. Tujuan kami sederhana: membuat insight pasar lebih mudah diakses siapa saja."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 grid grid-cols-3 gap-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										num: "3",
										label: "Fokus Instrumen"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										num: "Harian",
										label: "Update Analisis"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										num: "TikTok",
										label: "Kanal Utama"
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative flex min-h-72 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute inset-0 flex items-center opacity-70",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandlestickPattern, {})
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line bg-bg-alt py-11",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-site",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-6 text-xl font-extrabold tracking-tight",
					children: "Nilai yang Kami Pegang"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTrendUp, {}),
							title: "Berbasis Data",
							desc: "Analisis disusun dari pembacaan chart dan struktur pasar, bukan tebakan."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconDocument, {}),
							title: "Transparan",
							desc: "Kami selalu mencantumkan disclaimer risiko pada setiap konten.",
							tile: "icon-tile-orange"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconGraduation, {}),
							title: "Edukatif",
							desc: "Konten disusun agar mudah dipahami, dari pemula hingga trader berpengalaman.",
							tile: "icon-tile-green"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCalendar, {}),
							title: "Konsisten",
							desc: "Update analisis dan berita pasar secara rutin setiap hari."
						})
					]
				})]
			})
		})
	] });
}
function Stat({ num, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-[28px] font-extrabold text-primary",
		children: num
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-[13px] text-muted",
		children: label
	})] });
}
function Value({ icon, title, desc, tile }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `icon-tile ${tile ?? ""}`,
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: "mb-1.5 text-[15px] font-bold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: desc
		})] })]
	});
}
//#endregion
export { ProfilPage as component };
