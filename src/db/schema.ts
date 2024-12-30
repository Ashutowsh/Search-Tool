import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const infoTable = pgTable("users", {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar({length : 255}).notNull().unique(),
  content: varchar({length: 500}).notNull()
});
