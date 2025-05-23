import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { relations } from "drizzle-orm";
import { notification } from "./notification";
import { files } from "./document";

export const notification_attachment = pgTable("job_notification", {
    notificationId: uuid('notification_id').references(() => notification.id).notNull(),
    attachmentId: uuid('attachment_id').references(() => files.id).notNull(),
}, (table) => [primaryKey({ columns: [table.notificationId, table.attachmentId] })])

export const notificationAttachmentsRelations = relations(notification_attachment, ({ one }) => ({
    notification: one(notification, { fields: [notification_attachment.notificationId], references: [notification.id], relationName: "notification" }),
    attachement: one(files, { fields: [notification_attachment.attachmentId], references: [files.id], relationName: "attachement" }),
}))


const notificationAttachment = createInsertSchema(notification_attachment)
export type NotificationAttachment = z.infer<typeof notificationAttachment>;
