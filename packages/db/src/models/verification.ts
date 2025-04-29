import { text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const verification = pgTable('verification', {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

