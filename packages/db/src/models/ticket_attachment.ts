import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { ticket } from "./ticket";
import { files } from "./document";

export const ticket_attachment = pgTable("ticket_attachment", {
    ticketId: uuid('ticket_id').references(() => ticket.id).notNull(),
    attachment: uuid().references(() => files.id).notNull(),
}, (table) => [primaryKey({ columns: [table.ticketId, table.attachment] })])
