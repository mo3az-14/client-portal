import { text, timestamp, pgTable, uuid } from 'drizzle-orm/pg-core'
import { relations, type InferSelectModel } from 'drizzle-orm';
import { user } from './user'
import { ticket_job } from './ticket_job'
import { job_notification } from './job_notification';
import { job_document } from './job_doc';
import { job_accountants } from './job_accountant';
import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
export const job = pgTable('job', {
    id: uuid("id").primaryKey().defaultRandom(),
    customerId: text("customer_id").notNull().references(() => user.id),
    status: text(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})
export const jobRelations = relations(job, ({ many, one }) => ({
    tickets: many(ticket_job,),
    notifications: many(job_notification,),
    documents: many(job_document,),
    accountants: many(job_accountants,),
    customer: one(user, { fields: [job.customerId], references: [user.id], relationName: 'customer' }),
}))

const baseSchema = createInsertSchema(job).omit({ createdAt: true, updatedAt: true });

export const jobSchema = z.union([
    z.object({
        mode: z.literal('create'),
        customerId: baseSchema.shape.customerId.nonempty(),
        status: baseSchema.shape.status.optional(),
    }),
    z.object({
        mode: z.literal('uploadDocumentToJob'),
        id: baseSchema.shape.id,
        customerId: baseSchema.shape.customerId,
        document: z.array(z.string().uuid()),
    }),
    z.object({
        mode: z.literal('addAccountant'),
        id: baseSchema.shape.id,
        accountant: z.string().min(1),
    }),
])

export type JobSchema = z.infer<typeof jobSchema>
export type SelectJobModel = InferSelectModel<typeof job>
