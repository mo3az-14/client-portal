import { pgTable, primaryKey, uuid, text } from "drizzle-orm/pg-core";
import { ticket } from "./ticket";
import { user } from "./user";

export const ticket_reviewby = pgTable('ticket_reviewby', {
    ticketId: uuid("ticket_id").notNull().references(() => ticket.id),
    reviewBy: text("review_by").notNull().references(() => user.id),
}, (table) => [primaryKey({ columns: [table.ticketId, table.reviewBy] })])
