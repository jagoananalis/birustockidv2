import { useEffect, useMemo, useState } from "react";
import type { CryptoTicker } from "@/lib/market";
import { getCryptoMarket } from "@/lib/market";
import { cn } from "@/lib/utils";

type MarketState = {
  source: "live" | "cache";
  fetchedAt: string;
  items: CryptoTicker[];
};

type BinanceStreamMessage = {
  stream?: string;
  data?: {
    e?: string;
    s?: string;
    p?: string;
  };
};

const STREAM_URL =
  "wss://stream.binance.com:9443/stream?streams=btcusdt@aggTrade/ethusdt@aggTrade/solusdt@aggTrade/bnbusdt@aggTrade";

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

function symbolFromStream(streamSymbol: string) {
  const normalized = streamSymbol.toUpperCase();
  const map: Record<string, CryptoTicker["id"]> = {
    BTCUSDT: "bitcoin",
    ETHUSDT: "ethereum",
    SOLUSDT: "solana",
    BNBUSDT: "binancecoin",
  };
  return map[normalized];
}

function MarketRow({
  items,
  source,
  fetchedAt,
  connected,
  flashed,
}: MarketState & { connected: boolean; flashed: Set<CryptoTicker["id"]> }) {
  const loop = items.length > 1 ? [...items, ...items] : items;
  const liveLabel = connected ? "LIVE" : source === "live" ? "SNAPSHOT" : "CACHE";

  return (
    <div className="ticker ticker-market" aria-label="Harga market crypto live">
      <div className="ticker-shell ticker-shell-market">
        <div className="ticker-status">
          <span className={cn("ticker-live-dot", !connected && "is-idle")} aria-hidden="true" />
          <span className="ticker-live-label">{liveLabel}</span>
          <span className="ticker-updated">
            {connected ? "Binance stream" : relativeAge(fetchedAt)}
          </span>
        </div>
        <div className="ticker-viewport ticker-viewport-market">
          <div className="ticker-track ticker-track-market ticker-track-market-ltr">
            {loop.map((item, index) => (
              <span
                key={`${item.id}-${index}`}
                className={cn(
                  "ticker-item",
                  "ticker-market-item",
                  flashed.has(item.id) && "is-price-flash",
                )}
              >
                <span className="ticker-symbol">{item.symbol}</span>
                <span className="ticker-price">${formatPrice(item.priceUsd)}</span>
                <span
                  className={cn(
                    "ticker-change",
                    item.change24h > 0 && "is-up",
                    item.change24h < 0 && "is-down",
                  )}
                >
                  {formatChange(item.change24h)}
                </span>
              </span>
            ))}
          </div>
        </div>
        <span className="ticker-attribution">Price stream: Binance · 24h change: CoinGecko</span>
      </div>
    </div>
  );
}

export function MarketTicker() {
  const [market, setMarket] = useState<MarketState | null>(null);
  const [connected, setConnected] = useState(false);
  const [flashed, setFlashed] = useState<Set<CryptoTicker["id"]>>(new Set());
  const [clock, setClock] = useState(Date.now());

  useEffect(() => {
    let mounted = true;
    let socket: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;

    const loadSnapshot = async () => {
      try {
        const payload = await getCryptoMarket();
        if (mounted) setMarket(payload);
      } catch {
        // The ticker stays hidden until a snapshot or a stream message arrives.
      }
    };

    const connect = () => {
      if (!mounted) return;
      try {
        socket = new WebSocket(STREAM_URL);
      } catch {
        setConnected(false);
        reconnectTimer = setTimeout(connect, 5000);
        return;
      }

      socket.onopen = () => {
        if (mounted) setConnected(true);
      };

      socket.onmessage = (event) => {
        if (!mounted) return;
        try {
          const message = JSON.parse(event.data) as BinanceStreamMessage;
          const stream = message.data;
          if (stream?.e !== "aggTrade" || !stream.s || !stream.p) return;
          const id = symbolFromStream(stream.s);
          const price = Number(stream.p);
          if (!id || !Number.isFinite(price)) return;

          setMarket((current) => {
            if (!current) return current;
            return {
              ...current,
              source: "live",
              fetchedAt: new Date().toISOString(),
              items: current.items.map((item) =>
                item.id === id ? { ...item, priceUsd: price, fetchedAt: new Date().toISOString() } : item,
              ),
            };
          });
          setFlashed((current) => new Set(current).add(id));
          window.setTimeout(() => {
            setFlashed((current) => {
              const next = new Set(current);
              next.delete(id);
              return next;
            });
          }, 500);
        } catch {
          // Ignore malformed stream events.
        }
      };

      socket.onerror = () => {
        if (mounted) setConnected(false);
      };

      socket.onclose = () => {
        if (!mounted) return;
        setConnected(false);
        reconnectTimer = setTimeout(connect, 5000);
      };
    };

    void loadSnapshot();
    connect();
    const clockTimer = setInterval(() => setClock(Date.now()), 1000);

    return () => {
      mounted = false;
      if (socket) socket.close();
      if (reconnectTimer) clearTimeout(reconnectTimer);
      clearInterval(clockTimer);
    };
  }, []);

  const fallbackMarket: MarketState = useMemo(
    () => ({
      source: "cache",
      fetchedAt: new Date(clock).toISOString(),
      items: [],
    }),
    [clock],
  );

  return <MarketRow {...(market ?? fallbackMarket)} connected={connected} flashed={flashed} />;
}
