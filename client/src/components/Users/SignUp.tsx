import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/userServices";
import { PageTitle } from "../PageTitle";
import { UserForm } from "./UserForm";
import { TUserForm, UserErrorData, UserResponse } from "../../types/users";
import { useState } from "react";

function SignUp() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<UserErrorData>();

  const { mutate } = useMutation({
    mutationFn: (user: TUserForm) => {
      setErrorMessage(undefined);
      return createUser(user);
    },
    onSuccess: ({ r: response }) => {
      handleSuccess(response);
    },
    onError: (error) => {
      console.error("An Error occured creating the user:", error);
      navigate("/signup");
    },
  });

  function handleSuccess(response: UserResponse) {
    if (response.status.code === 200) {
      alert("User created!");
      navigate("/");
    } else {
      setErrorMessage({
        message: response.status.message,
        error: response.status.error,
      });
    }
  }

  return (
    <>
      <PageTitle title="Sign Up" />
      <div id="panes">
        <div className="pane pane-full">
          <div className="pane-inner">
            <UserForm
              headerText="Create New User"
              onSubmit={mutate}
              buttonText={"Create User"}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export { SignUp };
