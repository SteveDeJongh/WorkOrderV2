import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CapitalizeFullName } from "../utils";
import { useAuth } from "../contexts/AuthContext";

function UserNav() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isActive, setActive] = useState(false);
  const menuRef = useRef();

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
  }, [menuRef, setActive]);

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
                    <li onClick={() => logout()}>Sign Out</li>
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

export { UserNav };
