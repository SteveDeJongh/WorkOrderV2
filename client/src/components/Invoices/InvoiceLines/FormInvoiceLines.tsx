import { useState, useRef, useEffect } from "react";
import { fetchProductData } from "../../services/productServices";
import InvoiceLine from "./InvoiceLine";
import NewInvoiceLine from "./NewInvoiceLine";

type props = {
  dataLogger: customerRef;
  recalculateInvoice: Function;
  adminActions: boolean;
};

type customerRef = {
  current: number;
};

export default function FormInvoiceLines({
  dataLogger,
  recalculateInvoice,
  adminActions,
}: props) {
  const [lines, setLines] = useState(dataLogger.invoice_lines);

  function updateLine(updatedLine: object) {
    setLines(
      lines?.map((line) => {
        if (line.id === updatedLine.id) {
          return updatedLine;
        } else {
          return line;
        }
      })
    );
    // TODO: more updating line logic needed to trigger a line save and recalculate invoicen totals.
    recalculateInvoice();
    console.log(lines.current);
  }

  return (
    <div className="panel">
      <div className="panel-heading">
        <h3>Invoice Details</h3>
        <div className="panel-action"></div>
      </div>
      <div className="panel-contents">
        <div className="panel-contents-section">
          <div className="scrollable-table">
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
              {lines && (
                <tbody>
                  {lines.map((line) => (
                    <InvoiceLine
                      key={line.id}
                      line={line}
                      updateLine={updateLine}
                    />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
        <NewInvoiceLine />
      </div>
    </div>
  );
}
