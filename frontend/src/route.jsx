import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Tasks from "./Tasks";
import Login from "./login";
import Signup from "./SIgnup";


// Protected route that blocks access if no user is in localStorage
function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("user"); // simple check
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
