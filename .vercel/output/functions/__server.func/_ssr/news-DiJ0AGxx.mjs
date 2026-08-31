import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as NEWS, v as NewsThumb, x as getNewsCategories } from "./router-Bk59tAoS.mjs";
import { t as FilterChips } from "./filter-chips-BUVXVBJU.mjs";
import { t as PageHero } from "./page-hero-qufPRcPX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-DiJ0AGxx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewsPage() {
	const categories = (0, import_react.useMemo)(() => ["Semua", ...getNewsCategories()], []);
	const [filter, setFilter] = (0, import_react.useState)("Semua");
	const items = filter === "Semua" ? NEWS : NEWS.filter((n) => n.category === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Berita Pasar",
		title: "News Terbaru",
		description: "Berita ekonomi, emas, forex, dan kripto yang berdampak langsung ke pergerakan pasar."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 max-md:py-11",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-site",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
				options: categories,
				value: filter,
				onChange: setFilter,
				label: "Filter kategori"
			}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-sm text-subtle",
				children: "Tidak ada berita untuk kategori ini."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stagger grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/news/$slug",
					params: { slug: item.slug },
					className: "news-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-video w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsThumb, { type: item.thumb })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col gap-2.5 p-[18px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge w-fit",
								children: item.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base leading-snug font-bold",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[13.5px] text-muted",
								children: item.excerpt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: item.date
							})
						]
					})]
				}, item.slug))
			})]
		})
	})] });
}
//#endregion
export { NewsPage as component };
