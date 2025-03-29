import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Customer, EditableCustomerData } from "../../types/customers";
import { LoadingModal } from "../multiuse/LoadingModal";
import {
  Box,
  Button,
  CardActions,
  CircularProgress,
  Grid2,
  Typography,
} from "@mui/material";
import { FormTextInput } from "../FormParts/FormTextInput";

type props = {
  modalForm?: boolean;
  customer?: Customer;
  headerText: string;
  onSubmit: (data: EditableCustomerData) => void;
  buttonText: string;
  onCancel: Function;
};

function CustomerForm({
  modalForm,
  customer,
  headerText,
  onSubmit,
  buttonText,
  onCancel,
}: props) {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm({
    defaultValues: customer
      ? {
          first_name: customer.first_name,
          last_name: customer.last_name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          province: customer.province,
          country: customer.country,
          postal: customer.postal,
        }
      : undefined,
  });

  return (
    <>
      <Box
        id="main-pane-content"
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Error handling to go here */}
        <Grid2 container direction="column">
          <Typography component="h6" variant="h6">
            Customer Details
          </Typography>
          <Grid2>
            <Grid2 container direction={"row"} spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <Controller
                  name={"first_name"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="first_name"
                      name="first_name"
                      title="First Name"
                      value={value}
                      onChange={onChange}
                      error={error}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Controller
                  name={"last_name"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="last_name"
                      name="last_name"
                      title="Last Name"
                      value={value}
                      onChange={onChange}
                      error={error}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 container direction="column">
          <Typography component="h6" variant="h6">
            Contact Details
          </Typography>
          <Grid2>
            <Grid2 container direction={"row"} spacing={2}>
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
                      name="email"
                      title="Email"
                      value={value}
                      onChange={onChange}
                      error={error}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Controller
                  name={"phone"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="phone"
                      name="phone"
                      title="Phone Number"
                      value={value}
                      onChange={onChange}
                      error={error}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 container direction="column">
          <Typography component="h6" variant="h6">
            Address Details
          </Typography>
          <Grid2>
            <Grid2 container direction={"row"} spacing={2}>
              <Grid2 size={{ xs: 6 }}>
                <Controller
                  name={"address"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="address"
                      name="address"
                      title="Address"
                      value={value}
                      onChange={onChange}
                      error={error}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <Controller
                  name={"city"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="city"
                      name="city"
                      title="City"
                      value={value}
                      onChange={onChange}
                      error={error}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
            <Grid2 container direction={"row"} spacing={2}>
              <Grid2 size={{ xs: 4 }}>
                <Controller
                  name={"province"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="province"
                      name="province"
                      title="Province"
                      value={value}
                      onChange={onChange}
                      error={error}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 4 }}>
                <Controller
                  name={"country"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="country"
                      name="country"
                      title="Country"
                      value={value}
                      onChange={onChange}
                      error={error}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 4 }}>
                <Controller
                  name={"postal"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormTextInput
                      id="postal"
                      name="postal"
                      title="Postal Code"
                      value={value}
                      onChange={onChange}
                      error={error}
                      placeholder="A1B 2C3"
                    />
                  )}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      </Box>
      <Box>
        <CardActions>
          <Button variant="contained" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button
            variant="contained"
            form="main-pane-content"
            disabled={isSubmitting}
            type="submit"
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {buttonText}
          </Button>
        </CardActions>
      </Box>
    </>
  );
}

export { CustomerForm };
