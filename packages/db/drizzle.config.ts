import { env } from './config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    out: './migrations',
    schema: './src/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.DATABASE_URL!,
        ssl: false,
    },
});
