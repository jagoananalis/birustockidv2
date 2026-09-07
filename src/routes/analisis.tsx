import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { AnalisisCard } from "@/components/analisis-card";
import { PageHero } from "@/components/page-hero";
import { listAnalisis } from "@/lib/content";

export const Route = createFileRoute("/analisis")({
  loader: () => listAnalisis(),
  component: AnalisisPage,
  head: () => ({ meta: [{ title: "Analisis Terbaru | Birustock Indonesia" }, { name: "description", content: "Analisis teknikal terstruktur untuk Forex, Gold, dan Crypto." }] }),
});

function AnalisisPage() {
  const items = Route.useLoaderData();
  const pairs = useMemo(() => [...new Set(items.map((a) => a.pair))], [items]);
  const timeframes = useMemo(() => [...new Set(items.map((a) => a.timeframe).filter(Boolean))], [items]);
  const biases = ["Bullish", "Bearish", "Netral"];
  const [search, setSearch] = useState("");
  const [pair, setPair] = useState("Semua");
  const [timeframe, setTimeframe] = useState("Semua");
  const [bias, setBias] = useState("Semua");

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      const textMatch = !q || `${item.title} ${item.pair} ${item.excerpt} ${item.bias}`.toLowerCase().includes(q);
      return textMatch && (pair === "Semua" || item.pair === pair) && (timeframe === "Semua" || item.timeframe === timeframe) && (bias === "Semua" || item.bias === bias);
    });
  }, [items, search, pair, timeframe, bias]);

  const activeCount = [pair !== "Semua", timeframe !== "Semua", bias !== "Semua"].filter(Boolean).length;

  return <>
    <PageHero eyebrow="Analisis Teknikal" title="Analisis Terbaru" description="Kumpulan analisis teknikal untuk Forex, Emas (XAUUSD), dan Kripto — disusun agar cepat dipahami sebelum kamu mengambil keputusan." />
    <section className="py-14 max-md:py-10">
      <div className="container-site">
        <div className="content-toolbar">
          <div className="content-search"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari pair, judul, atau topik..." aria-label="Cari analisis" /><kbd>⌘ K</kbd></div>
          <div className="filter-summary"><SlidersHorizontal size={15} /><span>{visible.length} dari {items.length} analisis</span>{activeCount ? <button type="button" className="filter-reset" onClick={() => { setPair("Semua"); setTimeframe("Semua"); setBias("Semua"); }}>Reset {activeCount}</button> : null}</div>
        </div>
        <div className="filter-panels">
          <FilterSelect label="Pasangan" value={pair} onChange={setPair} options={["Semua", ...pairs]} />
          <FilterSelect label="Timeframe" value={timeframe} onChange={setTimeframe} options={["Semua", ...timeframes]} />
          <FilterSelect label="Bias" value={bias} onChange={setBias} options={["Semua", ...biases]} />
        </div>
        {visible.length === 0 ? <div className="empty-state"><strong>Tidak ada analisis yang cocok.</strong><span>Coba ubah kata kunci atau reset filter untuk melihat semua analisis.</span><button type="button" className="btn btn-outline" onClick={() => { setSearch(""); setPair("Semua"); setTimeframe("Semua"); setBias("Semua"); }}>Reset filter</button></div> : <div className="stagger grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">{visible.map((item) => <AnalisisCard key={item.slug} item={item} />)}</div>}
      </div>
    </section>
  </>;
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="filter-select"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}><option value="Semua">Semua</option>{options.filter((o) => o !== "Semua").map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}
