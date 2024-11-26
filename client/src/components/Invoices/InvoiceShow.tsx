import { useState, useContext, useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInvoice,
  fetchInvoiceData,
  editInvoice,
} from "../../services/invoiceServices";
import { CapitalizeFullName, sumAProp } from "../../utils/index";
import FormCustomerSection from "./FormCustomerSection";
import FormInvoiceLines from "./InvoiceLines/FormInvoiceLines";
import FormPaymentLines from "./Payments/FormPaymentLines";
import InvoiceTotalDetails from "./InvoiceTotalDetails";
import LoadingBox from "../../multiuse/LoadingBox";
import Button from "../../multiuse/Button";
import { Action, Invoice } from "../../types/invoiceTypes";
import { User } from "../../types/users";
import UserContext from "../../contexts/user-context";

type Props = {
  modalForm: boolean;
  buttonText: string;
};

function InvoiceShow({ modalForm, buttonText }: Props) {
  // User
  const [user, setUser] = useContext<User>(UserContext);
  const adminActions = user.roles.includes("admin");

  // New Invoice
  let newInvoice: Invoice = {
    id: null,
    customer_id: 0,
    user_id: 0,
    total: 0,
    sub_total: 0,
    balance: 0,
    tax: 0,
    created_at: new Date(Date.now()).toISOString(),
    updated_at: new Date(Date.now()).toISOString(),
    status: "open",
    invoice_lines: [],
    payments: [],
  };

  // Reducer
  const [invoice, dispatch] = useReducer(invoiceReducer, newInvoice);

  // Main Pane states
  const [mainLoading, setMainLoading] = useState(true);
  const [mainError, setMainError] = useState("");
  const [mainData, setMainData] = useState<Invoice>();
  const [headerText, setHeaderText] = useState("New Invoice");
  let { id: invoiceID } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["fetchInvoiceData", { invoiceID }],
  //   queryFn: () => fetchInvoiceData(invoiceID),
  //   enabled: Boolean(invoiceID),
  // });

  // Fetches invoice data on initial render and whenever invoiceID changes.
  useEffect(() => {
    async function loadInvoiceData() {
      if (!invoiceID) {
        console.log("&&& No invoice ID");
        setMainData(newInvoice);
        dispatch({ type: "setInvoice", data: newInvoice });
        setHeaderText("New Invoice");
        setMainLoading(false);
        return;
      } else {
        try {
          setMainLoading(true);
          setHeaderText(`Invoice ${invoiceID}`);
          const response = await fetchInvoiceData(invoiceID);
          setMainData(response);
          dispatch({ type: "setInvoice", data: response });
        } catch (e) {
          setMainError("An error occured fetching the invoice.");
          console.error(e);
        } finally {
          setMainLoading(false);
        }
      }
    }

    loadInvoiceData();
  }, [invoiceID]);

  // Checks to see if the invoice has changed.
  function invoiceHasChanges(): boolean {
    return JSON.stringify(mainData) !== JSON.stringify(invoice);
  }

  // Submits invoice Data. TODO: Add new invoice creation. (if no invoiceID exists)
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

  // TODO More to do here...
  function handleCancel() {
    if (invoiceHasChanges()) {
      if (
        confirm("The invoice has unsaved changes. Continue without saving?")
      ) {
        navigate("/invoices");
      } else {
        console.log("Staying here!");
      }
    } else {
      navigate("/invoices");
    }
  }

  // For Debugging, to be removed.
  function outputCurrentData() {
    console.log("mainData", mainData);
    console.log("invoice", invoice);
  }

  if (mainLoading) {
    return <LoadingBox text="Loading Invoice..." />;
  }

  if (mainError) {
    return <div>{mainError}</div>;
  }

  return (
    <>
      {!modalForm && (
        <div className="main-pane-header">
          <div className="main-pane-header-title">
            <h2>
              {headerText}
              <span
                className={`invoice-status ${
                  invoice.status === "open" ? "open" : "closed"
                }`}
              >
                {CapitalizeFullName(invoice.status)}
              </span>
            </h2>
            <div className="main-pane-form-actions">
              <Button onClick={() => handleCancel()} text={"Cancel"} />
              <Button
                disabled={false}
                type="button"
                text={buttonText}
                onClick={() => mutate(invoice)}
              />
            </div>
          </div>
        </div>
      )}
      {/* To Remove */}
      <button type="button" onClick={() => outputCurrentData()}>
        Log it! (To remove)
      </button>
      {/* To Remove */}
      <div id="main-pane-content" className="main-pane-content">
        <FormCustomerSection
          customerId={invoice?.customer_id}
          dispatch={dispatch}
        />
        <FormInvoiceLines
          invoice_lines={invoice.invoice_lines}
          adminActions={adminActions}
          invoice_id={invoice.id}
          dispatch={dispatch}
        />
        <FormPaymentLines
          payments={invoice.payments}
          adminActions={adminActions}
          balance={invoice.balance}
          invoice_id={invoice.id}
          dispatch={dispatch}
        />
        <InvoiceTotalDetails invoice={invoice} />
      </div>
    </>
  );
}

function invoiceReducer(invoice: Invoice, action: Action): Invoice {
  switch (action.type) {
    case "setInvoice": {
      return { ...action.data };
    }
    case "recaculateInvoice": {
      console.log("Recalculating and Setting Invoice Totals");
      let payments = sumAProp(invoice.payments, "amount", { _destroy: true });
      let sub_total = sumAProp(invoice.invoice_lines, "line_total");
      let tax = sumAProp(invoice.invoice_lines, "line_tax");
      let total = sub_total + tax;
      let balance = total - payments;
      return {
        ...invoice,
        sub_total: sub_total,
        total: total,
        tax: tax,
        balance: balance,
      };
    }
    case "updateCustomer": {
      console.log("Updated customer!");
      return { ...invoice, customer_id: action.customerId };
    }
    case "removeCustomer": {
      console.log("removing customer!");
      return { ...invoice, customer_id: undefined };
    }
    case "createInvoiceLine": {
      console.log("Creating Invoice Line!");
      invoice.invoice_lines.push(action.invoice_line);
      return invoice;
    }
    case "updateInvoiceLine": {
      console.log("Updating Invoice Line");
      const NewInvoiceLines = invoice.invoice_lines.map((line) => {
        if (
          line.id === action.invoice_line.id &&
          line.created_at === action.invoice_line.created_at
        ) {
          return action.invoice_line;
        } else {
          return line;
        }
      });
      return { ...invoice, invoice_lines: NewInvoiceLines };
    }
    case "togglePaymentDelete": {
      console.log("Toggling Delete!");
      const newPayments = invoice.payments.map((payment) => {
        if (
          payment &&
          payment.id === action.paymentId &&
          payment.created_at === action.created_at
        ) {
          payment._destroy = !payment._destroy;
        }
        return payment;
      });
      return { ...invoice, payments: newPayments };
    }
    case "updatePayment": {
      console.log("Updating Payment");
      const newPayments = invoice.payments.map((payment) => {
        if (
          payment.id === action.payment.id &&
          payment?.created_at === action.payment.created_at
        ) {
          return action.payment;
        } else {
          return payment;
        }
      });
      return { ...invoice, payments: newPayments };
    }
    case "createPayment": {
      console.log("Created Payment");
      invoice.payments.push(action.payment);
      return invoice;
    }
  }
  return invoice;
}

export default InvoiceShow;
