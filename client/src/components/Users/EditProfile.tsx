import { useNavigate } from "react-router-dom";
import { editUser } from "../../services/userServices";
import { useMutation } from "@tanstack/react-query";
import { UserForm } from "./UserForm";
import { UserErrorData, UserResponse } from "../../types/users";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

function EditProfile() {
  const navigate = useNavigate();
  const { user, loginSuccess } = useAuth();
  const [errorMessage, setErrorMessage] = useState<UserErrorData>();
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: editUser,
    onMutate: () => {
      setErrorMessage(undefined);
    },
    onSuccess: (response) => {
      handleSuccess(response);
    },
    onError: (error) => {
      console.error("An Error occured editing the user:", error);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const alertTimer = setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

      return () => {
        clearTimeout(alertTimer);
      };
    }
  }, [isSuccess]);

  function handleSuccess(response: UserResponse) {
    if (response.status.code === 200) {
      loginSuccess(response.data);
      setIsSuccess(true);
      navigate("/profile");
    } else {
      console.error("Edit Profile Error:", response.status.message);
      setErrorMessage({
        message: response.status.message,
        error: response.status.error,
      });
    }
  }

  return (
    <UserForm
      user={user}
      headerText={"Edit Profile"}
      onSubmit={mutate}
      buttonText={isPending ? "Saving..." : "Save"}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
    />
  );
}

export { EditProfile };
