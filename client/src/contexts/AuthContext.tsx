import {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  PropsWithChildren,
} from "react";
import { getUserByToken, destroySession } from "../services/userServices";

import { User, TUserResponse } from "../types/users";
import {
  UserPreferences,
  UserPreferencesResponse,
} from "../types/userPreferences";

interface AuthContext {
  setToken: (token: string) => void;
  user?: User;
  loginSuccess: (user: TUserResponse) => void;
  logout: () => Promise<void>;
  updateUserPreferences: (preferences: UserPreferencesResponse) => void;
}

const AuthContext = createContext<AuthContext>({
  setToken: () => null,
  loginSuccess: () => null,
  logout: () => Promise.resolve(),
  updateUserPreferences: () => null,
});

function parsePreferences(p: UserPreferencesResponse): UserPreferences {
  let preferences: UserPreferences = {
    ...p,
    customer_columns: JSON.parse(p.customer_columns),
    invoice_columns: JSON.parse(p.invoice_columns),
    product_columns: JSON.parse(p.product_columns),
  };

  return preferences;
}

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

  const loginSuccess = (user: TUserResponse) => {
    const preferences = parsePreferences(user.preferences);

    let tempUser: User = {
      ...user,
      preferences,
    };

    setUser({
      ...tempUser,
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

  const updateUserPreferences = (p: UserPreferencesResponse) => {
    const preferences = parsePreferences(p);

    setUser({
      ...user!,
      preferences,
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
