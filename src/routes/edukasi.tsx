import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { EdukasiCard } from "@/components/edukasi-card";
import { LearningPath } from "@/components/learning-path";
import { PageHero } from "@/components/page-hero";
import { listEdukasi } from "@/lib/content";

export const Route = createFileRoute("/edukasi")({
  loader: () => listEdukasi(),
  component: EdukasiPage,
  head: () => ({ meta: [{ title: "Edukasi Trading | Birustock Indonesia" }, { name: "description", content: "Materi trading dari pemula hingga lanjutan untuk membangun fondasi dan pemahaman pasar." }] }),
});

function EdukasiPage() {
  const items = Route.useLoaderData();
  const [level, setLevel] = useState("Semua");
  const [search, setSearch] = useState("");
  const visible = useMemo(() => items.filter((item) => {
    const q = search.trim().toLowerCase();
    const match = !q || `${item.title} ${item.description} ${item.level}`.toLowerCase().includes(q);
    return match && (level === "Semua" || item.level === level);
  }), [items, level, search]);

  return <>
    <PageHero eyebrow="Edukasi Trading" title="Belajar dari Dasar hingga Lanjutan" description="Bangun pemahaman secara bertahap: mulai dari istilah dasar, praktik teknikal, hingga konteks pasar yang lebih kompleks." />
    <section className="py-12 max-md:py-9"><div className="container-site"><LearningPath items={items} /></div></section>
    <section className="pb-16 max-md:pb-11"><div className="container-site">
      <div className="content-toolbar"><div className="content-search"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari materi atau topik..." aria-label="Cari edukasi" /><kbd>⌘ K</kbd></div><div className="filter-summary"><span>{visible.length} materi</span></div></div>
      <div className="chip-scroll" role="group" aria-label="Filter level edukasi">{["Semua", "Pemula", "Menengah", "Lanjutan"].map((option) => <button key={option} type="button" className={`filter-chip ${level === option ? "is-active" : ""}`} onClick={() => setLevel(option)} aria-pressed={level === option}>{option}</button>)}</div>
      {visible.length === 0 ? <div className="empty-state"><strong>Tidak ada materi yang cocok.</strong><span>Coba level atau kata kunci lain.</span></div> : <div className="stagger grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">{visible.map((item) => <EdukasiCard key={item.slug} item={item} />)}</div>}
    </div></section>
  </>;
}
