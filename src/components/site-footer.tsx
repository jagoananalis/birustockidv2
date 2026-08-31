import { Link } from "@tanstack/react-router";
import { BrandLockup } from "@/components/brand-mark";

const FOOTER_LINKS = [
  { to: "/analisis", label: "Analisis" },
  { to: "/news", label: "News" },
  { to: "/edukasi", label: "Edukasi" },
  { to: "/kontak", label: "Kontak" },
  { to: "/kalender-ekonomi", label: "Kalender Ekonomi" },
  { to: "/profil", label: "Profil" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-alt pt-12 pb-7">
      <div className="container-site">
        <div className="grid gap-8 pb-8 md:grid-cols-[1.2fr_1fr_1.4fr]">
          <div>
            <Link to="/" aria-label="Birustock Indonesia — Beranda">
              <BrandLockup />
            </Link>
            <p className="mt-3.5 text-[13px] text-subtle">
              © {new Date().getFullYear()} Birustock ID. All rights reserved.
            </p>
          </div>

          <div>
            <h5 className="mb-3.5 text-xs font-bold tracking-[0.08em] text-subtle">LINK CEPAT</h5>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {FOOTER_LINKS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm text-muted transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="mb-3.5 text-xs font-bold tracking-[0.08em] text-subtle">DISCLAIMER</h5>
            <p className="text-[13px] leading-relaxed text-muted">
              Konten ini hanya bersifat informatif dan tidak dimaksudkan sebagai saran atau
              rekomendasi investasi. Trading memiliki risiko kerugian.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-[13px] text-subtle">
          <span>Birustock Indonesia — Analisis. Edukasi. Insight.</span>
          <Link to="/studio" className="hover:text-primary">
            Studio Founder
          </Link>
        </div>
      </div>
    </footer>
  );
}
