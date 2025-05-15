import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authStore } from "../core/store";
import { ROUTES } from "./constants";
import { observer } from "mobx-react-lite";

const PrivateRoute: React.FC = observer(() => {
  const location = useLocation();

  useEffect(() => {
    // Try to restore auth session when mounting private routes
    if (!authStore.isAuth && !authStore.isAuthInProgress) {
      const token = localStorage.getItem("token");
      if (token) {
        authStore.checkAuth().catch(() => {
          // Token is invalid or expired, will redirect to login
        });
      }
    }
  }, []);

  if (authStore.isAuthInProgress) {
    // You might want to show a loading spinner here
    return <div>Loading...</div>;
  }

  if (!authStore.isAuth) {
    // Redirect to login but save the attempted location
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
});

export default PrivateRoute;