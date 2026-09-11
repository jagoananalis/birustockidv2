import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { CalendarEvent } from "@/lib/calendar";
import { getEconomicCalendar } from "@/lib/calendar";
import type { CryptoTicker } from "@/lib/market";
import { getCryptoMarket } from "@/lib/market";
import { cn } from "@/lib/utils";

type MarketState = {
  source: "live" | "cache";
  fetchedAt: string;
  items: CryptoTicker[];
};

function formatPrice(value: number) {
  const digits = value >= 1000 ? 0 : value >= 1 ? 2 : 4;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function formatChange(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function relativeAge(iso: string) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 10) return "baru saja";
  if (seconds < 60) return `${seconds} dtk lalu`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} mnt lalu`;
  return `${Math.floor(minutes / 60)} jam lalu`;
}

function parseEventTime(event: CalendarEvent) {
  const dateMatch = event.data.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const timeMatch = event.timeWib.match(/(\d{2}):(\d{2})/);
  if (!dateMatch || !timeMatch) return null;
  const [, year, month, day, hour, minute] = [...dateMatch, ...timeMatch];
  return Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour) - 7, Number(minute));
}

function countdown(event: CalendarEvent) {
  const timestamp = parseEventTime(event);
  if (!timestamp) return "";
  const diff = timestamp - Date.now();
  if (diff <= 0) return "RELEASED";
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `T-${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `T-${hours}j ${minutes % 60}m`;
}

function MarketRow({ items, source, fetchedAt }: MarketState) {
  const loop = items.length > 1 ? [...items, ...items] : items;
  return (
    <div className="ticker ticker-market" aria-label="Harga market crypto">
      <div className="ticker-shell">
        <div className="ticker-status">
          <span className="ticker-live-dot" aria-hidden="true" />
          <span className="ticker-live-label">LIVE</span>
          <span className="ticker-updated">{source === "live" ? "Market" : "Cached"} · {relativeAge(fetchedAt)}</span>
        </div>
        <div className="ticker-viewport ticker-viewport-market">
          <div className="ticker-track ticker-track-market">
            {loop.map((item, index) => (
              <span key={`${item.id}-${index}`} className="ticker-item ticker-market-item">
                <span className="ticker-symbol">{item.symbol}</span>
                <span className="ticker-price">${formatPrice(item.priceUsd)}</span>
                <span className={cn("ticker-change", item.change24h > 0 && "is-up", item.change24h < 0 && "is-down")}>
                  {formatChange(item.change24h)}
                </span>
              </span>
            ))}
          </div>
        </div>
        <a
          className="ticker-attribution"
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noreferrer noopener"
          title="Sumber data market crypto"
        >
          Data by CoinGecko
        </a>
      </div>
    </div>
  );
}

function CalendarRow({ events }: { events: CalendarEvent[] }) {
  const items = events.filter((event) => event.impact === "high").slice(0, 10);
  if (items.length === 0) return null;
  const loop = items.length > 1 ? [...items, ...items] : items;

  return (
    <div className="ticker ticker-calendar" aria-label="Jadwal data ekonomi berdampak tinggi">
      <div className="ticker-shell">
        <Link to="/kalender-ekonomi" className="ticker-status ticker-calendar-label">
          <span className="ticker-calendar-icon">ECON</span>
          <span>EVENTS</span>
        </Link>
        <div className="ticker-viewport">
          <div className="ticker-track ticker-track-calendar">
            {loop.map((event, index) => {
              const remaining = countdown(event);
              return (
                <span key={`${event.name}-${index}`} className="ticker-item ticker-calendar-item">
                  <span className="ticker-impact-dot" />
                  <span className="font-mono text-[11px] text-subtle">{event.timeWib}</span>
                  <span className="font-semibold text-ink">{event.economy}</span>
                  <span className="ticker-event-name">{event.name}</span>
                  {remaining ? <span className={cn("ticker-countdown", remaining === "RELEASED" && "is-released")}>{remaining}</span> : null}
                </span>
              );
            })}
          </div>
        </div>
        <Link to="/kalender-ekonomi" className="ticker-more">Kalender →</Link>
      </div>
    </div>
  );
}

export function MarketTicker({ events }: { events: CalendarEvent[] }) {
  const [market, setMarket] = useState<MarketState | null>(null);
  const [calendarEvents, setCalendarEvents] = useState(events);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setInterval> | undefined;

    const refresh = async () => {
      try {
        const [marketPayload, calendarPayload] = await Promise.all([
          getCryptoMarket(),
          getEconomicCalendar(),
        ]);
        if (!mounted) return;
        setMarket(marketPayload);
        setCalendarEvents(calendarPayload.events);
        setPulse((value) => value + 1);
      } catch {
        // Existing SSR data remains visible when a refresh fails.
      }
    };

    void refresh();
    timer = setInterval(() => void refresh(), 60_000);
    return () => {
      mounted = false;
      if (timer) clearInterval(timer);
    };
  }, []);

  const fallbackMarket: MarketState = useMemo(
    () => ({
      source: "cache",
      fetchedAt: new Date().toISOString(),
      items: [],
    }),
    [],
  );

  return (
    <div className={cn("ticker-stack", pulse > 0 && "is-refreshed")} key={pulse}>
      <MarketRow {...(market ?? fallbackMarket)} />
      <CalendarRow events={calendarEvents} />
    </div>
  );
}
