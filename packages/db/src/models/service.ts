import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { files } from './document'

export const service = pgTable("service", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    price: integer().notNull(),
    template: uuid().notNull().references(() => files.id),
    period: integer(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("created_at").notNull().defaultNow().$onUpdate(() => new Date()),
})

