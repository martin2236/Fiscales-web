import { FiscalProvider } from "./context/FiscalProvider"
import { AppRouter } from "./router/AppRouter"

const AppState = ({children}:any) => {
  return (
  <FiscalProvider>
    {children}
  </FiscalProvider>)
}


export const App = () => {
  return (
    <AppState>
        <AppRouter/>
    </AppState>
  )
}

