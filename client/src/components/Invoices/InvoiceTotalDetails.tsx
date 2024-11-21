import { Invoice } from "../../types/invoiceTypes";

type props = {
  dataLogger: Invoice;
};

export default function InvoiceTotalDetails({ dataLogger }: props) {
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
                <div>Total is {dataLogger.total}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Tax is {dataLogger.tax}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Balance is {dataLogger.balance}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Status is {dataLogger.status}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
