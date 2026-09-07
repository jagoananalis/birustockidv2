import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useRouterState } from "@tanstack/react-router";
import { BrandLockup } from "@/components/brand-mark";
import { IconSearch, SocialIcon } from "@/components/icons";
import { isNavActive, NAV_ITEMS, SOCIAL_LINKS } from "@/data/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const body = document.body;
    if (open) {
      const scrollbar = window.innerWidth - document.documentElement.clientWidth;
      body.classList.add("nav-locked");
      if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    } else {
      body.classList.remove("nav-locked");
      body.style.paddingRight = "";
    }
    return () => {
      body.classList.remove("nav-locked");
      body.style.paddingRight = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusable = () =>
      Array.from(
        drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((el) => !el.hasAttribute("disabled"));

    const items = focusable();
    (items[0] ?? toggleRef.current)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusable();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  const menu = mounted
    ? createPortal(
        <>
          <div
            className={cn("mobile-overlay", open && "is-open")}
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div
            ref={drawerRef}
            id={menuId}
            className={cn("mobile-drawer", open && "is-open")}
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            inert={!open}
          >
            <nav className="mobile-nav" aria-label="Navigasi seluler">
              {NAV_ITEMS.map((item) => {
                const active = isNavActive(pathname, item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="mobile-nav-link"
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mobile-drawer-foot">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social"
                  aria-label={s.label}
                >
                  <SocialIcon id={s.id} size={20} />
                </a>
              ))}
            </div>
          </div>
        </>,
        document.body,
      )
    : null;

  return (
    <>
      <header className="site-header">
        <div className="container-site header-inner">
          <Link to="/" className="shrink-0" aria-label="Birustock Indonesia — Beranda">
            <BrandLockup />
          </Link>

          <nav className="desktop-nav" aria-label="Navigasi utama">
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(pathname, item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-link"
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <div className="header-social">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-icon-btn"
                  aria-label={s.label}
                >
                  <SocialIcon id={s.id} size={18} />
                </a>
              ))}
            </div>
            <Link to="/news" className="header-icon-btn" aria-label="Cari berita">
              <IconSearch size={18} />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="nav-toggle-box" aria-hidden="true">
                <span className="nav-toggle-line" />
                <span className="nav-toggle-line" />
                <span className="nav-toggle-line" />
              </span>
            </button>
          </div>
        </div>
      </header>
      {menu}
    </>
  );
}
