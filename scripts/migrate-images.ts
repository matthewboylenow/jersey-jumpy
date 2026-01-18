/**
 * Image Migration Script
 *
 * This script migrates images from the WordPress site to Vercel Blob storage.
 * Run this after setting up Vercel Blob integration.
 *
 * Usage: npm run db:migrate-images
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

import { put } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../src/lib/db/schema";

// Check for required environment variables
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN environment variable is not set");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

// WordPress image URLs for each inflatable
// Scraped from https://jerseyjumpy.com/inflatables/
const wordpressImageUrls: Record<string, string[]> = {
  // 13x13 Bouncers
  "dora-the-explorer": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/Dora.png",
  ],
  "batman": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/Batman.png",
  ],
  "the-incredibles": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/Incredibles.png",
  ],
  "spongebob": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/Spongebob.png",
  ],
  "disney-princess": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/Disney-Princess.png",
  ],
  "happy-birthday": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/Happy-Birthday.png",
  ],
  "halloween": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/Halloween.png",
  ],
  "happy-haunting": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/Happy-Haunting.png",
  ],
  "its-a-girl-thing": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/Its-A-Girl-Thing.png",
  ],
  "trucks": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/Trucks.png",
  ],
  "celebrate": [
    "https://jerseyjumpy.com/wp-content/uploads/2022/04/Celebrate-13x13-Bouncer.png",
  ],

  // Castle Bouncers
  "basic-castle": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/excalibur.png",
  ],
  "military-truck": [
    "https://jerseyjumpy.com/wp-content/uploads/2022/04/military-truck-bounce-house.jpg",
  ],
  "excalibur-castle": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/excalibur.png",
  ],
  "funhouse-castle": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/funhouse-castle.png",
  ],
  "sizzling-castle": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/Sizzling-Castle-Bouncer-EIN-BH-5070L-21ma.png",
  ],
  "excalibur-4-in-1-castle": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/Excalabur-4-1.png",
  ],
  "cutting-edge-castle": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/Cutting-Edge.png",
  ],
  "birthday-cake": [
    "https://jerseyjumpy.com/wp-content/uploads/2022/04/Birthday-Cake.jpg",
  ],
  "in-and-out-jumpbox": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/10-10-In-and-out.png",
  ],
  "jumbo-castle-bouncer": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/Jumbo-Castle-Bouncer.png",
  ],

  // Combo Bouncers
  "disney-princess-3d-5-in-one": [
    "https://jerseyjumpy.com/wp-content/uploads/2022/04/Disney-PRINCESS-5-IN-1.jpg",
  ],
  "5-in-one-modular-combo": [
    "https://jerseyjumpy.com/wp-content/uploads/2022/05/inflatable-combo-5-in-1-modular.jpg",
  ],
  "wacky-kid-zone": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/Wacky-Kid-Zone.png",
  ],
  "jump-n-splash-castle": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/jump_splash_2.png",
  ],
  "jump-n-splash-paradise-palms": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/Jump-Splash-Paradise-Springs.png",
  ],
  "balloon-ride-5-in-one": [
    "https://jerseyjumpy.com/wp-content/uploads/2019/01/Balloon.png",
  ],

  // Wet/Dry Slides
  "22-dry-slide": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/22-dry-slide.png",
  ],
  "18-dual-lane-slide": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/dual_lane_slide-2.png",
  ],
  "hawaiian-splash": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/18_Hawaiian_splash_slide.png",
  ],
  "fire-n-ice": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/fire_ice.png",
  ],
  "wild-wave-jr": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/Wild-Wave-Mini_DM1-2.png",
  ],

  // Obstacle Courses
  "40-obstacle-challenge": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/40obstacle2.png",
  ],
  "50-obstacle-challenge": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/50in-Obstacle-Course.png",
  ],
  "65-mega-obstacle": [
    "https://jerseyjumpy.com/wp-content/uploads/2025/04/mega-Obstacle-large.png",
  ],
};

function getContentType(url: string): string {
  const ext = url.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    default:
      return "image/jpeg";
  }
}

async function downloadImage(url: string): Promise<Buffer> {
  console.log(`  Downloading: ${url}`);
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; JerseyJumpy Image Migration)",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function uploadToBlob(buffer: Buffer, filename: string, contentType: string): Promise<string> {
  console.log(`  Uploading to Blob: ${filename} (${contentType})`);
  const blob = await put(filename, buffer, {
    access: "public",
    contentType,
    addRandomSuffix: false,
  });
  return blob.url;
}

async function migrateImages() {
  console.log("Starting image migration...\n");

  // Get all inflatables
  const inflatables = await db.select().from(schema.inflatables);
  console.log(`Found ${inflatables.length} inflatables in database\n`);
  console.log(`Found ${Object.keys(wordpressImageUrls).length} image mappings\n`);

  let migratedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const inflatable of inflatables) {
    const wpUrls = wordpressImageUrls[inflatable.slug];

    if (!wpUrls || wpUrls.length === 0) {
      console.log(`⏭️  Skipping ${inflatable.name} (${inflatable.slug}) - no WordPress URLs configured`);
      skippedCount++;
      continue;
    }

    console.log(`\n🖼️  Migrating images for: ${inflatable.name} (${inflatable.slug})`);

    try {
      const blobUrls: string[] = [];

      for (let i = 0; i < wpUrls.length; i++) {
        const wpUrl = wpUrls[i];
        const extension = wpUrl.split(".").pop()?.split("?")[0] || "jpg";
        const filename = `inflatables/${inflatable.slug}-${i + 1}.${extension}`;
        const contentType = getContentType(wpUrl);

        // Download from WordPress
        const imageBuffer = await downloadImage(wpUrl);

        // Upload to Vercel Blob
        const blobUrl = await uploadToBlob(imageBuffer, filename, contentType);
        blobUrls.push(blobUrl);

        console.log(`  ✅ Uploaded: ${blobUrl}`);
      }

      // Update database with new URLs
      const mainImageUrl = blobUrls[0];
      const galleryImageUrls = blobUrls.length > 1 ? blobUrls.slice(1) : null;

      await db
        .update(schema.inflatables)
        .set({
          mainImageUrl,
          galleryImageUrls,
          updatedAt: new Date(),
        })
        .where(eq(schema.inflatables.id, inflatable.id));

      console.log(`  ✅ Database updated with ${blobUrls.length} image(s)`);
      migratedCount++;
    } catch (error) {
      console.error(`  ❌ Error migrating ${inflatable.name}:`, error);
      errorCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("\n========================================");
  console.log("Image migration complete!");
  console.log(`  ✅ Migrated: ${migratedCount} inflatables`);
  console.log(`  ⏭️  Skipped: ${skippedCount} inflatables`);
  console.log(`  ❌ Errors: ${errorCount}`);
  console.log("========================================\n");
}

migrateImages()
  .then(() => {
    console.log("Migration script finished successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration script failed:", error);
    process.exit(1);
  });
