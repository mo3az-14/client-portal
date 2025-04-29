import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: process.env.SERVER_URL,
    fetchOptions: { credentials: "include" },
    plugins: [],
})
