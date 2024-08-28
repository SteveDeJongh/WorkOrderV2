import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomerSearchModal from "../Customers/CustomerSearchModal";
import { fetchCustomerData } from "../../services/customerServices";
import LoadingBox from "../../multiuse/LoadingBox";
import FormCustomerSection from "./FormCustomerSection";
import FormInvoiceLines from "./FormInvoiceLines";

type props = {
  modalForm: boolean;
  handleCancel: Function;
  data: invoiceData;
  headerText: string;
  onSubmit: Function;
  buttonText: string;
};

type invoiceData = {
  invoice: invoice;
  lines: Array<invoiceLine>;
  payments: Array<invoicePayments>;
};

type invoice = {
  id: number;
  customer_id: number;
  user_id: number;
  total: number;
  balance: number;
  tax: number;
  created_at: string;
  updated_at: string;
  status: string;
};

type invoiceLine = {
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
  tax_rate: number;
};

type invoicePayments = {
  amount: number;
  created_at: string;
  updated_at: string;
  id: number;
  invoice_id: number;
  method: string;
};

function InvoiceForm({
  modalForm,
  handleCancel,
  data,
  headerText,
  onSubmit,
  buttonText,
}: props) {
  const [customerModal, setCustomerModal] = useState(false);
  const [customer, setCustomer] = useState("");
  const dataLogger = useRef(
    data
      ? {
          id: data.invoice.id,
          customer_id: data.invoice.customer_id,
          user_id: data.invoice.user_id,
          total: data.invoice.total,
          balance: data.invoice.balance,
          tax: data.invoice.tax,
          created_at: data.invoice.created_at,
          updated_at: data.invoice.updated_at,
          status: data.invoice.status,
        }
      : {
          id: null,
          customer_id: 0,
          user_id: null,
          total: 0,
          balance: 0,
          tax: 0,
          created_at: null,
          updated_at: null,
          status: null,
        }
  );
  console.log("From invoiceForm ALT", customer, dataLogger);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: data
      ? {
          id: data.invoice.id,
          customer_id: data.invoice.customer_id,
          user_id: data.invoice.user_id,
          total: data.invoice.total,
          balance: data.invoice.balance,
          tax: data.invoice.tax,
          created_at: data.invoice.created_at,
          updated_at: data.invoice.updated_at,
          status: data.invoice.status,
        }
      : undefined,
  });

  async function onSubmitHandler(rawFormData) {
    console.log("Form data within the form", rawFormData);
    console.log(dataLogger.current);
    outputCurrentData();
    // try {
    //   onSubmit(rawFormData);
    // } catch (e) {
    //   console.log("failed!");
    // }
  }

  function outputCurrentData() {
    console.log("dataLogger", dataLogger);
    console.log("data", data);
  }

  console.log(data);

  return (
    <>
      {!modalForm && (
        <div className="main-pane-header">
          <div className="main-pane-header-title">
            <h2>{headerText}</h2>
            <div className="main-pane-form-actions">
              <button type="button" onClick={() => handleCancel()}>
                Cancel
              </button>
              <button
                form="main-pane-content"
                disabled={isSubmitting}
                type="submit"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* To Remove */}
      <button type="button" onClick={() => outputCurrentData()}>
        Log it!
      </button>
      {/* To Remove */}
      <form
        id="main-pane-content"
        className="main-pane-content"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <FormCustomerSection
          dataLogger={dataLogger}
          dataID={data.invoice.customer_id}
        />
        <FormInvoiceLines />
      </form>
    </>
  );
}

export default InvoiceForm;
