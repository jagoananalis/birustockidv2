import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as IMPACT_LABEL, a as Route$7, y as cn } from "./router-Bk59tAoS.mjs";
import { t as FilterChips } from "./filter-chips-BUVXVBJU.mjs";
import { t as PageHero } from "./page-hero-qufPRcPX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kalender-ekonomi-BRtQLD9H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"Semua",
	"Tinggi",
	"Sedang",
	"Rendah"
];
function KalenderPage() {
	const payload = Route$7.useLoaderData();
	const [filter, setFilter] = (0, import_react.useState)("Semua");
	const items = (0, import_react.useMemo)(() => {
		if (filter === "Semua") return payload.events;
		const map = {
			Tinggi: "high",
			Sedang: "medium",
			Rendah: "low"
		};
		return payload.events.filter((e) => e.impact === map[filter]);
	}, [filter, payload.events]);
	const live = payload.source !== "fallback";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Kalender Ekonomi",
		title: "Jadwal Rilis Data Ekonomi",
		description: "Pantau jadwal rilis data ekonomi penting yang berpotensi menggerakkan pasar forex, emas, dan kripto."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 max-md:py-11",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-site",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
						options: [...FILTERS],
						value: filter,
						onChange: (v) => setFilter(v),
						label: "Filter dampak"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("badge", live ? "badge-green" : "badge-orange"),
						children: live ? "Live API" : "Mode cadangan"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-[16px] border border-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "cal-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
							"Waktu",
							"Negara",
							"Event",
							"Dampak",
							"Actual",
							"Forecast",
							"Previous"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: h }, h)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "font-mono text-[13px]",
								children: e.timeWib
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: e.country
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-xs text-subtle",
								children: e.economy
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: e.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("size-2 rounded-full", e.impact === "high" && "bg-accent-red", e.impact === "medium" && "bg-accent-orange", e.impact === "low" && "bg-accent-green"),
									"aria-hidden": "true"
								}), IMPACT_LABEL[e.impact]]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "tabular-nums",
								children: e.actual
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "tabular-nums",
								children: e.forecast
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "tabular-nums",
								children: e.previous
							})
						] }, `${e.economy}-${e.name}-${e.data}-${i}`)) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-[13.5px] text-subtle",
					children: ["Sumber: Economic Calendar API (andrevlima) — data investing.com / ForexFactory, waktu ditampilkan dalam WIB. ", live ? "Terhubung ke sumber live." : "Sumber live sedang dibatasi; menampilkan jadwal cadangan minggu ini."]
				})
			]
		})
	})] });
}
//#endregion
export { KalenderPage as component };
