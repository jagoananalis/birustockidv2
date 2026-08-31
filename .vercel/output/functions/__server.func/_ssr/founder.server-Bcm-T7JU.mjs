import { createHmac, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/founder.server-Bcm-T7JU.js
var PIN = "biru2026";
var SECRET = "birustock-founder-studio-v1";
var TTL_MS = 432e5;
function hmac(value) {
	return createHmac("sha256", SECRET).update(value).digest("hex");
}
function safeEqual(a, b) {
	const left = Buffer.from(a);
	const right = Buffer.from(b);
	if (left.length !== right.length) return false;
	return timingSafeEqual(left, right);
}
function verifyFounderPin(pin) {
	return safeEqual(pin.trim(), PIN);
}
function signFounderToken() {
	const payload = `founder.${Date.now() + TTL_MS}`;
	return `${payload}.${hmac(payload)}`;
}
function verifyFounderToken(token) {
	const parts = token.split(".");
	if (parts.length !== 3) return false;
	const [role, exp, sig] = parts;
	if (role !== "founder") return false;
	if (!exp || Number(exp) < Date.now()) return false;
	if (!sig) return false;
	return safeEqual(sig, hmac(`${role}.${exp}`));
}
function assertFounder(token) {
	if (!verifyFounderToken(token)) throw new Error("Sesi founder tidak valid. Masuk lagi dengan PIN.");
}
//#endregion
export { assertFounder, signFounderToken, verifyFounderPin, verifyFounderToken };
