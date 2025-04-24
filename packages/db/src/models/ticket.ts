import { uuid, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { user } from "./user"
import { job } from "./job"
import { files } from "./document"

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
