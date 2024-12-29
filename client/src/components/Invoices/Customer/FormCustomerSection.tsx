import { useState, useEffect } from "react";
import { CustomerSearchModal } from "./CustomerSearchModal";
import { fetchCustomerData } from "../../../services/customerServices";
import { LoadingBox } from "../../multiuse/LoadingBox";
import { Button } from "../../multiuse/Button";
import { Action } from "../../../types/invoiceTypes";
import { Customer } from "../../../types/customers";

type props = {
  customerId?: number;
  dispatch: React.Dispatch<Action>;
};

function FormCustomerSection({ customerId, dispatch }: props) {
  const [customerModal, setCustomerModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [customer, setCustomer] = useState<Customer>();

  // Get the customer data wjemever customerId changes and on intial render.
  useEffect(() => {
    if (!customerId) {
      setCustomer(undefined);
      return;
    }
    setloading(true);
    async function loadCustomerData(id: number) {
      try {
        const response: Customer = await fetchCustomerData(id);
        setCustomer(response);
      } catch (e) {
        console.error(e);
      } finally {
        setloading(false);
      }
    }

    loadCustomerData(customerId);
  }, [customerId]);

  // When a new customer is selected in the modal, close the modal and refetch the customer data by the new customerID
  function handleCustomerChange(newCustomerId: number) {
    setCustomerModal(false);
    async function loadCustomerData() {
      try {
        setCustomer(undefined);
        setloading(true);
        const response: Customer = await fetchCustomerData(newCustomerId);
        dispatch({
          type: "updateCustomer",
          customerId: response.id,
        });
        // setCustomer(response);
      } catch (e) {
        console.error(e);
      } finally {
        setloading(false);
      }
    }

    loadCustomerData();
  }

  // Remove the customer from the invoice.
  function removeCustomer() {
    dispatch({ type: "removeCustomer" });
  }

  return (
    <div className="panel">
      <div className="panel-heading">
        <h3>Customer Details</h3>
        <div className="panel-action">
          {customer && (
            <Button onClick={() => removeCustomer()} text={"Remove Customer"} />
          )}
          <Button
            onClick={() => setCustomerModal(true)}
            text={customerId ? "Change Customer" : "Add Customer"}
          />
        </div>
      </div>
      {loading && (
        <div className="panel-contents-section">
          <LoadingBox text="Loading customer..." />
        </div>
      )}
      {!customer && !customerId && (
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
        onSave={(id: number) => handleCustomerChange(id)}
        customer_id={customerId}
      />
    </div>
  );
}

export { FormCustomerSection };
