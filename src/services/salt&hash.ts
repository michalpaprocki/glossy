import crypto from "crypto"
export const hashPassword = (password:string) => {
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(password, salt, 500, 64, `sha512`).toString('hex')
    return {salt, hash}
}

export const validatePassword = (password:string, hash:string, salt:string) => {
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 500, 64, `sha512`).toString('hex')
    return hash === hashedPassword
}