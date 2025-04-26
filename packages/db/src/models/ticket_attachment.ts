import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { ticket } from "./ticket";
import { files } from "./document";

export const ticket_attachment = pgTable("ticket_attachment", {
    ticketId: uuid('ticket_id').references(() => ticket.id).notNull(),
    attachment: uuid().references(() => files.id).notNull(),
}, (table) => [primaryKey({ columns: [table.ticketId, table.attachment] })])

export const ticketAttachmentRelations = relations(ticket_attachment, ({ one }) => ({
    attachment: one(files, { fields: [ticket_attachment.ticketId], references: [files.id] }),
    ticket: one(ticket, { fields: [ticket_attachment.ticketId], references: [ticket.id] }),
}))

