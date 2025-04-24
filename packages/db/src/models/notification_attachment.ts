import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { notification } from "./notification";
import { files } from "./document";

export const notification_attachment = pgTable("job_notification", {
    notificationId: uuid('notification_id').references(() => notification.id).notNull(),
    attachmentId: uuid('attachment_id').references(() => files.id).notNull(),
}, (table) => [primaryKey({ columns: [table.attachmentId, table.notificationId] })])
