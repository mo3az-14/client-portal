import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { pgTable, primaryKey, uuid, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { ticket } from "./ticket";
import { user } from "./user";

export const ticket_reviewby = pgTable('ticket_reviewby', {
    ticketId: uuid("ticket_id").notNull().references(() => ticket.id),
    reviewBy: text("review_by").notNull().references(() => user.id),
}, (table) => [primaryKey({ columns: [table.ticketId, table.reviewBy] })])

export const ticketReviewByRelations = relations(ticket_reviewby, ({ one }) => ({
    reviewBy: one(user, { fields: [ticket_reviewby.reviewBy], references: [user.id], relationName: "reviewBy" }),
    ticket: one(ticket, { fields: [ticket_reviewby.ticketId], references: [ticket.id], relationName: "ticket" }),
}))

const ticketReviewby = createInsertSchema(ticket_reviewby)
export type TicketReviewby = z.infer<typeof ticketReviewby>
