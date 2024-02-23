import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const isTokens = localStorage.getItem("tokens");
  const location = useLocation();
  return !!isTokens ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ prevUrl: location.pathname }} />
  );
}
