import {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  PropsWithChildren,
} from "react";
import {
  getUserByToken,
  createSession,
  destroySession,
} from "../services/userServices";

import { User } from "../types/users";

interface AuthContext {
  user?: User;
  loginSuccess: (user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext>({
  loginSuccess: () => null,
  logout: () => Promise.resolve(),
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
        setUser(response.data);
      } catch (error) {
        setUser(undefined);
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const loginSuccess = (user: User) => {
    setUser({
      ...user,
      views: {
        customers: null,
        products: null,
        invoices: null,
      },
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

  const contextValue: AuthContext = {
    user,
    loginSuccess,
    logout,
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
