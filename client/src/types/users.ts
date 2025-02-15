import { z } from "zod";
import { ZUserPreferences, UserPreferencesResponse, ZUserPreferencesResponse } from "./userPreferences";

const ZRoleTypes = z.union([z.literal("user"), z.literal("manager"), z.literal("admin")]);

const ZUserForm = z.object({
  email: z.string().email(),
  name: z.string(),
  roles: ZRoleTypes.array(),
  current_password: z.string().optional(),
  password: z.string().optional(),
  password_confirmation: z.string().optional(),
})
.superRefine(({ password, password_confirmation, current_password }, ctx) => {
  // Edit user validations.
  if (!password && !password_confirmation && current_password === "") {
    if (current_password === "") {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["current_password"],
        message: 'Current password is required to update account.',
      });
    }
  }
  // New user validations.
  if (!current_password) {
    if (password !== password_confirmation) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password_confirmation"],
        message: 'Password fields must match.',
      })
    } else if (password === "" && password_confirmation === ""){
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password_confirmation"],
        message: 'Password fields are required.',
      })
    } else if (password!.length < 8) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password_confirmation"],
        message: 'Password must be 8 characters or more.',
      })
    } 
  };

  return ctx;
});
  
type TUserForm = z.infer<typeof ZUserForm>

const ZUser = z.object({
  email: z.string().email(),
  created_at: z.string(),
  name: z.string(),
  roles: ZRoleTypes.array(),
  created_date: z.string(),
  preferences: ZUserPreferences,
})

const ZUserResponse = z.object({
  id: z.number(),
  email: z.string().email(),
  created_at: z.string(),
  name: z.string(),
  roles: ZRoleTypes.array(),
  created_date: z.string(),
  preferences: ZUserPreferencesResponse,
})

type TUserResponse = z.infer<typeof ZUserResponse>

const ZUserWithID = ZUser.extend({
  id: z.number(),
})

type User = z.infer<typeof ZUserWithID>;

type NestedUser = {
  user: User; 
}

type NestedSignInUser = {
  user: SignInUser;
}

type RoleTypes = z.infer<typeof ZRoleTypes>

type UserResponse = {
  status: StatusResponse;
  data: TUserResponse;
}

type StatusResponse = UserErrorData & {
  code: number;
}

type UserErrorData = {
  message: string;
  error?: string;
}

type SignInUser = {
  email: string;
  password: string;
};

type UserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export { NestedUser, NestedSignInUser, UserResponse, UserErrorData, SignInUser, TUserForm, TUserResponse, RoleTypes, User, UserContext, ZUserWithID, ZUser, ZUserForm }