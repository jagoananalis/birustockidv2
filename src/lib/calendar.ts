import { createServerFn } from "@tanstack/react-start";



export type CalendarImpact = "high" | "medium" | "low";



export type CalendarEvent = {

  economy: string;

  impact: CalendarImpact;

  impactScore: number;

  data: string;

  name: string;

  actual: string;

  forecast: string;

  previous: string;

  timeWib: string;

  country: string;

};



export type CalendarPayload = {

  source: "live" | "cache" | "fallback";

  fetchedAt: string;

  selectedDate: string;

  events: CalendarEvent[];

};



const IMPACT_LABEL: Record<CalendarImpact, string> = {

  high: "Tinggi",

  medium: "Sedang",

  low: "Rendah",

};



export { IMPACT_LABEL };



type FeedEvent = {

  title?: string;

  country?: string;

  date?: string;

  impact?: string;

  actual?: string;

  forecast?: string;

  previous?: string;

};



type ActualFeedEvent = {

  time?: string;

  timezone?: string;

  currency?: string;

  impact?: string;

  impact_level?: string;

  event?: string;

  detail?: string;

  actual?: string;

  forecast?: string | null;

  previous?: string | null;

  day?: string;

  date?: string;

  datetime_utc?: string | null;

  scraped_at?: string;

};



type WeeklyCache = {

  at: number;

  calendarEvents: FeedEvent[];

  actualEvents: ActualFeedEvent[];

};



const globalRef = globalThis as typeof globalThis & {

  __ecoCalendarWeeklyCache__?: WeeklyCache;

};



const CACHE_MS = 60 * 60 * 1000;



const CALENDAR_URL =

  "https://nfs.faireconomy.media/ff_calendar_thisweek.json";



const ACTUAL_URL =

  "https://raw.githubusercontent.com/joor0x/forex-factory-agent-feed/main/news/calendar.json";



function getCache() {

  return globalRef.__ecoCalendarWeeklyCache__;

}



function setCache(

  calendarEvents: FeedEvent[],

  actualEvents: ActualFeedEvent[],

) {

  globalRef.__ecoCalendarWeeklyCache__ = {

    at: Date.now(),

    calendarEvents,

    actualEvents,

  };

}



function dash(value: string | null | undefined) {

  const text = (value ?? "").replace(/\u00a0/g, " ").trim();

  return text.length ? text : "—";

}



function normalizeText(value: string | null | undefined) {

  return String(value ?? "")

    .toLowerCase()

    .replace(/[^a-z0-9]+/g, " ")

    .trim();

}



function impactFromLabel(label: string) {

  const value = label.toLowerCase().trim();



  if (

    value.includes("high") ||

    value.includes("red") ||

    value === "3"

  ) {

    return {

      score: 3,

      impact: "high" as const,

    };

  }



  if (

    value.includes("medium") ||

    value.includes("med") ||

    value.includes("orange") ||

    value.includes("yellow") ||

    value === "2"

  ) {

    return {

      score: 2,

      impact: "medium" as const,

    };

  }



  return {

    score: 1,

    impact: "low" as const,

  };

}



function countryFromCurrency(currency: string) {

  const map: Record<string, string> = {

    USD: "US",

    EUR: "EU",

    GBP: "UK",

    JPY: "JP",

    AUD: "AU",

    NZD: "NZ",

    CAD: "CA",

    CHF: "CH",

    CNY: "CN",

    IDR: "ID",

    ALL: "—",

  };



  return map[currency.toUpperCase()] ?? currency.toUpperCase();

}



function getWibParts(isoDate: string) {

  const date = new Date(isoDate);



  if (Number.isNaN(date.getTime())) {

    return null;

  }



  const parts = new Intl.DateTimeFormat("en-CA", {

    timeZone: "Asia/Jakarta",

    year: "numeric",

    month: "2-digit",

    day: "2-digit",

    hour: "2-digit",

    minute: "2-digit",

    hour12: false,

  }).formatToParts(date);



  const values: Record<string, string> = {};



  for (const part of parts) {

    if (part.type !== "literal") {

      values[part.type] = part.value;

    }

  }



  return {

    dateKey: `${values.year}-${values.month}-${values.day}`,

    time: `${values.hour}:${values.minute}`,

  };

}



function getDateKeyFromFf(event: ActualFeedEvent) {

  if (event.datetime_utc) {

    const wib = getWibParts(event.datetime_utc);



    if (wib) {

      return wib.dateKey;

    }

  }



  const match = String(event.date ?? "").match(

    /^(\d{2})\/(\d{2})\/(\d{4})$/,

  );



  if (!match) {

    return null;

  }



  return `${match[3]}-${match[2]}-${match[1]}`;

}



function timestampFromIso(value?: string | null) {

  if (!value) return null;



  const time = new Date(value).getTime();



  return Number.isNaN(time) ? null : time;

}



function timestampFromFf(event: ActualFeedEvent) {

  return timestampFromIso(event.datetime_utc);

}



function normalizeEvent(event: FeedEvent): CalendarEvent | null {

  const name = dash(event.title);



  if (name === "—") {

    return null;

  }



  const economy = dash(event.country).toUpperCase();

  const { score, impact } = impactFromLabel(

    dash(event.impact),

  );



  const rawDate = dash(event.date);

  const wib = rawDate !== "—" ? getWibParts(rawDate) : null;



  return {

    economy,

    impact,

    impactScore: score,

    data: rawDate,

    name,

    actual: dash(event.actual),

    forecast: dash(event.forecast),

    previous: dash(event.previous),

    timeWib: wib ? `${wib.time} WIB` : "—",

    country: countryFromCurrency(economy),

  };

}



function findMatchingActual(

  baseEvent: FeedEvent,

  actualEvents: ActualFeedEvent[],

) {

  const baseCurrency = String(baseEvent.country ?? "")

    .trim()

    .toUpperCase();



  const baseTitle = normalizeText(baseEvent.title);

  const baseTimestamp = timestampFromIso(baseEvent.date);



  const baseDateKey = baseEvent.date

    ? getWibParts(baseEvent.date)?.dateKey

    : null;



  if (!baseCurrency || !baseTitle || !baseDateKey) {

    return null;

  }



  const candidates = actualEvents.filter((candidate) => {

    const candidateCurrency = String(

      candidate.currency ?? "",

    )

      .trim()

      .toUpperCase();



    if (candidateCurrency !== baseCurrency) {

      return false;

    }



    if (

      normalizeText(candidate.event) !== baseTitle

    ) {

      return false;

    }



    return getDateKeyFromFf(candidate) === baseDateKey;

  });



  if (candidates.length === 0) {

    return null;

  }



  if (candidates.length === 1) {

    return candidates[0];

  }



  // Kalau ada event dengan nama sama lebih dari sekali,

  // pilih yang waktunya paling dekat.

  if (baseTimestamp !== null) {

    const withDistance = candidates.map((candidate) => {

      const candidateTimestamp =

        timestampFromFf(candidate);



      return {

        candidate,

        distance:

          candidateTimestamp === null

            ? Number.MAX_SAFE_INTEGER

            : Math.abs(

                candidateTimestamp - baseTimestamp,

              ),

      };

    });



    withDistance.sort(

      (a, b) => a.distance - b.distance,

    );



    return withDistance[0]?.candidate ?? null;

  }



  return candidates[0];

}



function filterEventsByDate(

  events: FeedEvent[],

  actualEvents: ActualFeedEvent[],

  selectedDate: string,

) {

  return events

    .map((baseEvent) => {

      const normalized = normalizeEvent(baseEvent);



      if (!normalized) {

        return null;

      }



      const actualMatch = findMatchingActual(

        baseEvent,

        actualEvents,

      );



      return {

        ...normalized,

        actual: actualMatch?.actual?.trim()

          ? actualMatch.actual.trim()

          : normalized.actual,

      };

    })

    .filter(

      (event): event is CalendarEvent =>

        event !== null,

    )

    .filter((event) => {

      if (event.data === "—") {

        return false;

      }



      const wib = getWibParts(event.data);



      return wib?.dateKey === selectedDate;

    })

    .sort((a, b) => {

      const timeA = a.timeWib.replace(" WIB", "");

      const timeB = b.timeWib.replace(" WIB", "");



      return timeA.localeCompare(timeB);

    });

}



async function fetchJson<T>(url: string): Promise<T> {

  const response = await fetch(url, {

    headers: {

      Accept: "application/json",

      "User-Agent":

        "BirustockEconomicCalendar/1.0",

    },

  });



  if (!response.ok) {

    throw new Error(

      `HTTP ${response.status} from ${url}`,

    );

  }



  const contentType =

    response.headers.get("content-type") ?? "";



  const text = await response.text();



  const trimmed = text.trimStart();



  if (

    trimmed.startsWith("<!DOCTYPE") ||

    trimmed.startsWith("<html") ||

    (!contentType.includes("application/json") &&

      !trimmed.startsWith("[") &&

      !trimmed.startsWith("{"))

  ) {

    throw new Error(

      "Calendar source returned non-JSON content.",

    );

  }



  return JSON.parse(text) as T;

}



async function fetchCalendarFeed() {

  return fetchJson<FeedEvent[]>(CALENDAR_URL);

}



async function fetchActualFeed() {

  return fetchJson<ActualFeedEvent[]>(ACTUAL_URL);

}



async function getWeeklyEvents() {

  const cached = getCache();



  if (

    cached &&

    Date.now() - cached.at < CACHE_MS &&

    cached.calendarEvents.length > 0

  ) {

    return {

      calendarEvents: cached.calendarEvents,

      actualEvents: cached.actualEvents,

      fromCache: true,

    };

  }



  // Kedua sumber diambil terpisah.

  // Kalau FF Actual gagal, calendar utama tetap berjalan.

  const [calendarResult, actualResult] =

    await Promise.allSettled([

      fetchCalendarFeed(),

      fetchActualFeed(),

    ]);



  if (calendarResult.status === "rejected") {

    throw calendarResult.reason;

  }



  const calendarEvents = calendarResult.value;



  const actualEvents =

    actualResult.status === "fulfilled"

      ? actualResult.value

      : [];



  if (actualResult.status === "rejected") {

    console.error(

      "[calendar] FF Actual feed failed:",

      actualResult.reason,

    );

  }



  setCache(calendarEvents, actualEvents);



  console.log(

    "[calendar] weekly feed:",

    calendarEvents.length,

    "base events;",

    actualEvents.length,

    "FF events;",

  );



  return {

    calendarEvents,

    actualEvents,

    fromCache: false,

  };

}



function todayWib() {

  return new Intl.DateTimeFormat("en-CA", {

    timeZone: "Asia/Jakarta",

    year: "numeric",

    month: "2-digit",

    day: "2-digit",

  }).format(new Date());

}



export const getEconomicCalendar = createServerFn({

  method: "GET",

})

  .validator((input: unknown) => {

    const value =

      input && typeof input === "object"

        ? (input as Record<string, unknown>)

        : {};



    const date =

      typeof value.date === "string"

        ? value.date

        : todayWib();



    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {

      throw new Error(

        "Invalid calendar date.",

      );

    }



    return { date };

  })

  .handler(async ({ data }) => {

    try {

      const result = await getWeeklyEvents();



      const events = filterEventsByDate(

        result.calendarEvents,

        result.actualEvents,

        data.date,

      );



      return {

        source: result.fromCache

          ? "cache"

          : "live",

        fetchedAt: new Date().toISOString(),

        selectedDate: data.date,

        events,

      } satisfies CalendarPayload;

    } catch (error) {

      console.error(

        "[calendar] weekly feed failed:",

        error,

      );



      return {

        source: "fallback",

        fetchedAt: new Date().toISOString(),

        selectedDate: data.date,

        events: [],

      } satisfies CalendarPayload;

    }

  });
