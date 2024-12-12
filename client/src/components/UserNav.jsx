import { Link, useNavigate } from "react-router-dom";
import { destroySession } from "../services/userServices";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { CapitalizeFullName } from "../utils";
import { useUserContext } from "../contexts/user-context";

function UserNav() {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [isActive, setActive] = useState(false);
  const menuRef = useRef();

  const { mutate: logOut } = useMutation({
    mutationFn: () => {
      let token = localStorage.getItem("authToken");
      setActive(!isActive);
      console.log("Logging out...");
      return destroySession(token);
    },
    onSuccess: () => {
      localStorage.removeItem("authToken");
      console.log("Logged out!");
      setUser(null);
      navigate(`/`);
    },
    onError: (error) => {
      console.log("An Error occured logging out:", error.status);
      navigate("/");
    },
  });

  useEffect(() => {
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        const parentClassName = e.target.parentElement.className;
        if (
          parentClassName.includes("ham-menu") ||
          parentClassName.includes("header-right")
        ) {
          return;
        }
        setActive(false);
      }
    }

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      {!user && (
        <>
          <ul>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
          </ul>
        </>
      )}
      {user && (
        <>
          <div className="hello-tag">
            <p>Signed in as: {CapitalizeFullName(user.name)}</p>
          </div>
          <div
            className={isActive ? "ham-menu active" : "ham-menu"}
            onClick={() => setActive(!isActive)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            ref={menuRef}
            className={!isActive ? "off-screen-menu" : "off-screen-menu active"}
          >
            <ul className="user-nav-list">
              {user && (
                <>
                  <Link to="/profile" onClick={() => setActive(!isActive)}>
                    <li>My Profile</li>
                  </Link>
                  {user.roles.includes("admin") && ( // Eventually turn this into a link to an admin panel?
                    <Link to="/signup" onClick={() => setActive(!isActive)}>
                      <li>Create Account</li>
                    </Link>
                  )}
                  <Link>
                    <li onClick={() => logOut()}>Sign Out</li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default UserNav;
