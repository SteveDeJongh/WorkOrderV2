import { createContext, useContext, useState, useEffect } from "react";
import {
  getUserByToken,
  createSession,
  destroySession,
} from "../services/userServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      let token = localStorage.getItem("authToken");
      try {
        const response = await getUserByToken(token);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (content) => {
    try {
      const response = await createSession(content);
      response.data["views"] = {}; // To eventually come direct from API user call.
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    let token = localStorage.getItem("authToken");
    try {
      await destroySession(token);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
