import { jsonb, integer, pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core'
import { user } from './user'


export const files = pgTable("document", {
    id: uuid().primaryKey().defaultRandom(),
    uploadedBy: text("uploaded_by").notNull().references(() => user.id),
    name: text().notNull(),
    type: text().notNull(),
    url: text().notNull().unique(),
    metadata: jsonb(),
    version: integer().notNull().default(1),
    status: text(),
    tags: text(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("created_at").notNull().defaultNow().$onUpdate(() => new Date()),
})
