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

type ViewTypes = "profile" | "table";

type RoleTypes = "user" | "manager" | "admin";

type UserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export { RoleTypes, User, UserContext, ViewTypes }