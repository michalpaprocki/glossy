require("dotenv").config()
import express, { Request, Response} from 'express'


import api from "./src/routes/api"
import term from "./src/routes/term"

import { db } from './src/db/db';
import { terms } from './src/db/schema/term';



const helmet = require('helmet')
const app = express();
const port = process.env.PORT || 5556;

app.use(express.json())
app.use(helmet())
app.use(express.static(__dirname + "/src"))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'pug')
app.set('views', './src/views')
app.use("/term", term)
app.use("/api", api)

app.get("/", async (req: Request, res: Response) => {
  // const termsList = await db.select().from(terms)

  const termsList = await db.select().from(terms).orderBy(terms.term)

  res.render("index", {title: "Home | Eve Glossary", terms: termsList} )
});




app.get("*", (req: Request, res: Response) => {
  res.render("not_found", {title: "Not Found | Eve Glossary"})
})
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
