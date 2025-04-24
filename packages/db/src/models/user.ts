import { text, boolean, pgTable, timestamp } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean("email_verified").notNull().default(false),
    image: text("image"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

