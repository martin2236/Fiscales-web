import { createContext } from "react"
import { User } from "../views/HomeView"

interface DefaultValue {
    user:User | null;
    login: (email: string, password: string) => Promise<void>
}

const defaultValue: DefaultValue = {
    user:{} as User,
    login:async()=>{}
}

export const FiscalContext = createContext(defaultValue)