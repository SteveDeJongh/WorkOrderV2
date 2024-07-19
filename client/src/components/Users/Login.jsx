import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createSession } from "../../services/userServices";
import { useContext } from "react";
import UserContext from "../../contexts/user-context";
import PageTitle from "../PageTitle";
import LoadingModal from "../../multiuse/LoadingModal";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

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
    mutationFn: (rawData) => {
      const allowed = ["email", "password"];
      let content = { user: {} };

      Object.keys(rawData)
        .filter((key) => allowed.includes(key))
        .forEach((key) => {
          content["user"][key] = rawData[key];
        });

      console.log("Logging in...");
      return createSession(content);
    },
    onSuccess: (response) => {
      console.log("Logged in!");
      setUser(response.data);
      navigate(`/`);
    },
    onError: (error) => {
      console.log("An Error occured logging in:", error.status);
      navigate("/Login");
    },
  });

  // let isPending = true;
  // let isError = false;
  // function onSubmit() {
  //   return "beep";
  // }

  return (
    <>
      <PageTitle title="Sign In" />
      <div id="main-pane-header">
        <div id="main-pane-header-title">
          <h2>Sign In</h2>
          <div className="main-pane-form-actions">
            <button>
              <Link to={`/`}>Cancel</Link>
            </button>
            <button form="main-pane-content" disabled={isPending} type="submit">
              Sign In
            </button>
          </div>
        </div>
      </div>
      {isPending && <LoadingModal text={"Signing in..."} />}
      <form id="main-pane-content" onSubmit={handleSubmit(onSubmit)}>
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
    </>
  );
}

export default Login;
