
import { config } from 'dotenv';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { drizzle } from "drizzle-orm/neon-http"
import {neon} from "@neondatabase/serverless"
import * as schema from "./schema"

config({ path: '.env'})
 
const sql = neon(process.env.DB_URL!)
const db = drizzle(sql, {schema})
const main = async () =>{
    try {
        await migrate(db, {migrationsFolder: "drizzle"})
        console.log('Migration completed');
    } catch (error) {
        console.log('Error during moigration:', error)
        process.exit(1)
    }
}

main()