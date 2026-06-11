import type { Inflatable } from "@/lib/db/schema";

// The canonical list of category slugs/labels used across the admin and site.
// The source of truth for which categories exist is the `categories` table in
// the database, but these maps provide presentation metadata (labels, colors,
// icons) and the default options shown in the admin.
export const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: "13x13-bouncers", label: "13'x13' Bouncers" },
  { value: "castle-bouncers", label: "Castle Bouncers" },
  { value: "combo-bouncers", label: "Combo Bouncers" },
  { value: "wet-dry-slides", label: "Wet/Dry Slides" },
  { value: "obstacle-courses", label: "Obstacle Courses" },
];

export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORY_OPTIONS.map((c) => [c.value, c.label])
);

// Shorter labels used on compact badges (cards, detail page).
export const CATEGORY_SHORT_LABELS: Record<string, string> = {
  "13x13-bouncers": "13x13 Bouncer",
  "castle-bouncers": "Castle Bouncer",
  "combo-bouncers": "Combo",
  "wet-dry-slides": "Slide",
  "obstacle-courses": "Obstacle Course",
};

export const CATEGORY_ICONS: Record<string, string> = {
  "13x13-bouncers": "🏠",
  "castle-bouncers": "🏰",
  "combo-bouncers": "🎪",
  "wet-dry-slides": "🌊",
  "obstacle-courses": "🏃",
};

export const CATEGORY_BADGE_COLORS: Record<string, string> = {
  "13x13-bouncers": "bg-violet-600 text-white",
  "castle-bouncers": "bg-orange-500 text-white",
  "combo-bouncers": "bg-emerald-600 text-white",
  "wet-dry-slides": "bg-sky-600 text-white",
  "obstacle-courses": "bg-rose-600 text-white",
};

/**
 * Normalizes incoming API payloads so that `categories` (array) and the legacy
 * `category` (string) columns stay consistent regardless of which field the
 * caller provided. Returns only the fields that need to be set.
 */
export function normalizeCategories(data: {
  category?: string | null;
  categories?: string[] | null;
}): { category: string | null; categories: string[] } {
  let list = data.categories?.filter(Boolean) ?? [];
  if (list.length === 0 && data.category) {
    list = [data.category];
  }
  return {
    categories: list,
    category: list[0] ?? null,
  };
}

/**
 * Returns the list of category slugs an inflatable belongs to.
 * Prefers the multi-value `categories` column, falling back to the legacy
 * single `category` column for rows that predate the migration.
 */
export function getInflatableCategories(
  inflatable: Pick<Inflatable, "category" | "categories">
): string[] {
  const list = inflatable.categories?.filter(Boolean) as string[] | undefined;
  if (list && list.length > 0) return list;
  return inflatable.category ? [inflatable.category] : [];
}
