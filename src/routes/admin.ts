import * as  express from "express"
import {showAdminLogin, adminPanel, handleAdminLogin, logOut, changePassword} from '../controllers/admin'
import { isAuthorized } from "../middlewares/isAuthorized"

const router = express.Router()


router.get("/login", showAdminLogin)
router.post("/login", handleAdminLogin)
router.get("/logout", logOut)
router.use("/*",isAuthorized)
router.get("/", adminPanel)
router.post("/change_password", changePassword)




export default router