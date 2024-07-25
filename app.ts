require("dotenv").config()
import express, { Request, Response} from 'express'
import {session} from './src/types/ExpressSession'
const pgSession = require('connect-pg-simple')(session)
import api from "./src/routes/api"
import term from "./src/routes/term"
import admin from './src/routes/admin'
import * as pg from "pg"
import { db } from './src/db/db';
import { terms } from './src/db/schema/term';
import { port, title, topic, description, keywords } from './src/utils/envImports';
const pgPool = new pg.Pool({
  connectionString: process.env.DB_URL,
});

const helmet = require('helmet')
const app = express();
const cookieSecure = app.get("env") === "development" ? false : true

app.use(session({
  store: new pgSession({
    pool:pgPool,
    tableName: 'user_sessions',
    createTableIfMissing: true,
  }),
  secret: process.env.SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 90 * 1000,
    secure: cookieSecure,
    sameSite: true
  },
  name: `${title} session`
}))

app.use(express.json())
app.use(helmet())
app.use(express.static(__dirname + "/src"))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'pug')
app.set('views', './src/views')

app.use("/term", term)
app.use("/api", api)
app.use("/admin", admin)
app.get("/unauthorized", (req: Request, res: Response) => {
  const {role, user} = req.session
  res.render("not_authorized", {title: `Not authorized | ${title}`, terms: [], topic: topic, desc: description, keywords,  user: {role, user}})
})
app.get("/", async (req: Request, res: Response) => {
  const {role, user} = req.session
  try {
    const termsList = await db.select().from(terms).orderBy(terms.createdAt).limit(10)

    res.render("index", {title: `Home | ${title}`, terms: termsList, topic: topic, desc: description, keywords, error: null, user: {role, user}})
  } catch (error) {
  console.log(error) 
    res.render("index", {title: `Home | ${title}`, terms: [], topic: topic, desc: description, keywords, error: "Database is not reachable, try again later", user: {role, user}})
  }
});




app.get("*", (req: Request, res: Response) => {
  const {role, user} = req.session
  res.render("not_found", {title: `Not Found | ${title}`, user: {role, user}})
})
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
