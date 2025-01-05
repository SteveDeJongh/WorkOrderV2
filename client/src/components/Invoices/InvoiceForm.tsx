import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice, editInvoice } from "../../services/invoiceServices";
import { CapitalizeFullName } from "../../utils/index";
import { FormCustomerSection } from "./Customer/FormCustomerSection";
import { FormInvoiceLines } from "./InvoiceLines/FormInvoiceLines";
import { FormPaymentLines } from "./Payments/FormPaymentLines";
import { InvoiceTotalDetails } from "./InvoiceTotalDetails";
import { Button } from "../multiuse/Button";
import { Invoice } from "../../types/invoiceTypes";
import { useAuth } from "../../contexts/AuthContext";
import { invoiceReducer } from "./invoiceReducer";

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
      <div id="main-pane-content" className="main-pane-content">
        <FormCustomerSection
          customerId={invoice?.customer_id}
          dispatch={dispatch}
        />
        <FormInvoiceLines
          invoice_lines={invoice.invoice_lines}
          adminActions={!!adminActions}
          invoice_id={invoice.id}
          dispatch={dispatch}
        />
        <FormPaymentLines
          payments={invoice.payments}
          adminActions={!!adminActions}
          balance={invoice.balance}
          invoice_id={invoice.id}
          dispatch={dispatch}
        />
        <InvoiceTotalDetails invoice={invoice} />
      </div>
    </>
  );
}

export { InvoiceForm };
