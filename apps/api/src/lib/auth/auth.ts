import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import db from '../db/db'
import dotenv from 'dotenv'
import { account, session, user, verification } from "@client-portal/db";
dotenv.config();

export const auth = betterAuth({
    trustedOrigins: [`http://localhost:${process.env.CLIENT_PORT}`],
    emailAndPassword: {
        enabled: true
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user,
            session,
            verification,
            account
        }
    }),
    appName: "api",
    plugins: [],
});
