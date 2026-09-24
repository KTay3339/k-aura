import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const applications = sqliteTable("applications", {
  id: integer("id").primaryKey({ autoIncrement: true }), fullName: text("full_name").notNull(), email: text("email").notNull(), phone: text("phone").notNull(), rentalType: text("rental_type").notNull(), isStudent: integer("is_student", { mode: "boolean" }).notNull(), schoolName: text("school_name"), profession: text("profession").notNull(), businessName: text("business_name"), bio: text("bio"), services: text("services").notNull(), wantsClientLink: integer("wants_client_link", { mode: "boolean" }).notNull(), bookingUrl: text("booking_url"), profileImageKey: text("profile_image_key").notNull(), licenseKey: text("license_key"), idFrontKey: text("id_front_key"), idBackKey: text("id_back_key"), eligibleHours: text("eligible_hours").notNull(), status: text("status").notNull().default("pending"), createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const providers = sqliteTable("providers", {
  id: integer("id").primaryKey({ autoIncrement: true }), applicationId: integer("application_id").notNull().unique(), slug: text("slug").notNull().unique(), fullName: text("full_name").notNull(), businessName: text("business_name"), profession: text("profession").notNull(), bio: text("bio"), services: text("services").notNull(), rentalType: text("rental_type").notNull(), bookingUrl: text("booking_url").notNull(), profileImageKey: text("profile_image_key").notNull(), verificationLabel: text("verification_label").notNull().default("K Aura verified"), active: integer("active", { mode: "boolean" }).notNull().default(true), createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const tourInquiries = sqliteTable("tour_inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(), email: text("email").notNull(), phone: text("phone").notNull(), rentalType: text("rental_type").notNull(), preferredDate: text("preferred_date").notNull(), preferredTime: text("preferred_time").notNull(), message: text("message"), status: text("status").notNull().default("new"), createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const salonEvents = sqliteTable("salon_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  eventType: text("event_type").notNull(),
  startsAt: integer("starts_at", { mode: "timestamp_ms" }).notNull(),
  endsAt: integer("ends_at", { mode: "timestamp_ms" }),
  location: text("location").notNull().default("K Aura Salon"),
  public: integer("public", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const eventSubscribers = sqliteTable("event_subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});
