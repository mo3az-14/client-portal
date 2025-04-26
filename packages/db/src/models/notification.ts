import { uuid, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm";
import { user } from "./user"
import { notification_attachment } from "./notification_attachment";
import { job_notification } from "./job_notification";

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

export const notificationRelations = relations(notification, ({ many, one }) => ({
    attachments: many(notification_attachment),
    jobs: many(job_notification),
    sender: one(user, { fields: [notification.senderId], references: [user.id] }),
    receivers: many(user),
}))

