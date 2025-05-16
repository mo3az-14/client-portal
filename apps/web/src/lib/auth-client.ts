import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins";
export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_SERVER_URL,
    fetchOptions: { credentials: "include" },
    plugins: [inferAdditionalFields({
        user: {
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
    })],
})
