import { RouterProvider } from "react-router-dom";
import "./whitespace-resets.css";
import "./App.css";
import { useEffect, useState } from "react";
import { UserContext } from "./contexts/user-context";
import { getUserByToken } from "./services/userServices";
import { User } from "./types/users";
import { interceptor } from "./interceptors/interceptor";
import { router } from "./navigation/navigation";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [intercept, _] = useState(true);

  useEffect(() => {
    if (intercept) {
      // Loads interceptor if state is set to true.
      interceptor();
    }
  }, [intercept]);

  useEffect(() => {
    async function checkActiveUser() {
      let token = localStorage.getItem("authToken");

      if (token) {
        console.log("We have a token.");
        try {
          const response = await getUserByToken(token);
          console.log(response.status);
          if (response.status.code === 204) {
            console.log("Sorry, that token expired.");
            localStorage.removeItem("authToken");
            window.dispatchEvent(new Event("storage"));
          } else {
            console.log("That's still a valid token, checking if user is set.");
            if (!user) {
              console.log("We didn't have a set user, setting it now");
              response.data["views"] = {
                customers: null,
                products: null,
                invoices: null,
              }; // To eventually come direct from API user call.
              setUser(response.data);
            }
          }
        } catch (e) {
          console.log("An error occured checking the token: ", e);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    checkActiveUser();
  }, []);

  useEffect(() => {
    window.addEventListener("authChange", storageChange);

    function storageChange() {
      console.log("There was a change to our authToken.");
      if (!localStorage.getItem("authToken")) {
        console.log("We no longer have a token, removing user.");
        setUser(null);
      }
    }

    return () => {
      window.removeEventListener("authChange", storageChange);
    };
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
