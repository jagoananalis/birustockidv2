import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "@/components/icons";
import type { AnalisisItem } from "@/lib/content";
import { formatIdDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const ACCENT = {
  blue: "",
  orange: "badge-orange",
  green: "badge-green",
  red: "badge-red",
} as const;

export function AnalisisCard({ item }: { item: AnalisisItem }) {
  return (
    <article className="card">
      <Link to="/analisis/$slug" params={{ slug: item.slug }} className="card-cover">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt="" loading="lazy" />
        ) : (
          <div className="skeleton size-full" />
        )}
      </Link>
      <div className="card-body">
        <div className="flex items-center justify-between gap-3">
          <span className={cn("badge", ACCENT[item.accent])}>{item.pair}</span>
          <span className="text-[12px] text-subtle">{item.timeframe} · {formatIdDate(item.publishedAt)}</span>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-subtle"><span>{item.bias}</span>{item.target ? <span>· Target {item.target}</span> : null}</div>
          <h3 className="text-[17px] leading-snug font-bold text-ink">{item.title}</h3>
          <p className="mt-1 text-sm text-muted">{item.excerpt}</p>
        </div>
        <Link to="/analisis/$slug" params={{ slug: item.slug }} className="link-arrow">
          Baca Selengkapnya <IconArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
