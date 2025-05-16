import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv'
dotenv.config()
export default defineConfig({
    out: './migrations',
    schema: './src/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        ssl: false,
    },
});

