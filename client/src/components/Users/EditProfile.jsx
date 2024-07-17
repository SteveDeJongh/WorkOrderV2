import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { editUser, getUserByToken } from "../../services/userServices";
import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import UserContext from "../../contexts/user-context";
import UserForm from "./UserForm";

function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   watch,
  // } = useForm({
  //   defaultValues: { roles: [] },
  // });

  const {
    data: userData,
    isError: mainError,
    isPEnding: mainLoading,
  } = useQuery({
    queryKey: ["editProfile", user.id],
    queryFn: () => getUserByToken(localStorage.getItem("authToken")),
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (rawData) => {
      console.log(rawData);
      const allowed = [
        "email",
        "password",
        "name",
        "roles",
        "current_password",
      ];
      let content = { user: {} };

      Object.keys(rawData)
        .filter((key) => allowed.includes(key))
        .forEach((key) => {
          content["user"][key] = rawData[key];
        });

      console.log("Editing user...");
      return editUser(content);
    },
    onSuccess: (response) => {
      console.log("User edited!");
      setUser(response.data); // maybe don't need this if checking for user auth every time?
      navigate("/profile");
    },
    onError: (error) => {
      console.log("An Error occured editing the user:", error);
    },
  });

  return (
    <>
      <div className="pane-inner">
        {mainLoading && <p>Information loading...</p>}
        {mainError && <p>An error occured.</p>}
        {!mainLoading && !mainError && userData && (
          <>
            <UserForm
              user={userData.data}
              headerText={"Edit User"}
              onSubmit={mutate}
              buttonText={"Save"}
            />
          </>
        )}
      </div>
    </>
  );
}

export default EditProfile;
