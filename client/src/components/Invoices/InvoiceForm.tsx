import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice, editInvoice } from "../../services/invoiceServices";
import { CapitalizeFullName } from "../../utils/index";
import { FormCustomerSection } from "./Customer/FormCustomerSection";
import { FormInvoiceLines } from "./InvoiceLines/FormInvoiceLines";
import { FormPaymentLines } from "./Payments/FormPaymentLines";
import { InvoiceTotalDetails } from "./InvoiceTotalDetails";
import { Invoice } from "../../types/invoiceTypes";
import { useAuth } from "../../contexts/AuthContext";
import { invoiceReducer } from "./invoiceReducer";
import {
  Button,
  CardActions,
  Chip,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "../../utils/muiImports";

type Props = {
  modalForm: boolean;
  buttonText: string;
  invoiceData: Invoice;
};

function InvoiceForm({ modalForm, buttonText, invoiceData }: Props) {
  // User
  const { user } = useAuth();
  const adminActions = user?.roles.includes("admin");

  // Reducer
  const [invoice, dispatch] = useReducer(invoiceReducer, invoiceData);

  // Main Pane states
  const [mainData, setMainData] = useState<Invoice>(invoiceData);
  const [invoiceID, setInvoiceID] = useState(invoiceData.id);
  const [headerText, setHeaderText] = useState(
    invoiceData.id ? `Invoice ${invoiceData.id}` : "New Invoice"
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Updates Reducer and state data anytime invoiceData changes.
  useEffect(() => {
    dispatch({ type: "setInvoice", data: invoiceData });
    setMainData(invoiceData);
    setInvoiceID(invoiceData.id);
    setHeaderText(invoiceData.id ? `Invoice ${invoiceData.id}` : "New Invoice");
  }, [invoiceData]);

  // Checks to see if the invoice has changed.
  function invoiceHasChanges(): boolean {
    return JSON.stringify(mainData) !== JSON.stringify(invoice);
  }

  // Submits invoice Data.
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (invoiceData: Invoice) => {
      if (invoiceID) {
        return editInvoice(invoiceID, {
          invoice: renamePropsToAttributes(invoiceData),
        });
      } else {
        return createInvoice({ invoice: renamePropsToAttributes(invoiceData) });
      }
    },
    onSuccess: (returnedData: Invoice) => {
      if (!invoiceID) {
        navigate(`/invoices/${returnedData.id}/`);
      }
      dispatch({ type: "setInvoice", data: returnedData });
      setMainData(returnedData);
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  function renamePropsToAttributes(intakeObject: Invoice) {
    let {
      invoice_lines: invoice_lines_attributes,
      payments: payments_attributes,
      ...rest
    } = intakeObject;
    return {
      invoice_lines_attributes,
      payments_attributes,
      ...rest,
    };
  }

  function handleCancel() {
    if (invoiceHasChanges()) {
      if (
        confirm("The invoice has unsaved changes. Continue without saving?")
      ) {
        navigate("/invoices");
      } else {
        return;
      }
    } else {
      navigate("/invoices");
    }
  }

  // Alert on page refresh.
  // useEffect(() => {
  //   const unloadCallback = (event) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //     return "";
  //   };

  //   window.addEventListener("beforeunload", unloadCallback);
  //   return () => window.removeEventListener("beforeunload", unloadCallback);
  // }, []);

  return (
    <Grid2 container direction="column">
      <Grid2>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
          paddingX={2}
          paddingY={1}
        >
          <Stack direction="row" alignItems={"center"}>
            <Typography variant="h4" component="h4">
              {headerText}
            </Typography>
            <Chip
              sx={{ mx: 2 }}
              color={invoice.status === "open" ? "success" : "error"}
              label={CapitalizeFullName(invoice.status)}
            />
          </Stack>
          <CardActions>
            <Button
              variant={"contained"}
              disabled={false}
              type="button"
              onClick={() => mutate(invoice)}
            >
              {buttonText}
            </Button>
            <Button variant="outlined" onClick={() => handleCancel()}>
              Cancel
            </Button>
          </CardActions>
        </Stack>
      </Grid2>
      <Grid2>
        <Divider />
      </Grid2>
      <Stack
        spacing={1}
        paddingX={2}
        paddingY={1}
        sx={{ overflowY: "auto", maxHeight: "70vh", maxWidth: "100%" }}
      >
        <Paper variant="outlined" sx={{ padding: 1 }}>
          <FormCustomerSection
            customerId={invoice?.customer_id}
            dispatch={dispatch}
          />
        </Paper>
        <Paper variant="outlined" sx={{ padding: 1 }}>
          <FormInvoiceLines
            invoice_lines={invoice.invoice_lines}
            adminActions={!!adminActions}
            invoice_id={invoice.id}
            dispatch={dispatch}
          />
        </Paper>
        <Paper variant="outlined" sx={{ padding: 1 }}>
          <FormPaymentLines
            payments={invoice.payments}
            adminActions={!!adminActions}
            balance={invoice.balance}
            invoice_id={invoice.id}
            dispatch={dispatch}
          />
        </Paper>
        <Paper variant="outlined" sx={{ padding: 1 }}>
          <InvoiceTotalDetails invoice={invoice} />
        </Paper>
      </Stack>
    </Grid2>
  );
}

export { InvoiceForm };
