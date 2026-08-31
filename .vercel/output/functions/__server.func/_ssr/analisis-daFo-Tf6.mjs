import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Route$9 } from "./router-Bk59tAoS.mjs";
import { t as AnalisisCard } from "./analisis-card-BvD47b0I.mjs";
import { t as FilterChips } from "./filter-chips-BUVXVBJU.mjs";
import { t as PageHero } from "./page-hero-qufPRcPX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analisis-daFo-Tf6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnalisisPage() {
	const items = Route$9.useLoaderData();
	const pairs = (0, import_react.useMemo)(() => ["Semua", ...[...new Set(items.map((a) => a.pair))]], [items]);
	const [filter, setFilter] = (0, import_react.useState)("Semua");
	const visible = filter === "Semua" ? items : items.filter((a) => a.pair === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Analisis Teknikal",
		title: "Analisis Terbaru",
		description: "Kumpulan analisis teknikal harian untuk pasangan Forex, Emas (XAUUSD), dan Kripto — diunggah founder langsung dari studio."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 max-md:py-11",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-site",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
				options: pairs,
				value: filter,
				onChange: setFilter,
				label: "Filter pasangan"
			}), visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-sm text-subtle",
				children: "Tidak ada analisis untuk pasangan ini."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stagger grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3",
				children: visible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalisisCard, { item }, item.slug))
			})]
		})
	})] });
}
//#endregion
export { AnalisisPage as component };
