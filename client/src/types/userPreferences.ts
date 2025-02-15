import { z } from "zod";

const ZViewTypes = z.union([z.literal("profile"), z.literal('table')]);

type ViewTypes = z.infer<typeof ZViewTypes>

const ZColumnPreferences = z.object({
  id: z.string(),
  size: z.number(),
  sequence: z.number(),
  display: z.boolean(),
});

type ColumnPreferences = z.infer<typeof ZColumnPreferences>

const ZUserPreferencesResponse = z.object({
  user_id: z.number(),
  view_customers: ZViewTypes,
  view_products: ZViewTypes,
  view_invoices: ZViewTypes,
  theme: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  customer_columns: z.string(),
  product_columns: z.string(),
  invoice_columns: z.string(),
})

type UserPreferencesResponse = z.infer<typeof ZUserPreferencesResponse>

const ZUserPreferences = z.object({
  user_id: z.number(),
  view_customers: ZViewTypes,
  view_products: ZViewTypes,
  view_invoices: ZViewTypes,
  theme: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  customer_columns: z.array(ZColumnPreferences),
  product_columns: z.array(ZColumnPreferences),
  invoice_columns: z.array(ZColumnPreferences),
})

type UserPreferences = z.infer<typeof ZUserPreferences>;

type UserPreference<T> = {
  [key in keyof T]?: T[key];
}

type NestedPreference = {
  userPreference: UserPreference<UserPreferences>;
}

export { NestedPreference, UserPreference, UserPreferencesResponse, UserPreferences, ZUserPreferences, ZUserPreferencesResponse, ZViewTypes, ViewTypes, ColumnPreferences }