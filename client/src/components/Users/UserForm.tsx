import { Controller, useForm } from "react-hook-form";
import { User, ZUserForm, TUserForm, UserErrorData } from "../../types/users";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/AuthContext";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CardActions,
  CircularProgress,
  Collapse,
  FormGroup,
  Grid2,
  Typography,
} from "../../utils/muiImports";
import { FormTextInput } from "../FormParts/FormTextInput";
import { FormMultiCheckBox } from "./FormMultiCheckBox";
import { useEffect, useState } from "react";

type Props = {
  user?: User;
  headerText: string;
  onSubmit: (user: TUserForm) => void;
  buttonText: string;
  errorMessage?: UserErrorData;
  isPending: boolean;
  isSuccess?: boolean;
};

function UserForm({
  user,
  headerText,
  onSubmit,
  buttonText,
  errorMessage,
  isPending,
  isSuccess,
}: Props) {
  const navigate = useNavigate();
  const { user: SignedInUser } = useAuth();
  const [hide, setHide] = useState(isSuccess);

  useEffect(() => {
    if (isSuccess) {
      setHide(true);
      setTimeout(() => setHide(false), 3000); // Auto-hide after 3 seconds
    }
  }, [isSuccess]);

  const { handleSubmit, control, setValue, reset } = useForm<TUserForm>({
    defaultValues: user
      ? { name: user.name, email: user.email, roles: user.roles }
      : { roles: ["user"] },
    resolver: zodResolver(ZUserForm),
    shouldUnregister: true,
  });

  useEffect(() => {
    reset(
      user
        ? { name: user.name, email: user.email, roles: user.roles }
        : { roles: ["user"] }
    );
  }, [user, reset]);

  return (
    <>
      <Box
        p={3}
        sx={{ textAlign: { xs: "center", md: "start" } }}
        component={"form"}
        id="main-pane-content"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography component={"h6"} variant="h6">
          {headerText}
        </Typography>
        {errorMessage && (
          <Alert severity="error">
            <AlertTitle component={"h6"} variant="h6">
              Failed to edit profile:
            </AlertTitle>
            {errorMessage.message || "An unkown error occured."}
          </Alert>
        )}
        {isSuccess && (
          <Collapse in={hide}>
            <Alert severity="success">
              <AlertTitle component={"h6"} variant="h6">
                Profile saved.
              </AlertTitle>
            </Alert>
          </Collapse>
        )}
        <Grid2
          container
          direction={{ xs: "column", md: "row" }}
          columnSpacing={5}
          rowSpacing={3}
        >
          <Grid2 size={{ xs: 6 }}>
            <Controller
              name={"name"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormTextInput
                  id="name"
                  name={"name"}
                  title={"First Name"}
                  value={value}
                  onChange={onChange}
                  dis={false}
                  error={error}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <Controller
              name={"email"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormTextInput
                  id="email"
                  name={"email"}
                  title={"Email"}
                  value={value}
                  onChange={onChange}
                  placeholder={"example@example.com"}
                  dis={false}
                  error={error}
                />
              )}
            />
          </Grid2>
          {user && (
            <Grid2 size={{ xs: 6 }}>
              <Controller
                name={"current_password"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormTextInput
                    id="current_password"
                    name={"current_password"}
                    title={"Current Password"}
                    value={value ? value : ""}
                    onChange={onChange}
                    dis={false}
                    type={"password"}
                    error={error}
                    req
                  />
                )}
              />
            </Grid2>
          )}
          {!user && (
            <>
              <Grid2 size={{ xs: 6 }}>
                <Controller
                  name={"password"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="password"
                      name={"password"}
                      title={"Password"}
                      value={value || ""}
                      onChange={onChange}
                      dis={false}
                      type={"password"}
                      error={error}
                      req
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Controller
                  name={"password_confirmation"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="password_confirmation"
                      name={"password_confirmation"}
                      title={"Confirm Password"}
                      value={value || ""}
                      onChange={onChange}
                      dis={false}
                      type={"password"}
                      error={error}
                      req
                    />
                  )}
                />
              </Grid2>
            </>
          )}
          {SignedInUser && SignedInUser.roles?.includes("admin") && (
            <Grid2 size={{ xs: 12 }}>
              <Typography component={"h6"} variant={"h6"}>
                Roles
              </Typography>
              <FormGroup row>
                <FormMultiCheckBox
                  name={"roles"}
                  control={control}
                  setValue={setValue}
                  defaultValues={user?.roles || ["user"]}
                />
              </FormGroup>
            </Grid2>
          )}
        </Grid2>
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
            {buttonText}
          </Button>
        </CardActions>
      </Box>
    </>
  );
}

export { UserForm };
