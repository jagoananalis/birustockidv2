import { createServerFn } from "@tanstack/react-start";

export type CryptoTicker = {
  id: "bitcoin" | "ethereum" | "solana" | "binancecoin";
  symbol: string;
  name: string;
  priceUsd: number;
  change24h: number;
  fetchedAt: string;
};

type CoinGeckoResponse = Record<
  string,
  {
    usd?: number;
    usd_24h_change?: number;
  }
>;

type MarketCache = {
  at: number;
  items: CryptoTicker[];
};

const globalRef = globalThis as typeof globalThis & {
  __birustockCryptoTickerCache__?: MarketCache;
};

const CACHE_MS = 60 * 1000;
const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true";

const DEFINITIONS: Array<Pick<CryptoTicker, "id" | "symbol" | "name">> = [
  { id: "bitcoin", symbol: "BTC/USD", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH/USD", name: "Ethereum" },
  { id: "solana", symbol: "SOL/USD", name: "Solana" },
  { id: "binancecoin", symbol: "BNB/USD", name: "BNB" },
];

function getCached() {
  const cache = globalRef.__birustockCryptoTickerCache__;
  if (!cache || Date.now() - cache.at > CACHE_MS) return null;
  return cache.items;
}

async function fetchMarket(): Promise<CryptoTicker[]> {
  const response = await fetch(COINGECKO_URL, {
    headers: {
      Accept: "application/json",
      "User-Agent": "BirustockCustomer/1.0 (+https://birustock.id)",
    },
  });

  if (!response.ok) {
    throw new Error(`CoinGecko HTTP ${response.status}`);
  }

  const data = (await response.json()) as CoinGeckoResponse;
  const fetchedAt = new Date().toISOString();

  return DEFINITIONS.flatMap((definition) => {
    const row = data[definition.id];
    if (typeof row?.usd !== "number") return [];
    return [
      {
        ...definition,
        priceUsd: row.usd,
        change24h: typeof row.usd_24h_change === "number" ? row.usd_24h_change : 0,
        fetchedAt,
      },
    ];
  });
}

export const getCryptoMarket = createServerFn({ method: "GET" }).handler(async () => {
  const cached = getCached();
  if (cached) {
    return {
      source: "cache" as const,
      fetchedAt: cached[0]?.fetchedAt ?? new Date().toISOString(),
      items: cached,
    };
  }

  try {
    const items = await fetchMarket();
    if (items.length === 0) throw new Error("CoinGecko returned no supported assets");
    globalRef.__birustockCryptoTickerCache__ = { at: Date.now(), items };
    return {
      source: "live" as const,
      fetchedAt: items[0].fetchedAt,
      items,
    };
  } catch (error) {
    const previous = globalRef.__birustockCryptoTickerCache__;
    if (previous?.items?.length) {
      return {
        source: "cache" as const,
        fetchedAt: previous.items[0].fetchedAt,
        items: previous.items,
      };
    }
    throw error instanceof Error ? error : new Error("Gagal mengambil market data");
  }
});
