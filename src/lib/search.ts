import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";

export type SearchResult = {
  kind: "analisis" | "news" | "edukasi";
  slug: string;
  title: string;
  meta: string;
  date: string;
};

export const searchContent = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ q: z.string().trim().min(2).max(80) }).parse(input))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const term = `%${data.q}%`;
    const [analisis, news, edukasi] = await Promise.all([
      sql<SearchResult>`
        select 'analisis' as kind, slug, title,
               pair || ' · ' || timeframe || ' · ' || bias as meta,
               published_at::text as date
        from analisis
        where status = 'PUBLISHED'
          and (title ilike ${term} or pair ilike ${term} or bias ilike ${term} or timeframe ilike ${term} or excerpt ilike ${term})
        order by published_at desc, id desc
        limit 5
      `,
      sql<SearchResult>`
        select 'news' as kind, slug, title,
               category as meta,
               published_at::text as date
        from news
        where status = 'PUBLISHED'
          and (title ilike ${term} or category ilike ${term} or excerpt ilike ${term})
        order by published_at desc, id desc
        limit 5
      `,
      sql<SearchResult>`
        select 'edukasi' as kind, slug, title,
               level as meta,
               published_at::text as date
        from edukasi
        where status = 'PUBLISHED'
          and (title ilike ${term} or level ilike ${term} or description ilike ${term})
        order by published_at desc, id desc
        limit 5
      `,
    ]);
    return { analisis, news, edukasi };
  });
