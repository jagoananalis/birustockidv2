import { useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { FilterChips } from "@/components/filter-chips";
import { NewsThumb } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Pagination } from "@/components/pagination";
import { listNewsPage } from "@/lib/news";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/news")({
  validateSearch: z.object({ page: z.coerce.number().int().min(1).catch(1), category: z.string().optional() }),
  loaderDeps: ({ search }) => ({ page: search.page, category: search.category }),
  loader: ({ deps }) => listNewsPage({ data: { page: deps.page, pageSize: 9, category: deps.category } }),
  component: NewsPage,
  head: () => ({ meta: [{ title: "News Terbaru | Birustock Indonesia", name: "description", content: "Berita pasar, ekonomi, emas, forex, dan kripto dari Birustock Indonesia." }] }),
});

function NewsPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/news" });
  const categories = useMemo(() => ["Semua", "Ekonomi Global", "Emas", "Kripto"], []);
  const activeCategory = search.category ?? "";

  return (
    <>
      <PageHero eyebrow="Berita Pasar" title="News Terbaru" description="Buka setiap berita untuk membaca konteks lengkap dan memahami dampaknya terhadap pasar." />
      <section className="py-16 max-md:py-11">
        <div className="container-site">
          <FilterChips options={categories} value={activeCategory || "Semua"} onChange={(value) => void navigate({ search: { page: 1, category: value === "Semua" ? undefined : value } })} label="Filter kategori" />
          {data.items.length === 0 ? (
            <p className="py-6 text-sm text-subtle">Belum ada berita untuk kategori ini.</p>
          ) : (
            <div className="stagger grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((item) => (
                <Link key={item.slug} to="/news/$slug" params={{ slug: item.slug }} search={{ page: 1 }} className="news-card">
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
          <Pagination page={data.page} totalPages={data.totalPages} search={{ ...search }} />
        </div>
      </section>
    </>
  );
}
