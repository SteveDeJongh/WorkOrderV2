import { useState, useRef, useEffect } from "react";
import CustomerSearchModal from "../Customers/CustomerSearchModal";
import { fetchCustomerData } from "../../services/customerServices";
import LoadingBox from "../../multiuse/LoadingBox";

type ref = {
  current: invoice;
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

type props = {
  dataLogger: ref;
  dataID: number;
};

type customerRef = {
  current: number;
};

export default function FormCustomerSection({ dataLogger, dataID }: props) {
  const [customerModal, setCustomerModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [customer, setCustomer] = useState("");

  // Get the customer data if the passed in invoice data has a dataLogger.
  useEffect(() => {
    if (!dataID) return;
    setloading(true);
    dataLogger.current.customer_id = dataID;
    async function loadCustomerData(id: number) {
      try {
        const response = await fetchCustomerData(id);
        setCustomer(response);
      } catch (e) {
        console.error(e);
      } finally {
        setloading(false);
      }
    }

    loadCustomerData(dataLogger.current.customer_id);
  }, []);

  // When a new customer is selected in the modal, close the modal and refetch the customer data by the new customerID
  function handleCustomerChange(id) {
    setCustomerModal(false);
    async function loadCustomerData() {
      try {
        setCustomer(false);
        setloading(true);
        const response = await fetchCustomerData(id);
        dataLogger.current.customer_id = response.id;
        setCustomer(response);
      } catch (e) {
        console.error(e);
      } finally {
        setloading(false);
      }
    }

    loadCustomerData();
  }

  function removeCustomer() {
    dataLogger.current.customer_id = 0;
    setCustomer("");
  }

  return (
    <div className="panel">
      <div className="panel-heading">
        <h3>Customer Details</h3>
        <div className="panel-action">
          {customer && (
            <button type="button" onClick={() => removeCustomer()}>
              Remove Customer
            </button>
          )}
          <button type="button" onClick={() => setCustomerModal(true)}>
            {dataLogger ? "Change" : "Add"} Customer
          </button>
        </div>
      </div>
      {loading && (
        <div className="panel-contents-section">
          <LoadingBox text="Loading customer..." />
        </div>
      )}
      {!customer && !dataLogger.current.customer_id && (
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
        customer_id={dataLogger.current.customer_id}
      />
    </div>
  );
}
