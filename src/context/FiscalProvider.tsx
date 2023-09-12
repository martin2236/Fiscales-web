
import { useState, useEffect } from 'react'
import { User } from '../views/HomeView'
import { FiscalContext } from './FiscalContext'
import { baseIp } from '../config/conection'

export const FiscalProvider = ({children}:any) => {
   
  const [user,setUser] = useState<User | null>(null)
  const [coords, setCoords] = useState({
    lat: 0,
    lon: 0,
  });

    useEffect(()=>{
        const usuario = localStorage.getItem('@usuario');
        if(usuario) setUser(JSON.parse(usuario));
    },[])

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setCoords({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              });
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          console.log('La geolocalización no es compatible con este navegador.');
        }
      }, []);
  
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
          localStorage.setItem('@usuario',JSON.stringify(data.data))
        }
      })
      .catch(err =>{
        console.log(err);
      })

      
  }
  return (
    <FiscalContext.Provider 
        value={{
           user,
           coords,
           login
        }}
    >
        {children}
    </FiscalContext.Provider>
  )
}
