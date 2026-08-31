import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { slugify } from "@/lib/format";

export type Accent = "blue" | "orange" | "green" | "red";
export type EduLevel = "Pemula" | "Menengah" | "Lanjutan";

export type AnalisisItem = {
  id: number;
  slug: string;
  pair: string;
  title: string;
  excerpt: string;
  body: string;
  imageUrl: string;
  accent: Accent;
  timeframe: string;
  bias: string;
  support: string;
  resistance: string;
  target: string;
  invalidation: string;
  scenarioBullish: string;
  scenarioBearish: string;
  publishedAt: string;
  updatedAt: string;
};

export type EdukasiItem = {
  id: number;
  slug: string;
  level: EduLevel;
  title: string;
  description: string;
  body: string;
  imageUrl: string;
};

type AnalisisRow = {
  id: number;
  slug: string;
  pair: string;
  title: string;
  excerpt: string;
  body: string;
  image_url: string;
  accent: string;
  published_at: string;
  timeframe: string;
  bias: string;
  support: string;
  resistance: string;
  target: string;
  invalidation: string;
  scenario_bullish: string;
  scenario_bearish: string;
  updated_at: string;
};

type EdukasiRow = {
  id: number;
  slug: string;
  level: string;
  title: string;
  description: string;
  body: string;
  image_url: string;
};

const ACCENTS: Accent[] = ["blue", "orange", "green", "red"];
const LEVELS: EduLevel[] = ["Pemula", "Menengah", "Lanjutan"];

function asAccent(value: string): Accent {
  return ACCENTS.includes(value as Accent) ? (value as Accent) : "blue";
}

function asLevel(value: string): EduLevel {
  return LEVELS.includes(value as EduLevel) ? (value as EduLevel) : "Pemula";
}

function mapAnalisis(row: AnalisisRow): AnalisisItem {
  return {
    id: row.id,
    slug: row.slug,
    pair: row.pair,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    imageUrl: row.image_url,
    accent: asAccent(row.accent),
    timeframe: row.timeframe,
    bias: row.bias,
    support: row.support,
    resistance: row.resistance,
    target: row.target,
    invalidation: row.invalidation,
    scenarioBullish: row.scenario_bullish,
    scenarioBearish: row.scenario_bearish,
    publishedAt: String(row.published_at).slice(0, 10),
    updatedAt: String(row.updated_at),
  };
}

function mapEdukasi(row: EdukasiRow): EdukasiItem {
  return {
    id: row.id,
    slug: row.slug,
    level: asLevel(row.level),
    title: row.title,
    description: row.description,
    body: row.body,
    imageUrl: row.image_url,
  };
}

const imageUrlSchema = z
  .string()
  .max(400_000)
  .refine(
    (v) =>
      v === "" ||
      v.startsWith("/") ||
      v.startsWith("https://") ||
      v.startsWith("http://") ||
      v.startsWith("data:image/"),
    "URL gambar tidak valid",
  );

const analisisInput = z.object({
  token: z.string().min(1),
  id: z.number().int().optional(),
  slug: z.string().optional(),
  pair: z.string().min(2).max(24),
  title: z.string().min(4).max(140),
  excerpt: z.string().min(8).max(240),
  body: z.string().min(20).max(12_000),
  imageUrl: imageUrlSchema,
  accent: z.enum(["blue", "orange", "green", "red"]),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeframe: z.string().min(1).max(12),
  bias: z.enum(["Bullish", "Bearish", "Netral"]),
  support: z.string().max(300),
  resistance: z.string().max(300),
  target: z.string().max(300),
  invalidation: z.string().max(300),
  scenarioBullish: z.string().max(1000),
  scenarioBearish: z.string().max(1000),
});

const edukasiInput = z.object({
  token: z.string().min(1),
  id: z.number().int().optional(),
  slug: z.string().optional(),
  level: z.enum(["Pemula", "Menengah", "Lanjutan"]),
  title: z.string().min(4).max(140),
  description: z.string().min(8).max(280),
  body: z.string().min(20).max(12_000),
  imageUrl: imageUrlSchema,
});

async function uniqueSlug(base: string, table: "analisis" | "edukasi", excludeId?: number) {
  const sql = await getSql();
  let candidate = base || "update";
  for (let i = 0; i < 20; i += 1) {
    const rows =
      table === "analisis"
        ? await sql<{ id: number }>`select id from analisis where slug = ${candidate}`
        : await sql<{ id: number }>`select id from edukasi where slug = ${candidate}`;
    const taken = rows[0] && rows[0].id !== excludeId;
    if (!taken) return candidate;
    candidate = `${base}-${i + 2}`;
  }
  return `${base}-${Date.now().toString(36)}`;
}

export const listAnalisis = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<AnalisisRow>`
    select id, slug, pair, title, excerpt, body, image_url, accent, published_at, timeframe, bias, support, resistance, target, invalidation, scenario_bullish, scenario_bearish, updated_at
    from analisis
    order by published_at desc, id desc
  `;
  return rows.map(mapAnalisis);
});

export const getAnalisisBySlug = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<AnalisisRow>`
      select id, slug, pair, title, excerpt, body, image_url, accent, published_at, timeframe, bias, support, resistance, target, invalidation, scenario_bullish, scenario_bearish, updated_at
      from analisis
      where slug = ${data.slug}
      limit 1
    `;
    return rows[0] ? mapAnalisis(rows[0]) : null;
  });

export const listEdukasi = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<EdukasiRow>`
    select id, slug, level, title, description, body, image_url
    from edukasi
    order by
      case level when 'Pemula' then 1 when 'Menengah' then 2 else 3 end,
      id asc
  `;
  return rows.map(mapEdukasi);
});

export const getEdukasiBySlug = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<EdukasiRow>`
      select id, slug, level, title, description, body, image_url
      from edukasi
      where slug = ${data.slug}
      limit 1
    `;
    return rows[0] ? mapEdukasi(rows[0]) : null;
  });

export const founderLogin = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ pin: z.string().min(1).max(40) }).parse(input))
  .handler(async ({ data }) => {
    const { verifyFounderPin, signFounderToken } = await import("./founder.server");
    if (!verifyFounderPin(data.pin)) {
      throw new Error("PIN tidak sesuai.");
    }
    return { token: signFounderToken() };
  });

export const founderPing = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ token: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const { verifyFounderToken } = await import("./founder.server");
    return { ok: verifyFounderToken(data.token) };
  });

export const saveAnalisis = createServerFn({ method: "POST" })
  .validator((input: unknown) => analisisInput.parse(input))
  .handler(async ({ data }) => {
    const { assertFounder } = await import("./founder.server");
    assertFounder(data.token);
    const sql = await getSql();
    const base = slugify(data.slug || `${data.pair}-${data.publishedAt}-${data.title}`);
    const slug = await uniqueSlug(base, "analisis", data.id);
    if (data.id) {
      await sql`
        update analisis
        set slug = ${slug},
            pair = ${data.pair.trim()},
            title = ${data.title.trim()},
            excerpt = ${data.excerpt.trim()},
            body = ${data.body.trim()},
            image_url = ${data.imageUrl},
            accent = ${data.accent},
            published_at = ${data.publishedAt},
            timeframe = ${data.timeframe.trim()},
            bias = ${data.bias},
            support = ${data.support.trim()},
            resistance = ${data.resistance.trim()},
            target = ${data.target.trim()},
            invalidation = ${data.invalidation.trim()},
            scenario_bullish = ${data.scenarioBullish.trim()},
            scenario_bearish = ${data.scenarioBearish.trim()},
            updated_at = now()
        where id = ${data.id}
      `;
      return { id: data.id, slug };
    }
    const inserted = await sql<{ id: number }>`
      insert into analisis (slug, pair, title, excerpt, body, image_url, accent, published_at, timeframe, bias, support, resistance, target, invalidation, scenario_bullish, scenario_bearish)
      values (
        ${slug},
        ${data.pair.trim()},
        ${data.title.trim()},
        ${data.excerpt.trim()},
        ${data.body.trim()},
        ${data.imageUrl},
        ${data.accent},
        ${data.publishedAt},
        ${data.timeframe.trim()},
        ${data.bias},
        ${data.support.trim()},
        ${data.resistance.trim()},
        ${data.target.trim()},
        ${data.invalidation.trim()},
        ${data.scenarioBullish.trim()},
        ${data.scenarioBearish.trim()}
      )
      returning id
    `;
    return { id: inserted[0]?.id ?? 0, slug };
  });

export const saveEdukasi = createServerFn({ method: "POST" })
  .validator((input: unknown) => edukasiInput.parse(input))
  .handler(async ({ data }) => {
    const { assertFounder } = await import("./founder.server");
    assertFounder(data.token);
    const sql = await getSql();
    const base = slugify(data.slug || data.title);
    const slug = await uniqueSlug(base, "edukasi", data.id);
    if (data.id) {
      await sql`
        update edukasi
        set slug = ${slug},
            level = ${data.level},
            title = ${data.title.trim()},
            description = ${data.description.trim()},
            body = ${data.body.trim()},
            image_url = ${data.imageUrl}
        where id = ${data.id}
      `;
      return { id: data.id, slug };
    }
    const inserted = await sql<{ id: number }>`
      insert into edukasi (slug, level, title, description, body, image_url)
      values (
        ${slug},
        ${data.level},
        ${data.title.trim()},
        ${data.description.trim()},
        ${data.body.trim()},
        ${data.imageUrl}
      )
      returning id
    `;
    return { id: inserted[0]?.id ?? 0, slug };
  });

export const deleteAnalisis = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ token: z.string(), id: z.number().int() }).parse(input))
  .handler(async ({ data }) => {
    const { assertFounder } = await import("./founder.server");
    assertFounder(data.token);
    const sql = await getSql();
    await sql`delete from analisis where id = ${data.id}`;
    return { ok: true };
  });

export const deleteEdukasi = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ token: z.string(), id: z.number().int() }).parse(input))
  .handler(async ({ data }) => {
    const { assertFounder } = await import("./founder.server");
    assertFounder(data.token);
    const sql = await getSql();
    await sql`delete from edukasi where id = ${data.id}`;
    return { ok: true };
  });
