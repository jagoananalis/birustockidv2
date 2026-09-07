import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  IconArrowRight,
  IconCalendar,
  IconDocument,
  IconTrendDown,
  IconTrendUp,
} from "@/components/icons";
import { getAnalisisBySlug } from "@/lib/content";
import { formatIdDate, splitParagraphs } from "@/lib/format";
import { cn } from "@/lib/utils";

const ACCENT = {
  blue: "",
  orange: "badge-orange",
  green: "badge-green",
  red: "badge-red",
} as const;

export const Route = createFileRoute("/analisis/$slug")({
  loader: async ({ params }) => {
    const item = await getAnalisisBySlug({ data: { slug: params.slug } });
    if (!item) throw notFound();
    return item;
  },
  component: AnalisisDetail,
  head: ({ loaderData }) => {
    const title = `${loaderData?.title ?? "Analisis"} | Birustock Indonesia`;
    const description = loaderData?.excerpt ?? "";
    const image = loaderData?.imageUrl || "/og.jpg";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: `/analisis/${loaderData?.slug ?? ""}` }],
    };
  },
});

function AnalisisDetail() {
  const item = Route.useLoaderData();
  const paragraphs = splitParagraphs(item.body);
  const isBullish = item.bias === "Bullish";
  const isBearish = item.bias === "Bearish";

  return (
    <main className="analysis-detail-page py-10 max-md:py-7">
      <div className="container-site">
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/analisis" search={{ page: 1 }}>
            Analisis
          </Link>
          <span>/</span>
          <span aria-current="page">{item.title}</span>
        </nav>

        <section className="analysis-detail-hero stagger">
          <div className="analysis-detail-hero-copy">
            <Link to="/analisis" search={{ page: 1 }} className="detail-back-link">
              <span className="inline-block rotate-180">
                <IconArrowRight size={15} />
              </span>
              Kembali ke Analisis
            </Link>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <span className="badge">ANALISIS</span>
              <span className={cn("badge", ACCENT[item.accent])}>{item.pair}</span>
              <span className="detail-pill">{item.timeframe}</span>
              <span
                className={cn(
                  "detail-pill flex items-center gap-1.5",
                  isBullish && "detail-pill-positive",
                  isBearish && "detail-pill-negative",
                )}
              >
                {isBullish ? <IconTrendUp size={14} /> : null}
                {isBearish ? <IconTrendDown size={14} /> : null}
                {item.bias}
              </span>
            </div>

            <h1>{item.title}</h1>
            <p className="analysis-detail-lead">{item.excerpt}</p>

            <div className="analysis-detail-meta">
              <span>
                <IconCalendar size={15} />
                Terbit {formatIdDate(item.publishedAt)}
              </span>
              <span>
                <IconDocument size={15} />
                {item.updatedAt.slice(0, 10) !== item.publishedAt
                  ? `Diperbarui ${formatIdDate(item.updatedAt)}`
                  : "Analisis Birustock"}
              </span>
              <span>Status {item.status === "PUBLISHED" ? "Published" : item.status}</span>
            </div>
          </div>

          <div className="analysis-detail-chart-card">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={`Chart ${item.pair}`} />
            ) : (
              <div className="analysis-chart-placeholder">
                <div className="analysis-chart-grid" />
                <div className="analysis-chart-placeholder-copy">
                  <span>{item.pair}</span>
                  <strong>{item.timeframe}</strong>
                  <small>Chart belum tersedia</small>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="analysis-detail-layout mt-6">
          <article className="analysis-detail-main">
            <section className="detail-panel detail-panel-primary">
              <SectionHeading title="Ringkasan Analisis" />
              <p className="detail-summary">{item.excerpt}</p>
              <div className="market-grid mt-5">
                <MetricTile label="Bias" value={item.bias} tone={isBullish ? "positive" : isBearish ? "negative" : "default"} />
                <MetricTile label="Timeframe" value={item.timeframe} />
                <MetricTile label="Pair" value={item.pair} />
                <MetricTile label="Support" value={item.support || "—"} tone="positive" />
                <MetricTile label="Resistance" value={item.resistance || "—"} tone="negative" />
                <MetricTile label="Target" value={item.target || "—"} tone="primary" />
                <MetricTile label="Invalidation" value={item.invalidation || "—"} tone="warning" />
              </div>
            </section>

            {(item.scenarioBullish || item.scenarioBearish) ? (
              <section className="detail-panel">
                <SectionHeading title="Skenario Pergerakan Harga" />
                <div className="scenario-grid">
                  {item.scenarioBullish ? (
                    <ScenarioCard tone="positive" title="Skenario Bullish" value={item.scenarioBullish} icon={<IconTrendUp size={17} />} />
                  ) : null}
                  {item.scenarioBearish ? (
                    <ScenarioCard tone="negative" title="Skenario Bearish" value={item.scenarioBearish} icon={<IconTrendDown size={17} />} />
                  ) : null}
                </div>
              </section>
            ) : null}

            <section className="detail-panel">
              <SectionHeading title="Analisis Teknis" />
              <div className="reading-column analysis-reading-column">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="detail-panel">
              <SectionHeading title="Kesimpulan" />
              <div className="conclusion-box">
                <div className="conclusion-mark">✓</div>
                <p>
                  {isBullish
                    ? `Selama bias bullish masih didukung oleh level support ${item.support || "utama"}, peluang menuju ${item.target || "target berikutnya"} tetap terbuka. Tetap perhatikan invalidation ${item.invalidation || "yang ditetapkan"}.`
                    : isBearish
                      ? `Tekanan bearish perlu dikonfirmasi dengan kegagalan mempertahankan area support ${item.support || "utama"}. Perhatikan target ${item.target || "berikutnya"} dan invalidation ${item.invalidation || "yang ditetapkan"}.`
                      : `Pergerakan masih netral. Perhatikan reaksi harga pada support ${item.support || "utama"} dan resistance ${item.resistance || "utama"} sebelum menentukan skenario berikutnya.`}
                </p>
              </div>
            </section>

            <div className="analysis-disclaimer">
              Analisis ini bersifat edukasi dan bukan merupakan ajakan atau rekomendasi untuk membeli atau menjual instrumen tertentu. Selalu gunakan manajemen risiko pribadi.
            </div>
          </article>

          <aside className="analysis-detail-sidebar">
            <section className="detail-panel detail-side-card">
              <SectionHeading title="Level Penting" />
              <LevelRow label="Support" value={item.support || "—"} tone="positive" />
              <LevelRow label="Resistance" value={item.resistance || "—"} tone="negative" />
              <LevelRow label="Target" value={item.target || "—"} tone="primary" />
              <LevelRow label="Invalidation" value={item.invalidation || "—"} tone="warning" />
            </section>

            <section className="detail-panel detail-side-card">
              <SectionHeading title="Informasi Konten" />
              <InfoRow label="Kategori" value="Analisis" />
              <InfoRow label="Pair" value={item.pair} />
              <InfoRow label="Timeframe" value={item.timeframe} />
              <InfoRow label="Bias" value={item.bias} />
              <InfoRow label="Tanggal Terbit" value={formatIdDate(item.publishedAt)} />
              <InfoRow label="Diperbarui" value={formatIdDate(item.updatedAt.slice(0, 10))} />
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function SectionHeading({ title }: { title: string }) {
  return <h2 className="detail-section-title">{title}</h2>;
}

function MetricTile({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "positive" | "negative" | "primary" | "warning";
}) {
  return (
    <div className={cn("metric-tile", `metric-${tone}`)}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
    </div>
  );
}

function ScenarioCard({
  tone,
  title,
  value,
  icon,
}: {
  tone: "positive" | "negative";
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className={cn("scenario-card", tone === "positive" ? "scenario-positive" : "scenario-negative")}>
      <div className="scenario-title">
        {icon}
        <span>{title}</span>
      </div>
      <p>{value}</p>
    </div>
  );
}

function LevelRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "positive" | "negative" | "primary" | "warning";
}) {
  return (
    <div className="level-row">
      <span className={cn("level-dot", `level-dot-${tone}`)} />
      <div>
        <span className="level-label">{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
