import { createHmac, timingSafeEqual } from "node:crypto";

const TTL_MS = 12 * 60 * 60 * 1000;

function secret() {
  const value = process.env.FOUNDER_SESSION_SECRET;
  if (value) return value;
  if (process.env.NODE_ENV !== "production") return "birustock-dev-founder-session";
  throw new Error("FOUNDER_SESSION_SECRET belum dikonfigurasi.");
}

function founderPin() {
  const value = process.env.FOUNDER_PIN;
  if (value) return value;
  if (process.env.NODE_ENV !== "production") return "biru2026";
  throw new Error("FOUNDER_PIN belum dikonfigurasi.");
}

function hmac(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyFounderPin(pin: string) {
  return safeEqual(pin.trim(), founderPin());
}

export function signFounderToken() {
  const exp = Date.now() + TTL_MS;
  const payload = `founder.${exp}`;
  return `${payload}.${hmac(payload)}`;
}

export function verifyFounderToken(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, exp, sig] = parts;
  if (role !== "founder" || !exp || Number(exp) < Date.now() || !sig) return false;
  return safeEqual(sig, hmac(`${role}.${exp}`));
}

export function assertFounder(token: string) {
  if (!verifyFounderToken(token)) throw new Error("Sesi founder tidak valid. Masuk lagi.");
}
