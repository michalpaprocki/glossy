import { Request, Response} from 'express'
import {db} from "../db/db"
import { eq } from "drizzle-orm";
import { terms } from '../db/schema/term'

const createTerm = async (req:Request, res: Response) =>{

    const {term, def} = req.body.payload

    if(term.length === 0 || def.length === 0){
       return res.json({"error": "Form fields can't be empty"}); 
    }
    const result = await db.select().from(terms).where(eq(terms.term, term))
    if(result.length === 0) {
        
        res.json({"state":result});
    } else {
        res.json({"error": "Term already in database"});
    }
}
const getTerm = (req:Request, res: Response) =>{
    
}
const editTerm = (req:Request, res: Response) =>{
    
}
const deleteTerm = (req:Request, res: Response) =>{
    
}

export {createTerm, getTerm, editTerm, deleteTerm}