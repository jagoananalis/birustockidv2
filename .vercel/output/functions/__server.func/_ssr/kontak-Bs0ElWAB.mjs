import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as IconTikTok, h as IconTelegram, m as IconInstagram } from "./router-Bk59tAoS.mjs";
import { t as PageHero } from "./page-hero-qufPRcPX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kontak-Bs0ElWAB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KontakPage() {
	const [error, setError] = (0, import_react.useState)("");
	const [sentName, setSentName] = (0, import_react.useState)("");
	function onSubmit(e) {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData(form);
		const name = String(data.get("name") ?? "").trim();
		const email = String(data.get("email") ?? "").trim();
		const message = String(data.get("message") ?? "").trim();
		if (!name || !email || !message) {
			setError("Mohon lengkapi semua kolom terlebih dahulu.");
			return;
		}
		setError("");
		setSentName(name);
		form.reset();
	}
	if (sentName) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-site",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "enter-up mx-auto max-w-xl rounded-md border border-line bg-surface px-10 py-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mb-2.5 text-xl font-extrabold",
						children: [
							"Terima kasih, ",
							sentName,
							"!"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-5 text-muted",
						children: "Pesan kamu sudah kami terima. Tim Birustock akan merespons secepatnya."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "btn btn-primary",
						children: "Kembali ke Beranda"
					})
				]
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Hubungi Kami",
		title: "Kontak Birustock Indonesia",
		description: "Ada pertanyaan seputar analisis, kerja sama, atau masukan untuk konten kami? Kirim pesan lewat form atau kanal sosial di bawah."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 max-md:py-11",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-site grid gap-12 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				noValidate: true,
				children: [
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3.5 text-sm text-accent-red",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "name",
							className: "mb-1.5 block text-sm font-semibold",
							children: "Nama"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "name",
							name: "name",
							type: "text",
							className: "form-field",
							placeholder: "Nama lengkap",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "email",
							className: "mb-1.5 block text-sm font-semibold",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "email",
							name: "email",
							type: "email",
							className: "form-field",
							placeholder: "email@contoh.com",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "message",
							className: "mb-1.5 block text-sm font-semibold",
							children: "Pesan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "message",
							name: "message",
							rows: 5,
							className: "form-field",
							placeholder: "Tulis pesan kamu di sini...",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn btn-primary btn-block",
						children: "Kirim Pesan"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTelegram, {}),
					title: "Telegram",
					href: "https://t.me/birustockid",
					label: "t.me/birustockid"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTikTok, {}),
					title: "TikTok",
					href: "https://www.tiktok.com/@birustock.id",
					label: "@birustock.id"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactRow, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconInstagram, {}),
					title: "Instagram",
					href: "https://www.instagram.com/birustock.id",
					label: "@birustock.id"
				})
			] })]
		})
	})] });
}
function ContactRow({ icon, title, href, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex gap-3.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "icon-tile",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: "mb-1 text-[15px] font-bold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href,
			target: "_blank",
			rel: "noopener noreferrer",
			className: "text-sm text-muted hover:text-primary",
			children: label
		})] })]
	});
}
//#endregion
export { KontakPage as component };
