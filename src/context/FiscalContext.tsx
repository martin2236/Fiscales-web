import { createContext } from "react"
import { User } from "../views/HomeView"

interface DefaultValue {
    user:User | null;
    login: (email: string, password: string) => Promise<void>;
    coords: {
        lat:number,
        lon:number
    }
}

const defaultValue: DefaultValue = {
    user:{} as User,
    coords:{lat : 0, lon: 0},
    login:async()=>{},
}

export const FiscalContext = createContext(defaultValue)