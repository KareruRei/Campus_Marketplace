import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    // Logged in but not admin
    return <Navigate to="/marketplace" replace />;
  }

  return children;
};