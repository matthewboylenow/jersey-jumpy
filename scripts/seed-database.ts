import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import bcrypt from "bcryptjs";
import * as schema from "../src/lib/db/schema";

// Check for DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("Starting database seed...\n");

  // 1. Seed Categories
  console.log("Seeding categories...");
  const categoriesData = [
    { slug: "13x13-bouncers", name: "13'x13' Bouncers", sortOrder: 1 },
    { slug: "castle-bouncers", name: "Castle Bouncers", sortOrder: 2 },
    { slug: "combo-bouncers", name: "Combo Bouncers", sortOrder: 3 },
    { slug: "wet-dry-slides", name: "Wet/Dry Slides", sortOrder: 4 },
    { slug: "obstacle-courses", name: "Obstacle Courses", sortOrder: 5 },
  ];

  for (const category of categoriesData) {
    await db.insert(schema.categories).values(category).onConflictDoNothing();
  }
  console.log(`  Seeded ${categoriesData.length} categories\n`);

  // 2. Seed Admin User
  console.log("Seeding admin user...");
  const passwordHash = await bcrypt.hash("Dunkindonuts3!@", 12);
  await db
    .insert(schema.adminUsers)
    .values({
      email: "matthew@adventii.com",
      passwordHash,
      name: "Matthew",
      role: "super_admin",
    })
    .onConflictDoNothing();
  console.log("  Seeded admin user: matthew@adventii.com\n");

  // 3. Seed Inflatables (placeholder data - will be updated with actual data from WordPress)
  console.log("Seeding inflatables...");
  const inflatablesData = [
    // 13x13 Bouncers
    { slug: "dora-the-explorer", name: "Dora The Explorer", subtitle: "13'x13' Bouncer", category: "13x13-bouncers", price: 350 },
    { slug: "batman", name: "Batman", subtitle: "13'x13' Bouncer", category: "13x13-bouncers", price: 350 },
    { slug: "the-incredibles", name: "The Incredibles", subtitle: "13'x13' Bouncer", category: "13x13-bouncers", price: 350 },
    { slug: "spongebob", name: "Spongebob", subtitle: "13'x13' Bouncer", category: "13x13-bouncers", price: 350 },
    { slug: "disney-princess", name: "Disney Princess", subtitle: "13'x13' Bouncer", category: "13x13-bouncers", price: 350 },
    { slug: "happy-birthday", name: "Happy Birthday", subtitle: "13'x13' Bouncer", category: "13x13-bouncers", price: 350 },
    { slug: "halloween", name: "Halloween", subtitle: "13'x13' Bouncer", category: "13x13-bouncers", price: 350 },
    { slug: "happy-haunting", name: "Happy Haunting", subtitle: "13'x13' Bouncer", category: "13x13-bouncers", price: 350 },
    { slug: "its-a-girl-thing", name: "It's A Girl Thing", subtitle: "13'x13' Bouncer", category: "13x13-bouncers", price: 350 },
    { slug: "trucks", name: "Trucks", subtitle: "13'x13' Bouncer", category: "13x13-bouncers", price: 350 },
    { slug: "celebrate", name: "Celebrate", subtitle: "13'x13' Bouncer", category: "13x13-bouncers", price: 350 },

    // Castle Bouncers
    { slug: "basic-castle", name: "Basic Castle", subtitle: "13'x13' Castle", category: "castle-bouncers", price: 350 },
    { slug: "military-truck", name: "Military Truck", subtitle: "15'x15' Castle", category: "castle-bouncers", price: 375 },
    { slug: "excalibur-castle", name: "Excalibur Castle", subtitle: "15'x15' Castle", category: "castle-bouncers", price: 375 },
    { slug: "funhouse-castle", name: "Funhouse Castle", subtitle: "15'x15' Castle", category: "castle-bouncers", price: 375 },
    { slug: "sizzling-castle", name: "Sizzling Castle", subtitle: "15'x15' Castle", category: "castle-bouncers", price: 375 },
    { slug: "excalibur-4-in-1-castle", name: "Excalibur 4-in-1 Castle", subtitle: "15'x15' Combo", category: "castle-bouncers", price: 425 },
    { slug: "cutting-edge-castle", name: "Cutting Edge Castle", subtitle: "15'x15' Castle", category: "castle-bouncers", price: 375 },
    { slug: "birthday-cake", name: "Birthday Cake", subtitle: "15'x15' Castle", category: "castle-bouncers", price: 375 },
    { slug: "in-and-out-jumpbox", name: "10'x10' In-And-Out Jumpbox", subtitle: "15'x15' Castle", category: "castle-bouncers", price: 375 },
    { slug: "jumbo-castle-bouncer", name: "Jumbo Castle Bouncer", subtitle: "20'x20' Castle", category: "castle-bouncers", price: 450 },

    // Combo Bouncers
    { slug: "disney-princess-3d-5-in-one", name: "Disney Princess Collection 3D 5-In-One", subtitle: "5-In-1 Combo", category: "combo-bouncers", price: 475 },
    { slug: "5-in-one-modular-combo", name: "5-In-One Modular Combo", subtitle: "5-In-1 Combo", category: "combo-bouncers", price: 475 },
    { slug: "wacky-kid-zone", name: "Wacky Kid Zone", subtitle: "Combo Bouncer", category: "combo-bouncers", price: 425 },
    { slug: "jump-n-splash-castle", name: "Jump N Splash Castle with Pool", subtitle: "4-In-1 Combo with Pool", category: "combo-bouncers", price: 550 },
    { slug: "jump-n-splash-paradise-palms", name: "Jump N Splash Paradise Palms with Pool", subtitle: "4-In-1 Combo with Pool", category: "combo-bouncers", price: 550 },
    { slug: "balloon-ride-5-in-one", name: "5-In-One Balloon Ride Bouncer", subtitle: "5-In-1 Combo", category: "combo-bouncers", price: 475 },

    // Wet/Dry Slides
    { slug: "22-dry-slide", name: "22' Dry Slide", subtitle: "22' Dry Slide", category: "wet-dry-slides", price: 700 },
    { slug: "18-dual-lane-slide", name: "18' Dual Lane Slide", subtitle: "18' Dual Lane", category: "wet-dry-slides", price: 550 },
    { slug: "hawaiian-splash", name: "Hawaiian Splash Wet/Dry Slide", subtitle: "Wet/Dry Slide", category: "wet-dry-slides", price: 600 },
    { slug: "fire-n-ice", name: "20' Fire N Ice with Pool", subtitle: "20' Wet Slide", category: "wet-dry-slides", price: 800 },
    { slug: "wild-wave-jr", name: "Wild Wave Jr. Wet/Dry Slide", subtitle: "Wet/Dry Slide", category: "wet-dry-slides", price: 600 },

    // Obstacle Courses
    { slug: "40-obstacle-challenge", name: "40' Obstacle Challenge", subtitle: "40' Obstacle Course", category: "obstacle-courses", price: 600 },
    { slug: "50-obstacle-challenge", name: "50' Obstacle Challenge", subtitle: "50' Obstacle Course", category: "obstacle-courses", price: 700 },
    { slug: "65-mega-obstacle", name: "65' Mega Obstacle Challenge", subtitle: "65' Obstacle Course", category: "obstacle-courses", price: 800 },
  ];

  for (const inflatable of inflatablesData) {
    await db.insert(schema.inflatables).values({
      ...inflatable,
      description: `The ${inflatable.name} is perfect for any party or event. Contact us today for availability and pricing!`,
      setupSurface: "pavement or grass",
      powerRequirement: "within 100' of power source",
      generatorNote: "Gas generator available for $100 additional",
      isActive: true,
    }).onConflictDoNothing();
  }
  console.log(`  Seeded ${inflatablesData.length} inflatables\n`);

  // 4. Seed Party Packages
  console.log("Seeding party packages...");
  const packagesData = [
    {
      name: "Party Package #1",
      price: 2200,
      items: [
        { quantity: 1, name: "65' Obstacle Course" },
        { quantity: 1, name: "40' Obstacle Course" },
        { quantity: 1, name: "22' Dry Slide" },
        { quantity: 1, name: "15x15 Castle" },
      ],
      sortOrder: 1,
    },
    {
      name: "Party Package #2",
      price: 1900,
      items: [
        { quantity: 2, name: "15x15 Castles" },
        { quantity: 2, name: "40' or 50' Obstacle Courses" },
      ],
      sortOrder: 2,
    },
    {
      name: "Party Package #3",
      price: 1700,
      items: [
        { quantity: 1, name: "65' Obstacle Course" },
        { quantity: 1, name: "22' Dry Slide" },
        { quantity: 1, name: "15x15 Castle" },
      ],
      sortOrder: 3,
    },
    {
      name: "Party Package #4",
      price: 1300,
      items: [
        { quantity: 1, name: "40' Obstacle Course" },
        { quantity: 1, name: "15x15 Castle" },
        { quantity: 1, name: "18' Dry Slide" },
      ],
      sortOrder: 4,
    },
  ];

  for (const pkg of packagesData) {
    await db.insert(schema.partyPackages).values(pkg).onConflictDoNothing();
  }
  console.log(`  Seeded ${packagesData.length} party packages\n`);

  // 5. Seed Testimonials
  console.log("Seeding testimonials...");
  const testimonialsData = [
    {
      customerName: "Sarah",
      location: "Aberdeen, NJ",
      content: "The castle bouncy house was the hit of the party! The kids absolutely loved it, and the setup was so professional. Will definitely use Jersey Jumpy again!",
      rating: 5,
      featured: true,
    },
    {
      customerName: "Jennifer",
      location: "TLC's Four Weddings",
      content: "You guys did an amazing job! Everything was perfect for our event. The inflatables were clean and safe, and your team was so helpful.",
      rating: 5,
      featured: true,
    },
    {
      customerName: "Grace",
      location: "Bedminster, NJ",
      content: "Thank you so very much for making our party a huge success! The kids had a blast, and the parents were impressed by how safe everything was.",
      rating: 5,
      featured: true,
    },
    {
      customerName: "Alexandra",
      location: "North Bergen, NJ",
      content: "Thank you so much for making my daughter's party unforgettable! She's still talking about the bounce house. You guys are the best!",
      rating: 5,
      featured: false,
    },
    {
      customerName: "Janine",
      location: "Flemington, NJ",
      content: "Thanks again for delivering all the way out to us! The obstacle course was incredible and kept the kids entertained for hours.",
      rating: 5,
      featured: false,
    },
    {
      customerName: "Artie",
      location: "Milford, NJ",
      content: "Pete & Joe - Thank you guys for everything! The party was a huge hit. Professional service from start to finish.",
      rating: 5,
      featured: false,
    },
    {
      customerName: "Kathleen",
      location: "Shamong, NJ",
      content: "Thanks for a great weekend! The kids were so happy with the combo bouncer. Clean, on-time delivery, and friendly service!",
      rating: 5,
      featured: false,
    },
    {
      customerName: "Jamie",
      location: "New Jersey",
      content: "Thanks for everything Pete! You guys made our backyard party amazing. Will be calling you again next summer!",
      rating: 5,
      featured: false,
    },
  ];

  for (const testimonial of testimonialsData) {
    await db.insert(schema.testimonials).values(testimonial).onConflictDoNothing();
  }
  console.log(`  Seeded ${testimonialsData.length} testimonials\n`);

  // 6. Seed FAQs
  console.log("Seeding FAQs...");
  const faqsData = [
    {
      question: "How much does it cost to rent a bounce house?",
      answer: "Our bounce house rentals start at $350 for a 13'x13' bouncer. Larger castles, combos, slides, and obstacle courses have different pricing. Visit our Rates page for complete pricing information.",
      sortOrder: 1,
    },
    {
      question: "What is included in the rental?",
      answer: "All rentals include delivery, setup, and pickup. We also provide the blower motor that keeps the inflatable inflated. You just need to provide access to a standard electrical outlet within 100 feet.",
      sortOrder: 2,
    },
    {
      question: "How long is the rental period?",
      answer: "Our standard rental period is up to 8 hours. Need it longer? Just ask! We can accommodate extended rentals for an additional fee.",
      sortOrder: 3,
    },
    {
      question: "What surface can the bounce house be set up on?",
      answer: "Our inflatables can be set up on grass or pavement. We use stakes for grass setups and sandbags for hard surfaces to ensure everything is secure.",
      sortOrder: 4,
    },
    {
      question: "What if it rains on my event day?",
      answer: "Safety is our top priority. If there's lightning or severe weather, we'll work with you to reschedule. Light rain is usually fine, but we'll make the call together based on conditions.",
      sortOrder: 5,
    },
    {
      question: "Do you deliver to my area?",
      answer: "We deliver throughout New Jersey! Delivery fees may vary based on distance from our location in Iselin, NJ. Contact us with your address for a quote.",
      sortOrder: 6,
    },
    {
      question: "Are your inflatables safe?",
      answer: "Absolutely! We are NJ DCA certified and SIOTO trained. All our equipment is regularly inspected, cleaned, and sanitized. Safety is our #1 priority.",
      sortOrder: 7,
    },
    {
      question: "What if I don't have access to electricity?",
      answer: "No problem! We offer generator rentals for an additional $100. Our generators are quiet and powerful enough to run any of our inflatables.",
      sortOrder: 8,
    },
  ];

  for (const faq of faqsData) {
    await db.insert(schema.faqs).values(faq).onConflictDoNothing();
  }
  console.log(`  Seeded ${faqsData.length} FAQs\n`);

  // 7. Seed Settings
  console.log("Seeding settings...");
  const settingsData = [
    { key: "company_name", value: "JerseyJumpy.com LLC" },
    { key: "company_address", value: "PO Box: 217, Iselin, NJ 08830" },
    { key: "phone_toll_free", value: "866-597-6625" },
    { key: "phone_local", value: "732-750-8810" },
    { key: "phone_emergency", value: "732-496-2897" },
    { key: "email", value: "info@jerseyjumpy.com" },
    { key: "facebook_url", value: "https://www.facebook.com/JerseyJumpy/" },
    { key: "twitter_url", value: "https://twitter.com/jerseyjumpy/" },
    { key: "instagram_url", value: "https://www.instagram.com/jerseyjumpy/" },
    { key: "established_year", value: "2007" },
    { key: "tagline", value: "GOOD. CLEAN. FUN." },
  ];

  for (const setting of settingsData) {
    await db.insert(schema.settings).values(setting).onConflictDoNothing();
  }
  console.log(`  Seeded ${settingsData.length} settings\n`);

  console.log("Database seeding complete!");
}

seed()
  .then(() => {
    console.log("\nSeed script finished successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed script failed:", error);
    process.exit(1);
  });
