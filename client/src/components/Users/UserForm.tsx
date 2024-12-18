import { useForm } from "react-hook-form";
import Button from "../multiuse/Button";
import { User } from "../../types/users";

type Props = {
  user: User;
  headerText: string;
  onSubmit: Function;
  buttonText: string;
};

function UserForm({ user, headerText, onSubmit, buttonText }: Props) {
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: user
      ? { name: user.name, email: user.email, roles: user.roles }
      : { roles: [] },
  });

  async function onSubmitHandler(data) {
    try {
      onSubmit(data);
    } catch (e) {
      console.log("Error Submitting the form data.", e);
    }
  }

  return (
    <>
      <div id="main-pane-header">
        <div id="main-pane-header-title">
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
      <form id="main-pane-content" onSubmit={handleSubmit(onSubmitHandler)}>
        {/* {isError && (
          <>
            <h3>Unable to Create User.</h3>
          </>
        )} */}
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
                  {...register("current_password", {
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
                  <label htmlFor="passwordConf">Confirm Password:</label>
                  <input
                    {...register("passwordConf", {
                      required: "Password is required.",
                      validate: (value) => {
                        if (watch("password") != value) {
                          return "Passwords must match.";
                        }
                      },
                    })}
                    type="password"
                    id="passwordConf"
                    name="passwordConf"
                    placeholder=""
                  />
                  {errors.passwordConf && (
                    <p>{`${errors.passwordConf.message}`}</p>
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

export default UserForm;
