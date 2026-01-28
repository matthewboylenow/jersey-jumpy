import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../src/lib/db/schema";

// Check for DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

// Corrected inflatable descriptions from the correct URLs
const inflatableUpdates = [
  {
    slug: "18-dual-lane-slide",
    description: "Chill out this summer with our dual lane slide for double the fun! Climb up and slide and slide again down into the splash pool at the end. This inflatable works perfectly for tropical, beach, or water-themed celebrations, as well as summer gatherings where outdoor entertainment is desired.\n\nThe dual-lane design is particularly popular for parties and picnics. Two children descend simultaneously, one per lane.\n\nRecommended for ages 5 and up with a 42\" minimum height requirement. An attendant must supervise constantly.",
    width: "12'",
    length: "29'",
    height: "20'",
    spaceRequired: "35' x 18'",
    heightRequirement: "42\" minimum",
    adultsAllowed: true,
    adultWeightLimit: "175 lbs/person",
    adultMaxCount: 2,
    canUseWater: true,
    hasPool: true,
    hasSlide: true,
    priceNote: "$550 dry / $700 wet - Estimated price based on location",
  },
  {
    slug: "balloon-ride-5-in-one",
    description: "Jump up, up, up and away in this ultimate combo unit featuring a bounce area, basketball hoop, obstacles, climbing ladder, and slide. The largest available option, it combines multiple play elements to deliver extended entertainment.\n\nConstructed from fire-resistant vinyl with 360-degree mesh sides enabling parent supervision.\n\nDesigned for children ages 3 and up with a 42\" minimum height requirement.",
    width: "15'",
    length: "18'",
    height: "17'",
    spaceRequired: "25' x 20'",
    heightRequirement: "42\" minimum",
    capacityAges2to4: "8-12 kids",
    capacityAges4to7: "7-9 kids",
    capacityAges7to10: "5-8 kids",
    capacityAges10Plus: "4-6 kids",
    adultsAllowed: true,
    adultWeightLimit: "180 lbs/person",
    adultMaxCount: 4,
    hasSlide: true,
    hasBasketballHoop: true,
    hasClimbingWall: true,
    comboFeatures: "Jumping area, exit slide, dual basketball hoops (inside and outside), climbing ladder, and obstacle course",
    priceNote: "Estimated price based on location",
  },
  {
    slug: "5-in-one-modular-combo",
    description: "The 5-in-1 Modular Combo is designed for a bounce house enthusiast looking for a more complex bounce house with multiple integrated features. This unit combines a generous jumping area, basketball hoop, climbing space and slide into one rental.\n\nWorks indoors or outdoors and includes interchangeable themed art panels featuring popular characters and designs including Disney Princess, Trucks, It's A Girl Thing, Spongebob, The Incredibles, and Happy Birthday.\n\nIdeal for backyard BBQs and school field days.",
    width: "15'",
    length: "18'",
    height: "17'",
    spaceRequired: "20' x 23'",
    heightRequirement: "42\" minimum",
    capacityAges2to4: "8-10 kids",
    capacityAges4to7: "6-8 kids",
    capacityAges7to10: "4-7 kids",
    capacityAges10Plus: "4-6 kids",
    adultsAllowed: true,
    adultWeightLimit: "180 lbs/person",
    adultMaxCount: 4,
    hasSlide: true,
    hasBasketballHoop: true,
    hasClimbingWall: true,
    comboFeatures: "Jumping area, basketball hoop, climbing space, slide, and interchangeable themed art panels",
    priceNote: "Estimated price based on location",
  },
  {
    slug: "disney-princess-3d-5-in-one",
    description: "Our licensed Disney Princess 3D 5-in-1 combo bounce house is sure to bring some magic to your party! Features all four classic Disney Princesses—Cinderella, Belle, Snow White, and Sleeping Beauty—with realistic 3D elements including Cinderella's balcony.\n\nIncludes a spacious jumping area, basketball hoop, log and pop-up obstacles, climbing feature, and slide exit. Has 360-degree mesh sides for parent supervision and uses lite n strong fire-resistant vinyl for safety, durability and easy portability.\n\nPerfect for ultimate bouncers! Minimum 42\" height requirement.",
    width: "19'",
    length: "18'",
    height: "17'",
    spaceRequired: "20' x 20'",
    heightRequirement: "42\" minimum",
    capacityAges2to4: "8-10 kids",
    capacityAges4to7: "6-8 kids",
    capacityAges7to10: "4-7 kids",
    capacityAges10Plus: "4-6 kids",
    adultsAllowed: true,
    adultWeightLimit: "180 lbs/person",
    adultMaxCount: 4,
    hasSlide: true,
    hasBasketballHoop: true,
    hasClimbingWall: true,
    comboFeatures: "Jumping area, pop-up obstacles, slide, basketball hoop, and climbing ladder",
    priceNote: "Estimated price based on location",
  },
  {
    slug: "in-and-out-jumpbox",
    description: "Bounce house enthusiasts of all ages gravitate toward this bounce house. Whether a backyard BBQ or school function, our in-and-out jump-in-box bounce house is perfect for any type of celebration.\n\nThis compact inflatable measures 10 by 10 feet of jumping space and works for both indoor and outdoor settings. It's our smallest unit, making it particularly suitable for indoor events with adequate ceiling height (10-foot ceilings minimum required).",
    width: "10'",
    length: "10'",
    height: "9'",
    spaceRequired: "13' x 13'",
    capacityAges2to4: "3-4 kids",
    capacityAges4to7: "2-3 kids",
    capacityAges7to10: "Not recommended",
    capacityAges10Plus: "Not recommended",
    adultsAllowed: false,
    priceNote: "Estimated price based on location",
  },
  {
    slug: "50-obstacle-challenge",
    description: "Looking to burn off extra energy? Our 50' inflatable obstacle course can do just the trick! Features dual lanes allowing participants to race side by side through various challenges including a bulls eye start, bumpers, mushrooms, steps, slides, and a gate before reaching the finish line.\n\nThe dual-lane design enables staggered entry, ensuring continuous engagement throughout the obstacle course experience.\n\nMinimum height of 42\" required.",
    width: "12'",
    length: "50'",
    height: "15'",
    spaceRequired: "60' x 15'",
    heightRequirement: "42\" minimum",
    capacityAges2to4: "8-10 kids",
    capacityAges4to7: "6-8 kids",
    capacityAges7to10: "4-7 kids",
    capacityAges10Plus: "4-6 kids",
    adultsAllowed: true,
    adultWeightLimit: "180 lbs/person",
    adultMaxCount: 4,
    hasSlide: true,
    hasClimbingWall: true,
    comboFeatures: "Dual racing lanes, bulls eye start, bumpers, mushrooms, steps, slides, and finish gate",
    priceNote: "Estimated price based on location",
  },
];

async function updateDescriptions() {
  console.log("Updating missing inflatable descriptions...\n");

  let updated = 0;
  let errors = 0;

  for (const update of inflatableUpdates) {
    const { slug, ...data } = update;

    try {
      const result = await db
        .update(schema.inflatables)
        .set(data)
        .where(eq(schema.inflatables.slug, slug));

      console.log(`  ✓ Updated: ${slug}`);
      updated++;
    } catch (error) {
      console.error(`  ✗ Error updating ${slug}:`, error);
      errors++;
    }
  }

  console.log(`\nUpdate complete!`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Errors: ${errors}`);
}

updateDescriptions()
  .then(() => {
    console.log("\nScript finished successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });
