require("dotenv").config()
import express, { Request, Response} from 'express'
import { db } from './src/db/neon';

import api from "./src/routes/api"

const helmet = require('helmet')
const app = express();
const port = process.env.PORT || 5556;

app.use(helmet())
app.use(express.static(__dirname + "/src"))

app.set('view engine', 'pug')
app.set('views', './src/views')

app.get("/", (req: Request, res: Response) => {
  res.render("index", {title: "Eve Glossary"} )
});



app.use("/api", api)
app.get("*", (req: Request, res: Response) => {
  res.render("not_found", {title: "Not Found | Eve Glossary"})
})
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
