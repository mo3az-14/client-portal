import { uuid, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { user } from "./user"

export const notification = pgTable('notification', {
    id: uuid().primaryKey().defaultRandom(),
    receiverId: text("receiver_id").notNull().references(() => user.id),
    senderId: text("sender_id").references(() => user.id),
    header: text().notNull(),
    type: text().notNull(),
    body: text().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})
