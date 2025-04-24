import { pgTable, primaryKey, uuid, text } from 'drizzle-orm/pg-core'
import { job } from './job'
import { user } from './user'

export const job_accountants = pgTable("job_accountants", {
    jobId: uuid('job_id').references(() => job.id).notNull(),
    accountantId: text('accountant_id').references(() => user.id).notNull(),

}, (table) => [primaryKey({ columns: [table.jobId, table.accountantId] })])
