import express, { json, Request, Response} from 'express'
import {createTerm, deleteTerm, editTerm, getTerm} from '../controllers/terms'

const router = express.Router()


router.post("/term/create", createTerm)

export default router