import 'dotenv/config';
import * as schema from "./schema"
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool, { schema });
export default db;
