import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { NewsThumb } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { listNews } from "@/lib/news";

export const Route = createFileRoute("/news")({
  loader: () => listNews(),
  component: NewsPage,
  head: () => ({ meta: [{ title: "News Terbaru | Birustock Indonesia" }, { name: "description", content: "Berita ekonomi, emas, forex, dan kripto yang berdampak ke pergerakan pasar." }] }),
});

function NewsPage() {
  const items = Route.useLoaderData();
  const categories = useMemo(() => [...new Set(items.map((n) => n.category))], [items]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const visible = useMemo(() => items.filter((item) => {
    const q = search.trim().toLowerCase();
    const textMatch = !q || `${item.title} ${item.category} ${item.excerpt}`.toLowerCase().includes(q);
    return textMatch && (filter === "Semua" || item.category === filter);
  }), [items, search, filter]);

  return <>
    <PageHero eyebrow="Berita Pasar" title="News Terbaru" description="Berita ekonomi, emas, forex, dan kripto yang relevan untuk memahami konteks pergerakan pasar." />
    <section className="py-14 max-md:py-10"><div className="container-site">
      <div className="content-toolbar"><div className="content-search"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari judul, kategori, atau topik..." aria-label="Cari news" /><kbd>⌘ K</kbd></div><div className="filter-summary"><span>{visible.length} berita</span>{filter !== "Semua" ? <button className="filter-reset" type="button" onClick={() => setFilter("Semua")}>Reset</button> : null}</div></div>
      <div className="chip-scroll" role="group" aria-label="Filter kategori">{["Semua", ...categories].map((option) => <button key={option} type="button" className={`filter-chip ${filter === option ? "is-active" : ""}`} onClick={() => setFilter(option)} aria-pressed={filter === option}>{option}</button>)}</div>
      {visible.length === 0 ? <div className="empty-state"><strong>Tidak ada berita yang cocok.</strong><span>Coba kata kunci atau kategori lain.</span></div> : <div className="stagger grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">{visible.map((item) => <Link key={item.slug} to="/news/$slug" params={{ slug: item.slug }} className="news-card"><div className="aspect-video w-full"><NewsThumb type={item.thumb} /></div><div className="flex flex-1 flex-col gap-2.5 p-[18px]"><span className="badge w-fit">{item.category}</span><h3 className="text-base leading-snug font-bold">{item.title}</h3><p className="text-[13.5px] text-muted">{item.excerpt}</p><span className="text-xs text-subtle">{item.date}</span></div></Link>)}</div>}
    </div></section>
  </>;
}
