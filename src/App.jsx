import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const navigate = useNavigate();
  function ProtectedRoute(isAuthenticeted, children) {
    if (!isAuthenticeted) {
      navigate("/login");
    }
    return children;
  }
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticeted={true}>
              <Home></Home>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;