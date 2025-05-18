import { drizzle } from 'drizzle-orm/node-postgres';

import { env } from "../../config";
const db = drizzle({
    connection: {
        connectionString: env.DATABASE_URL!,
    }
});
console.log(env.DATABASE_URL)
export default db;
