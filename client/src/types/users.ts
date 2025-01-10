import { UserPreferences } from "./userPreferences";

type User = {
    id: number;
    email: string;
    created_at: string;
    name: string;
    roles: Array<RoleTypes>;
    created_date: string;
    preferences: UserPreferences;
}

type NestedUser = {
  user: User; 
}

type NestedSignInUser = {
  user: SignInUser;
}

type ViewTypes = "profile" | "table";

type RoleTypes = "user" | "manager" | "admin";

type UserResponse = {
  status: StatusResponse;
  data: User;
}

type StatusResponse = {
  code: number;
  message: string;
}

type SignInUser = {
  email: string;
  password: string;
};

type UserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export { NestedUser, NestedSignInUser, UserResponse, SignInUser, RoleTypes, User, UserContext, ViewTypes }