import { uuid, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { user } from "./user"
import { job } from "./job"
import { files } from "./document"
import { ticket_reviewby } from "./ticket_review"
import { ticket_job } from "./ticket_job"
import { ticket_attachment } from './ticket_attachment'

export const ticket = pgTable('ticket', {
    id: uuid().primaryKey().defaultRandom(),
    head: text().notNull(),
    type: text().notNull(),
    content: text().notNull(),
    status: text().notNull(),
    createdBy: text("created_by").notNull().references(() => user.id),
    reviewedBy: text("reviewed_by").notNull().references(() => user.id),
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

