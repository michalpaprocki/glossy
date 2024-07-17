require("dotenv").config()
import express, { Request, Response} from 'express'


import api from "./src/routes/api"

const helmet = require('helmet')
const app = express();
const port = process.env.PORT || 5556;

app.use(express.json())
app.use(helmet())
app.use(express.static(__dirname + "/src"))

app.set('view engine', 'pug')
app.set('views', './src/views')

app.get("/", (req: Request, res: Response) => {

  res.render("index", {title: "Home | Eve Glossary"} )
});
app.get("/add", (req: Request, res: Response) => {

  res.render("term_add", {title: "Add definition | Eve Glossary"} )
});


app.use("/api", api)

app.get("*", (req: Request, res: Response) => {
  res.render("not_found", {title: "Not Found | Eve Glossary"})
})
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
