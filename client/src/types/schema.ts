import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rhymes = pgTable("rhymes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  ageGroup: text("age_group").notNull(),
  youtubeId: text("youtube_id").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  duration: integer("duration"), // in seconds
});

export const toys = pgTable("toys", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  ageGroup: text("age_group").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  relatedRhymes: text("related_rhymes").array(),
});

export const insertRhymeSchema = createInsertSchema(rhymes).omit({
  id: true,
});

export const insertToySchema = createInsertSchema(toys).omit({
  id: true,
});

export type InsertRhyme = z.infer<typeof insertRhymeSchema>;
export type Rhyme = typeof rhymes.$inferSelect;
export type InsertToy = z.infer<typeof insertToySchema>;
export type Toy = typeof toys.$inferSelect;
