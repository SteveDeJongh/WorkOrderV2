import { Total } from "../../types/invoiceTypes";

type props = {
  totals: Total;
};

export default function FormTotalDetails({ totals }: props) {
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
                <div>Total is {totals.total}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Tax is {totals.tax}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Balance is {totals.balance}</div>
              </div>
            </div>
            <div className="panel-section-desc">
              <div className="panel-section-data">
                <div>Status is {totals.status}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
