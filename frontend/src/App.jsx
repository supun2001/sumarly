import {React, useState} from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login."
import Register from "./pages/Register"
import Notfount from "./pages/Notfount"
import ProtectedRoute from './components/ProtectedRoute'
import ConfirmEmail from "./components/ConfirmMail"
import Buy from "./components/Buy"
import RestPassword from "./components/sign-in/RestPassword"
import UserSettings from "./components/userSettings"
import PoliciesPage from "./components/Policy"
import PayHerePaymentPage from "./components/PayHere"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
                <Home />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/confirm_email" element={<ConfirmEmail />} />
          <Route path="/reset_password" element={<RestPassword />} />
          <Route path="/policy" element={<PoliciesPage />} />
          <Route path="/buy" element={
            <ProtectedRoute>
              <Buy />
              </ProtectedRoute>
            }></Route>
          <Route path="/settings" element={
            <ProtectedRoute>
              <UserSettings />
              </ProtectedRoute>
            }></Route>
          <Route path="*" element={
            <ProtectedRoute>
              <Notfount />
              </ProtectedRoute>
            }></Route>
            <Route path="/pay" element={
            <ProtectedRoute>
              <PayHerePaymentPage />
              </ProtectedRoute>
            }></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
