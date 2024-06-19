import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/userServices";

function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const {
    mutate: onSubmit,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (rawData) => {
      const allowed = ["email", "password"];
      let content = { user: {} };

      Object.keys(rawData)
        .filter((key) => allowed.includes(key))
        .forEach((key) => {
          content["user"][key] = rawData[key];
        });

      console.log("Creating user...");
      return createUser(content);
    },
    onSuccess: (newUser) => {
      console.log("User created!");
      console.log(newUser);
      navigate(`/`);
    },
    onError: (error) => {
      console.log("An Error occured creating the user:", error);
      navigate("/signup");
    },
  });

  return (
    <>
      <div id="main-pane-header">
        <div id="main-pane-header-title">
          <h2>Create New User</h2>
          <div className="main-pane-form-actions">
            <button>
              <Link to={`/`}>Cancel</Link>
            </button>
            <button
              form="main-pane-content"
              disabled={isSubmitting}
              type="submit"
            >
              Create User
            </button>
          </div>
        </div>
      </div>
      <form id="main-pane-content" onSubmit={handleSubmit(onSubmit)}>
        <div className="panel">
          <h3>User Details</h3>
          <div className="panel-contents-section">
            <div className="formPair">
              <label htmlFor="email">Email:</label>
              <input
                {...register("email", {
                  required: "Email is required.",
                })}
                type="text"
                id="email"
                name="email"
                placeholder="First Name"
              />
              {errors.userEmail && <p>{`${errors.userEmail.message}`}</p>}
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
            <div className="formPair half">
              <label htmlFor="passwordConf">Confirm Password:</label>
              <input
                {...register("passwordConf", {
                  required: "Password is required.",
                })}
                type="password"
                id="passwordConf"
                name="passwordConf"
                placeholder=""
              />
              {errors.passwordConf && <p>{`${errors.passwordConf.message}`}</p>}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUp;
