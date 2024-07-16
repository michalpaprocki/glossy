require("dotenv").config()
import express, { Request, Response} from 'express'

const app = express();
const port = process.env.PORT || 5556;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
