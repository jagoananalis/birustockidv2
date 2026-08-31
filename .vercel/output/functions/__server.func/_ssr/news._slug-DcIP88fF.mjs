import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route, u as IconArrowRight } from "./router-Bk59tAoS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news._slug-DcIP88fF.js
var import_jsx_runtime = require_jsx_runtime();
function NewsDetail() {
	const item = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 max-md:py-11",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-site",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mx-auto max-w-[760px] stagger",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/news",
							className: "link-arrow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-block rotate-180",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowRight, { size: 15 })
							}), "Kembali ke News"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge",
							children: item.category
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[13px] text-subtle",
							children: item.date
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mb-5 text-[30px] leading-snug font-extrabold tracking-tight",
						children: item.title
					}),
					item.body.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4.5 text-base leading-relaxed text-muted",
						children: p
					}, p))
				]
			})
		})
	});
}
//#endregion
export { NewsDetail as component };
