import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  date,
  jsonb,
} from "drizzle-orm/pg-core";

// Inflatables table
export const inflatables = pgTable("inflatables", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }), // e.g., "13'x13' Bouncer"
  category: varchar("category", { length: 100 }).notNull(), // '13x13-bouncers', 'castle-bouncers', etc.
  description: text("description"),

  // Dimensions
  width: varchar("width", { length: 20 }),
  length: varchar("length", { length: 20 }),
  height: varchar("height", { length: 20 }),
  spaceRequired: varchar("space_required", { length: 50 }),

  // Capacity
  capacityAges2to4: varchar("capacity_ages_2_4", { length: 20 }),
  capacityAges4to7: varchar("capacity_ages_4_7", { length: 20 }),
  capacityAges7to10: varchar("capacity_ages_7_10", { length: 20 }),
  capacityAges10Plus: varchar("capacity_ages_10_plus", { length: 20 }),
  heightRequirement: varchar("height_requirement", { length: 50 }),

  // Adult info
  adultsAllowed: boolean("adults_allowed").default(true),
  adultWeightLimit: varchar("adult_weight_limit", { length: 50 }),
  adultMaxCount: integer("adult_max_count"),

  // Features
  canUseWater: boolean("can_use_water").default(false),
  hasPool: boolean("has_pool").default(false),
  hasSlide: boolean("has_slide").default(false),
  hasBasketballHoop: boolean("has_basketball_hoop").default(false),
  hasClimbingWall: boolean("has_climbing_wall").default(false),
  comboFeatures: text("combo_features"),

  // Setup
  setupSurface: text("setup_surface"),
  powerRequirement: text("power_requirement").default("within 100' of power source"),
  generatorNote: text("generator_note").default("Gas generator available for $100 additional"),

  // Pricing
  price: integer("price"),
  priceNote: varchar("price_note", { length: 255 }),

  // Images
  mainImageUrl: text("main_image_url"),
  videoUrl: text("video_url"),
  galleryImageUrls: text("gallery_image_urls").array(),

  // SEO
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),

  // Status
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  sortOrder: integer("sort_order").default(0),
});

// Party Packages table
export const partyPackages = pgTable("party_packages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  items: jsonb("items").notNull(), // Array of { quantity: number, name: string }
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  content: text("content").notNull(),
  rating: integer("rating").default(5),
  featured: boolean("featured").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact Form Submissions (Inquiries)
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),

  // Contact info
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }).notNull(),

  // Address
  address: varchar("address", { length: 255 }),
  address2: varchar("address2", { length: 255 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  zip: varchar("zip", { length: 20 }),

  // Event details
  requestedDate: date("requested_date"),
  requestedTime: varchar("requested_time", { length: 50 }),
  requestedJumpy: varchar("requested_jumpy", { length: 255 }),

  // Marketing
  referralSource: varchar("referral_source", { length: 100 }),

  // Additional info
  eventDetails: text("event_details"),

  // Status
  status: varchar("status", { length: 50 }).default("new"),
  notes: text("notes"),

  createdAt: timestamp("created_at").defaultNow(),
});

// FAQ Items
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Site Settings (key-value store)
export const settings = pgTable("settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Admin Users
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  role: varchar("role", { length: 50 }).default("admin"), // 'admin' or 'super_admin'
  createdAt: timestamp("created_at").defaultNow(),
});

// Type exports for use in the application
export type Inflatable = typeof inflatables.$inferSelect;
export type NewInflatable = typeof inflatables.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type PartyPackage = typeof partyPackages.$inferSelect;
export type NewPartyPackage = typeof partyPackages.$inferInsert;

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;

export type FAQ = typeof faqs.$inferSelect;
export type NewFAQ = typeof faqs.$inferInsert;

export type Setting = typeof settings.$inferSelect;
export type NewSetting = typeof settings.$inferInsert;

export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
