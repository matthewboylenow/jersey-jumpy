import { getDb } from "@/lib/db";
import { settings } from "@/lib/db/schema";

export type SettingsMap = Record<string, string>;

export async function getSettings(): Promise<SettingsMap> {
  try {
    const db = getDb();
    const rows = await db.select().from(settings);
    const map: SettingsMap = {};
    rows.forEach((row) => {
      if (row.key && row.value) {
        map[row.key] = row.value;
      }
    });
    return map;
  } catch {
    return {};
  }
}

export const DEFAULT_REFERRAL_SOURCES: string[] = [
  "Google Search",
  "Facebook",
  "Instagram",
  "Twitter",
  "Saw our truck on the road",
  "Billboard on Rt.35",
  "Postcard",
  "Word of mouth",
  "Friend/Family recommendation",
  "Other",
];

export function parseReferralSources(value: string | undefined | null): string[] {
  if (!value) return DEFAULT_REFERRAL_SOURCES;
  const items = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return items.length > 0 ? items : DEFAULT_REFERRAL_SOURCES;
}
