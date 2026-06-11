/**
 * Category Migration Script
 *
 * Backfills the new multi-value `categories` column from the legacy single
 * `category` column for any inflatables that don't yet have it populated.
 *
 * Run this once after applying the schema change (npm run db:push):
 *   npm run db:migrate-categories
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, isNull, or, sql } from "drizzle-orm";
import * as schema from "../src/lib/db/schema";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const dbSql = neon(process.env.DATABASE_URL);
const db = drizzle(dbSql, { schema });

async function migrate() {
  console.log("Backfilling categories from legacy category column...\n");

  // Rows where categories is null or empty but a legacy category exists.
  const rows = await db
    .select()
    .from(schema.inflatables)
    .where(
      or(
        isNull(schema.inflatables.categories),
        sql`cardinality(${schema.inflatables.categories}) = 0`
      )
    );

  let updated = 0;
  for (const row of rows) {
    if (!row.category) continue;
    await db
      .update(schema.inflatables)
      .set({ categories: [row.category] })
      .where(eq(schema.inflatables.id, row.id));
    updated++;
  }

  console.log(`  Backfilled ${updated} inflatable(s)\n`);
  console.log("Done.");
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
