import express from 'express'
import {index, getAllTerms, getTermsNames, createTerm, editTerm, getTermByName, getTermById, getTermBySynonym, getTermsSynonyms, addSynonymToTerm, fourOFour, getAllSynonyms, deleteTermByName} from '../controllers/terms'

const router = express.Router()

router.get("/", index)
router.post("/term/create", createTerm)
router.get("/terms", getAllTerms)
router.get("/terms/names", getTermsNames)

router.get("/term/name/:name", getTermByName)
router.get("/term/id/:id", getTermById)
router.get("/term/synonyms", getTermsSynonyms)
router.get("/term/synonym/:synonym", getTermBySynonym)

router.post("/synonym/add/:term", addSynonymToTerm)
router.get("/synonyms", getAllSynonyms)

// router.get("/term/delete/:name", deleteTermByName)


router.get("*", fourOFour)
export default router