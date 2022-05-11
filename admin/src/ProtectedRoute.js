import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/authContext/AuthContext";
import Login from "./pages/login/Login";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return user && <Outlet />;
};

export default ProtectedRoute;
