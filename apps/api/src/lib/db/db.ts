import 'dotenv/config';
import pg from 'pg';
import * as schema from '@client-portal/db'
const { Pool } = pg
import { drizzle } from 'drizzle-orm/node-postgres';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool, { schema });
export default db;
