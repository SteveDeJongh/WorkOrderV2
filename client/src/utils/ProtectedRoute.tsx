import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { RoleTypes } from "../types/users";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  role: RoleTypes;
};

function ProtectedRoute({ role }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("User from protectedRoute", user);

  if (!user) {
    console.error("No user signed in.");
    return <Navigate to="/login" replace />;
  }

  if (!user.roles?.includes(role as RoleTypes)) {
    console.error("User doesn't have that role.");
    return <Navigate to={navigate(-1)} />;
  }

  return <Outlet />;
}

export { ProtectedRoute };
