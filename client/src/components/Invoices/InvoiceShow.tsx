import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchInvoiceData, editInvoice } from "../../services/invoiceServices";
import { sumAProp } from "../../utils/index";
import FormCustomerSection from "./FormCustomerSection";
import FormInvoiceLines from "./InvoiceLines/FormInvoiceLines";
import FormPaymentLines from "./Payments/FormPaymentLines";
import FormTotalDetails from "./FormTotalDetails";
import LoadingBox from "../../multiuse/LoadingBox";
import Button from "../../multiuse/Button";
import { Invoice, Total } from "../../types/invoiceTypes";
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

  // Main Pane states
  const [mainLoading, setMainLoading] = useState(true);
  const [mainError, setMainError] = useState("");
  const [mainData, setMainData] = useState<Invoice>();
  const [dataLogger, setDataLogger] = useState<Invoice>();
  const [totals, setTotals] = useState<Total>({
    total: 0,
    tax: 0,
    balance: 0,
    status: "open",
  });
  const [headerText, setHeaderText] = useState("New Invoice");
  let { id: invoiceID } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetches invoice data on initial render and whenever invoiceID changes.
  useEffect(() => {
    async function loadInvoiceData() {
      if (!invoiceID) {
        setMainData(undefined);
        return;
      }
      try {
        setMainLoading(true);
        setHeaderText(`Invoice ${invoiceID}`);
        const response = await fetchInvoiceData(invoiceID);
        setMainData(response);
        // Creating a deep copy of the intial response to not alter mainData for comparison later.
        setDataLogger(JSON.parse(JSON.stringify(response)));
        setTotals({
          total: response.total,
          tax: response.tax,
          balance: response.balance,
          status: response.status,
        });
      } catch (e) {
        setMainError("An error occured fetching the invoice.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }

    loadInvoiceData();
  }, [invoiceID]);

  // Checks to see if the invoice has changed.
  function invoiceHasChanges(): boolean {
    return JSON.stringify(mainData) !== JSON.stringify(dataLogger);
  }

  // Submits invoice Data. TODO: Add new invoice creation. (if no invoiceID exists)
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (invoiceData: Invoice) => {
      setMainLoading(true);
      if (invoiceID) {
        return editInvoice(invoiceID, {
          invoice: renamePropsToAttributes(invoiceData),
        });
      }
    },
    onSuccess: (returnedData: Invoice) => {
      console.log("In the on success!");
      // console.log("Returned Data", returnedData);
      setDataLogger(returnedData);
      setMainData(returnedData);
      setTotals({
        total: returnedData.total,
        tax: returnedData.tax,
        balance: returnedData.balance,
        status: returnedData.status,
      });
      // console.log("mainData after onSuccess", mainData);
      // console.log("DL after onSuccess", dataLogger);
    },
    onSettled: () => {
      setMainLoading(false);
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

  function recalculateInvoice() {
    // Run calculations for total, balance, and tax for the invoice.
    console.log("Recalculating invoice totals.");
    let payments = sumAProp(dataLogger?.payments, "amount", { _destroy: true });
    let total = sumAProp(dataLogger?.invoice_lines, "line_total");
    let tax = sumAProp(dataLogger?.invoice_lines, "line_tax");
    let balance = total + tax - payments;
    setTotals({
      total: total,
      tax: tax,
      balance: balance,
      status: "open",
    });
  }

  // TODO More to do here...
  function handleCancel() {
    if (invoiceHasChanges()) alert("The invoice has unsaved changes.");
    navigate("/invoices");
  }

  // For Debugging, to be removed.
  function outputCurrentData() {
    console.log("dataLogger", dataLogger);
    console.log("mainData", mainData);
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
            <h2>{headerText}</h2>
            <div className="main-pane-form-actions">
              <Button onClick={() => handleCancel()} text={"Cancel"} />
              <Button
                disabled={false}
                type="button"
                text={buttonText}
                onClick={() => mutate(dataLogger)}
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
      <div
        id="main-pane-content"
        className="main-pane-content"
        // onSubmit={handleSubmit(onSubmitHandler)}
      >
        <FormCustomerSection
          dataLogger={dataLogger}
          dataID={mainData.customer_id}
        />
        <FormInvoiceLines
          dataLogger={dataLogger}
          recalculateInvoice={recalculateInvoice}
          adminActions={adminActions}
        />
        <FormPaymentLines
          dataLogger={dataLogger}
          recalculateInvoice={recalculateInvoice}
          adminActions={adminActions}
        />
        <FormTotalDetails totals={totals} />
      </div>
    </>
  );
}

export default InvoiceShow;
