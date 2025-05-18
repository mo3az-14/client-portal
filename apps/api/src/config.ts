import path from "path"
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
// if (process.env.CLIENT_URL === undefined ||
//     process.env.BETTER_AUTH_SECRET === undefined ||
//     process.env.DATABASE_URL === undefined ||
//     process.env.SERVER_PORT === undefined ||
//     process.env.BETTER_AUTH_URL === undefined ||
//     process.env.CLIENT_URL === undefined ||
//     process.env.GOOGLE_CLIENT_SECRET === undefined ||
//     process.env.GOOGLE_CLIENT_ID === undefined ||
//     process.env.UPLOADTHING_TOKEN === undefined ||
//     process.env.NODE_ENV === undefined
// ) {
//     console.log(process.env.BETTER_AUTH_SECRET)
//     throw Error("An environment variable is undefined")
// }
//
export type ENV = {
    BETTER_AUTH_SECRET: string | undefined,
    DATABASE_URL: string | undefined,
    SERVER_PORT: Number | undefined,
    BETTER_AUTH_URL: string | undefined,
    CLIENT_URL: string | undefined,
    GOOGLE_CLIENT_SECRET: string | undefined,
    GOOGLE_CLIENT_ID: string | undefined,
    UPLOADTHING_TOKEN: string | undefined,
    NODE_ENV: string | undefined,
}

export const env: ENV = {

    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    SERVER_PORT: parseInt(process.env.SERVER_PORT!),
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    NODE_ENV: process.env.NODE_ENV,

} 
