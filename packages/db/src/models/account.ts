import { pgTable, timestamp, text } from "drizzle-orm/pg-core";
import { user } from "./user";

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => user.id, { onDelete: 'cascade' }),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
