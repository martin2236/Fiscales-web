import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { LoginView } from '../views/LoginView'; 
import { useContext, useEffect } from 'react';
import { FiscalContext } from '../context/FiscalContext';
import { FiscalesRoutes } from '../routes/FiscalesRoutes';


export const AppRouter = () => {
  const {user} = useContext(FiscalContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
        navigate('home');
    }
  },[]);
  
  return (
    <>
      <Routes>
       <Route path="/"  element={<LoginView />}/>
        <Route path="/*" element={<FiscalesRoutes/>}/>
      </Routes>
    </>
  )
}

