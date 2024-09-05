type User = {
    id: number;
    email: string;
    created_at: string;
    name: string;
    roles: Array<roleTypes>;
    created_date: string;
}

type roleTypes = "user" | "manager" | "admin";

export { User }