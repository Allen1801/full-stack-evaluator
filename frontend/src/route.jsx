import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Tasks from "./Tasks";
import Login from "./login";

// Simple "protected route" example
function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("user"); // simple check
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
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
