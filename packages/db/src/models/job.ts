import { text, timestamp, pgTable, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm';
import { user } from './user'
import { ticket_job } from './ticket_job'
import { job_notification } from './job_notification';
import { job_document } from './job_doc';
import { job_accountants } from './job_accountant';
export const job = pgTable('job', {
    id: uuid("id").primaryKey().defaultRandom(),
    customerId: text("customer_id").notNull().references(() => user.id),
    status: text(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("created_at").notNull().defaultNow().$onUpdate(() => new Date()),
})
export const jobRelations = relations(job, ({ many, one }) => ({
    tickets: many(ticket_job),
    notifications: many(job_notification),
    documents: many(job_document),
    accountants: many(job_accountants),
    customer: one(user, { fields: [job.customerId], references: [user.id] }),
}))

