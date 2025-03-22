import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createSession } from "../../services/userServices";
import { PageTitle } from "../PageTitle";
import { LoadingModal } from "../multiuse/LoadingModal";
import { SignInUser, UserResponse, ZSignInUser } from "../../types/users";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormLabel,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

function Login() {
  const navigate = useNavigate();
  const { setToken, user, loginSuccess } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    // If we already have a user, redirect back to previous page.
    if (user) {
      navigate(-1);
    }
  }, []);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<SignInUser>({
    resolver: zodResolver(ZSignInUser),
  });

  const {
    mutate: login,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (loginData: SignInUser) => {
      setErrorMessage(undefined);
      return createSession({ user: loginData });
    },
    onSuccess: ({ r: response, token }: { r: UserResponse; token: string }) => {
      handleSuccess(response, token);
    },
    onError: (error) => {
      console.error("An Error occured logging in:", error);
      navigate("/Login");
    },
  });

  const onSubmit = (loginData: SignInUser) => {
    login(loginData);
  };

  function handleSuccess(response: UserResponse, token: string) {
    if (response.status.code === 200) {
      let trimmedResponse = { ...response.data, ...response.status };
      loginSuccess(trimmedResponse);
      setToken(token);
      navigate("/");
    } else {
      setErrorMessage(response.status.message);
    }
  }

  return (
    <>
      <PageTitle title="Sign In" />
      <Grid2
        container
        direction={"column"}
        maxWidth="xl"
        sx={{ pt: 3, pb: 3, alignItems: "center" }}
      >
        <Card raised>
          <CardContent>
            <Box
              component={"form"}
              id="main-pane-content"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography component={"h5"} variant="h5">
                Sign In
              </Typography>
              {isPending && <LoadingModal text={"Signing in..."} />}
              {isError ||
                (errorMessage && (
                  <>
                    <div className="panel">
                      <h2>Unable to log in.</h2>
                      {errorMessage && <p>Error: {errorMessage}</p>}
                      {!errorMessage && <p>An error occured signing in.</p>}
                    </div>
                  </>
                ))}

              <Controller
                name={"email"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                  formState,
                }) => (
                  <>
                    <FormLabel htmlFor={"email"}>{"Email"}</FormLabel>

                    <TextField
                      disabled={isSubmitting}
                      helperText={error ? error.message : null}
                      size="small"
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      label={"Email"}
                      variant="outlined"
                    />
                  </>
                )}
              />
              <Controller
                name={"password"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                  formState,
                }) => (
                  <>
                    <FormLabel htmlFor={"password"}>{"Password"}</FormLabel>

                    <TextField
                      disabled={isSubmitting}
                      type="password"
                      helperText={error ? error.message : null}
                      size="small"
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      fullWidth
                      label={"password"}
                      variant="outlined"
                    />
                  </>
                )}
              />
            </Box>
            <CardActions>
              <Button variant="contained" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button
                variant="contained"
                form={"main-pane-content"}
                disabled={isPending}
                type="submit"
              >
                Sign in
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid2>
    </>
  );
}

export { Login };
