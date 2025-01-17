import { useForm } from "react-hook-form";
import { Button } from "../multiuse/Button";
import { User, ZUserForm, TUserForm, UserErrorData } from "../../types/users";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/AuthContext";

type Props = {
  user?: User;
  headerText: string;
  onSubmit: (user: TUserForm) => void;
  buttonText: string;
  errorMessage?: UserErrorData;
};

function UserForm({
  user,
  headerText,
  onSubmit,
  buttonText,
  errorMessage,
}: Props) {
  const navigate = useNavigate();
  const { user: SignedInUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUserForm>({
    defaultValues: user
      ? { name: user.name, email: user.email, roles: user.roles }
      : { roles: ["user"] },
    resolver: zodResolver(ZUserForm),
    shouldUnregister: true,
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
        {errorMessage && (
          <div className="panel">
            <h2>{errorMessage.message}</h2>
            <p>{errorMessage.error}</p>
          </div>
        )}
        <div className="panel">
          <h3>User Details</h3>
          <div className="panel-contents">
            <div className="panel-contents-section">
              <div className="formPair half">
                <label htmlFor="name">Name:</label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  placeholder="Your Name"
                />
                {errors.name && <p>{`${errors.name.message}`}</p>}
              </div>
              <div className="formPair half">
                <label htmlFor="email">Email:</label>
                <input
                  {...register("email")}
                  type="text"
                  id="email"
                  placeholder="Email"
                />
                {errors.email && <p>{`${errors.email.message}`}</p>}
              </div>
            </div>
            {user && (
              <div className="formPair half">
                <label htmlFor="current_password">current_password:</label>
                <input
                  {...register("current_password")}
                  type="password"
                  id="current_password"
                  placeholder=""
                />
                {errors.current_password && (
                  <p>{`${errors.current_password.message}`}</p>
                )}
              </div>
            )}
            {/* No Password changes via edit profile page. */}
            {!user && (
              <div className="panel-contents-section">
                <div className="formPair half">
                  <label htmlFor="password">Password:</label>
                  <input
                    {...register("password")}
                    type="password"
                    id="password"
                  />
                  {errors.password && <p>{`${errors.password.message}`}</p>}
                </div>
                <div className="formPair half">
                  <label htmlFor="password_confirmation">
                    Confirm Password:
                  </label>
                  <input
                    {...register("password_confirmation")}
                    type="password"
                    id="password_confirmation"
                  />
                  {errors.password_confirmation && (
                    <p>{`${errors.password_confirmation.message}`}</p>
                  )}
                </div>
              </div>
            )}
            {SignedInUser && SignedInUser.roles?.includes("admin") && (
              <div className="panel-contents-section">
                <div className="formList">
                  <h3>Roles:</h3>
                  <div className="formPair">
                    <input
                      {...register("roles")}
                      type="checkbox"
                      value="user"
                    />
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
                  <div className="formPair">
                    <input
                      {...register("roles")}
                      type="checkbox"
                      value="admin"
                    />
                    <label htmlFor="admin">Admin</label>
                    {errors.roles && <p>{`${errors.roles.message}`}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export { UserForm };
