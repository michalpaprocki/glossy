import { Request, Response } from 'express'

import { db } from '../db/db'
import { users } from '../db/schema/user'
import { eq } from 'drizzle-orm'
import { hashPassword, validatePassword } from '../services/salt&hash'
import { title, topic, description, keywords } from '../utils/envImports';
import { Role } from '../types/types'

const showAdminLogin = async (req: Request, res: Response) => {
    const {role, user} = req.session
    res.render("admin_login", {title: `Admin login | ${title}`, topic: topic, desc: description, keywords,  user: {role, user}})
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
            id: users.id,
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
            await db.update(users).set({session: req.session.id}).where(eq(users.name, login))
            return res.json({info: "Logged in successfully"})
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
const logOut = async (req: Request, res: Response) => {
    if(req.session.user){
        await db.update(users).set({session: null}).where(eq(users.name, req.session.user))
        await req.sessionStore.destroy(req.session.id)
        req.session.destroy(async (err)=> {
            if (err) {
                console.log(err);
                res.status(500);
            }
            

        })
    }
    res.redirect("/");
}
const changePassword = async (req: Request, res: Response) => {

    if(!req.session.user){
        return res.json({error: "Not Authenticated"})
    }
    const {oldPassword, newPassword, confirmPassword} = req.body
    if(oldPassword.length === 0 || newPassword.length === 0 || confirmPassword.length === 0){
        return res.json({error: "Form fields cannot be empty"})
    }
    if(newPassword !== confirmPassword){
        return res.json({error:"Please confirm your password"})
    }

    try {
        const resp = await db.select({
            id: users.id,
            hash: users.hash,
            salt: users.salt,
            role: users.role
        }).from(users).where(eq(users.name, req.session.user))
        if(resp.length === 0){
            return res.send({"error": "Bad credentials"})
        } else {
            const isValid = validatePassword(oldPassword, resp[0].hash, resp[0].salt)
            if(!isValid){
                return res.json({"error": "Bad password"})
            }
            const {salt, hash} = await hashPassword(newPassword)
            const result = await  db.update(users).set({salt: salt, hash: hash}).where(eq(users.name, req.session.user))
            if(result.command === "UPDATE"){
                return res.json({info: "Password changed successfully"})

            } else {
                return res.json({error: "Something went wrong"})
            }
        }
    } catch (error) {

        console.log(error)
        return res.json({"error": "Cannot reach database, try again later"})
    }
}
export {showAdminLogin, adminPanel, handleAdminLogin, logOut, changePassword}