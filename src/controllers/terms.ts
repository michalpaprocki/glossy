import { Request, Response} from 'express'
import {db} from "../db/db"
import {eq, exists} from 'drizzle-orm'
import { terms } from '../db/schema/term'
import { NeonDbError } from '@neondatabase/serverless'
import { synonyms } from '../db/schema/synonym'
import { topic } from '../utils/envImports'


const fourOFour = (req:Request, res: Response) => {
    res.json({"error": "Cannot be found."}).status(404);
}

const index = (req:Request, res: Response) => {
    res.json({
        "title":`${topic} API index`,
        "routes": {
            "GET: '/api'":"this index page",
            "GET: /api/terms":"returns all the terms with definitions contained in the db",
            "GET: /api/terms/names":"returns all the names of terms contained in the db",
            "GET: /api/term/name/:name":"returns a definition associated with :name",
            "GET: /api/term/name/:id":"returns a definition associated with :id",
            "GET: /api/term/synonyms":"returns synonyms associated with a term",
            "GET: /api/term/synonyms/:synonym":"returns a term associated with a synonym",
        }
    })
}
const createTerm = async (req:Request, res: Response) =>{

    const {term, def} = req.body.payload
    if(term.trim().length === 0 || def.trim().length === 0){
       return res.json({"error": "Form fields can't be empty"}); 
    }
 
    try {
        const resp = await db.insert(terms).values({definition: def.trim(), term: term.trim().toLocaleLowerCase() })
        res.json({"info": "Term added."});
    } catch (error) {
        if(error instanceof NeonDbError && error.code === '23505'){
            res.json({"error": "Term already in database"});
        } else {
            res.json({"error": "Cannot create term, try again later."});
        }
    }
}
const getAllTerms = async (req:Request, res: Response) =>{
    try {
        const resp = await db.select().from(terms)
        res.json(resp)
    } catch (error) {
        console.log(error)
        res.json({"error": "something went wrong"})
    }
}
const getTermsNames = async (req:Request, res: Response) =>{
    try {
        const resp = await db.select({term: terms.term}).from(terms)
        res.json(resp)
    } catch (error) {
        console.log(error)
        res.json({"error": "something went wrong"})
    }
}
const getTermByName = async (req:Request, res: Response) =>{
    const {name} = req.params
    if(name.length === 0 ){
        return res.json({"error": "Must provide a name value"}); 
     }
     try {
        const resp = await db.select().from(terms).where(eq(terms.term, name))
        res.json(resp)
     } catch (error) {
        console.log(error)
        res.json({"error": "something went wrong"})
     }
}
const getTermById = async (req:Request, res: Response) =>{
    const {id} = req.params
    if(id.length === 0 ){
        return res.json({"error": "Must provide an id value"}); 
     }
     try {
        const resp = await db.select().from(terms).where(eq(terms.id, id))
        res.json(resp)
     } catch (error) {
        console.log(error)
        res.json({"error": "something went wrong"})
     }
}
const getTermBySynonym = async (req:Request, res: Response) =>{
    const {synonym} = req.params
    if(synonym.length === 0 ){
        return res.json({"error": "Must provide a synonym value"}); 
     }
     try {
        const resp = await db.select().from(terms).where(exists(db.select().from(synonyms).where(eq(synonyms.synonym, synonym))))
        res.json(resp)
     } catch (error) {
        console.log(error)
        res.json({"error": "something went wrong"})
     }
}
const getTermsSynonyms = async (req:Request, res: Response) =>{
     try {
        const resp = await db.select({
            term: terms.term,
            synonyms: terms.synonyms
        }).from(terms)
        res.json(resp)
     } catch (error) {
        console.log(error)
        res.json({"error": "something went wrong"})
     }
}
const editTerm = (req:Request, res: Response) =>{
    
}
const deleteTermByName = async (req:Request, res: Response) =>{
    const {name} = req.params
    if(name.length === 0 ){
        return res.json({"error": "Must provide a name value"}); 
     }
     try {
        const resp = await db.delete(terms).where(eq(terms.term, name)).returning()
        res.json({deleted: resp})
     } catch (error) {
        console.log(error)
        res.json({"error": "something went wrong"})
     }
}
const purgeTerms = async (req:Request, res: Response) =>{
    try {
       await db.delete(terms)
        res.json("db purged")
     } catch (error) {
        console.log(error)
        res.json({"error": "something went wrong"})
     }
}
const purgeSynonyms = async (req:Request, res: Response) =>{
    try {
       await db.delete(synonyms)
        res.json("db purged")
     } catch (error) {
        console.log(error)
        res.json({"error": "something went wrong"})
     }
}
const addSynonymToTerm = async (req:Request, res: Response) =>{
    const term = req.params.term
    const {synonym} = req.body
    if(term.trim().length === 0 ){
        return res.json({"error": "Must provide a term in params"}).status(400); 
     }
     if(synonym.trim().length === 0){
        return res.json({"error": "Please provide a synonym value in request body"}).status(400); 
     }

     try {
 
        const termQueried = await db.select().from(terms).where(eq(terms.term, term))
        if(termQueried.length === 0)
        {
            return res.json({"error": "Term deos not exists in the db"}).status(400); 
        }
        const result = await db.insert(synonyms).values({
            termId: termQueried[0].id,
            synonym: synonym
        })

        res.json({"info": "Synonym added."});
     } catch (error) {
         if(error instanceof NeonDbError && error.code === '23505'){
             res.json({"error": "Synonym already in database"});
         } else {
            console.log(error)
             res.json({"error": "Cannot create term, try again later."});
         }
     }

}
const getAllSynonyms = async (req:Request, res: Response) =>{
    const synonymsList = await db.select().from(synonyms)
    res.json(synonymsList)
}
export {fourOFour, index, deleteTermByName, createTerm, getAllTerms, getTermsNames, getTermByName, getTermById, getTermBySynonym, getTermsSynonyms, editTerm, addSynonymToTerm, getAllSynonyms,}