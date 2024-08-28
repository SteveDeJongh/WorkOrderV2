import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomerSearchModal from "../Customers/CustomerSearchModal";
import { fetchCustomerData } from "../../services/customerServices";
import LoadingBox from "../../multiuse/LoadingBox";

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

function InvoiceFormAlt({
  modalForm,
  handleCancel,
  data,
  headerText,
  onSubmit,
  buttonText,
}: props) {
  const [customerModal, setCustomerModal] = useState(false);
  const [customer, setCustomer] = useState("");
  const customerID = useRef(0);

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
    try {
      onSubmit(rawFormData);
    } catch (e) {
      console.log("failed!");
    }
  }

  // Get the customer data if the passed in invoice data has a customerID.
  useEffect(() => {
    if (!data.invoice.customer_id) return;
    customerID.current = data.invoice.customer_id;
    async function loadCustomerData(id) {
      try {
        const response = await fetchCustomerData(id);
        setCustomer(response);
      } catch (e) {
        console.error(e);
      }
    }

    loadCustomerData(customerID.current);
  }, [data]);

  // When a new customer is selected in the modal, close the modal and refetch the customer data by the new customerID
  function handleCustomerChange(id) {
    setCustomerModal(false);
    async function loadCustomerData() {
      try {
        setCustomer(false);
        const response = await fetchCustomerData(id);
        setCustomer(response);
      } catch (e) {
        console.error(e);
      }
    }

    loadCustomerData();
  }

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
      <form
        id="main-pane-content"
        className="main-pane-content"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="panel">
          <div className="panel-heading">
            <h3>Customer Details</h3>
            <div
              className="panel-action"
              onClick={() => setCustomerModal(true)}
            >
              <button type="button">
                {customerID ? "Change" : "Add"} Customer
              </button>
            </div>
          </div>
          {/******   More to do here ... ********/}
          <div>
            <label htmlFor="customer_id">customer_id:</label>
            <input
              {...register("customer_id")}
              type="number"
              id="customer_id"
              name="customer_id"
              value={customerID.current}
            />
          </div>
          {/******   More to do here ... ********/}
          {!customer && customerID && (
            <div className="panel-contents-section">
              <LoadingBox text="Loading customer..." />
            </div>
          )}
          {!customer && !customerID && (
            <div className="panel-contents-section">
              <div className="panel-hero">
                <div className="hero-text">No Customer Assigned</div>
              </div>
            </div>
          )}
          {customer && (
            <div className="panel-contents">
              <div className="panel-contents-section">
                <div className="panel-section-data">
                  {customer.first_name + " " + customer.last_name}
                </div>
              </div>
              <div className="panel-contents-section">
                <div className="panel-section-desc">📞</div>
                <div className="panel-section-data">
                  <div className="data-item">{customer.phone}</div>
                  <div className="data-item">{customer.phone}</div>
                </div>
                <div className="panel-section-desc">📧</div>
                <div className="panel-section-data">
                  <div className="data-item">{customer.email}</div>
                </div>
                <div className="panel-section-desc">🏠</div>
                <div className="panel-section-data">
                  <div className="data-item">{customer.address}</div>
                  <div className="data-item">
                    {customer.city} {customer.province} {customer.postal}
                  </div>
                  <div className="data-item">{customer.country}</div>
                </div>
              </div>
            </div>
          )}
          <CustomerSearchModal
            open={customerModal}
            onClose={() => setCustomerModal(false)}
            onSave={(id) => handleCustomerChange(id)}
            customer_id={customerID}
          />
        </div>

        <div className="panel">
          <h3>Invoice Lines</h3>
          <div className="panel-contents-section">
            <div className="formPair half">
              <label htmlFor="total">ID:</label>
              <input
                {...register("total")}
                type="text"
                id="total"
                name="total"
                value={"woohoo"}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default InvoiceFormAlt;
