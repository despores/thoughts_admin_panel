import { Navigate, Outlet, Route } from "react-router-dom";
//import authStore from "./store.js";
import { observer } from "mobx-react-lite";
import React from "react";

const PrivateRoute = () => {

  // if (authStore.isLoadingAuth) {
  //   return <div>Checking auth...</div>;
  // }
  const isAuth = true;
  if (isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default observer(PrivateRoute);