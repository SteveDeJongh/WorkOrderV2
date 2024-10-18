import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomerSearchModal from "../Customers/CustomerSearchModal";
import { fetchCustomerData } from "../../services/customerServices";
import LoadingBox from "../../multiuse/LoadingBox";
import FormCustomerSection from "./FormCustomerSection";
import FormInvoiceLines from "./FormInvoiceLines";
import Button from "../../multiuse/Button";
import FormPaymentLines from "./FormPaymentLines";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  console.log("From invoiceForm", customer, dataLogger);

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
    recalculateInvoice(dataLogger.current.id);
    console.log("Called onsubmithandler");
    try {
      onSubmit(dataLogger.current);
    } catch (e) {
      console.log("failed!");
    }
  }

  function outputCurrentData() {
    console.log("dataLogger", dataLogger);
    console.log("data", data);
  }

  function recalculateInvoice(id) {
    // Run calculations for total, balance, and tax for the invoice.
    // Re assign dataLogger.current props with new values as strings.
    // This should really come from the back end in order to guarantee sync.
    console.log("Recalculating invoice totals, temp value 10");
    let payments = 0;
    let total = 20;
    let tax = 1;
    let balance = total + tax - payments;
    dataLogger.current.total = total;
    dataLogger.current.tax = tax;
    dataLogger.current.balance = balance;
  }

  console.log(data);

  return (
    <>
      {!modalForm && (
        <div className="main-pane-header">
          <div className="main-pane-header-title">
            <h2>{headerText}</h2>
            <div className="main-pane-form-actions">
              <Button onClick={() => handleCancel()} text={"Cancel"} />
              <Button
                form="main-pane-content"
                disabled={isSubmitting}
                type="submit"
                text={buttonText}
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
          dataLogger={dataLogger.current}
          dataID={data.invoice.customer_id}
        />
        <FormInvoiceLines
          dataLogger={dataLogger.current}
          invoiceLines={data.lines}
        />
        <FormPaymentLines
          dataLogger={dataLogger.current}
          payments={data.payments}
        />
        {/* <FormTotalDetails /> */}
        <div>Total is {dataLogger.current.total}</div>
        <div>Tax is {dataLogger.current.tax}</div>
        <div>Balance is {dataLogger.current.balance}</div>
      </div>
    </>
  );
}

export default InvoiceForm;
