import { RouterProvider } from "react-router-dom";
import "./whitespace-resets.css";
import "./App.css";
import { useEffect, useState } from "react";
import { interceptor } from "./interceptors/interceptor";
import { router } from "./navigation/Navigation";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function App() {
  const [intercept, _] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    if (intercept) {
      interceptor();
    }
  }, [intercept]);

  // Investigating how to handle auth removal from interceptor.
  useEffect(() => {
    window.addEventListener("authChange", storageChange);

    function storageChange() {
      console.log("There was a change to our authToken.");
      if (!localStorage.getItem("authToken")) {
        console.log("We no longer have a token, removing user.");
        logout();
        window.location.assign("/");
      }
    }

    return () => {
      window.removeEventListener("authChange", storageChange);
    };
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
