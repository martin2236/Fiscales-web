
import { useState } from 'react'
import { User } from '../views/HomeView'
import { FiscalContext } from './FiscalContext'

export const FiscalProvider = ({children}:any) => {
   
  const [user,setUser] = useState<User | null>(null)

  return (
    <FiscalContext.Provider 
        value={{
           user,
           setUser
        }}
    >
        {children}
    </FiscalContext.Provider>
  )
}
