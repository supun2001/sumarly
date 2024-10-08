import {React, useState} from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login."
import Register from "./pages/Register"
import RestPassword from "./components/sign-in/RestPassword"
import ProtectedRoute from "../../frontend/src/components/ProtectedRoute"
import Users from "./pages/Users"


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/reset_password" element={<RestPassword />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
