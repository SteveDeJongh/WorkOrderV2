import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createSession } from "../../services/userServices";
import { PageTitle } from "../PageTitle";
import { LoadingModal } from "../multiuse/LoadingModal";
import { Button } from "../multiuse/Button";
import { SignInUser, UserResponse } from "../../types/users";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setToken, user, loginSuccess } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>();

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
  } = useForm<SignInUser>();

  const {
    mutate: login,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (loginData: SignInUser) => {
      setErrorMessage(undefined);
      return createSession({ user: loginData });
    },
    onSuccess: ({ r: response, token }: { r: UserResponse; token: string }) => {
      handleSuccess(response, token);
    },
    onError: (error) => {
      console.error("An Error occured logging in:", error);
      navigate("/Login");
    },
  });

  const onSubmit = (loginData: SignInUser) => {
    login(loginData);
  };

  function handleSuccess(response: UserResponse, token: string) {
    if (response.status.code === 200) {
      let trimmedResponse = { ...response.data, ...response.status };
      loginSuccess(trimmedResponse);
      setToken(token);
      navigate("/");
    } else {
      setErrorMessage(response.status.message);
    }
  }

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
            {isError ||
              (errorMessage && (
                <>
                  <div className="panel">
                    <h2>Unable to log in.</h2>
                    {errorMessage && <p>Error: {errorMessage}</p>}
                    {!errorMessage && <p>An error occured signing in.</p>}
                  </div>
                </>
              ))}
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

export { Login };
