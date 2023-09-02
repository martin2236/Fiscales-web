import { Route, Routes } from 'react-router-dom';
import { LoginView } from '../views/LoginView'; 


export const AppRouter = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/*" element={<LoginView/>}/>
      </Routes>
    </>
  )
}

