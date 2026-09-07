import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { IconArrowRight } from "@/components/icons";
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
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Analisis"} | Birustock Indonesia` },
      { name: "description", content: loaderData?.excerpt ?? "" },
    ],
  }),
});

function AnalisisDetail() {
  const item = Route.useLoaderData();
  const paragraphs = splitParagraphs(item.body);

  return (
    <section className="py-16 max-md:py-11">
      <div className="container-site">
        <article className="mx-auto max-w-[760px] stagger">
          <div className="mb-6">
            <Link to="/analisis" className="link-arrow">
              <span className="inline-block rotate-180">
                <IconArrowRight size={15} />
              </span>
              Kembali ke Analisis
            </Link>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <span className={cn("badge", ACCENT[item.accent])}>{item.pair}</span>
            <span className="text-[13px] text-subtle">{formatIdDate(item.publishedAt)}</span>
          </div>
          <h1 className="mb-6 text-[30px] leading-snug font-extrabold tracking-tight">{item.title}</h1>
          {item.imageUrl ? (
            <div className="cover-frame mb-8">
              <img src={item.imageUrl} alt={item.title} />
            </div>
          ) : null}
          <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Bias" value={item.bias} />
            <Metric label="Timeframe" value={item.timeframe} />
            <Metric label="Support" value={item.support || "—"} />
            <Metric label="Resistance" value={item.resistance || "—"} />
            <Metric label="Target" value={item.target || "—"} />
            <Metric label="Invalidation" value={item.invalidation || "—"} />
          </div>
          {(item.scenarioBullish || item.scenarioBearish) ? (
            <div className="mb-8 grid gap-3 md:grid-cols-2">
              {item.scenarioBullish ? <Scenario title="Skenario Bullish" value={item.scenarioBullish} /> : null}
              {item.scenarioBearish ? <Scenario title="Skenario Bearish" value={item.scenarioBearish} /> : null}
            </div>
          ) : null}
          {paragraphs.map((p) => (
            <p key={p} className="mb-4.5 text-base leading-relaxed text-muted">
              {p}
            </p>
          ))}
          <div className="mt-8 rounded-[8px] border border-line bg-bg-alt px-4.5 py-4 text-[13.5px] text-muted">
            Analisis ini bersifat edukasi dan bukan merupakan ajakan atau rekomendasi untuk
            membeli/menjual instrumen tertentu. Selalu gunakan manajemen risiko pribadi.
          </div>
        </article>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-sm border border-line bg-bg-alt p-3.5"><div className="text-[11px] font-semibold uppercase tracking-wide text-subtle">{label}</div><div className="mt-1.5 text-sm font-bold text-ink">{value}</div></div>;
}

function Scenario({ title, value }: { title: string; value: string }) {
  return <div className="rounded-sm border border-line bg-surface p-4"><div className="mb-2 text-xs font-bold text-primary">{title}</div><p className="text-sm leading-relaxed text-muted">{value}</p></div>;
}
