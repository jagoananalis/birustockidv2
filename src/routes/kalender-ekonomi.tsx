import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FilterChips } from "@/components/filter-chips";
import { PageHero } from "@/components/page-hero";
import { getEconomicCalendar, IMPACT_LABEL, type CalendarImpact } from "@/lib/calendar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/kalender-ekonomi")({
  loader: () => getEconomicCalendar(),
  component: KalenderPage,
  head: () => ({
    meta: [{ title: "Kalender Ekonomi | Birustock Indonesia" }],
  }),
});

const FILTERS = ["Semua", "Tinggi", "Sedang", "Rendah"] as const;

function KalenderPage() {
  const payload = Route.useLoaderData();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Semua");

  const items = useMemo(() => {
    if (filter === "Semua") return payload.events;
    const map: Record<string, CalendarImpact> = {
      Tinggi: "high",
      Sedang: "medium",
      Rendah: "low",
    };
    return payload.events.filter((e) => e.impact === map[filter]);
  }, [filter, payload.events]);

  const live = payload.source !== "fallback";

  return (
    <>
      <PageHero
        eyebrow="Kalender Ekonomi"
        title="Jadwal Rilis Data Ekonomi"
        description="Pantau jadwal rilis data ekonomi penting yang berpotensi menggerakkan pasar forex, emas, dan kripto."
      />
      <section className="py-16 max-md:py-11">
        <div className="container-site">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <FilterChips
              options={[...FILTERS]}
              value={filter}
              onChange={(v) => setFilter(v as (typeof FILTERS)[number])}
              label="Filter dampak"
            />
            <span
              className={cn(
                "badge",
                live ? "badge-green" : "badge-orange",
              )}
            >
              {live ? "Live API" : "Mode cadangan"}
            </span>
          </div>

          <div className="overflow-x-auto rounded-[16px] border border-line">
            <table className="cal-table">
              <thead>
                <tr>
                  {["Waktu", "Negara", "Event", "Dampak", "Actual", "Forecast", "Previous"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((e, i) => (
                  <tr key={`${e.economy}-${e.name}-${e.data}-${i}`}>
                    <td className="font-mono text-[13px]">{e.timeWib}</td>
                    <td>
                      <span className="font-semibold">{e.country}</span>
                      <span className="ml-2 text-xs text-subtle">{e.economy}</span>
                    </td>
                    <td>{e.name}</td>
                    <td>
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={cn(
                            "size-2 rounded-full",
                            e.impact === "high" && "bg-accent-red",
                            e.impact === "medium" && "bg-accent-orange",
                            e.impact === "low" && "bg-accent-green",
                          )}
                          aria-hidden="true"
                        />
                        {IMPACT_LABEL[e.impact]}
                      </span>
                    </td>
                    <td className="tabular-nums">{e.actual}</td>
                    <td className="tabular-nums">{e.forecast}</td>
                    <td className="tabular-nums">{e.previous}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13.5px] text-subtle">
            Sumber: Economic Calendar API (andrevlima) — data investing.com / ForexFactory, waktu
            ditampilkan dalam WIB. {live ? "Terhubung ke sumber live." : "Sumber live sedang dibatasi; menampilkan jadwal cadangan minggu ini."}
          </p>
        </div>
      </section>
    </>
  );
}
