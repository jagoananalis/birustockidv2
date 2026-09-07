import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Search, ArrowRight, X, FileText, Newspaper, BookOpen } from "lucide-react";
import { searchContent, type SearchResult } from "@/lib/search";
import { cn } from "@/lib/utils";
import { formatIdDate } from "@/lib/format";

export function GlobalSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<{ analisis: SearchResult[]; news: SearchResult[]; edukasi: SearchResult[] } | null>(null);
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
    if (!open || query.trim().length < 2) {
      setResults(null);
      setError("");
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setLoading(true);
      setError("");
      searchContent({ data: { q: query.trim() } })
        .then(setResults)
        .catch(() => setError("Pencarian gagal. Coba lagi sebentar lagi."))
        .finally(() => setLoading(false));
    }, 220);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [open, query]);

  const total = results ? results.analisis.length + results.news.length + results.edukasi.length : 0;

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
              {query.trim().length < 2 ? (
                <div className="search-helper"><strong>Cari di seluruh Birustock</strong><span>Mulai dengan minimal 2 karakter. Hasil pencarian diambil langsung dari database konten yang sudah dipublikasikan.</span><small>Tip: tekan Ctrl/⌘ + K kapan saja.</small></div>
              ) : null}
              {loading ? <div className="search-empty"><div className="search-loading-dot" /><p>Mencari konten…</p></div> : null}
              {error ? <div className="search-empty"><p>{error}</p></div> : null}
              {!loading && !error && query.trim().length >= 2 && total === 0 ? <div className="search-empty"><p>Tidak menemukan konten untuk <strong>“{query}”</strong>.</p></div> : null}
              {!loading && !error && results && total > 0 ? (
                <div className="search-results">
                  <SearchResultGroup icon={<FileText size={16} />} label="Analisis">
                    {results.analisis.map((item) => <ResultLink key={item.slug} item={item} to="/analisis/$slug" onClose={() => setOpen(false)} />)}
                  </SearchResultGroup>
                  <SearchResultGroup icon={<Newspaper size={16} />} label="News">
                    {results.news.map((item) => <ResultLink key={item.slug} item={item} to="/news/$slug" onClose={() => setOpen(false)} />)}
                  </SearchResultGroup>
                  <SearchResultGroup icon={<BookOpen size={16} />} label="Edukasi">
                    {results.edukasi.map((item) => <ResultLink key={item.slug} item={item} to="/edukasi/$slug" onClose={() => setOpen(false)} />)}
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

function ResultLink({ item, to, onClose }: { item: SearchResult; to: "/analisis/$slug" | "/news/$slug" | "/edukasi/$slug"; onClose: () => void }) {
  return <Link to={to} params={{ slug: item.slug }} search={{ page: 1 }} className="search-result" onClick={onClose}><div><strong>{item.title}</strong><span>{item.meta} · {formatIdDate(item.date)}</span></div><ArrowRight size={16} /></Link>;
}

function SearchResultGroup({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return children ? <section className="search-result-group"><div className="search-result-group-title">{icon}<span>{label}</span></div>{children}</section> : null;
}
