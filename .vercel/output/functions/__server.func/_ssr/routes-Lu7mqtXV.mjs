import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as IconTrendUp, b as NEWS, c as Route$10, d as IconCalendar, f as IconDocument, g as IconTikTok, p as IconGraduation, u as IconArrowRight, v as NewsThumb, y as cn } from "./router-Bk59tAoS.mjs";
import { t as formatIdDate } from "./format-Pwj4vlNf.mjs";
import { t as AnalisisCard } from "./analisis-card-BvD47b0I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Lu7mqtXV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ACCENT = {
	blue: "",
	orange: "badge-orange",
	green: "badge-green",
	red: "badge-red"
};
function HeroSlider({ items }) {
	const slides = items.slice(0, 4);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const touchX = (0, import_react.useRef)(null);
	const go = (0, import_react.useCallback)((next) => {
		if (slides.length === 0) return;
		setIndex((next + slides.length) % slides.length);
	}, [slides.length]);
	(0, import_react.useEffect)(() => {
		if (paused || slides.length < 2) return;
		const id = window.setInterval(() => go(index + 1), 5600);
		return () => window.clearInterval(id);
	}, [
		go,
		index,
		paused,
		slides.length
	]);
	if (slides.length === 0) return null;
	const current = slides[index];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hero-slider enter-up",
		onMouseEnter: () => setPaused(true),
		onMouseLeave: () => setPaused(false),
		onTouchStart: (e) => {
			touchX.current = e.changedTouches[0]?.clientX ?? null;
		},
		onTouchEnd: (e) => {
			const start = touchX.current;
			const end = e.changedTouches[0]?.clientX;
			touchX.current = null;
			if (start == null || end == null) return;
			const delta = end - start;
			if (delta > 40) go(index - 1);
			if (delta < -40) go(index + 1);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero-track",
				style: { transform: `translateX(-${index * 100}%)` },
				children: slides.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "hero-slide",
					"aria-hidden": i !== index,
					children: [
						item.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.imageUrl,
							alt: "",
							draggable: false,
							loading: i === 0 ? "eager" : "lazy"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-slide-veil" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-slide-copy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("badge w-fit", ACCENT[item.accent]),
									children: item.pair
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs tracking-wide text-subtle uppercase",
									children: formatIdDate(item.publishedAt)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-3xl leading-tight font-extrabold tracking-tight max-md:text-2xl",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-md text-sm text-muted",
									children: item.excerpt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/analisis/$slug",
									params: { slug: item.slug },
									className: "btn btn-primary mt-6 w-fit",
									children: ["Baca Analisis ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowRight, { size: 15 })]
								})
							]
						})
					]
				}, item.slug))
			}),
			slides.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "hero-nav-btn prev",
					"aria-label": "Slide sebelumnya",
					onClick: () => go(index - 1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-block rotate-180",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowRight, { size: 16 })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "hero-nav-btn next",
					"aria-label": "Slide berikutnya",
					onClick: () => go(index + 1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowRight, { size: 16 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-dots",
					role: "tablist",
					"aria-label": "Pilih analisis",
					children: slides.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("hero-dot", i === index && "is-active"),
						"aria-label": `Slide ${i + 1}: ${item.pair}`,
						"aria-current": i === index,
						onClick: () => go(i)
					}, item.slug))
				})
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				"aria-live": "polite",
				children: current?.title
			})
		]
	});
}
function MarketTicker({ events }) {
	const items = events.filter((e) => e.impact === "high").slice(0, 10);
	if (items.length === 0) return null;
	const loop = [...items, ...items];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ticker",
		"aria-label": "Jadwal data berdampak tinggi",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ticker-track",
			children: loop.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "ticker-item",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", e.impact === "high" && "bg-accent-red", e.impact === "medium" && "bg-accent-orange", e.impact === "low" && "bg-accent-green") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] text-subtle",
						children: e.timeWib
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-ink",
						children: e.economy
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: e.name })
				]
			}, `${e.name}-${i}`))
		})
	});
}
function Home() {
	const { analisis, calendar } = Route$10.useLoaderData();
	const topAnalisis = analisis.slice(0, 3);
	const topNews = NEWS.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketTicker, { events: calendar.events }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-site grid items-center gap-10 py-14 max-md:py-8 md:grid-cols-[1.02fr_0.98fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stagger",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Analisis. Edukasi. Insight."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-3.5 mb-5 text-5xl leading-[1.12] font-extrabold tracking-tight text-ink max-md:text-4xl",
							children: [
								"Insight Pasar,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Keputusan Lebih Baik."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-8 max-w-md text-base text-muted",
							children: "Birustock ID menyediakan analisis teknikal, berita pasar, dan edukasi trading untuk membantu kamu memahami pergerakan Crypto, Forex, dan Gold."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/analisis",
								className: "btn btn-primary",
								children: "Lihat Analisis Terbaru"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://www.tiktok.com/@birustock.id",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "btn btn-outline",
								children: ["Ikuti TikTok Kami ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTikTok, { size: 16 })]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSlider, { items: analisis })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-16 max-md:py-11",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-site grid items-start gap-10 lg:grid-cols-[1fr_340px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-extrabold tracking-tight",
						children: "Analisis Terbaru"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/analisis",
						className: "link-arrow",
						children: ["Lihat Semua ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowRight, { size: 15 })]
					})]
				}), topAnalisis.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-subtle",
					children: "Belum ada analisis. Founder bisa menambahkan lewat Studio."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "stagger grid gap-5 md:grid-cols-3",
					children: topAnalisis.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalisisCard, { item }, item.slug))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-md border border-line bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-5 text-xl font-extrabold",
							children: "Berita Terbaru"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-4",
							children: topNews.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/news/$slug",
								params: { slug: item.slug },
								className: "flex gap-3.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-16 shrink-0 overflow-hidden rounded-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsThumb, { type: item.thumb })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-1 text-xs text-subtle",
									children: item.date
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-sm leading-snug font-bold",
									children: item.title
								})] })]
							}, item.slug))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/news",
							className: "link-arrow mt-5",
							children: ["Lihat Semua Berita ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconArrowRight, { size: 15 })]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line bg-bg-alt py-11",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-site grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTrendUp, {}),
						title: "Analisis Terstruktur",
						desc: "Analisis teknikal harian dan mingguan dengan level penting."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconDocument, {}),
						title: "News Update",
						desc: "Informasi pasar terkini dan berdampak langsung ke market."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconGraduation, {}),
						title: "Edukasi Trading",
						desc: "Belajar trading dari dasar hingga strategi lanjutan."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feature, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconCalendar, {}),
						title: "Kalender Ekonomi",
						desc: "Jadwal rilis data ekonomi penting untuk trader."
					})
				]
			})
		})
	] });
}
function Feature({ icon, title, desc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "icon-tile",
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
export { Home as component };
