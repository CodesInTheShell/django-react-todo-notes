import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home" // requires authentication
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"  // wrapper compoent for all protected pages
import Profile from "./pages/Profile";
import Todo from "./pages/Todo";





function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/todo" element={<Todo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
