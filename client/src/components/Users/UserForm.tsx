import { useForm } from "react-hook-form";
import { Button } from "../multiuse/Button";
import { User, RoleTypes } from "../../types/users";
import { useNavigate } from "react-router-dom";

type Props = {
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

function UserForm({ user, headerText, onSubmit, buttonText }: Props) {
  console.log("User in UserForm", user);
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
                    required: "current_password is required.",
                  })}
                  type="password"
                  id="current_password"
                  name="current_password"
                  placeholder=""
                />
                {errors.password && <p>{`${errors.password.message}`}</p>}
              </div>
            )}
            {/* No Password changes via edit profile page. */}
            {!user && (
              <div className="panel-contents-section">
                <div className="formPair half">
                  <label htmlFor="password">Password:</label>
                  <input
                    {...register("password", {
                      required: "Password is required.",
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
                      required: "Password is required.",
                      validate: (value) => {
                        if (watch("password") != value) {
                          return "Passwords must match.";
                        }
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
