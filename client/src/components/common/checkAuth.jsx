import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  // Redirect to login if unauthenticated and not on login or register page
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect to the appropriate page based on the user's role if authenticated and on login page
  if (isAuthenticated && location.pathname.includes("/login")) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Redirect to the appropriate page based on the user's role if authenticated and on register page
  if (isAuthenticated && location.pathname.includes("/register")) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Allow unauthenticated users to access the register page
  if (!isAuthenticated && location.pathname.includes("/register")) {
    return <>{children}</>;
  }

  // Redirect non-admin users trying to access admin page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/shop/home" />;
  }

  // Redirect admin users trying to access shop page
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
