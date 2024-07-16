import express, { Request, Response} from 'express'
import { db } from '../db/neon'

const router = express.Router()


router.get("/", (req: Request, res: Response) => {
    

    res.json({"state": "test"})
})



export default router