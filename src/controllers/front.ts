import { Request, Response} from 'express'
import {db} from "../db/db"
import { terms } from '../db/schema/term';
import { eq, ilike } from 'drizzle-orm';
import { synonyms } from '../db/schema/synonym';
import { title } from '../utils/envImports';

const getTerm = async (req: Request, res: Response) => {
        const  {role, user} = req.session
        const { term }= req.params
        try {
            const termDef = await db.query.terms.findFirst({
            where: eq(terms.term, term),
            with: {
              synonyms: true
            }
          })     

          if(termDef){
            res.render("term", {title: `${termDef.term} | ${title}`, term: termDef, user: {user,role}} )
          } else {
            res.render("not_found", {title: `Not Found | ${title}`, user: {user,role}})
          }
      
        } catch (error) {
          console.log(error)
        //   change this : show error
          res.render("not_found", {title: `Not Found | ${title}`})
        }
      };
const addTerm = (req: Request, res: Response) => {
  const  {role, user} = req.session
    res.render("term_add", {title: `Add a definition | ${title}`, user: {user,role}} )
}
const search = async (req: Request, res: Response) => {
    const  {role, user} = req.session
    const term = req.query.term
  if(term?.length === 0 || typeof term !== "string"){
    return  res.render("error", {title: `Search results | ${title}`, error: "Please provide a value ⚠️", user: {user,role}} )
  }

    const results = await db.query.terms.findMany({
      
      where: ilike(terms.term, "%" + term + "%")
    })
    const synonymsList = await db.query.synonyms.findMany({
      where: ilike(synonyms.synonym, "%" + term + "%"), with: {
        terms: true
      }
    })
  
    res.render("search", {title: `Search results | ${title}`, terms: [...results, ...synonymsList], term: term, user: {user,role}} )
    }
 
export { getTerm, addTerm, search}