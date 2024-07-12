import { React, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../contexts/user-context";

function ProtectedRoute() {
  const [user, setUser] = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
