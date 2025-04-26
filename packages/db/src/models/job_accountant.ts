import { pgTable, primaryKey, uuid, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { job } from './job'
import { user } from './user'

export const job_accountants = pgTable("job_accountants", {
    jobId: uuid('job_id').references(() => job.id).notNull(),
    accountantId: text('accountant_id').references(() => user.id).notNull(),

}, (table) => [primaryKey({ columns: [table.jobId, table.accountantId] })])

export const jobAccountantRelations = relations(job_accountants, ({ one }) => ({
    job: one(job, { fields: [job_accountants.jobId], references: [job.id] }),
    accountant: one(user, { fields: [job_accountants.accountantId], references: [user.id] }),
}))
