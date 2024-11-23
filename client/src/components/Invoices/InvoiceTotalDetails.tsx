import { Invoice } from "../../types/invoiceTypes";
import { useState, useEffect } from "react";

type props = {
  invoice: Invoice;
};

export default function InvoiceTotalDetails({ invoice }: props) {
  // const [details, setDetails] = useState(invoice);

  // useEffect(() => {
  //   setDetails(invoice);
  // }, [invoice]);

  console.log("*** InvoiceTotalDetails rerender");

  return (
    <>
      <div className="panel">
        <div className="panel-heading">
          <h3>Totals</h3>
        </div>
        <div className="panel-contents">
          <div className="panel-contents-section">
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Sub Total is {invoice.sub_total}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Tax is {invoice.tax}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Total is {invoice.total}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Balance is {invoice.balance}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Status is {invoice.status}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
