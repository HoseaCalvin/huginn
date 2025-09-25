import './App.css';

import { ToastContainer } from "react-toastify";

import AuthProvider from "./hooks/AuthContext.jsx"
import AppRoutes from "./routes/index.jsx"

function App() {

  return (
    <>
      <AuthProvider>
        <AppRoutes/>
        <ToastContainer/>
      </AuthProvider>
    </>
  )
}

export default App
