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



type WeeklyCache = {

  at: number;

  events: FeedEvent[];

};



const globalRef = globalThis as typeof globalThis & {

  __ecoCalendarWeeklyCache__?: WeeklyCache;

};



// Sumber FF export hanya di-update sekitar sekali per jam,

// jadi kita tidak perlu memintanya setiap page view.

const CACHE_MS = 60 * 60 * 1000;



const FEED_URL =

  "https://nfs.faireconomy.media/ff_calendar_thisweek.json";



function getCache() {

  return globalRef.__ecoCalendarWeeklyCache__;

}



function setCache(events: FeedEvent[]) {

  globalRef.__ecoCalendarWeeklyCache__ = {

    at: Date.now(),

    events,

  };

}



function dash(value: string | null | undefined) {

  const text = (value ?? "").replace(/\u00a0/g, " ").trim();

  return text.length ? text : "—";

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



function filterEventsByDate(

  events: FeedEvent[],

  selectedDate: string,

) {

  return events

    .map(normalizeEvent)

    .filter((event): event is CalendarEvent => event !== null)

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



async function fetchWeeklyFeed(): Promise<FeedEvent[]> {

  const response = await fetch(FEED_URL, {

    headers: {

      Accept: "application/json",

      "User-Agent":

        "Mozilla/5.0 (compatible; BirustockCalendar/1.0)",

    },

  });



  if (!response.ok) {

    throw new Error(

      `Calendar feed HTTP ${response.status}`,

    );

  }



  const contentType =

    response.headers.get("content-type") ?? "";



  const text = await response.text();



  // Rate-limit/challenge page kadang dikembalikan sebagai HTML

  // walaupun status HTTP bukan error.

  if (

    !contentType.includes("application/json") ||

    text.trimStart().startsWith("<!DOCTYPE") ||

    text.trimStart().startsWith("<html")

  ) {

    throw new Error(

      "Calendar feed returned non-JSON content (possibly rate limited).",

    );

  }



  const parsed = JSON.parse(text) as unknown;



  if (!Array.isArray(parsed)) {

    throw new Error("Calendar feed JSON format is invalid.");

  }



  return parsed as FeedEvent[];

}



async function getWeeklyEvents() {

  const cached = getCache();



  if (

    cached &&

    Date.now() - cached.at < CACHE_MS &&

    cached.events.length > 0

  ) {

    return {

      events: cached.events,

      fromCache: true,

    };

  }



  const events = await fetchWeeklyFeed();



  setCache(events);



  return {

    events,

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

      throw new Error("Invalid calendar date.");

    }



    return { date };

  })

  .handler(async ({ data }) => {

    try {

      const result = await getWeeklyEvents();



      const events = filterEventsByDate(

        result.events,

        data.date,

      );



      return {

        source: result.fromCache ? "cache" : "live",

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
