import { Link, useNavigate } from "react-router-dom";
import { destroySession } from "../services/userServices";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import UserContext from "../contexts/user-context";

function UserNav() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  const { mutate: logOut } = useMutation({
    mutationFn: () => {
      let token = localStorage.getItem("authToken");
      localStorage.removeItem("authToken");

      console.log("Logging out...");
      return destroySession(token);
    },
    onSuccess: (response) => {
      console.log(response);
      console.log("Logged out!");
      setUser(null);
      navigate(`/`);
    },
    onError: (error) => {
      console.log("An Error occured logging out:", error.status);
      navigate("/");
    },
  });

  return (
    <ul className="user-nav">
      {user && (
        <>
          <Link to="/profile">
            <li>My Profile</li>
          </Link>
          <Link>
            <li onClick={() => logOut()}>Sign Out</li>
          </Link>
          {user.roles.includes("admin") && ( // Eventually turn this into a link to an admin panel?
            <li>
              <Link to="/signup">Create Account</Link>
            </li>
          )}
        </>
      )}
      {!user && (
        <>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default UserNav;
