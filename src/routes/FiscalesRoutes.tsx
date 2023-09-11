
import { Navigate, Route, Routes } from "react-router-dom"
import { HomeView } from "../views/HomeView"
import { EditFiscal } from "../views/EditFiscal"


export const FiscalesRoutes = () => {
  return (
            <Routes>
                <Route path="/home" element={<HomeView />} />
                <Route path="/edit" element={<EditFiscal/>} />
                <Route path="/*" element={<Navigate to="/login"/>}/>
            </Routes>
  )
}
