import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { relations } from "drizzle-orm";
import { job } from "./job";
import { ticket } from "./ticket";

export const ticket_job = pgTable('ticket_job', {
    jobId: uuid("job_id").notNull().references(() => job.id).notNull(),
    ticketId: uuid("ticket_id").notNull().references(() => ticket.id).notNull()
}, (table) => [[primaryKey({ columns: [table.jobId, table.ticketId] })]])


export const ticketJobRelations = relations(ticket_job, ({ one }) => ({
    tickets: one(ticket, { fields: [ticket_job.ticketId], references: [ticket.id], relationName: "tickets" }),
    jobs: one(job, { fields: [ticket_job.jobId], references: [job.id], relationName: "jobs" })
}))

const ticketJob = createInsertSchema(ticket_job)
export type TicketJob = z.infer<typeof ticketJob>;
