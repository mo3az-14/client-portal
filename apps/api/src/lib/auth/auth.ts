import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import db from '../db/db'
import dotenv from 'dotenv'
import { account, session, user, verification } from "@client-portal/db";
dotenv.config();
export const auth = betterAuth({
    trustedOrigins: [process.env.CLIENT_URL!],
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    return {
                        data: {
                            ...user,
                            phoneNumberVerified: true,
                        }
                    }
                }
            }
        }
    },
    user: {
        additionalFields: {
            phoneNumber: {
                type: "string",
                required: false,
                input: true,
            },
            phoneNumberVerified: {
                type: "string",
                required: false,
                input: true,
            }
        }
    },
    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user,
            session,
            verification,
            account,

        }
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 // Cache duration in seconds
        }
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

        },
    },
    appName: "api",
    plugins: [],
});
