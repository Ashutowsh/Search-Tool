import { pgTable, varchar, uuid, jsonb } from "drizzle-orm/pg-core";

export const articlesTable = pgTable("articles", {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull().unique(),
  content: varchar({ length: 500 }).notNull(),
  embedding: jsonb("embedding"), 
});
