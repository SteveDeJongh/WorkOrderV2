import { useState, useRef, useEffect } from "react";
import { fetchProductData } from "../../services/productServices";

// import CustomerSearchModal from "../Customers/CustomerSearchModal";
// import { fetchCustomerData } from "../../services/customerServices";
import LoadingBox from "../../multiuse/LoadingBox";
import InvoiceLine from "./InvoiceLine";

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
  const [lines, setLines] = useState(invoiceLines);
  const refLines = useRef(invoiceLines);

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

  console.log(invoiceLines);
  console.log(lines);

  return (
    <div className="panel">
      <div className="panel-heading">
        <h3>Invoice Details</h3>
        <div className="panel-action"></div>
      </div>
      {loading && <div>loading</div>}
      {refLines.current && !loading && (
        <div className="panel-contents">
          <div className="panel-contents-section">
            <table>
              <thead>
                <tr>
                  <th>Line ID</th>
                  <th>SKU</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Discount %</th>
                  <th>MSRP</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {refLines.current.map((line) => (
                  <InvoiceLine key={line.id} line={line} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
