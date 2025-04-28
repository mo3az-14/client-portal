import { uuid, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { relations, type InferSelectModel } from "drizzle-orm";
import { user } from "./user"
import { notification_attachment } from "./notification_attachment";
import { job_notification } from "./job_notification";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const notification = pgTable('notification', {
    id: uuid().primaryKey().defaultRandom(),
    receiverId: text("receiver_id").notNull().references(() => user.id),
    senderId: text("sender_id").notNull().references(() => user.id),
    header: text().notNull(),
    type: text().notNull(),
    body: text().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})

export const notificationRelations = relations(notification, ({ many, one }) => ({
    attachments: many(notification_attachment),
    jobs: many(job_notification), sender: one(user, { fields: [notification.senderId], references: [user.id] }),
    receivers: many(user),
}))

export const baseSchema = createInsertSchema(notification).omit({ createdAt: true, updatedAt: true })

export const notificationSchema = z.union([
    z.object({
        mode: z.literal("create"),
        receiverId: baseSchema.shape.receiverId,
        senderId: baseSchema.shape.senderId,
        header: baseSchema.shape.header,
        type: baseSchema.shape.type,
        body: baseSchema.shape.body,
    }),
    z.object({
        mode: z.literal("update"),
        id: baseSchema.shape.id,
        receiverId: baseSchema.shape.receiverId,
        senderId: baseSchema.shape.senderId,
        header: baseSchema.shape.header,
        type: baseSchema.shape.type,
        body: baseSchema.shape.body,
    })
])

export type notificationSchema = z.infer<typeof notificationSchema>
export type SelectNotificationModel = InferSelectModel<typeof notification>
