import { hashPassword } from "../services/salt&hash"
import { Role } from "../types/types"
import { db } from "./db"
import { users } from "./schema/user"


const insertAdmin = async () =>{
    const {hash, salt} =  hashPassword("admin")
    try {
        const resp = await db.insert(users).values({
            hash: hash,
            name: "admin",
            salt: salt,
            role: Role.admin,
        }).returning()
        if(resp.length === 0){
            throw "Cannot create admin account"
        }
        console.log("Account created successfully.")
    } catch (error) {
        console.log(error)
         throw "Cannot connect to database"
    }
}

insertAdmin()