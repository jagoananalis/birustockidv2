import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as deleteEdukasi, D as listEdukasi, E as listAnalisis, O as saveAnalisis, S as deleteAnalisis, T as founderPing, k as saveEdukasi, w as founderLogin } from "./router-Bk59tAoS.mjs";
import { t as formatIdDate } from "./format-Pwj4vlNf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-CCcVRyFU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TOKEN_KEY = "bs-founder-token";
function StudioPage() {
	const [token, setToken] = (0, import_react.useState)(null);
	const [checking, setChecking] = (0, import_react.useState)(true);
	const [pin, setPin] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)("analisis");
	const [analisis, setAnalisis] = (0, import_react.useState)([]);
	const [edukasi, setEdukasi] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function refresh() {
		const [a, e] = await Promise.all([listAnalisis(), listEdukasi()]);
		setAnalisis(a);
		setEdukasi(e);
	}
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem(TOKEN_KEY);
		if (!stored) {
			setChecking(false);
			return;
		}
		founderPing({ data: { token: stored } }).then((res) => {
			if (res.ok) setToken(stored);
			else localStorage.removeItem(TOKEN_KEY);
		}).finally(() => setChecking(false));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!token) return;
		refresh();
	}, [token]);
	async function onLogin(e) {
		e.preventDefault();
		setError("");
		setBusy(true);
		try {
			const res = await founderLogin({ data: { pin } });
			localStorage.setItem(TOKEN_KEY, res.token);
			setToken(res.token);
			setPin("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Gagal masuk.");
		} finally {
			setBusy(false);
		}
	}
	function logout() {
		localStorage.removeItem(TOKEN_KEY);
		setToken(null);
	}
	if (checking) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-site flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-3 w-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-24 w-full max-w-md" })]
		})
	});
	if (!token) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-site",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: onLogin,
				className: "enter-up mx-auto max-w-md rounded-lg border border-line bg-surface p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Akses Founder"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 mb-2 text-2xl font-extrabold tracking-tight",
						children: "Studio Birustock"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-6 text-sm text-muted",
						children: "Unggah analisis dan materi edukasi — gambar plus deskripsi langsung tampil di situs."
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-accent-red",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "pin",
						className: "mb-1.5 block text-sm font-semibold",
						children: "PIN Studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "pin",
						type: "password",
						className: "form-field mb-4",
						value: pin,
						onChange: (e) => setPin(e.target.value),
						autoComplete: "current-password",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn btn-primary btn-block",
						disabled: busy,
						children: busy ? "Memeriksa…" : "Masuk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-center text-xs text-subtle",
						children: "PIN demo: biru2026"
					})
				]
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-12 max-md:py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-site",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Studio Founder"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 text-3xl font-extrabold tracking-tight",
							children: "Update Konten"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xl text-sm text-muted",
							children: "Analisis dan edukasi tersimpan di database. Gambar dan deskripsi yang kamu unggah langsung muncul di halaman publik."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-outline",
						onClick: logout,
						children: "Keluar"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `filter-chip ${tab === "analisis" ? "is-active" : ""}`,
						onClick: () => setTab("analisis"),
						children: "Analisis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `filter-chip ${tab === "edukasi" ? "is-active" : ""}`,
						onClick: () => setTab("edukasi"),
						children: "Edukasi"
					})]
				}),
				tab === "analisis" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalisisStudio, {
					token,
					items: analisis,
					onChange: refresh,
					busy,
					setBusy
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EdukasiStudio, {
					token,
					items: edukasi,
					onChange: refresh,
					busy,
					setBusy
				})
			]
		})
	});
}
function ImageField({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 md:grid-cols-[1fr_160px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mb-1.5 block text-sm font-semibold",
				children: "URL gambar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "form-field",
				value: value.startsWith("data:") ? "" : value,
				placeholder: "https://… atau unggah file",
				onChange: (e) => onChange(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: "image/*",
				className: "mt-2 block w-full text-xs text-subtle",
				onChange: (e) => {
					const file = e.target.files?.[0];
					if (!file) return;
					if (file.size > 35e4) {
						alert("Maksimal 350KB. Kompres dulu atau tempel URL gambar.");
						return;
					}
					const reader = new FileReader();
					reader.onload = () => onChange(String(reader.result ?? ""));
					reader.readAsDataURL(file);
				}
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "cover-frame h-24 md:h-auto",
			children: value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: value,
				alt: ""
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton size-full" })
		})]
	});
}
function AnalisisStudio({ token, items, onChange, busy, setBusy }) {
	const empty = (0, import_react.useMemo)(() => ({
		id: void 0,
		pair: "XAU/USD",
		title: "",
		excerpt: "",
		body: "",
		imageUrl: "",
		accent: "blue",
		publishedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	}), []);
	const [form, setForm] = (0, import_react.useState)(empty);
	const [error, setError] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		setError("");
		setBusy(true);
		try {
			await saveAnalisis({ data: {
				token,
				id: form.id,
				pair: form.pair,
				title: form.title,
				excerpt: form.excerpt,
				body: form.body,
				imageUrl: form.imageUrl,
				accent: form.accent,
				publishedAt: form.publishedAt
			} });
			setForm(empty);
			await onChange();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Gagal menyimpan.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "studio-shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-md border border-line bg-surface p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-sm font-bold tracking-wide text-subtle uppercase",
				children: "Daftar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex max-h-[520px] flex-col gap-2 overflow-auto",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "rounded-sm border border-line px-3 py-2.5 text-left hover:border-primary",
					onClick: () => setForm({
						id: item.id,
						pair: item.pair,
						title: item.title,
						excerpt: item.excerpt,
						body: item.body,
						imageUrl: item.imageUrl,
						accent: item.accent,
						publishedAt: item.publishedAt
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-subtle",
						children: [
							item.pair,
							" · ",
							formatIdDate(item.publishedAt)
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: item.title
					})]
				}, item.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "rounded-md border border-line bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-extrabold",
						children: form.id ? "Edit analisis" : "Analisis baru"
					}), form.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => setForm(empty),
						children: "Buat baru"
					}) : null]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-accent-red",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Pair",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "form-field",
							value: form.pair,
							onChange: (e) => setForm({
								...form,
								pair: e.target.value
							}),
							required: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tanggal",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "form-field",
							type: "date",
							value: form.publishedAt,
							onChange: (e) => setForm({
								...form,
								publishedAt: e.target.value
							}),
							required: true
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Judul",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "form-field mb-3",
						value: form.title,
						onChange: (e) => setForm({
							...form,
							title: e.target.value
						}),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Ringkasan",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "form-field mb-3",
						value: form.excerpt,
						onChange: (e) => setForm({
							...form,
							excerpt: e.target.value
						}),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Deskripsi (pisahkan paragraf dengan baris kosong)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "form-field mb-3",
						rows: 8,
						value: form.body,
						onChange: (e) => setForm({
							...form,
							body: e.target.value
						}),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
						value: form.imageUrl,
						onChange: (imageUrl) => setForm({
							...form,
							imageUrl
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Aksen",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "form-field mb-4",
						value: form.accent,
						onChange: (e) => setForm({
							...form,
							accent: e.target.value
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "blue",
								children: "Biru"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "orange",
								children: "Oranye"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "green",
								children: "Hijau"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "red",
								children: "Merah"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "btn btn-primary",
							disabled: busy,
							children: busy ? "Menyimpan…" : "Simpan"
						}),
						form.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-danger",
							disabled: busy,
							onClick: async () => {
								if (!confirm("Hapus analisis ini?")) return;
								setBusy(true);
								try {
									await deleteAnalisis({ data: {
										token,
										id: form.id
									} });
									setForm(empty);
									await onChange();
								} finally {
									setBusy(false);
								}
							},
							children: "Hapus"
						}) : null,
						form.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/analisis/$slug",
							params: { slug: items.find((i) => i.id === form.id)?.slug ?? "" },
							className: "btn btn-outline",
							children: "Lihat publik"
						}) : null
					]
				})
			]
		})]
	});
}
function EdukasiStudio({ token, items, onChange, busy, setBusy }) {
	const empty = (0, import_react.useMemo)(() => ({
		id: void 0,
		level: "Pemula",
		title: "",
		description: "",
		body: "",
		imageUrl: ""
	}), []);
	const [form, setForm] = (0, import_react.useState)(empty);
	const [error, setError] = (0, import_react.useState)("");
	async function onSubmit(e) {
		e.preventDefault();
		setError("");
		setBusy(true);
		try {
			await saveEdukasi({ data: {
				token,
				id: form.id,
				level: form.level,
				title: form.title,
				description: form.description,
				body: form.body,
				imageUrl: form.imageUrl
			} });
			setForm(empty);
			await onChange();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Gagal menyimpan.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "studio-shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-md border border-line bg-surface p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-sm font-bold tracking-wide text-subtle uppercase",
				children: "Daftar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex max-h-[520px] flex-col gap-2 overflow-auto",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "rounded-sm border border-line px-3 py-2.5 text-left hover:border-primary",
					onClick: () => setForm({
						id: item.id,
						level: item.level,
						title: item.title,
						description: item.description,
						body: item.body,
						imageUrl: item.imageUrl
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-subtle",
						children: item.level
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: item.title
					})]
				}, item.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "rounded-md border border-line bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-extrabold",
						children: form.id ? "Edit materi" : "Materi baru"
					}), form.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => setForm(empty),
						children: "Buat baru"
					}) : null]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-accent-red",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Level",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "form-field mb-3",
						value: form.level,
						onChange: (e) => setForm({
							...form,
							level: e.target.value
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Pemula" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Menengah" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Lanjutan" })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Judul",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "form-field mb-3",
						value: form.title,
						onChange: (e) => setForm({
							...form,
							title: e.target.value
						}),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Ringkasan",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "form-field mb-3",
						value: form.description,
						onChange: (e) => setForm({
							...form,
							description: e.target.value
						}),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Isi materi (pisahkan paragraf dengan baris kosong)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "form-field mb-3",
						rows: 8,
						value: form.body,
						onChange: (e) => setForm({
							...form,
							body: e.target.value
						}),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
						value: form.imageUrl,
						onChange: (imageUrl) => setForm({
							...form,
							imageUrl
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn btn-primary",
						disabled: busy,
						children: busy ? "Menyimpan…" : "Simpan"
					}), form.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-danger",
						disabled: busy,
						onClick: async () => {
							if (!confirm("Hapus materi ini?")) return;
							setBusy(true);
							try {
								await deleteEdukasi({ data: {
									token,
									id: form.id
								} });
								setForm(empty);
								await onChange();
							} finally {
								setBusy(false);
							}
						},
						children: "Hapus"
					}) : null]
				})
			]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-sm font-semibold",
			children: label
		}), children]
	});
}
//#endregion
export { StudioPage as component };
