import { useNavigate } from "react-router-dom";
import { editUser, getUserByToken } from "../../services/userServices";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUserContext } from "../../contexts/user-context";
import UserForm from "./UserForm";
import { NestedUser } from "../../types/users";

function EditProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  const {
    data: userData,
    isError: mainError,
    isPending: mainLoading,
  } = useQuery({
    queryKey: ["editProfile", user!.id],
    queryFn: async () => {
      let response = await getUserByToken(
        localStorage.getItem("authToken") as string
      );
      return response.data;
    },
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (rawData) => {
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
      return editUser(content as NestedUser);
    },
    onSuccess: (response) => {
      console.log("User edited!");
      user?.views
        ? (response.data["views"] = user.views)
        : { customers: null, products: null, invoices: null };
      setUser(response.data); // maybe don't need this if checking for user auth every time?
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
            {mainLoading && <p>Information loading...</p>}
            {mainError && <p>An error occured.</p>}
            {!mainLoading && !mainError && userData && (
              <>
                <UserForm
                  userData={userData}
                  headerText={"Edit User"}
                  onSubmit={mutate}
                  buttonText={"Save"}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
