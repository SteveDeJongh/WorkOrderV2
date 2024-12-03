import { createContext, useContext } from "react";
import { User, UserContext as TUserContext } from "../types/users";

export const UserContext = createContext<TUserContext | null>(null);

export const useUserContext = () => {
  const object = useContext(UserContext);
  if (!object) { throw new Error("useUserContext must be used within a Provider.")}
  return object;
}