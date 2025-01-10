import { useNavigate } from "react-router-dom";
import { editUser } from "../../services/userServices";
import { useMutation } from "@tanstack/react-query";
import { UserForm, TUserForm } from "./UserForm";
import { useAuth } from "../../contexts/AuthContext";

function EditProfile() {
  const navigate = useNavigate();
  const { user, loginSuccess } = useAuth();

  const { mutate } = useMutation({
    mutationFn: (userData: TUserForm) => {
      console.log("In mutate");
      console.log("userData", userData);
      return editUser(userData);
    },
    onSuccess: (response) => {
      loginSuccess(response.data);
      navigate("/profile");
    },
    onError: (error) => {
      console.log("An Error occured editing the user:", error);
    },
  });

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
            />
          </div>
        </div>
      </div>
    </>
  );
}

export { EditProfile };
