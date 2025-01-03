import { Outlet, useNavigate } from "react-router-dom";
import { RoleTypes } from "../types/users";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

type Props = {
  role: RoleTypes;
};

function ProtectedRoute({ role }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.log("User in hook", user);
    if (!user) {
      navigate("/login");
      return;
    }

    if (user && !user.roles?.includes(role as RoleTypes)) {
      navigate(-1);
      return;
    }
  });

  return <Outlet />;
}

export { ProtectedRoute };
