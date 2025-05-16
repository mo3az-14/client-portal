import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const session = pgTable('session', {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: 'cascade' }),
    token: text('token').notNull().unique(),
    expiresAt: timestamp("expires_at").notNull().defaultNow(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const sessionSchema = createSelectSchema(session);

export type Session = z.infer<typeof sessionSchema>;
