import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import db from "@/lib/db/db.ts";
import dotenv from 'dotenv'

dotenv.config();

export const auth = betterAuth({
    trustedOrigins: [`http://localhost:${process.env.CLIENT_PORT}`],
    emailAndPassword: {
        enabled: true
    },
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    appName: "api",
    plugins: [],
});
