
import { useState } from 'react'
import { User } from '../views/HomeView'
import { FiscalContext } from './FiscalContext'
import { baseIp } from '../config/conection'

export const FiscalProvider = ({children}:any) => {
   
  const [user,setUser] = useState<User | null>(null)
  
  const login = async(email:string, password:string) =>{
    console.log('se llamo login')
    fetch(`${baseIp}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,password}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser({...data.data,loggedIn:true});
        }
      })
      .catch(err =>{
        console.log(err);
      })
  }

  const guardarSesion = () => {
    localStorage.setItem('@usuario',JSON.parse(user))
  }

  return (
    <FiscalContext.Provider 
        value={{
           user,
           login
        }}
    >
        {children}
    </FiscalContext.Provider>
  )
}
