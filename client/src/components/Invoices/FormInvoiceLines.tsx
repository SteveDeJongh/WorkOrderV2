import { useState, useRef, useEffect } from "react";
// import CustomerSearchModal from "../Customers/CustomerSearchModal";
// import { fetchCustomerData } from "../../services/customerServices";
import LoadingBox from "../../multiuse/LoadingBox";

type props = {
  dataLogger: customerRef;
  invoiceLines: Array<object>;
};

type customerRef = {
  current: number;
};

export default function FormInvoiceLines({ dataLogger, invoiceLines }: props) {
  const [lineModal, setlineModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [lines, setLines] = useState(invoiceLines || []);

  // // Get the customer data if the passed in invoice data has a dataLogger.
  // useEffect(() => {
  //   console.log("dataID from useEffect", dataID, !dataLogger.current);
  //   if (!dataID) return;
  //   setloading(true);
  //   dataLogger.current = dataID;
  //   async function loadCustomerData(id: number) {
  //     try {
  //       const response = await fetchCustomerData(id);
  //       setCustomer(response);
  //     } catch (e) {
  //       console.error(e);
  //     } finally {
  //       setloading(false);
  //     }
  //   }

  //   loadCustomerData(dataLogger.current);
  // }, []);

  // When a new customer is selected in the modal, close the modal and refetch the customer data by the new customerID
  // function handleCustomerChange(id) {
  //   setCustomerModal(false);
  //   async function loadCustomerData() {
  //     try {
  //       setCustomer(false);
  //       setloading(true);
  //       const response = await fetchCustomerData(id);
  //       dataLogger.current = response.id;
  //       setCustomer(response);
  //     } catch (e) {
  //       console.error(e);
  //     } finally {
  //       setloading(false);
  //     }
  //   }

  //   loadCustomerData();
  // }

  return (
    <div className="panel">
      <div className="panel-heading">
        <h3>Invoice Details</h3>
        <div className="panel-action"></div>
      </div>
      {loading && (
        <div className="panel-contents-section">
          <LoadingBox text="Loading customer..." />
        </div>
      )}
      {!lines && !dataLogger.current && (
        <div className="panel-contents-section">
          <div className="panel-hero">
            <div className="hero-text">No lines Assigned</div>
          </div>
        </div>
      )}
      {lines && (
        <div className="panel-contents">
          <div className="panel-contents-section">{lines}</div>
        </div>
      )}
    </div>
  );
}
