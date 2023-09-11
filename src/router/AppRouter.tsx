import { Route, Routes } from 'react-router-dom';
import { LoginView } from '../views/LoginView'; 


export const AppRouter = () => {
  const isAuthenticated = true;
  return (
    <>
      <Routes>
       <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginView />} />
        <Route path="/*" element={<LoginView/>}/>
      </Routes>
    </>
  )
}

