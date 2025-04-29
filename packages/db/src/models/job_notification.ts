import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { relations } from "drizzle-orm";
import { job } from "./job";
import { notification } from "./notification";

export const job_notification = pgTable("job_notification", {
    jobId: uuid('job_id').references(() => job.id).notNull(),
    notificationId: uuid('notification_id').references(() => notification.id).notNull(),
}, (table) => [primaryKey({ columns: [table.jobId, table.notificationId] })])

export const jobNotificationRelations = relations(job_notification, ({ one }) => ({
    job: one(job, { fields: [job_notification.jobId], references: [job.id] }),
    notification: one(notification, { fields: [job_notification.notificationId], references: [notification.id] })
}))


export const jobNotification = createInsertSchema(job_notification, {
    jobId: (schema) => schema.uuid(),
    notificationId: (schema) => schema.uuid(),
})
export type JobNotification = z.infer<typeof jobNotification>;
