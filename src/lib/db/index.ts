import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Lazy database connection - only connects when actually used
// This prevents build failures when DATABASE_URL isn't set yet
let _db: NeonHttpDatabase<typeof schema> | null = null;
let _sql: NeonQueryFunction<false, false> | null = null;

export function getDb(): NeonHttpDatabase<typeof schema> {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL environment variable is not set. " +
        "Please connect your Neon database through Vercel."
      );
    }
    _sql = neon(process.env.DATABASE_URL);
    _db = drizzle(_sql, { schema });
  }
  return _db;
}

// Export a proxy that lazily initializes the database
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    const database = getDb();
    const value = database[prop as keyof typeof database];
    if (typeof value === "function") {
      return value.bind(database);
    }
    return value;
  },
});

// Export schema for convenience
export * from "./schema";
