import React from "react";

import { Navigate } from "react-router-dom";

import { useAuthUser } from "./context/AuthUserContextProvider";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthUser();

  console.log("Check user in Private: ", user);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
