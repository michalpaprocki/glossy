import session from "express-session"
import { Role } from "./types"

declare module "express-session" {
    interface SessionData {
      user: string,
      role: Role,
    }

  }

export {session}