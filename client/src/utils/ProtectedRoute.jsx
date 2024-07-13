import { React, useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import UserContext from "../contexts/user-context";

function ProtectedRoute({ role }) {
  const n = useNavigate();
  const [user, setUser] = useContext(UserContext);
  console.log("User from protectedRoute", user);

  if (!user) {
    console.log("Don't have a user");
    return <Navigate to="/login" replace />;
  }

  if (!user.roles?.includes(role)) {
    console.log("Don't have that role!");
    return <Navigate to={n(-1)} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
