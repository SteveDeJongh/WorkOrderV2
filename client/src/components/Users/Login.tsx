import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createSession } from "../../services/userServices";
import { useUserContext } from "../../contexts/user-context";
import PageTitle from "../PageTitle";
import LoadingModal from "../multiuse/LoadingModal";
import Button from "../multiuse/Button";
import { NestedSignInUser, SignInUser, UserResponse } from "../../types/users";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    // If we already have a user, redirect back to previous page.
    if (user) {
      navigate(-1);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    mutate: onSubmit,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (rawData: SignInUser) => {
      const allowed = ["email", "password"];
      let content: NestedSignInUser = { user: { email: "", pass: "" } };

      Object.keys(rawData)
        .filter((key) => allowed.includes(key))
        .forEach((key) => {
          content["user"][key as keyof SignInUser] =
            rawData[key as keyof SignInUser];
        });

      console.log("Logging in...");
      return createSession(content);
    },
    onSuccess: (response: UserResponse) => {
      console.log("Logged in!");
      setUser(response.data);
      navigate(`/`);
    },
    onError: (error: UserResponse) => {
      console.error("An Error occured logging in:", error.status);
      navigate("/Login");
    },
  });

  return (
    <>
      <PageTitle title="Sign In" />
      <div id="panes">
        <div className="pane pane-full">
          <div className="main-pane-header">
            <div className="main-pane-header-title">
              <h2>Sign In</h2>
              <div className="main-pane-form-actions">
                <Button
                  onClick={() => navigate("/")}
                  text="Cancel"
                  className={""}
                />
                <Button
                  form={"main-pane-content"}
                  disabled={isPending}
                  type="submit"
                  text={"Sign In"}
                />
              </div>
            </div>
          </div>
          {isPending && <LoadingModal text={"Signing in..."} />}
          <form
            id="main-pane-content"
            className="main-pane-content"
            onSubmit={handleSubmit(onSubmit)}
          >
            {isError && (
              <>
                <h3>Unable to log in.</h3>
                <p>Username or password is incorrect.</p>
              </>
            )}
            <div className="panel">
              <h3>User Details</h3>
              <div className="panel-contents-section">
                <div className="formPair half">
                  <label htmlFor="email">Email:</label>
                  <input
                    {...register("email", {
                      required: "Email is required.",
                    })}
                    type="text"
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                  />
                  {errors.email && <p>{`${errors.email.message}`}</p>}
                </div>
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
