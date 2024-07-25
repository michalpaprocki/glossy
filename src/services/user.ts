import { hashPassword } from '../services/salt&hash'
import { db } from '../db/db'
import {users} from "../db/schema/user"
import { AddUserProps } from '../types/addUserProps'


export const addUser = async (props:AddUserProps) => {

    try {

        const {hash, salt} = hashPassword(props.password)
        const resp = await db.insert(users).values({
            name: props.name,
            hash: hash,
            salt: salt,
            role: props.role,
            session: props.session_id
        })           
        return resp
    } catch (error) {
      console.log(error)
      return error
    }
}