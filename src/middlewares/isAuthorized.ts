import { NextFunction, Request, Response } from "express";
import {Role} from "../types/types"



const isAuthorized = async (req: Request, res: Response, next:NextFunction) => {
   if(req.session.role === Role.admin){
    next()
   } else {
    return res.redirect("/admin/login")
   }
}

export {isAuthorized}