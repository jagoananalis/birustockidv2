import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-CvZS28VY.js
var globalRef = globalThis;
var CACHE_MS = 6e5;
function dash(value) {
	const v = (value ?? "").replace(/\u00a0/g, " ").trim();
	return v.length ? v : "—";
}
function impactFromScore(score) {
	if (score >= 3) return "high";
	if (score >= 2) return "medium";
	return "low";
}
function impactFromLabel(label) {
	const v = label.toLowerCase();
	if (v.includes("high") || v === "3" || v.includes("red")) return {
		score: 3,
		impact: "high"
	};
	if (v.includes("med") || v === "2" || v.includes("ora") || v.includes("yel")) return {
		score: 2,
		impact: "medium"
	};
	return {
		score: 1,
		impact: "low"
	};
}
function toWib(isoOrStamp) {
	const raw = isoOrStamp.trim();
	if (!raw) return "—";
	const hasZone = /[zZ]|[+-]\d{2}:?\d{2}$/.test(raw);
	const normalized = raw.includes("T") ? raw : raw.replace(" ", "T");
	const date = new Date(hasZone ? normalized : `${normalized}Z`);
	if (Number.isNaN(date.getTime())) return raw;
	const wib = new Date(date.getTime() + 252e5);
	return `${String(wib.getUTCHours()).padStart(2, "0")}:${String(wib.getUTCMinutes()).padStart(2, "0")} WIB`;
}
function countryFromEconomy(economy) {
	const map = {
		USD: "US",
		EUR: "EU",
		GBP: "UK",
		JPY: "JP",
		AUD: "AU",
		NZD: "NZ",
		CAD: "CA",
		CHF: "CH",
		CNY: "CN",
		IDR: "ID"
	};
	const key = economy.replace(/[^A-Za-z]/g, "").slice(-3).toUpperCase();
	return map[key] ?? key.slice(0, 2) ?? "—";
}
async function fetchText(url, headers = {}) {
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), 8e3);
	try {
		const res = await fetch(url, {
			signal: ctrl.signal,
			headers: {
				Accept: "text/html,application/json,application/xml;q=0.9,*/*;q=0.8",
				"User-Agent": "Mozilla/5.0 (compatible; BirustockCalendar/1.0; +https://birustock.id)",
				...headers
			}
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		return await res.text();
	} finally {
		clearTimeout(t);
	}
}
function decodeEntities(str) {
	return str.replace(/&nbsp;/g, " ").replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function cell(row, className) {
	const re = new RegExp(`<td[^>]*class="[^"]*${className}[^"]*"[^>]*>([\\s\\S]*?)</td>`, "i");
	const m = row.match(re);
	return m ? decodeEntities(m[1]) : "";
}
/** Same source as andrevlima/economic-calendar-api: sslecal2.forexprostools.com */
function parseInvestingHtml(html) {
	const events = [];
	const rowRe = /<tr[^>]*id=["']eventRowId[^"']*["'][^>]*>([\s\S]*?)<\/tr>/gi;
	let match;
	while (match = rowRe.exec(html)) {
		const full = match[0];
		const inner = match[1];
		const ts = full.match(/event_timestamp=["']([^"']+)["']/i)?.[1] ?? "";
		const economy = cell(inner, "flagCur") || cell(inner, "flag");
		const bulls = ((inner.match(/<td[^>]*class="[^"]*sentiment[^"]*"[^>]*>([\s\S]*?)<\/td>/i)?.[1] ?? "").match(/grayFullBullishIcon/g) ?? []).length;
		const name = cell(inner, "event");
		if (!name) continue;
		const score = bulls || 1;
		events.push({
			economy: dash(economy).replace(/[^A-Za-z]/g, "").slice(-3) || "USD",
			impact: impactFromScore(score),
			impactScore: score,
			data: ts,
			name,
			actual: dash(cell(inner, "act")),
			forecast: dash(cell(inner, "fore")),
			previous: dash(cell(inner, "prev")),
			timeWib: toWib(ts),
			country: countryFromEconomy(economy)
		});
	}
	return events;
}
function parseFaireconomy(jsonText) {
	const parsed = JSON.parse(jsonText);
	return (Array.isArray(parsed) ? parsed : parsed.events ?? []).map((e) => {
		const { score, impact } = impactFromLabel(String(e.impact ?? ""));
		const economy = String(e.country ?? "USD");
		return {
			economy,
			impact,
			impactScore: score,
			data: String(e.date ?? ""),
			name: String(e.title ?? ""),
			actual: dash(e.actual),
			forecast: dash(e.forecast),
			previous: dash(e.previous),
			timeWib: toWib(String(e.date ?? "")),
			country: countryFromEconomy(economy)
		};
	}).filter((e) => e.name);
}
function fallbackEvents() {
	const now = /* @__PURE__ */ new Date();
	const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
	const mk = (dayOffset, hourUtc, economy, name, score, forecast, previous) => {
		const d = new Date(start.getTime() + dayOffset * 864e5);
		d.setUTCHours(hourUtc, 30, 0, 0);
		const iso = d.toISOString().replace("T", " ").slice(0, 19);
		return {
			economy,
			impact: impactFromScore(score),
			impactScore: score,
			data: iso,
			name,
			actual: "—",
			forecast,
			previous,
			timeWib: toWib(d.toISOString()),
			country: countryFromEconomy(economy)
		};
	};
	return [
		mk(0, 1, "CNY", "Manufacturing PMI", 2, "50.2", "49.8"),
		mk(0, 8, "EUR", "CPI Flash Estimate (YoY)", 3, "2.1%", "2.2%"),
		mk(0, 12, "USD", "Core PCE Price Index (MoM)", 3, "0.2%", "0.2%"),
		mk(0, 14, "USD", "Crude Oil Inventories", 2, "—", "-2.1M"),
		mk(1, 1, "AUD", "GDP (QoQ)", 2, "0.4%", "0.3%"),
		mk(1, 8, "GBP", "BOE Gov Speaks", 3, "—", "—"),
		mk(1, 12, "USD", "ISM Manufacturing PMI", 3, "49.5", "48.0"),
		mk(1, 12, "USD", "JOLTS Job Openings", 2, "7.40M", "7.43M"),
		mk(2, 6, "EUR", "ECB Interest Rate Decision", 3, "3.25%", "3.25%"),
		mk(2, 12, "USD", "ADP Non-Farm Employment Change", 2, "115K", "104K"),
		mk(2, 18, "USD", "FOMC Member Speaks", 2, "—", "—"),
		mk(3, 0, "JPY", "BOJ Policy Rate", 3, "0.50%", "0.50%"),
		mk(3, 12, "USD", "Initial Jobless Claims", 2, "230K", "237K"),
		mk(3, 12, "USD", "CPI (YoY)", 3, "2.8%", "2.7%"),
		mk(4, 4, "IDR", "Bank Indonesia Rate Decision", 1, "5.75%", "5.75%"),
		mk(4, 12, "USD", "Non-Farm Employment Change", 3, "140K", "147K"),
		mk(4, 12, "USD", "Unemployment Rate", 3, "4.2%", "4.2%"),
		mk(4, 12, "USD", "Average Hourly Earnings (MoM)", 2, "0.3%", "0.3%")
	];
}
async function loadLive() {
	const errors = [];
	try {
		const events = parseInvestingHtml(await fetchText("https://sslecal2.forexprostools.com/"));
		if (events.length > 0) return {
			source: "live",
			fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
			events
		};
		errors.push("investing widget empty");
	} catch (err) {
		errors.push(`investing: ${err instanceof Error ? err.message : "fail"}`);
	}
	try {
		const events = parseFaireconomy(await fetchText("https://nfs.faireconomy.media/ff_calendar_thisweek.json", { Accept: "application/json" }));
		if (events.length > 0) return {
			source: "live",
			fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
			events
		};
		errors.push("faireconomy empty");
	} catch (err) {
		errors.push(`faireconomy: ${err instanceof Error ? err.message : "fail"}`);
	}
	return {
		source: "fallback",
		fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
		events: fallbackEvents()
	};
}
var getEconomicCalendar_createServerFn_handler = createServerRpc({
	id: "fa71a036047dd102bc5b3fd67981570b4c7f2e0c5c007bf9bad5551fa5f44fa4",
	name: "getEconomicCalendar",
	filename: "src/lib/calendar.ts"
}, (opts) => getEconomicCalendar.__executeServer(opts));
var getEconomicCalendar = createServerFn({ method: "GET" }).handler(getEconomicCalendar_createServerFn_handler, async () => {
	const cached = globalRef.__ecoCalCache__;
	if (cached && Date.now() - cached.at < CACHE_MS) return {
		...cached.payload,
		source: cached.payload.source === "fallback" ? "fallback" : "cache"
	};
	const payload = await loadLive();
	globalRef.__ecoCalCache__ = {
		at: Date.now(),
		payload
	};
	return payload;
});
//#endregion
export { getEconomicCalendar_createServerFn_handler };
