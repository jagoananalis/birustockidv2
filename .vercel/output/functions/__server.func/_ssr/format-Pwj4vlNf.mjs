//#region node_modules/.nitro/vite/services/ssr/assets/format-Pwj4vlNf.js
var ID_MONTHS = [
	"Januari",
	"Februari",
	"Maret",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Agustus",
	"September",
	"Oktober",
	"November",
	"Desember"
];
function formatIdDate(iso) {
	const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
	if (!y || !m || !d) return iso;
	return `${d} ${ID_MONTHS[m - 1]} ${y}`;
}
function splitParagraphs(body) {
	return body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
}
function slugify(input) {
	return input.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
//#endregion
export { slugify as n, splitParagraphs as r, formatIdDate as t };
