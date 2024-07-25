import * as  express from "express"
import {showAdminLogin, adminPanel, handleAdminLogin} from '../controllers/admin'
import { isAuthorized } from "../middlewares/isAuthorized"

const router = express.Router()


router.get("/login", showAdminLogin)
router.post("/login", handleAdminLogin)
router.use("/*",isAuthorized)
router.get("/", adminPanel)




export default router