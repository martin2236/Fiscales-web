import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginView } from './views/LoginView'; 
import { HomeView } from './views/HomeView'; 
import { EditFiscal } from './views/EditFiscal'; 

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/home" element={<HomeView />} />
        <Route path="/edit" element={<EditFiscal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
