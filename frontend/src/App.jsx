import './App.css';

import { ToastContainer } from "react-toastify";

import AuthProvider from "./hooks/AuthContext.jsx"
import ThemeProvider from "./hooks/ThemeContext.jsx";
import AppRoutes from "./routes/index.jsx"

function App() {

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <AppRoutes/>
          <ToastContainer/>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default App
