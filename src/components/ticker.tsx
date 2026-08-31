import type { CalendarEvent } from "@/lib/calendar";
import { cn } from "@/lib/utils";

export function MarketTicker({ events }: { events: CalendarEvent[] }) {
  const items = events.filter((e) => e.impact === "high").slice(0, 10);
  if (items.length === 0) return null;
  const loop = [...items, ...items];

  return (
    <div className="ticker" aria-label="Jadwal data berdampak tinggi">
      <div className="ticker-track">
        {loop.map((e, i) => (
          <span key={`${e.name}-${i}`} className="ticker-item">
            <span
              className={cn(
                "size-1.5 rounded-full",
                e.impact === "high" && "bg-accent-red",
                e.impact === "medium" && "bg-accent-orange",
                e.impact === "low" && "bg-accent-green",
              )}
            />
            <span className="font-mono text-[11px] text-subtle">{e.timeWib}</span>
            <span className="font-semibold text-ink">{e.economy}</span>
            <span>{e.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
