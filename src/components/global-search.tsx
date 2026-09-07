import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Search, ArrowRight, X, BookOpen, FileText, Newspaper } from "lucide-react";
import { listAnalisis, listEdukasi, type AnalisisItem, type EdukasiItem } from "@/lib/content";
import { listNews, type NewsItem } from "@/lib/news";
import { cn } from "@/lib/utils";
import { formatIdDate } from "@/lib/format";

export function GlobalSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<{
    analisis: AnalisisItem[];
    news: NewsItem[];
    edukasi: EdukasiItem[];
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open || data || loading) return;
    setLoading(true);
    setError("");
    Promise.allSettled([listAnalisis(), listNews(), listEdukasi()])
      .then(([analisis, news, edukasi]) => {
        const resolved = {
          analisis: analisis.status === "fulfilled" ? analisis.value : [],
          news: news.status === "fulfilled" ? news.value : [],
          edukasi: edukasi.status === "fulfilled" ? edukasi.value : [],
        };
        if (!resolved.analisis.length && !resolved.news.length && !resolved.edukasi.length) {
          setError("Pencarian belum tersedia. Coba lagi sebentar lagi.");
          return;
        }
        setData(resolved);
      })
      .catch(() => setError("Pencarian belum tersedia. Coba lagi sebentar lagi."))
      .finally(() => setLoading(false));
  }, [open, data, loading]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!data || !q) return { analisis: data?.analisis.slice(0, 3) ?? [], news: data?.news.slice(0, 3) ?? [], edukasi: data?.edukasi.slice(0, 3) ?? [] };
    const match = (value: string) => value.toLowerCase().includes(q);
    return {
      analisis: data.analisis.filter((item) => match(`${item.title} ${item.pair} ${item.bias} ${item.timeframe} ${item.excerpt}`)).slice(0, 4),
      news: data.news.filter((item) => match(`${item.title} ${item.category} ${item.excerpt}`)).slice(0, 4),
      edukasi: data.edukasi.filter((item) => match(`${item.title} ${item.level} ${item.description}`)).slice(0, 4),
    };
  }, [data, query]);

  const total = results.analisis.length + results.news.length + results.edukasi.length;

  return (
    <>
      <button type="button" className={cn("header-icon-btn", className)} aria-label="Cari konten" onClick={() => setOpen(true)}>
        <Search size={18} />
      </button>
      {open ? (
        <div className="search-overlay" role="presentation" onMouseDown={() => setOpen(false)}>
          <div className="search-dialog" role="dialog" aria-modal="true" aria-label="Pencarian Birustock" onMouseDown={(event) => event.stopPropagation()}>
            <div className="search-dialog-head">
              <div className="search-input-wrap">
                <Search size={19} />
                <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari analisis, berita, edukasi..." aria-label="Cari konten" />
                <kbd>Esc</kbd>
              </div>
              <button type="button" className="header-icon-btn" onClick={() => setOpen(false)} aria-label="Tutup pencarian"><X size={18} /></button>
            </div>
            <div className="search-dialog-body">
              {loading ? <div className="search-empty"><div className="search-loading-dot" /><p>Menyiapkan pencarian...</p></div> : null}
              {error ? <div className="search-empty"><p>{error}</p></div> : null}
              {!loading && !error && !query.trim() ? <div className="search-helper"><strong>Cari di seluruh Birustock</strong><span>Gunakan kata kunci seperti “XAU”, “leverage”, “support resistance”, atau topik berita tertentu.</span><small>Tip: tekan Ctrl/⌘ + K kapan saja untuk membuka pencarian.</small></div> : null}
              {!loading && !error && query.trim() && total === 0 ? <div className="search-empty"><p>Tidak menemukan konten untuk <strong>“{query}”</strong>.</p><Link to="/analisis" onClick={() => setOpen(false)} className="link-arrow">Lihat semua analisis <ArrowRight size={15} /></Link></div> : null}
              {!loading && !error && total > 0 ? (
                <div className="search-results">
                  <SearchResultGroup icon={<FileText size={16} />} label="Analisis" count={results.analisis.length}>
                    {results.analisis.map((item) => <Link key={item.slug} to="/analisis/$slug" params={{ slug: item.slug }} className="search-result" onClick={() => setOpen(false)}><div><strong>{item.title}</strong><span>{item.pair} · {item.timeframe} · {formatIdDate(item.publishedAt)}</span></div><ArrowRight size={16} /></Link>)}
                  </SearchResultGroup>
                  <SearchResultGroup icon={<Newspaper size={16} />} label="News" count={results.news.length}>
                    {results.news.map((item) => <Link key={item.slug} to="/news/$slug" params={{ slug: item.slug }} className="search-result" onClick={() => setOpen(false)}><div><strong>{item.title}</strong><span>{item.category} · {item.date}</span></div><ArrowRight size={16} /></Link>)}
                  </SearchResultGroup>
                  <SearchResultGroup icon={<BookOpen size={16} />} label="Edukasi" count={results.edukasi.length}>
                    {results.edukasi.map((item) => <Link key={item.slug} to="/edukasi/$slug" params={{ slug: item.slug }} className="search-result" onClick={() => setOpen(false)}><div><strong>{item.title}</strong><span>{item.level} · Materi belajar</span></div><ArrowRight size={16} /></Link>)}
                  </SearchResultGroup>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function SearchResultGroup({ icon, label, count, children }: { icon: ReactNode; label: string; count: number; children: ReactNode }) {
  if (count === 0) return null;
  return <section className="search-group"><div className="search-group-title"><span className="search-group-label">{icon}{label}</span><span>{count}</span></div><div>{children}</div></section>;
}
