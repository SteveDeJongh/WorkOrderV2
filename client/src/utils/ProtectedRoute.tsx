import { Outlet, useNavigate } from "react-router-dom";
import { RoleTypes } from "../types/users";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

type Props = {
  role: RoleTypes;
};

function ProtectedRoute({ role }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      console.log("in here?");
      navigate("/login");
      return;
    }

    if (user && !user.roles?.includes(role as RoleTypes)) {
      navigate(-1);
      return;
    }

    setChecked(true);
  });

  if (checked) {
    return <Outlet />;
  }
}

export { ProtectedRoute };
