import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { job } from "./job";
import { notification } from "./notification";

export const job_notification = pgTable("job_notification", {
    jobId: uuid('job_id').references(() => job.id).notNull(),
    notificationId: uuid('notification_id').references(() => notification.id).notNull(),
}, (table) => [primaryKey({ columns: [table.jobId, table.notificationId] })])
