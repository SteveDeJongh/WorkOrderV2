import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createSession } from "../../services/userServices";
import { PageTitle } from "../PageTitle";
import { SignInUser, UserResponse, ZSignInUser } from "../../types/users";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormLabel,
  Grid2,
  TextField,
  Typography,
} from "../../utils/muiImports";
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
  }, [user]);

  const { handleSubmit, control, formState } = useForm<SignInUser>({
    defaultValues: { email: "", password: "" },
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
      const trimmedResponse = { ...response.data, ...response.status };
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
              <Typography component={"h5"} variant="h5" mb={3}>
                Sign In
              </Typography>
              {isError && (
                <Alert severity="error">
                  <AlertTitle component={"h6"} variant="h6">
                    Unable to sign in:
                  </AlertTitle>
                  {errorMessage || "An unkown error occured."}
                </Alert>
              )}

              <Controller
                name={"email"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <FormLabel htmlFor={"email"}>{"Email"}</FormLabel>

                    <TextField
                      disabled={formState.isSubmitting}
                      helperText={error ? error.message : null}
                      size="small"
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      fullWidth
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
                }) => (
                  <>
                    <FormLabel htmlFor={"password"}>{"Password"}</FormLabel>

                    <TextField
                      disabled={formState.isSubmitting}
                      type="password"
                      helperText={error ? error.message : null}
                      size="small"
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      fullWidth
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
                startIcon={isPending ? <CircularProgress size={20} /> : null}
              >
                {isPending ? "Signing in..." : "Sign in"}
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid2>
    </>
  );
}

export { Login };
