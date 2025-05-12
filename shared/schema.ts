import { pgTable, text, serial, timestamp, integer, boolean, varchar, decimal, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Types of internet connection
export enum PlanType {
  FIBRA = 'FIBRA',
  RADIO = 'RÁDIO'
}

// Coverage status types
export enum CoverageStatus {
  ACTIVE = 'ACTIVE',
  PLANNED = 'PLANNED',
  UNAVAILABLE = 'UNAVAILABLE'
}

// Internet plans available
export const internetPlans = pgTable("internet_plans", {
  id: varchar("id").primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  name: varchar("name").notNull(),
  type: text("type", { enum: [PlanType.FIBRA, PlanType.RADIO] }).notNull(),
  speed: integer("speed").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  features: json("features").$type<string[]>().notNull(),
  isPopular: boolean("is_popular").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  bannerImage: varchar("banner_image"),
  bannerOrder: integer("banner_order"),
});

// Leads captured from the form
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  name: varchar("name").notNull(),
  phone: varchar("phone").notNull(),
  planId: varchar("plan_id").references(() => internetPlans.id, { onDelete: 'set null' }),
  source: varchar("source"),
  convertedAt: timestamp("converted_at"),
  notes: text("notes"),
  contacted: boolean("contacted").default(false).notNull(),
  whatsappSent: boolean("whatsapp_sent").default(false).notNull(),
});

// Coverage areas
export const coverageAreas = pgTable("coverage_areas", {
  id: varchar("id").primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  name: varchar("name").notNull(),
  zipCodes: json("zip_codes").$type<string[]>().notNull(),
  hasFiber: boolean("has_fiber").default(false).notNull(),
  hasRadio: boolean("has_radio").default(true).notNull(),
  status: text("status", { enum: [CoverageStatus.ACTIVE, CoverageStatus.PLANNED, CoverageStatus.UNAVAILABLE] }).default(CoverageStatus.ACTIVE).notNull(),
});

// Testimonials from customers
export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  name: varchar("name").notNull(),
  location: varchar("location").notNull(),
  comment: text("comment").notNull(),
  rating: integer("rating").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  imageUrl: varchar("image_url"),
});

// FAQ items
export const faqs = pgTable("faqs", {
  id: varchar("id").primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  question: varchar("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category"),
  order: integer("order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

// Site settings
export const siteSettings = pgTable("site_settings", {
  id: varchar("id").primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  key: varchar("key").unique().notNull(),
  value: text("value").notNull(),
});

// Schema for inserting a lead
export const insertLeadSchema = createInsertSchema(leads).pick({
  name: true,
  phone: true,
  planId: true,
}).extend({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  source: z.string().nullable().optional(),
  contacted: z.boolean().optional(),
  whatsappSent: z.boolean().optional()
});

// Types
export type InternetPlan = typeof internetPlans.$inferSelect;
export type InsertInternetPlan = typeof internetPlans.$inferInsert;

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

export type CoverageArea = typeof coverageAreas.$inferSelect;
export type InsertCoverageArea = typeof coverageAreas.$inferInsert;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

export type FAQ = typeof faqs.$inferSelect;
export type InsertFAQ = typeof faqs.$inferInsert;

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;
