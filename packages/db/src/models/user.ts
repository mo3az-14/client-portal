import { text, boolean, pgTable, timestamp } from 'drizzle-orm/pg-core'
import { relations, type InferSelectModel } from 'drizzle-orm';
import { ticket_reviewby } from './ticket_review';
import { job_accountants } from './job_accountant';
import { files } from './document';
import { job } from './job';
import { ticket } from './ticket';
import { notification } from './notification';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

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

const baseSchema = createInsertSchema(user, {
    name: (schema) => schema.min(1),
    email: (schema) => schema.email().min(1),

}).pick({
    name: true,
    email: true,
    image: true
})

export const userSchema = z.union([
    z.object({
        mode: z.literal("signUp"),
        email: baseSchema.shape.email,
        name: baseSchema.shape.name,
        image: baseSchema.shape.image,
        password: z.string().min(1),
    }),
    z.object({
        mode: z.literal("signIn"),
        email: baseSchema.shape.email,
        name: z.object({ name: z.string().optional() }),
        password: z.string().min(1),
    }),
    z.object({
        mode: z.literal('update'),
        name: baseSchema.shape.name,
        email: baseSchema.shape.email,
        password: z.string().min(1),
        id: z.string().min(1),
    })
])
export type UserSchema = z.infer<typeof userSchema>;
export type selectUserModel = InferSelectModel<typeof user>
