export const NAV_ITEMS = [
  { to: "/", label: "Beranda" },
  { to: "/analisis", label: "Analisis" },
  { to: "/news", label: "News" },
  { to: "/edukasi", label: "Edukasi" },
  { to: "/kalender-ekonomi", label: "Kalender Ekonomi" },
  { to: "/profil", label: "Profil" },
  { to: "/kontak", label: "Kontak" },
] as const;

export const SOCIAL_LINKS = [
  { href: "https://www.tiktok.com/@birustock.id", label: "TikTok", id: "tiktok" },
  { href: "https://t.me/birustockid", label: "Telegram", id: "telegram" },
  { href: "https://www.instagram.com/birustock.id", label: "Instagram", id: "instagram" },
] as const;

export function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
