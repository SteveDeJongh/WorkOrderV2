import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/userServices";
import { PageTitle } from "../PageTitle";
import { UserResponse } from "../../types/users";
import { UserForm } from "./UserForm";
import { TUserForm } from "../../types/users";
import { useAuth } from "../../contexts/AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();

  const { mutate: signUp } = useMutation({
    mutationFn: (user: TUserForm) => {
      return createUser(user);
    },
    onSuccess: (response: UserResponse) => {
      loginSuccess(response.data);
      navigate(`/`);
    },
    onError: (error) => {
      console.error("An Error occured creating the user:", error);
      navigate("/signup");
    },
  });

  const onSubmit = (user: TUserForm) => {
    signUp(user);
  };

  return (
    <>
      <PageTitle title="Sign Up" />
      <div id="panes">
        <div className="pane pane-full">
          <div className="pane-inner">
            <UserForm
              headerText="Create New User"
              onSubmit={onSubmit}
              buttonText={"Create User"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export { SignUp };
