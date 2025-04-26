import { text, boolean, pgTable, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm';
import { ticket_reviewby } from './ticket_review';
import { job_accountants } from './job_accountant';
import { files } from './document';
import { job } from './job';
import { ticket } from './ticket';
import { notification } from './notification';

export const user = pgTable('user', {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean("email_verified").notNull().default(false),
    image: text("image"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const userRelations = relations(user, ({ many }) => ({
    reveiwer: many(ticket_reviewby),
    accountant: many(job_accountants),
    documents: many(files),
    jobs: many(job),
    tickets: many(ticket),
    notifications: many(notification),
}))

