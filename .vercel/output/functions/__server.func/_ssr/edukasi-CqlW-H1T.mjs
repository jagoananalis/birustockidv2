import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Route$8, u as IconArrowRight } from "./router-Bk59tAoS.mjs";
import { t as PageHero } from "./page-hero-qufPRcPX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edukasi-CqlW-H1T.js
var import_jsx_runtime = require_jsx_runtime();
function EdukasiCard({ item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/edukasi/$slug",
		params: { slug: item.slug },
		className: "edu-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "card-cover",
			children: item.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: item.imageUrl,
				alt: "",
				loading: "lazy"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton size-full" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "edu-card-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-bold tracking-wide text-primary uppercase",
					children: item.level
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[17px] font-bold",
					children: item.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: item.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "link-arrow mt-2",
					children: ["Baca Materi ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowRight, { size: 15 })]
				})
			]
		})]
	});
}
function EdukasiPage() {
	const items = Route$8.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Edukasi Trading",
		title: "Belajar dari Dasar hingga Lanjutan",
		description: "Materi edukasi seputar forex, emas, dan kripto — diunggah founder, lengkap dengan gambar dan penjelasan."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 max-md:py-11",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-site",
			children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-subtle",
				children: "Belum ada materi. Founder bisa menambahkan lewat Studio."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stagger grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EdukasiCard, { item }, item.slug))
			})
		})
	})] });
}
//#endregion
export { EdukasiPage as component };
