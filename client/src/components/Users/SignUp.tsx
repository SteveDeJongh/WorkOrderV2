import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/userServices";
import { PageTitle } from "../PageTitle";
import { UserForm } from "./UserForm";
import { UserErrorData, UserResponse } from "../../types/users";
import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Card,
  Grid2,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { CustomTabPanel, TabProps } from "./CustomTabPanel";
import placeholder from "../../assets/avatar-placeholder.png";

function SignUp() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<UserErrorData>();
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onMutate: () => {
      setErrorMessage(undefined);
    },
    onSuccess: ({ r: response }) => {
      handleSuccess(response);
    },
    onError: (error) => {
      console.error("An Error occured creating the user:", error);
      setErrorMessage({
        message: "Failed to create user. Please try again.",
        error: error.message,
      });
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
      setIsSuccess(true);
      navigate("/");
    } else {
      setErrorMessage({
        message: response.status.message,
        error: response.status.error,
      });
    }
  }

  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
      <PageTitle title="Create Profile" />
      <Grid2
        container
        direction={{ xs: "column", md: "row" }}
        alignItems={"stretch"}
        spacing={3}
        sx={{
          pt: 3,
          px: { xs: 0, md: 7 },
        }}
      >
        <Grid2 size={{ md: 3 }} sx={{ display: "flex" }}>
          <Card variant="outlined" sx={{ width: "100%" }}>
            <Grid2
              container
              direction="column"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid2 textAlign={"center"} py={3}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <PhotoCameraIcon
                      sx={{
                        border: "5px solid white",
                        backgroundColor: "#ffffff",
                        borderRadius: "50%",
                        padding: ".2rem",
                        width: 35,
                        height: 35,
                      }}
                      // TODO: Image upload feature...
                    ></PhotoCameraIcon>
                  }
                >
                  <Avatar
                    sx={{ width: 100, height: 100, mb: 1.5 }}
                    src={placeholder}
                  ></Avatar>
                </Badge>
                <Typography variant="h4" component="h4">
                  {"Name"}
                </Typography>
                <Typography variant="h6" component={"h6"}>
                  {"ID"}
                </Typography>
              </Grid2>
            </Grid2>
          </Card>
        </Grid2>
        <Grid2 size={{ md: 9 }}>
          <Card variant="outlined">
            <br></br>
            <Tabs value={tab} onChange={handleChange}>
              <Tab label="Create Profile" {...TabProps(0)} />
            </Tabs>
            <CustomTabPanel value={tab} index={0}>
              <UserForm
                headerText="Create Profile"
                onSubmit={mutate}
                buttonText={isPending ? "Saving..." : "Save"}
                errorMessage={errorMessage}
                isPending={isPending}
                isSuccess={isSuccess}
              />
            </CustomTabPanel>
          </Card>
        </Grid2>
      </Grid2>
    </>
  );
}

export { SignUp };
