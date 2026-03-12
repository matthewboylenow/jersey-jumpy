import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { inflatables, faqs, partyPackages } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";

interface PackageItem {
  quantity: number;
  name: string;
}

async function getInflatablesMarkdown(): Promise<string> {
  const db = getDb();
  const items = await db
    .select()
    .from(inflatables)
    .where(eq(inflatables.isActive, true))
    .orderBy(asc(inflatables.sortOrder));

  const categoryNames: Record<string, string> = {
    "13x13-bouncers": "13x13 Bounce Houses",
    "castle-bouncers": "Castle Bouncers",
    "combo-bouncers": "Combo Bouncers",
    "wet-dry-slides": "Wet/Dry Slides",
    "obstacle-courses": "Obstacle Courses",
  };

  const grouped: Record<string, typeof items> = {};
  for (const item of items) {
    const cat = item.category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  }

  let md = "# Jersey Jumpy - Inflatable Rentals\n\n";

  for (const [category, categoryItems] of Object.entries(grouped)) {
    md += `## ${categoryNames[category] || category}\n\n`;
    for (const item of categoryItems) {
      md += `### ${item.name}\n`;
      if (item.subtitle) md += `*${item.subtitle}*\n`;
      md += "\n";
      if (item.description) md += `${item.description}\n\n`;
      if (item.price) md += `- **Price:** Starting at ${formatPrice(item.price)}\n`;
      if (item.width && item.length && item.height) {
        md += `- **Dimensions:** ${item.width} W x ${item.length} L x ${item.height} H\n`;
      }
      if (item.spaceRequired) md += `- **Space Required:** ${item.spaceRequired}\n`;
      md += `- **Details:** https://jerseyjumpy.com/inflatables/${item.slug}\n`;
      md += "\n";
    }
  }

  return md;
}

async function getFaqsMarkdown(): Promise<string> {
  const db = getDb();
  const items = await db
    .select()
    .from(faqs)
    .where(eq(faqs.isActive, true))
    .orderBy(asc(faqs.sortOrder));

  let md = "# Jersey Jumpy - Frequently Asked Questions\n\n";

  for (const faq of items) {
    md += `## ${faq.question}\n\n${faq.answer}\n\n---\n\n`;
  }

  return md;
}

function getRatesMarkdown(): string {
  return `# Jersey Jumpy - Rates & Deposits

All prices include delivery, professional setup, and same-day pickup within our service area.
Prices shown are starting rates and may vary by location.

## Inflatable Rental Rates

| Type | Starting Price |
|---|---|
| 13x13 Jumpy | $350 |
| 15x15 Jumpy | $375 |
| 20x20 Jumpy | $450 |
| 4-1 Combo | $425 |
| 4-1 Combo with Pool | $550 |
| 5-1 Combo | $475 |
| 18' Single Lane Dry Slide | $425 |
| 18' Single Lane Wet Slide with Pool | $600 |
| 18' Dual Lane Dry Slide | $550 |
| 18' Dual Lane Wet Slide with Pool | $700 |
| 20' Dual Lane Dry Slide | $675 |
| 20' Dual Lane Wet Slide with Pool | $800 |
| 22' Dry Slide | $700 |
| 40' Obstacle Course | $600 |
| 50' Obstacle Course | $700 |
| 65' Obstacle Course | $800 |

## Additional Services

| Service | Price | Notes |
|---|---|---|
| Generator Rental | $100 | Required if no power within 100' |
| Attendants | $35/hour | Professional supervision |

## What's Included

- Free delivery
- Professional setup
- Safety instructions
- Same-day pickup
- Full insurance
- Clean equipment
- Extension cords
- Blower included

## Deposit & Payment

- A deposit is required to secure your rental date
- Remaining balance is due on the day of the event
- Standard rental includes up to 8 hours of use
- Extended hours may be available upon request

## Contact

Call 866-597-6625 or visit https://jerseyjumpy.com/contact for an exact quote.
`;
}

async function getPackagesMarkdown(): Promise<string> {
  const db = getDb();
  const items = await db
    .select()
    .from(partyPackages)
    .where(eq(partyPackages.isActive, true))
    .orderBy(asc(partyPackages.sortOrder));

  let md = "# Jersey Jumpy - Party Packages\n\n";
  md +=
    "Bundle and save! Our party packages combine the best inflatables for maximum fun at your next big event.\n\n";

  for (const pkg of items) {
    md += `## ${pkg.name} - ${formatPrice(pkg.price)}\n\n`;
    const pkgItems = pkg.items as PackageItem[];
    md += "**Includes:**\n";
    for (const item of pkgItems) {
      md += `- ${item.quantity}x ${item.name}\n`;
    }
    md += `\n[Book This Package](https://jerseyjumpy.com/contact?package=${encodeURIComponent(pkg.name)})\n\n`;
  }

  md += "---\n\n";
  md += "## Custom Packages\n\n";
  md +=
    "We can create custom packages tailored to your event size, budget, and preferences.\n";
  md += "Call 866-597-6625 or visit https://jerseyjumpy.com/contact to discuss.\n";

  return md;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  const { page } = await params;

  let content: string;

  try {
    switch (page) {
      case "inflatables":
        content = await getInflatablesMarkdown();
        break;
      case "faqs":
        content = await getFaqsMarkdown();
        break;
      case "rates":
        content = getRatesMarkdown();
        break;
      case "packages":
        content = await getPackagesMarkdown();
        break;
      default:
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
