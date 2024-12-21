type User = {
    id: number;
    email: string;
    created_at: string;
    name: string;
    roles: Array<RoleTypes>;
    created_date: string;
    views?: {
      customers: ViewTypes;
      products: ViewTypes;
      invoices: ViewTypes;
    };
}

type NestedUser = {
  user: User; 
}

type NestedSignInUser = {
  user: SignInUser;
}

type ViewTypes = "profile" | "table" | null;

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
  pass: string;
};

type UserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export { NestedUser, NestedSignInUser, UserResponse, SignInUser, RoleTypes, User, UserContext, ViewTypes }