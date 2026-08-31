import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CandlestickPattern,
  IconCalendar,
  IconDocument,
  IconGraduation,
  IconTrendUp,
} from "@/components/icons";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/profil")({
  component: ProfilPage,
  head: () => ({
    meta: [{ title: "Profil | Birustock Indonesia" }],
  }),
});

function ProfilPage() {
  return (
    <>
      <PageHero
        eyebrow="Tentang Kami"
        title="Profil Birustock Indonesia"
        description="Mengenal lebih dekat siapa kami dan apa yang kami kerjakan setiap hari untuk komunitas trader Indonesia."
      />

      <section className="py-16 max-md:py-11">
        <div className="container-site">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="stagger">
              <h2 className="mb-4 text-2xl font-extrabold tracking-tight">Siapa Kami</h2>
              <p className="mb-4 leading-relaxed text-muted">
                Birustock Indonesia adalah platform edukasi dan analisis pasar yang berfokus pada
                Forex, Emas (XAUUSD), dan Kripto. Kami hadir melalui konten TikTok dan website untuk
                membantu trader Indonesia memahami pergerakan pasar dengan cara yang mudah dicerna.
              </p>
              <p className="leading-relaxed text-muted">
                Setiap analisis yang kami bagikan disusun berdasarkan pembacaan teknikal, bukan
                ajakan investasi. Tujuan kami sederhana: membuat insight pasar lebih mudah diakses
                siapa saja.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-5">
                <Stat num="3" label="Fokus Instrumen" />
                <Stat num="Harian" label="Update Analisis" />
                <Stat num="TikTok" label="Kanal Utama" />
              </div>
            </div>
            <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface">
              <div className="pointer-events-none absolute inset-0 flex items-center opacity-70">
                <CandlestickPattern />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-bg-alt py-11">
        <div className="container-site">
          <h2 className="mb-6 text-xl font-extrabold tracking-tight">Nilai yang Kami Pegang</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Value icon={<IconTrendUp />} title="Berbasis Data" desc="Analisis disusun dari pembacaan chart dan struktur pasar, bukan tebakan." />
            <Value icon={<IconDocument />} title="Transparan" desc="Kami selalu mencantumkan disclaimer risiko pada setiap konten." tile="icon-tile-orange" />
            <Value icon={<IconGraduation />} title="Edukatif" desc="Konten disusun agar mudah dipahami, dari pemula hingga trader berpengalaman." tile="icon-tile-green" />
            <Value icon={<IconCalendar />} title="Konsisten" desc="Update analisis dan berita pasar secara rutin setiap hari." />
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="text-[28px] font-extrabold text-primary">{num}</div>
      <div className="text-[13px] text-muted">{label}</div>
    </div>
  );
}

function Value({
  icon,
  title,
  desc,
  tile,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  tile?: string;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <div className={`icon-tile ${tile ?? ""}`}>{icon}</div>
      <div>
        <h4 className="mb-1.5 text-[15px] font-bold">{title}</h4>
        <p className="text-sm text-muted">{desc}</p>
      </div>
    </div>
  );
}
