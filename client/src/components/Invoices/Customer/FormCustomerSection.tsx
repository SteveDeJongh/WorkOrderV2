import { useState, useEffect } from "react";
import { CustomerSearchModal } from "./CustomerSearchModal";
import { fetchCustomerData } from "../../../services/customerServices";
import { LoadingBox } from "../../multiuse/LoadingBox";
import { Action } from "../../../types/invoiceTypes";
import { Customer } from "../../../types/customers";
import {
  Box,
  Button,
  Grid2,
  Stack,
  Typography,
} from "../../../utils/muiImports";

type props = {
  customerId?: number;
  dispatch: React.Dispatch<Action>;
};

function FormCustomerSection({ customerId, dispatch }: props) {
  const [customerModal, setCustomerModal] = useState(false);
  const handleClose = () => setCustomerModal(false);
  const [loading, setloading] = useState(false);
  const [customer, setCustomer] = useState<Customer>();

  // Get the customer data whenever customerId changes and on intial render.
  useEffect(() => {
    if (!customerId) {
      setCustomer(undefined);
      return;
    }
    setloading(true);
    async function loadCustomerData(id: number) {
      try {
        const response: Customer = await fetchCustomerData(id);
        setCustomer(response);
      } catch (e) {
        console.error(e);
      } finally {
        setloading(false);
      }
    }

    loadCustomerData(customerId);
  }, [customerId]);

  // When a new customer is selected in the modal, close the modal and refetch the customer data by the new customerID
  function handleCustomerChange(newCustomerId: number) {
    setCustomerModal(false);
    async function loadCustomerData() {
      try {
        setCustomer(undefined);
        setloading(true);
        const response: Customer = await fetchCustomerData(newCustomerId);
        dispatch({
          type: "updateCustomer",
          customerId: response.id,
        });
        // setCustomer(response);
      } catch (e) {
        console.error(e);
      } finally {
        setloading(false);
      }
    }

    loadCustomerData();
  }

  // Remove the customer from the invoice.
  function removeCustomer() {
    dispatch({ type: "removeCustomer" });
  }

  return (
    <>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6">Customer Details</Typography>
        <Stack direction={"row"} spacing={1}>
          {customer && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => removeCustomer()}
            >
              Remove Customer
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            onClick={() => setCustomerModal(true)}
          >
            {customerId ? "Change Customer" : "Add Customer"}
          </Button>
        </Stack>
      </Stack>
      {loading && <LoadingBox text="Loading customer..." />}
      {!customer && !customerId && !loading && (
        <Typography variant="h6">No Customer Assigned</Typography>
      )}
      {customer && !loading && (
        <Box>
          <Stack spacing={1} p={1}>
            <Grid2 container direction="row" spacing={1}>
              <Grid2 container direction={"row"} size={{ xs: 6 }}>
                <Box pr={2}>🏷️</Box>
                <Box>
                  <Typography variant="body1">
                    {customer.first_name} {customer.last_name}
                  </Typography>
                </Box>
              </Grid2>
              <Grid2 container direction={"row"} size={{ xs: 6 }}>
                <Box pr={2}>🏠</Box>
                <Box>
                  <Typography variant="body1">{customer.address}</Typography>
                  <Typography variant="body1">
                    {customer.city} {customer.province} {customer.postal}
                  </Typography>
                  <Typography variant="body1">{customer.country}</Typography>
                </Box>
              </Grid2>
            </Grid2>
            <Grid2 container direction="row" spacing={1}>
              <Grid2 container direction={"row"} size={{ xs: 6 }}>
                <Box pr={2}>📞</Box>
                <Box>
                  <Typography variant="body1">{customer.phone}</Typography>
                  <Typography variant="body1">{customer.phone}</Typography>
                </Box>
              </Grid2>
              <Grid2 container direction={"row"} size={{ xs: 6 }}>
                <Box pr={2}>📧</Box>
                <Box>
                  <Typography variant="body1">{customer.email}</Typography>
                </Box>
              </Grid2>
            </Grid2>
          </Stack>
        </Box>
      )}
      <CustomerSearchModal
        open={customerModal}
        handleClose={handleClose}
        onSave={(id: number) => handleCustomerChange(id)}
        customer_id={customerId}
      />
    </>
  );
}

export { FormCustomerSection };
