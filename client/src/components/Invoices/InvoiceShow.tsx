import { fetchInvoiceData, editInvoice } from "../../services/invoiceServices";
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import LoadingBox from "../../multiuse/LoadingBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { objectToFormData } from "../../utils/formDataHelper";
import FormCustomerSection from "./FormCustomerSection";
import FormInvoiceLines from "./FormInvoiceLines";
import FormTotalDetails from "./FormTotalDetails";
import Button from "../../multiuse/Button";
import FormPaymentLines from "./Payments/FormPaymentLines";

type Props = {
  modalForm: boolean;
  buttonText: string;
};

type Invoice = {
  id: number;
  customer_id: number;
  user_id: number;
  total: number;
  balance: number;
  tax: number;
  created_at: string;
  updated_at: string;
  status: string;
  invoice_lines?: Array<InvoiceLine>;
  payments?: Array<Payments>;
};

type InvoiceLine = {
  id: number;
  invoice_id: number;
  product_id: number;
  discount_percentage: number;
  price: number;
  created_at: string;
  updated_at: string;
  line_tax: number;
  line_total: number;
  quantity: number;
  tax_rate: Tax_rate;
  product: Product;
};

type Product = {
  cost: string;
  created_at: string;
  description: string;
  id: number;
  inventory: true;
  max: number;
  min: number;
  name: string;
  price: string;
  sku: string;
  stock: number;
  tax_rate: number;
  upc: number;
  updated_at: string;
};

type Tax_rate = {
  created_at: string;
  id: number;
  percentage: number;
  updated_at: string;
};

type Payments = {
  amount: number;
  created_at: string;
  updated_at: string;
  id: number;
  invoice_id: number;
  method: string;
};

function InvoiceShow({ modalForm, buttonText }: Props) {
  // Main Pane states
  const [mainLoading, setMainLoading] = useState(true);
  const [mainError, setMainError] = useState("");
  const [mainData, setMainData] = useState<Invoice | {}>({});
  const [dataLogger, setDataLogger] = useState<Invoice | {}>({});
  const [headerText, setHeaderText] = useState("New Invoice");
  let { id: invoiceID } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetches invoice data on initial render and whenever invoiceID changes.
  useEffect(() => {
    async function loadInvoiceData() {
      if (!invoiceID) {
        setMainData({});
        return;
      }
      try {
        setMainLoading(true);
        setHeaderText(`Invoice ${invoiceID}`);
        const response = await fetchInvoiceData(invoiceID);
        setMainData(response);
        console.log("response is", response);
        // Creating a deep copy of the intial response to not alter mainData for comparison later.
        setDataLogger(JSON.parse(JSON.stringify(response)));
      } catch (e) {
        setMainError("An error occured fetching the invoice.");
        console.error(e);
      } finally {
        setMainLoading(false);
        console.log("mainData in finally: ", mainData);
      }
    }

    loadInvoiceData();
  }, [invoiceID]);

  // const {
  //   mutate: handleEditSubmit,
  //   isPending,
  //   isError,
  //   isSuccess,
  // } = useMutation({
  //   mutationFn: (dldata) => {
  //     const allowed = ["customer_id", "user_id", "total", "balance", "tax"];

  //     let allowedParams = {};
  //     Object.keys(dldata)
  //       .filter((key) => allowed.includes(key))
  //       .forEach((key) => {
  //         allowedParams[key] = dldata[key];
  //       });

  //     const formData = objectToFormData({ invoice: allowedParams });
  //     console.log("Updating invoice...");
  //     return editInvoice(invoiceID, formData);
  //   },
  //   onSuccess: (updatedInvoice) => {
  //     console.log("Invoice updated!");
  //     console.log(updatedInvoice);
  //     // queryClient.setQueryData(["products"], (oldProducts) => {
  //     //   [...oldProducts, newProduct];
  //     // });
  //     navigate(`/invoices/${updatedInvoice.id}`);
  //   },
  // });

  // Checks to see if the invoice has changed.
  function invoiceHasChanges(): boolean {
    return JSON.stringify(mainData) !== JSON.stringify(dataLogger);
  }

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (invoiceData: Invoice) => {
      let refreshed = Object.assign({}, invoiceData);
      refreshed.invoice_lines_attributes = refreshed.invoice_lines;
      delete refreshed.invoice_lines;
      refreshed.payments_attributes = refreshed.payments;
      delete refreshed.payments;

      if (invoiceID) {
        console.log("invoiceData on mutate", invoiceData);
        console.log("refreshed on mutate", refreshed);
        console.log("invoiceID on mutate", invoiceID);
        return editInvoice(invoiceID, { invoice: refreshed });
      }
    },
  });

  // async function onSubmitHandler(rawFormData) {
  //   recalculateInvoice(dataLogger.current.id);
  //   console.log("Called onsubmithandler");
  //   try {
  //     onSubmit(dataLogger.current);
  //   } catch (e) {
  //     console.log("failed!");
  //   }
  // }

  // function recalculateInvoice(id) {
  //   // Run calculations for total, balance, and tax for the invoice.
  //   // Re assign dataLogger.current props with new values as strings.
  //   // This should really come from the back end in order to guarantee sync.
  //   console.log("Recalculating invoice totals, temp value 10");
  //   let payments = 0;
  //   let total = 20;
  //   let tax = 1;
  //   let balance = total + tax - payments;
  //   dataLogger.current.total = total;
  //   dataLogger.current.tax = tax;
  //   dataLogger.current.balance = balance;
  // }

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
        Log it!
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
          invoiceLines={mainData.invoice_lines}
        />
        <FormPaymentLines
          dataLogger={dataLogger}
          payments={mainData.payments}
        />
        {/* <FormTotalDetails /> */}
        <FormTotalDetails dataLogger={dataLogger} />
        <div>Total is {dataLogger.total}</div>
        <div>Tax is {dataLogger.tax}</div>
        <div>Balance is {dataLogger.balance}</div>
      </div>
    </>
  );
}

export default InvoiceShow;
