import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnalisisCard } from "@/components/analisis-card";
import { HeroSlider } from "@/components/hero-slider";
import {
  IconArrowRight,
  IconCalendar,
  IconDocument,
  IconGraduation,
  IconTikTok,
  IconTrendUp,
  NewsThumb,
} from "@/components/icons";
import { MarketTicker } from "@/components/ticker";
import { listNews } from "@/lib/news";
import { getEconomicCalendar } from "@/lib/calendar";
import { listAnalisis } from "@/lib/content";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [analisis, calendar, news] = await Promise.all([listAnalisis(), getEconomicCalendar(), listNews()]);
    return { analisis, calendar, news };
  },
  component: Home,
  head: () => ({
    meta: [
      { title: "Beranda | Birustock Indonesia" },
      {
        name: "description",
        content:
          "Insight pasar, keputusan lebih baik. Analisis teknikal, berita, dan edukasi trading Crypto, Forex, dan Gold.",
      },
    ],
  }),
});

function Home() {
  const { analisis, calendar, news } = Route.useLoaderData();
  const topAnalisis = analisis.slice(0, 3);
  const topNews = news.slice(0, 3);

  return (
    <>
      <MarketTicker events={calendar.events} />

      <section className="overflow-hidden">
        <div className="container-site grid items-center gap-10 py-14 max-md:py-8 md:grid-cols-[1.02fr_0.98fr]">
          <div className="stagger">
            <span className="eyebrow">Analisis. Edukasi. Insight.</span>
            <h1 className="mt-3.5 mb-5 text-5xl leading-[1.12] font-extrabold tracking-tight text-ink max-md:text-4xl">
              Insight Pasar,
              <br />
              Keputusan Lebih Baik.
            </h1>
            <p className="mb-8 max-w-md text-base text-muted">
              Birustock ID menyediakan analisis teknikal, berita pasar, dan edukasi trading untuk
              membantu kamu memahami pergerakan Crypto, Forex, dan Gold.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link to="/analisis" className="btn btn-primary">
                Lihat Analisis Terbaru
              </Link>
              <a
                href="https://www.tiktok.com/@birustock.id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Ikuti TikTok Kami <IconTikTok size={16} />
              </a>
            </div>
          </div>

          <HeroSlider items={analisis} />
        </div>
      </section>

      <section className="py-16 max-md:py-11">
        <div className="container-site grid items-start gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight">Analisis Terbaru</h2>
              <Link to="/analisis" className="link-arrow">
                Lihat Semua <IconArrowRight size={15} />
              </Link>
            </div>
            {topAnalisis.length === 0 ? (
              <p className="text-sm text-subtle">Belum ada analisis. Founder bisa menambahkan lewat Studio.</p>
            ) : (
              <div className="stagger grid gap-5 md:grid-cols-3">
                {topAnalisis.map((item) => (
                  <AnalisisCard key={item.slug} item={item} />
                ))}
              </div>
            )}
          </div>

          <aside className="rounded-md border border-line bg-surface p-5">
            <h2 className="mb-5 text-xl font-extrabold">Berita Terbaru</h2>
            <div className="flex flex-col gap-4">
              {topNews.map((item) => (
                <Link
                  key={item.slug}
                  to="/news/$slug"
                  params={{ slug: item.slug }}
                  className="flex gap-3.5"
                >
                  <div className="size-16 shrink-0 overflow-hidden rounded-sm">
                    <NewsThumb type={item.thumb} />
                  </div>
                  <div>
                    <div className="mb-1 text-xs text-subtle">{item.date}</div>
                    <h4 className="text-sm leading-snug font-bold">{item.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/news" className="link-arrow mt-5">
              Lihat Semua Berita <IconArrowRight size={15} />
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-y border-line bg-bg-alt py-11">
        <div className="container-site grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Feature icon={<IconTrendUp />} title="Analisis Terstruktur" desc="Analisis teknikal harian dan mingguan dengan level penting." />
          <Feature icon={<IconDocument />} title="News Update" desc="Informasi pasar terkini dan berdampak langsung ke market." />
          <Feature icon={<IconGraduation />} title="Edukasi Trading" desc="Belajar trading dari dasar hingga strategi lanjutan." />
          <Feature icon={<IconCalendar />} title="Kalender Ekonomi" desc="Jadwal rilis data ekonomi penting untuk trader." />
        </div>
      </section>
    </>
  );
}

function Feature({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="icon-tile">{icon}</div>
      <div>
        <h4 className="mb-1.5 text-[15px] font-bold">{title}</h4>
        <p className="text-sm text-muted">{desc}</p>
      </div>
    </div>
  );
}
