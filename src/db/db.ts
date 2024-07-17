import {config} from 'dotenv'
import { drizzle } from "drizzle-orm/neon-http"
import {neon} from "@neondatabase/serverless"
import {terms} from './schema/term'
import {synonyms} from './schema/synonym'

config({ path: '.env'})

const sql = neon(process.env.DB_URL!)


export const db = drizzle(sql, {schema:{...terms, ...synonyms} })