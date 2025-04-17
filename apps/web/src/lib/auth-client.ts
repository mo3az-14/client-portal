import { createAuthClient } from "better-auth/react"
import dotenv from "dotenv"
dotenv.config()
export const authClient = createAuthClient({
    baseURL: process.env.SERVER_URL,
    fetchOptions: { credentials: "include" }

})
