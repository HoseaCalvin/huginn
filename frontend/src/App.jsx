import './App.css'

import AuthProvider from "./hooks/AuthContext.jsx"
import AppRoutes from "./routes/index.jsx"

function App() {

  return (
    <>
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
    </>
  )
}

export default App
