import { text, timestamp, pgTable, uuid } from 'drizzle-orm/pg-core'
import { user } from './user'

export const job = pgTable('job', {
    id: uuid("id").primaryKey().defaultRandom(),
    customerId: text("customer_id").notNull().references(() => user.id),
    status: text(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("created_at").notNull().defaultNow().$onUpdate(() => new Date()),
})
