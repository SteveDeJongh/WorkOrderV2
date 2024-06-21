import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { destroySession } from "../services/userServices";
import { useMutation } from "@tanstack/react-query";
import UserContext from "../contexts/user-context";

function UserNav() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  const { mutate: logOut } = useMutation({
    mutationFn: () => {
      let token = localStorage.getItem("authToken");

      console.log("Logging out...");
      return destroySession(token);
    },
    onSuccess: (response) => {
      console.log(response);
      console.log("Logged out!");
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
          <li>My Profile</li>
          <li onClick={() => logOut()}>Sign Out</li>
        </>
      )}
      {!user && (
        <li>
          <Link to="/login">Sign In</Link>
          <Link to="/signup">Create Account</Link>
        </li>
      )}
    </ul>
  );
}

export default UserNav;
