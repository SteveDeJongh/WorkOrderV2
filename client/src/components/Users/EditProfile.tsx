import { useNavigate } from "react-router-dom";
import { editUser } from "../../services/userServices";
import { useMutation } from "@tanstack/react-query";
import { UserForm } from "./UserForm";
import { TUserForm, UserErrorData, UserResponse } from "../../types/users";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

function EditProfile() {
  const navigate = useNavigate();
  const { user, loginSuccess } = useAuth();
  const [errorMessage, setErrorMessage] = useState<UserErrorData>();

  const { mutate } = useMutation({
    mutationFn: (userData: TUserForm) => {
      setErrorMessage(undefined);
      return editUser(userData);
    },
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (error) => {
      console.error("An Error occured editing the user:", error);
    },
  });

  function handleSuccess(response: UserResponse) {
    if (response.status.code === 200) {
      loginSuccess(response.data);
      navigate("/profile");
    } else {
      setErrorMessage({
        message: response.status.message,
        error: response.status.error,
      });
    }
  }

  return (
    <>
      <div id="panes">
        <div className="pane pane-full">
          <div className="pane-inner">
            <UserForm
              user={user}
              headerText={"Edit User"}
              onSubmit={mutate}
              buttonText={"Save"}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export { EditProfile };
