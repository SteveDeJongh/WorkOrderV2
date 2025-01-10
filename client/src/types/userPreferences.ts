import { ViewTypes } from "./users";

type UserPreferences = {
  user_id: number;
  view_customers: ViewTypes;
  view_products: ViewTypes;
  view_invoices: ViewTypes;
  theme: string;
  created_at: string;
  updated_at: string;
}

type UserPreference<T> = {
  [key in keyof T]?: T[key];
}

type NestedPreference = {
  userPreference: UserPreference<UserPreferences>;
}

export { NestedPreference, UserPreference, UserPreferences }