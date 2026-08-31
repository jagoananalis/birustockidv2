import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$1, u as IconArrowRight } from "./router-Bk59tAoS.mjs";
import { r as splitParagraphs } from "./format-Pwj4vlNf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edukasi._slug-kcLFpXnY.js
var import_jsx_runtime = require_jsx_runtime();
function EdukasiDetail() {
	const item = Route$1.useLoaderData();
	const paragraphs = splitParagraphs(item.body);
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
							to: "/edukasi",
							className: "link-arrow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-block rotate-180",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowRight, { size: 15 })
							}), "Kembali ke Edukasi"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 flex items-center gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge",
							children: item.level
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mb-6 text-[30px] leading-snug font-extrabold tracking-tight",
						children: item.title
					}),
					item.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "cover-frame mb-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.imageUrl,
							alt: item.title
						})
					}) : null,
					paragraphs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4.5 text-base leading-relaxed text-muted",
						children: p
					}, p)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-[8px] border border-line bg-bg-alt px-4.5 py-4 text-[13.5px] text-muted",
						children: "Materi ini bersifat edukasi umum untuk membantu memahami konsep dasar trading, bukan rekomendasi atau sinyal untuk membuka posisi tertentu. Selalu sesuaikan dengan riset dan toleransi risiko pribadi."
					})
				]
			})
		})
	});
}
//#endregion
export { EdukasiDetail as component };
