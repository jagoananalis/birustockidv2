import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FilterChips } from "@/components/filter-chips";
import { NewsThumb } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { listNews } from "@/lib/news";

export const Route = createFileRoute("/news")({
  loader: () => listNews(),
  component: NewsPage,
  head: () => ({ meta: [{ title: "News Terbaru | Birustock Indonesia" }] }),
});

function NewsPage() {
  const items = Route.useLoaderData();
  const categories = useMemo(() => ["Semua", ...new Set(items.map((n) => n.category))], [items]);
  const [filter, setFilter] = useState("Semua");
  const visible = filter === "Semua" ? items : items.filter((n) => n.category === filter);

  return (
    <>
      <PageHero eyebrow="Berita Pasar" title="News Terbaru" description="Berita ekonomi, emas, forex, dan kripto yang berdampak langsung ke pergerakan pasar." />
      <section className="py-16 max-md:py-11">
        <div className="container-site">
          <FilterChips options={categories} value={filter} onChange={setFilter} label="Filter kategori" />
          {visible.length === 0 ? (
            <p className="py-6 text-sm text-subtle">Belum ada berita untuk kategori ini.</p>
          ) : (
            <div className="stagger grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => (
                <Link key={item.slug} to="/news/$slug" params={{ slug: item.slug }} className="news-card">
                  <div className="aspect-video w-full"><NewsThumb type={item.thumb} /></div>
                  <div className="flex flex-1 flex-col gap-2.5 p-[18px]">
                    <span className="badge w-fit">{item.category}</span>
                    <h3 className="text-base leading-snug font-bold">{item.title}</h3>
                    <p className="text-[13.5px] text-muted">{item.excerpt}</p>
                    <span className="text-xs text-subtle">{item.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
