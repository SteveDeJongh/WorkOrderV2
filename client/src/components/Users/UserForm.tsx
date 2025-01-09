import { useForm } from "react-hook-form";
import { Button } from "../multiuse/Button";
import { User, RoleTypes } from "../../types/users";
import { useNavigate } from "react-router-dom";

type Props = {
  modalForm?: boolean;
  user?: User;
  headerText: string;
  onSubmit: (user: TUserForm) => void;
  buttonText: string;
};

export type TUserForm = {
  name: string;
  email: string;
  roles: [RoleTypes];
  password: string;
  password_confirmation?: string;
  currentPassword?: string;
};

function UserForm({
  modalForm,
  user,
  headerText,
  onSubmit,
  buttonText,
}: Props) {
  const navigate = useNavigate();

  // Working on adding resolver to UserForm.

  // const resolver: Resolver<FormValues> = async (values) => {
  //   return {
  //     values: values.name ? values : {},
  //     errors: !values.name
  //       ? {
  //           name: {
  //             type: "required",
  //             message: "This is required.",
  //           },
  //         }
  //       : {},
  //   };
  // };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<TUserForm>({
    defaultValues: user
      ? { name: user.name, email: user.email, roles: user.roles }
      : { roles: ["user"] },
  });

  return (
    <>
      <div className="main-pane-header">
        <div className="main-pane-header-title">
          <h2>{headerText}</h2>
          <div className="main-pane-form-actions">
            <Button onClick={() => navigate(`/`)} text={"Cancel"} />
            <Button
              form="main-pane-content"
              disabled={isSubmitting}
              type="submit"
              text={buttonText}
            />
          </div>
        </div>
      </div>
      <form
        id="main-pane-content"
        className="main-pane-content"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="panel">
          <h3>User Details</h3>
          <div className="panel-contents">
            <div className="panel-contents-section">
              <div className="formPair half">
                <label htmlFor="name">Name:</label>
                <input
                  {...register("name", {
                    required: "name is required.",
                  })}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                />
                {errors.name && <p>{`${errors.name.message}`}</p>}
              </div>
              <div className="formPair half">
                <label htmlFor="email">Email:</label>
                <input
                  {...register("email", {
                    required: "Email is required.",
                  })}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
                {errors.email && <p>{`${errors.email.message}`}</p>}
              </div>
            </div>
            {user && (
              <div className="formPair half">
                <label htmlFor="current_password">current_password:</label>
                <input
                  {...register("currentPassword", {
                    validate: {
                      required: (value) => {
                        if (user) {
                          if (!value) {
                            return "Current password is required.";
                          }
                          return true;
                        }
                        return true;
                      },
                    },
                  })}
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder=""
                />
                {errors.currentPassword && (
                  <p>{`${errors.currentPassword.message}`}</p>
                )}
              </div>
            )}
            {/* No Password changes via edit profile page. */}
            {!user && (
              <div className="panel-contents-section">
                <div className="formPair half">
                  <label htmlFor="password">Password:</label>
                  <input
                    {...register("password", {
                      validate: {
                        required: (value) => {
                          if (!user) {
                            if (!value) {
                              return "Password is required.";
                            }
                            return true;
                          }
                          return true;
                        },
                      },
                    })}
                    type="password"
                    id="password"
                    name="password"
                    placeholder=""
                  />
                  {errors.password && <p>{`${errors.password.message}`}</p>}
                </div>
                <div className="formPair half">
                  <label htmlFor="password_confirmation">
                    Confirm Password:
                  </label>
                  <input
                    {...register("password_confirmation", {
                      validate: {
                        required: (value) => {
                          if (!user) {
                            if (watch("password") != value) {
                              return "Passwords must match.";
                            }
                            return true;
                          }
                          return true;
                        },
                      },
                    })}
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    placeholder=""
                  />
                  {errors.password_confirmation && (
                    <p>{`${errors.password_confirmation.message}`}</p>
                  )}
                </div>
              </div>
            )}
            <div className="panel-contents-section">
              <div className="formList">
                <h3>Roles:</h3>
                <div className="formPair">
                  <input {...register("roles")} type="checkbox" value="user" />
                  <label htmlFor="user">User</label>
                  {errors.roles && <p>{`${errors.roles.message}`}</p>}
                </div>
                <div className="formPair">
                  <input
                    {...register("roles")}
                    type="checkbox"
                    value="manager"
                  />
                  <label htmlFor="manager">Manager</label>
                  {errors.roles && <p>{`${errors.roles.message}`}</p>}
                </div>
                {user && user.roles?.includes("admin") && (
                  <div className="formPair">
                    <input
                      {...register("roles")}
                      type="checkbox"
                      value="admin"
                    />
                    <label htmlFor="admin">Admin</label>
                    {errors.roles && <p>{`${errors.roles.message}`}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export { UserForm };
