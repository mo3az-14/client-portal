import { uuid, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { relations, type InferSelectModel } from "drizzle-orm"
import { user } from "./user"
import { job } from "./job"
import { files } from "./document"
import { ticket_reviewby } from "./ticket_review"
import { ticket_job } from "./ticket_job"
import { ticket_attachment } from './ticket_attachment'
import { createInsertSchema } from "drizzle-zod"
import { z } from 'zod'

export const ticket = pgTable('ticket', {
    id: uuid().primaryKey().defaultRandom(),
    head: text().notNull(),
    type: text().notNull(),
    content: text().notNull(),
    status: text().notNull(),
    createdBy: text("created_by").notNull().references(() => user.id),
    jobId: uuid("job_id").references(() => job.id),
    attachment: uuid().references(() => files.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})

export const ticketRelations = relations(ticket, ({ many, one }) => ({
    reviewers: many(ticket_reviewby),
    jobs: many(ticket_job),
    attachments: many(ticket_attachment),
    createdBy: one(user, { relationName: "createdBy", fields: [ticket.createdBy], references: [user.id] }),
    reviewedBy: many(user, { relationName: "reviewdBy" }),
}))

const baseSchema = createInsertSchema(ticket, {
    createdBy: (schema) => schema.min(1),
    jobId: (schema) => schema.optional(),
}).omit({
    createdAt: true,
    updatedAt: true,
    id: true,
})

export const ticketSchema = z.union([z.object({
    mode: z.literal('create'),
    head: baseSchema.shape.head,
    type: baseSchema.shape.type,
    content: baseSchema.shape.content,
    status: baseSchema.shape.status,
    createdBy: baseSchema.shape.createdBy,
    jobId: baseSchema.shape.jobId,
    attachment: baseSchema.shape.attachment,
}),
z.object({
    mode: z.literal('update'),
    id: z.string().uuid().min(1),
    head: baseSchema.shape.head,
    type: baseSchema.shape.type,
    content: baseSchema.shape.content,
    status: baseSchema.shape.status,
    createdBy: baseSchema.shape.createdBy,
    jobId: baseSchema.shape.jobId,
    attachment: baseSchema.shape.attachment,
}),
z.object({
    mode: z.literal('addReviewer'),
    id: z.string().uuid().min(1),
    reviewer: z.string().uuid().min(1),
    head: baseSchema.shape.head.optional(),
    type: baseSchema.shape.type.optional(),
    content: baseSchema.shape.content.optional(),
    createdBy: baseSchema.shape.createdBy.optional(),
    jobId: baseSchema.shape.jobId.optional(),
    status: baseSchema.shape.status.optional(),
}),

])
export type TicketSchema = z.infer<typeof ticketSchema>;
export type ticketSelectModel = InferSelectModel<typeof ticket>;
