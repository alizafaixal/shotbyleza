import { pgTable, text, serial, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const portfolioOverridesTable = pgTable("portfolio_overrides", {
  id: serial("id").primaryKey(),
  imagePath: text("image_path").notNull().unique(),
  category: text("category").notNull(),
  customTitle: text("custom_title"),
  caption: text("caption"),
  hidden: boolean("hidden").notNull().default(false),
  sortOrder: integer("sort_order"),
  storagePath: text("storage_path"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type PortfolioOverride = typeof portfolioOverridesTable.$inferSelect;
export type InsertPortfolioOverride = typeof portfolioOverridesTable.$inferInsert;
