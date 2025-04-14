import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />; // Redirect to Home/Login if no token
  }

  return children;
};

export default ProtectedRoute;
// This component checks if a token exists in localStorage. If it doesn't, it redirects the user to the home page (or login page). If the token exists, it renders the children components passed to it. This is useful for protecting routes that require authentication.