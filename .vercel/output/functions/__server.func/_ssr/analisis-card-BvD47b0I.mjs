import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as IconArrowRight, y as cn } from "./router-Bk59tAoS.mjs";
import { t as formatIdDate } from "./format-Pwj4vlNf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analisis-card-BvD47b0I.js
var import_jsx_runtime = require_jsx_runtime();
var ACCENT = {
	blue: "",
	orange: "badge-orange",
	green: "badge-green",
	red: "badge-red"
};
function AnalisisCard({ item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/analisis/$slug",
			params: { slug: item.slug },
			className: "card-cover",
			children: item.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: item.imageUrl,
				alt: "",
				loading: "lazy"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton size-full" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("badge", ACCENT[item.accent]),
						children: item.pair
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[12px] text-subtle",
						children: formatIdDate(item.publishedAt)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[17px] leading-snug font-bold text-ink",
					children: item.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: item.excerpt
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/analisis/$slug",
					params: { slug: item.slug },
					className: "link-arrow",
					children: ["Baca Selengkapnya ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowRight, { size: 15 })]
				})
			]
		})]
	});
}
//#endregion
export { AnalisisCard as t };
