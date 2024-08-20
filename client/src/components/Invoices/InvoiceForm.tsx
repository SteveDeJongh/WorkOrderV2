import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomerSearchModal from "../Customers/CustomerSearchModal";
import { fetchCustomerData } from "../../services/customerServices";
import LoadingBox from "../../multiuse/LoadingBox";

type props = {
  modalForm: boolean;
  handleCancel: Function;
  data: invoice;
  headerText: string;
  onSubmit: Function;
  buttonText: string;
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

function InvoiceForm({
  modalForm,
  handleCancel,
  data,
  headerText,
  onSubmit,
  buttonText,
}: props) {
  const [customerModal, setCustomerModal] = useState(false);
  const [customerID, setCustomerID] = useState(
    data?.customer_id ? data.customer_id : ""
  );
  const [customer, setCustomer] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: data
      ? {
          id: data.id,
          customer_id: data.customer_id,
          user_id: data.user_id,
          total: data.total,
          balance: data.balance,
          tax: data.tax,
          created_at: data.created_at,
          updated_at: data.updated_at,
          status: data.status,
        }
      : undefined,
  });

  async function onSubmitHandler(data) {
    try {
      onSubmit(data);
    } catch (e) {
      console.log("failed!");
    }
  }

  useEffect(() => {
    if (!customerID) return;
    console.log("Getting it");

    async function loadCustomerData(customerID) {
      try {
        const response = await fetchCustomerData(customerID);
        setCustomer(response);
        setValue("customer_id", customerID);
      } catch (e) {
        console.error(e);
      }
    }

    loadCustomerData(customerID);
  }, [customerID]);

  function handleCustomerChange(id) {
    setCustomerModal(false);
    async function loadCustomerData() {
      try {
        setCustomer(null);
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
              <button>{customerID ? "Change" : "Add"} Customer</button>
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
              value={customerID}
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
          />
        </div>

        <div className="panel">
          <h3>Invoice Details</h3>
          <div className="panel-contents-section">
            <div className="formPair half">
              <label htmlFor="id">ID:</label>
              <input
                {...register("id", {
                  required: "First Name is required.",
                })}
                type="text"
                id="id"
                name="id"
                placeholder="First Name"
              />
              {errors.id && <p>{`${errors.id.message}`}</p>}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default InvoiceForm;
