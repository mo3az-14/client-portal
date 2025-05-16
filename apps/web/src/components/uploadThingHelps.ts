import { type GenerateTypedHelpersOptions, generateReactHelpers } from "@uploadthing/react"
export const initOpts = {
    url: import.meta.env.VITE_SERVER_URL,
    fetch: (input, init) => {
        let creds: RequestCredentials = "include"
        if (typeof input === "string" && input.includes('.ingest')) {
            creds = "omit"
        }
        return fetch(input, {
            ...init,
            credentials: creds,
        })
    }
} satisfies GenerateTypedHelpersOptions;

export const { useUploadThing } = generateReactHelpers(initOpts);
