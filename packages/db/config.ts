import path from "path"
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
export type ENV = {
    DATABASE_URL: string | undefined,
}

export const env: ENV = {
    DATABASE_URL: process.env.DATABASE_URL,
} 
