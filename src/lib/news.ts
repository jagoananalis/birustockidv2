import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { slugify } from "@/lib/format";
import type { ContentPage } from "@/lib/content";

export type NewsThumb = "capitol" | "gold" | "bitcoin";
export type NewsStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
export type NewsItem = {
  id: number;
  slug: string;
  date: string;
  category: string;
  thumb: NewsThumb;
  title: string;
  excerpt: string;
  body: string[];
  publishedAt: string;
  updatedAt: string;
  status: NewsStatus;
};

type NewsRow = Omit<NewsItem, "date" | "body" | "thumb" | "publishedAt" | "updatedAt"> & {
  body: string;
  thumb: string;
  published_at: string;
  updated_at: string;
  status: string;
};

function asThumb(value: string): NewsThumb {
  return value === "gold" || value === "bitcoin" ? value : "capitol";
}

function mapNews(row: NewsRow): NewsItem {
  return {
    id: row.id,
    slug: row.slug,
    date: String(row.published_at).slice(0, 10),
    category: row.category,
    thumb: asThumb(row.thumb),
    title: row.title,
    excerpt: row.excerpt,
    body: row.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
    publishedAt: String(row.published_at).slice(0, 10),
    updatedAt: String(row.updated_at),
    status: ["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"].includes(row.status) ? row.status as NewsStatus : "PUBLISHED",
  };
}

const input = z.object({
  token: z.string().min(1),
  id: z.number().int().optional(),
  slug: z.string().optional(),
  category: z.string().min(2).max(80),
  title: z.string().min(4).max(180),
  excerpt: z.string().min(8).max(320),
  body: z.string().min(20).max(20_000),
  thumb: z.enum(["capitol", "gold", "bitcoin"]),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]).default("PUBLISHED"),
});

async function uniqueSlug(base: string, excludeId?: number) {
  const sql = await getSql();
  let candidate = base || "news";
  for (let i = 0; i < 20; i += 1) {
    const rows = await sql<{ id: number }>`select id from news where slug = ${candidate}`;
    if (!rows[0] || rows[0].id === excludeId) return candidate;
    candidate = `${base}-${i + 2}`;
  }
  return `${base}-${Date.now().toString(36)}`;
}

const pageSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(30).default(9),
  category: z.string().trim().max(80).optional(),
});

export const listNews = createServerFn({ method: "GET" })
  .validator((input: unknown) => pageSchema.parse(input ?? {}))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const offset = (data.page - 1) * data.pageSize;
    const rows = await sql<NewsRow>`
      select id, slug, category, title, excerpt, body, thumb, published_at, updated_at, status
      from news
      where status = 'PUBLISHED'
        and (${data.category ?? ""} = '' or category = ${data.category ?? ""})
      order by published_at desc, id desc
      limit ${data.pageSize} offset ${offset}
    `;
    return rows.map(mapNews);
  });

export const listNewsPage = createServerFn({ method: "GET" })
  .validator((input: unknown) => pageSchema.parse(input ?? {}))
  .handler(async ({ data }): Promise<ContentPage<NewsItem>> => {
    const sql = await getSql();
    const offset = (data.page - 1) * data.pageSize;
    const [rows, countRows] = await Promise.all([
      sql<NewsRow>`
        select id, slug, category, title, excerpt, body, thumb, published_at, updated_at, status
        from news
        where status = 'PUBLISHED'
          and (${data.category ?? ""} = '' or category = ${data.category ?? ""})
        order by published_at desc, id desc
        limit ${data.pageSize} offset ${offset}
      `,
      sql<{ count: string }>`
        select count(*)::text as count from news
        where status = 'PUBLISHED'
          and (${data.category ?? ""} = '' or category = ${data.category ?? ""})
      `,
    ]);
    const totalItems = Number(countRows[0]?.count ?? 0);
    return { items: rows.map(mapNews), page: data.page, pageSize: data.pageSize, totalItems, totalPages: Math.max(1, Math.ceil(totalItems / data.pageSize)) };
  });

export const getNewsBySlug = createServerFn({ method: "GET" })
  .validator((value: unknown) => z.object({ slug: z.string().min(1) }).parse(value))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<NewsRow>`
      select id, slug, category, title, excerpt, body, thumb, published_at, updated_at, status
      from news where slug = ${data.slug} and status = 'PUBLISHED' limit 1
    `;
    return rows[0] ? mapNews(rows[0]) : null;
  });

export const listNewsAdmin = createServerFn({ method: "POST" })
  .validator((value: unknown) => z.object({ token: z.string().min(1) }).parse(value))
  .handler(async ({ data }) => {
    const { assertFounder } = await import("./founder.server");
    assertFounder(data.token);
    const sql = await getSql();
    const rows = await sql<NewsRow>`select id, slug, category, title, excerpt, body, thumb, published_at, updated_at, status from news order by published_at desc, id desc`;
    return rows.map(mapNews);
  });

export const saveNews = createServerFn({ method: "POST" })
  .validator((value: unknown) => input.parse(value))
  .handler(async ({ data }) => {
    const { assertFounder } = await import("./founder.server");
    assertFounder(data.token);
    const sql = await getSql();
    const slug = await uniqueSlug(slugify(data.slug || data.title), data.id);
    if (data.id) {
      await sql`
        update news set slug=${slug}, category=${data.category.trim()}, title=${data.title.trim()},
        excerpt=${data.excerpt.trim()}, body=${data.body.trim()}, thumb=${data.thumb},
        published_at=${data.publishedAt}, status=${data.status}, updated_at=now() where id=${data.id}
      `;
      return { id: data.id, slug };
    }
    const rows = await sql<{ id: number }>`
      insert into news (slug, category, title, excerpt, body, thumb, published_at, status)
      values (${slug}, ${data.category.trim()}, ${data.title.trim()}, ${data.excerpt.trim()}, ${data.body.trim()}, ${data.thumb}, ${data.publishedAt}, ${data.status})
      returning id
    `;
    return { id: rows[0]?.id ?? 0, slug };
  });

export const deleteNews = createServerFn({ method: "POST" })
  .validator((value: unknown) => z.object({ token: z.string().min(1), id: z.number().int() }).parse(value))
  .handler(async ({ data }) => {
    const { assertFounder } = await import("./founder.server");
    assertFounder(data.token);
    const sql = await getSql();
    await sql`delete from news where id=${data.id}`;
    return { ok: true };
  });
