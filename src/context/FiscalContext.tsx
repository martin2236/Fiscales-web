import { createContext } from "react"
import { User } from "../views/HomeView"

interface DefaultValue {
    user:User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const defaultValue: DefaultValue = {
    user:{
        id:0, localidad:'', mesa:'', nombre:'', apellido:'', dni:'', email:'', escuela:'',rol:'', session_token:''
    },
    setUser: () => {}
}

export const FiscalContext = createContext(defaultValue)