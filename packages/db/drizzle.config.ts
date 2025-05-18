import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv'
import path from "path"
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
export default defineConfig({
    out: './migrations',
    schema: './src/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        ssl: false,
    },
});

