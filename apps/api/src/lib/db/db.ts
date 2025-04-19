import 'dotenv/config';
import * as schema from '@client-portal/db'
import pg from 'pg';
const { Pool } = pg
import { drizzle } from 'drizzle-orm/node-postgres';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool, { schema });
export default db;
