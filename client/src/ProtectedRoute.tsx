import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Correct import

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth(); // Access user directly via the useAuth hook

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return <>{children}</>; // Return children (protected content) if authenticated
};

export default ProtectedRoute;
