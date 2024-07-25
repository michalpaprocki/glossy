import { Request, Response } from 'express'
import { title } from '../utils/envImports'
import { db } from '../db/db'
import { users } from '../db/schema/user'
import { eq } from 'drizzle-orm'
import { validatePassword } from '../services/salt&hash'

import { Role } from '../types/types'

const showAdminLogin = async (req: Request, res: Response) => {
    console.log(req.session)
        res.render("admin_login", {title: `Admin login | ${title}`})
}
const handleAdminLogin = async (req: Request, res: Response) => {
    if(req.method!=="POST"){
       return res.json({"error": "Method not allowed"}).status(405)
    } 
    if(req.body.login.length === 0 || req.body.password.length === 0){
        return res.json({"error": "Must provide credentials"}).status(405)
    }
    const {login, password} = req.body

    try {
        const resp = await db.select({
            hash: users.hash,
            salt: users.salt,
            role: users.role
        }).from(users).where(eq(users.name, login))
        if(resp.length === 0){
            return res.send({"error": "Bad credentials"})
        } else {
            const isValid = validatePassword(password, resp[0].hash, resp[0].salt)
            if(!isValid){
                return res.json({"error": "Bad credentials"})
            }
            req.session.role = resp[0].role as Role
            req.session.user = login
            req.session.save()

            return res.json({"info": "Logged in successfully"})
        }
    } catch (error) {

        console.log(error)
        return res.json({"error": "Cannot reach database, try again later"})
    }

}
const adminPanel = async (req: Request, res: Response) => { 
    const {user, role} = req.session

    res.render("admin", {title: `Admin | ${title}`, user: {user, role}})
}

export {showAdminLogin, adminPanel, handleAdminLogin}