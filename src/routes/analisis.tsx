import { useMemo } from "react";
import { createFileRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { AnalisisCard } from "@/components/analisis-card";
import { FilterChips } from "@/components/filter-chips";
import { PageHero } from "@/components/page-hero";
import { Pagination } from "@/components/pagination";
import { listAnalisisPage } from "@/lib/content";

export const Route = createFileRoute("/analisis")({
  validateSearch: z.object({ page: z.coerce.number().int().min(1).catch(1), pair: z.string().optional() }),
  loaderDeps: ({ search }) => ({ page: search.page, pair: search.pair }),
  loader: ({ deps }) => listAnalisisPage({ data: { page: deps.page, pageSize: 9, pair: deps.pair } }),
  component: AnalisisPage,
  head: () => ({ meta: [{ title: "Analisis Terbaru | Birustock Indonesia", name: "description", content: "Analisis teknikal terbaru Birustock dengan bias, timeframe, support, resistance, target, invalidation, dan skenario pasar." }] }),
});

function AnalisisPage() {
  const location = useLocation();
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/analisis" });
  const pairs = useMemo(() => ["Semua", ...["XAU/USD", "BTC/USD", "EUR/USD", "GBP/USD"]], []);
  const isDetailRoute = location.pathname.replace(/\/+$/, "") !== "/analisis";

  if (isDetailRoute) return <Outlet />;
  const activePair = search.pair ?? "";

  return (
    <>
      <PageHero eyebrow="Analisis Teknikal" title="Analisis Terbaru" description="Buka setiap analisis untuk melihat level penting, bias, skenario bullish/bearish, dan penjelasan lengkapnya." />
      <section className="py-16 max-md:py-11">
        <div className="container-site">
          <FilterChips options={pairs} value={activePair || "Semua"} onChange={(value) => void navigate({ search: { page: 1, pair: value === "Semua" ? undefined : value } })} label="Filter pasangan" />
          {data.items.length === 0 ? (
            <p className="py-6 text-sm text-subtle">Tidak ada analisis untuk pasangan ini.</p>
          ) : (
            <div className="stagger grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((item) => <AnalisisCard key={item.slug} item={item} />)}
            </div>
          )}
          <Pagination page={data.page} totalPages={data.totalPages} search={{ ...search }} />
        </div>
      </section>
    </>
  );
}
