export interface AddUserProps {
    role: "user"|"admin",
    name: string,
    password: string,
    session_id:string
}
export enum Role {
    "user" ="user",
    "admin" = "admin"
}