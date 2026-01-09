/**
 * Image Migration Script
 *
 * This script migrates images from the WordPress site to Vercel Blob storage.
 * Run this after setting up Vercel Blob integration.
 *
 * Usage: npm run db:migrate-images
 */

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

// WordPress image URLs for each inflatable (to be populated)
// This maps inflatable slugs to their WordPress image URLs
const wordpressImageUrls: Record<string, string[]> = {
  // Example:
  // "dora-the-explorer": ["https://jerseyjumpy.com/wp-content/uploads/dora-bouncer.jpg"],
};

async function downloadImage(url: string): Promise<Buffer> {
  console.log(`  Downloading: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function uploadToBlob(buffer: Buffer, filename: string): Promise<string> {
  console.log(`  Uploading to Blob: ${filename}`);
  const blob = await put(filename, buffer, {
    access: "public",
    contentType: "image/jpeg", // Adjust based on actual image type
  });
  return blob.url;
}

async function migrateImages() {
  console.log("Starting image migration...\n");

  // Get all inflatables
  const inflatables = await db.select().from(schema.inflatables);
  console.log(`Found ${inflatables.length} inflatables\n`);

  let migratedCount = 0;
  let errorCount = 0;

  for (const inflatable of inflatables) {
    const wpUrls = wordpressImageUrls[inflatable.slug];

    if (!wpUrls || wpUrls.length === 0) {
      console.log(`Skipping ${inflatable.name} - no WordPress URLs configured`);
      continue;
    }

    console.log(`\nMigrating images for: ${inflatable.name}`);

    try {
      const blobUrls: string[] = [];

      for (let i = 0; i < wpUrls.length; i++) {
        const wpUrl = wpUrls[i];
        const extension = wpUrl.split(".").pop() || "jpg";
        const filename = `inflatables/${inflatable.slug}-${i + 1}.${extension}`;

        // Download from WordPress
        const imageBuffer = await downloadImage(wpUrl);

        // Upload to Vercel Blob
        const blobUrl = await uploadToBlob(imageBuffer, filename);
        blobUrls.push(blobUrl);
      }

      // Update database with new URLs
      const mainImageUrl = blobUrls[0];
      const galleryImageUrls = blobUrls.slice(1);

      await db
        .update(schema.inflatables)
        .set({
          mainImageUrl,
          galleryImageUrls,
          updatedAt: new Date(),
        })
        .where(eq(schema.inflatables.id, inflatable.id));

      console.log(`  Updated database with ${blobUrls.length} image(s)`);
      migratedCount++;
    } catch (error) {
      console.error(`  Error migrating ${inflatable.name}:`, error);
      errorCount++;
    }
  }

  console.log("\n========================================");
  console.log("Image migration complete!");
  console.log(`  Migrated: ${migratedCount} inflatables`);
  console.log(`  Errors: ${errorCount}`);
  console.log("========================================\n");
}

// Instructions for populating wordpressImageUrls
function printInstructions() {
  console.log(`
================================================================================
IMAGE MIGRATION INSTRUCTIONS
================================================================================

Before running this script, you need to populate the wordpressImageUrls object
with the actual WordPress image URLs for each inflatable.

Steps:
1. Visit https://jerseyjumpy.com and collect image URLs for each inflatable
2. Add them to the wordpressImageUrls object in this file
3. Run: npm run db:migrate-images

Example format:
const wordpressImageUrls = {
  "dora-the-explorer": [
    "https://jerseyjumpy.com/wp-content/uploads/dora-1.jpg",
    "https://jerseyjumpy.com/wp-content/uploads/dora-2.jpg",
  ],
  "batman": [
    "https://jerseyjumpy.com/wp-content/uploads/batman-bouncer.jpg",
  ],
  // ... more inflatables
};

================================================================================
`);
}

// Check if URLs are configured
if (Object.keys(wordpressImageUrls).length === 0) {
  printInstructions();
  console.log("No WordPress URLs configured. Please add them to the script.\n");
  process.exit(0);
}

migrateImages()
  .then(() => {
    console.log("Migration script finished.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration script failed:", error);
    process.exit(1);
  });
