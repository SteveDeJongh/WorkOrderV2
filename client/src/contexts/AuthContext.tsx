import {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  PropsWithChildren,
} from "react";
import { getUserByToken, destroySession } from "../services/userServices";

import { User } from "../types/users";
import { UserPreferences } from "../types/userPreferences";

interface AuthContext {
  setToken: (token: string) => null;
  user?: User;
  loginSuccess: (user: User) => void;
  logout: () => Promise<void>;
  updateUserPreferences: (preferences: UserPreferences) => void;
}

const AuthContext = createContext<AuthContext>({
  setToken: () => null,
  loginSuccess: () => null,
  logout: () => Promise.resolve(),
  updateUserPreferences: () => null,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      let token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await getUserByToken(token);
        loginSuccess(response.data);
      } catch (error) {
        setUser(undefined);
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
    return;
  };

  const loginSuccess = (user: User) => {
    setUser({
      ...user,
    });
  };

  const logout = async () => {
    const token = localStorage.getItem("authToken");

    if (!!token) {
      try {
        await destroySession(token);
        localStorage.removeItem("authToken");
      } catch (error) {
        console.error(error);
      }
    }
    setUser(undefined);
  };

  const updateUserPreferences = (preferences: UserPreferences) => {
    setUser({
      ...user!,
      ...preferences,
    });
  };

  const contextValue: AuthContext = {
    setToken,
    user,
    loginSuccess,
    logout,
    updateUserPreferences,
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
