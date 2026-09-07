#!/usr/bin/env node
/**
 * Deploy-time database migrator for the shared Neon PostgreSQL database.
 *
 * Local development may skip this step because PGLite handles the local schema.
 * Vercel Production/Preview must have DATABASE_URL; never silently fall back.
 */
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pg from "pg";
import { pendingMigrations } from "./migration-plan.mjs";

const databaseUrl = process.env.DATABASE_URL?.trim();
const isVercel = process.env.VERCEL === "1";

if (!databaseUrl) {
  if (isVercel) {
    console.error("[migrate] DATABASE_URL is not configured on Vercel");
    process.exit(1);
  }

  console.log(
    "[migrate] DATABASE_URL not set — skipping local migration (PGLite handles local development).",
  );
  process.exit(0);
}

const migrationsDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "migrations",
);

async function main() {
  let entries;
  try {
    entries = await readdir(migrationsDir);
  } catch {
    console.log("[migrate] no migrations/ directory — nothing to do.");
    return;
  }

  if (pendingMigrations(entries, []).length === 0) {
    console.log("[migrate] no migrations — nothing to do.");
    return;
  }

  const pool = new pg.Pool({ connectionString: databaseUrl, max: 1 });
  const client = await pool.connect();

  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())",
    );

    const applied = (await client.query("SELECT name FROM _migrations")).rows.map(
      (r) => r.name,
    );

    let count = 0;

    for (const { name } of pendingMigrations(entries, applied)) {
      const text = await readFile(join(migrationsDir, name), "utf8");

      try {
        await client.query("BEGIN");
        await client.query(text);
        await client.query(
          "INSERT INTO _migrations (name) VALUES ($1)",
          [name],
        );
        await client.query("COMMIT");
      } catch (err) {
        console.error(`[migrate] error applying ${name}`);
        try {
          await client.query("ROLLBACK");
        } catch {
          // Preserve the original database error.
        }
        throw err;
      }

      console.log(`[migrate] applied ${name}`);
      count += 1;
    }

    console.log(
      count
        ? `[migrate] done — ${count} migration(s) applied.`
        : "[migrate] up to date.",
    );
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("[migrate] failed:", err?.message || err);
  for (const key of ["code", "detail", "hint", "position", "where"]) {
    if (err?.[key] != null) console.error(`[migrate]   ${key}: ${err[key]}`);
  }
  process.exit(1);
});
