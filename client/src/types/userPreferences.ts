import { z } from "zod";

const ZViewTypes = z.union([z.literal("profile"), z.literal('table')]);

type ViewTypes = z.infer<typeof ZViewTypes>

type UserPreferences = {
  user_id: number;
  view_customers: ViewTypes;
  view_products: ViewTypes;
  view_invoices: ViewTypes;
  theme: string;
  created_at: string;
  updated_at: string;
}

const ZUserPreferences = z.object({
  user_id: z.number(),
  view_customers: ZViewTypes,
  view_products: ZViewTypes,
  view_invoices: ZViewTypes,
  theme: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

type UserPreference<T> = {
  [key in keyof T]?: T[key];
}

type NestedPreference = {
  userPreference: UserPreference<UserPreferences>;
}

export { NestedPreference, UserPreference, UserPreferences, ZUserPreferences, ZViewTypes, ViewTypes }