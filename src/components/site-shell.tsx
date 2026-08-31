import { useEffect, useState, type ReactNode } from "react";
import { BrandLockup } from "@/components/brand-mark";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  const [booting, setBooting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("bs-booted")) return;
    setBooting(true);
    const t = window.setTimeout(() => {
      sessionStorage.setItem("bs-booted", "1");
      setBooting(false);
    }, 1400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-ink">
      {booting ? (
        <div className="boot-screen" role="status" aria-label="Memuat Birustock">
          <div className="boot-mark">
            <BrandLockup size="lg" />
          </div>
          <div className="boot-bar" aria-hidden="true">
            <div className="boot-bar-fill" />
          </div>
        </div>
      ) : null}
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function RoutePending() {
  return (
    <div className="route-pending" role="progressbar" aria-label="Memuat halaman">
      <div className="route-pending-fill" />
    </div>
  );
}
