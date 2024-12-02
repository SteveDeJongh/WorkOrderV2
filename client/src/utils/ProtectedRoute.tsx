import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import UserContext from "../contexts/user-context";

type Props = {
  role: string;
};

function ProtectedRoute({ role }: Props) {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  console.log("User from protectedRoute", user);

  if (!user) {
    console.log("Don't have a user");
    return <Navigate to="/login" replace />;
  }

  if (!user.roles?.includes(role)) {
    console.log("Don't have that role!");
    return <Navigate to={navigate(-1)} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
