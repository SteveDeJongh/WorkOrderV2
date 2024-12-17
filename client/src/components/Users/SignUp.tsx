import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/userServices";
import { useUserContext } from "../../contexts/user-context";
import PageTitle from "../PageTitle";
import Button from "../../multiuse/Button";
import { NestedUser, UserResponse } from "../../types/users";

function SignUp() {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConf: "",
      roles: [],
    },
  });

  const {
    mutate: onSubmit,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (rawData: NestedUser) => {
      console.log(rawData);
      const allowed = ["email", "password", "name", "roles"];
      let content = { user: {} };

      Object.keys(rawData)
        .filter((key) => allowed.includes(key))
        .forEach((key) => {
          content["user"][key] = rawData[key];
        });

      console.log("Creating user...");
      return createUser(content as NestedUser);
    },
    onSuccess: (response: UserResponse) => {
      console.log("User created!");
      response.data["views"] = {
        customers: null,
        products: null,
        invoices: null,
      }; // To eventually come direct from API user call.
      setUser(response.data); // maybe don't need this if checking for user auth every time?
      navigate(`/`);
    },
    onError: (error) => {
      console.log("An Error occured creating the user:", error);
      navigate("/signup");
    },
  });

  return (
    <>
      <PageTitle title="Sign Up" />
      <div id="panes">
        <div className="pane pane-full">
          <div className="main-pane-header">
            <div className="main-pane-header-title">
              <h2>Create New User</h2>
              <div className="main-pane-form-actions">
                <Button onClick={() => navigate("/")} text={"Cancel"} />
                <Button
                  form="main-pane-content"
                  disabled={isSubmitting}
                  type="submit"
                  text={"Create User"}
                />
              </div>
            </div>
          </div>
          <form
            id="main-pane-content"
            className="main-pane-content"
            onSubmit={handleSubmit(onSubmit)}
          >
            {isError && (
              <>
                <h3>Unable to Create User.</h3>
              </>
            )}
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
