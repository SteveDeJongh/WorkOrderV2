import { Invoice } from "../../types/invoiceTypes";
import { showAsDollarAmount, CapitalizeFullName } from "../../utils/index";

type props = {
  invoice: Invoice;
};

function InvoiceTotalDetails({ invoice }: props) {
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
                <div>Sub Total is {showAsDollarAmount(invoice.sub_total)}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Tax is {showAsDollarAmount(invoice.tax)}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Total is {showAsDollarAmount(invoice.total)}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Balance is {showAsDollarAmount(invoice.balance)}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Status is {CapitalizeFullName(invoice.status)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { InvoiceTotalDetails };
