
import { config } from 'dotenv';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { drizzle } from "drizzle-orm/neon-http"
import {neon} from "@neondatabase/serverless"
import {terms} from './schema/term'
import {synonyms} from './schema/synonym'

config({ path: '.env'})
 
const sql = neon(process.env.DB_URL!)
const db = drizzle(sql, {schema: {...terms, ...synonyms}})
const main = async () =>{
    try {
        await migrate(db, {migrationsFolder: "drizzle", })
        console.log('Migration completed');
        
    } catch (error) {
        console.log('Error during migration:', error)
        
        process.exit(1)
    }
}

main()