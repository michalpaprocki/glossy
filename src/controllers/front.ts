import { Request, Response} from 'express'
import {db} from "../db/db"
import { terms } from '../db/schema/term';
import { eq, ilike } from 'drizzle-orm';
import { synonyms } from '../db/schema/synonym';


const getTerm = async (req: Request, res: Response) => {
        const { term }= req.params
        try {
            const termDef = await db.query.terms.findFirst({
            where: eq(terms.term, term),
            with: {
              synonyms: true
            }
          })     

          if(termDef){
            res.render("term", {title: `${termDef.term} | Eve Glossary`, term: termDef} )
          } else {
            res.render("not_found", {title: "Not Found | Eve Glossary"})
          }
      
        } catch (error) {
          console.log(error)
        //   change this : show error
          res.render("not_found", {title: "Not Found | Eve Glossary"})
        }
      };
const addTerm = (req: Request, res: Response) => {
    res.render("term_add", {title: "Add a definition | Eve Glossary"} )
}
const search = async (req: Request, res: Response) => {
    const term = req.query.term
  if(term?.length === 0 || typeof term !== "string"){
    return  res.render("error", {title: "Search results | Eve Glossary", error: "Please provide a value"} )
  }

    const results = await db.query.terms.findMany({
      
      where: ilike(terms.term, "%" + term + "%")
    })
    const synonymsList = await db.query.synonyms.findMany({
      where: ilike(synonyms.synonym, "%" + term + "%"), with: {
        terms: true
      }
    })

    res.render("search", {title: "Search results | Eve Glossary", terms: [...results, ...synonymsList], term: term} )
    }
 
export { getTerm, addTerm, search}