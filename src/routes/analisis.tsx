import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnalisisCard } from "@/components/analisis-card";
import { FilterChips } from "@/components/filter-chips";
import { PageHero } from "@/components/page-hero";
import { listAnalisis } from "@/lib/content";

export const Route = createFileRoute("/analisis")({
  loader: () => listAnalisis(),
  component: AnalisisPage,
  head: () => ({
    meta: [{ title: "Analisis Terbaru | Birustock Indonesia" }],
  }),
});

function AnalisisPage() {
  const items = Route.useLoaderData();
  const pairs = useMemo(() => ["Semua", ...[...new Set(items.map((a) => a.pair))]], [items]);
  const [filter, setFilter] = useState("Semua");
  const visible = filter === "Semua" ? items : items.filter((a) => a.pair === filter);

  return (
    <>
      <PageHero
        eyebrow="Analisis Teknikal"
        title="Analisis Terbaru"
        description="Kumpulan analisis teknikal harian untuk pasangan Forex, Emas (XAUUSD), dan Kripto — diunggah founder langsung dari studio."
      />
      <section className="py-16 max-md:py-11">
        <div className="container-site">
          <FilterChips options={pairs} value={filter} onChange={setFilter} label="Filter pasangan" />
          {visible.length === 0 ? (
            <p className="py-6 text-sm text-subtle">Tidak ada analisis untuk pasangan ini.</p>
          ) : (
            <div className="stagger grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => (
                <AnalisisCard key={item.slug} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
