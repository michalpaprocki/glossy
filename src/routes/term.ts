import express from 'express'
import { addTerm, getTerm, search } from '../controllers/front';


const router = express.Router()

router.get("/get/:term", getTerm);
router.get("/add", addTerm);
router.get("/search", search);


export default router