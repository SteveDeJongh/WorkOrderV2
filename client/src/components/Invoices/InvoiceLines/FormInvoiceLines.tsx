import { useState, useRef, useEffect } from "react";
import { fetchProductData } from "../../../services/productServices";
import InvoiceLine from "./InvoiceLine";
import NewInvoiceLine from "./NewInvoiceLine";
import {
  Invoice,
  InvoiceLine as TInvoiceLine,
  Product,
} from "../../../types/invoiceTypes";

type props = {
  dataLogger: Invoice;
  recalculateInvoice: Function;
  adminActions: boolean;
};

export default function FormInvoiceLines({
  dataLogger,
  recalculateInvoice,
  adminActions,
}: props) {
  const [lines, setLines] = useState<Array<TInvoiceLine>>(
    dataLogger.invoice_lines
  );
  const [val, setVal] = useState(1);

  function updateLine(updatedLine: TInvoiceLine) {
    setLines(
      lines?.map((line) => {
        if (line.id === updatedLine.id) {
          return updatedLine;
        } else {
          return line;
        }
      })
    );
    // TODO: more updating line logic needed to trigger a line save and recalculate invoice totals.
    recalculateInvoice();
    console.log(lines);
  }

  async function addLine(selectedProduct: Product) {
    const productData = await fetchProductData(selectedProduct.id, {
      tax_rate: true,
    });

    // Run checks for inventory before adding line.
    productData.stock > 0
      ? addConfirmedLine(selectedProduct)
      : confirm("This product has 0 stock, are you sure you want to continue?")
      ? addConfirmedLine(selectedProduct)
      : null;
  }

  function addConfirmedLine(productData: Product) {
    let trimmedProductData = Object.assign({}, productData);
    delete trimmedProductData["tax_rate"];

    console.log(trimmedProductData);

    const newLine = {
      created_at: new Date(Date.now()).toISOString(),
      discount_percentage: 0,
      id: undefined,
      invoice_id: dataLogger.id,
      line_tax: "0",
      line_total: "0",
      price: productData.price,
      product: trimmedProductData,
      product_id: productData.id,
      quantity: 1,
      tax_rate: productData.tax_rate,
      tax_rate_id: productData.tax_rate_id,
      updated_at: new Date(Date.now()).toISOString(),
    };

    let line = recalculateLine(newLine);

    dataLogger.invoice_lines.push(line);
    recalculateInvoice();
  }

  function recalculateLine(line: InvoiceLine) {
    line.line_total =
      line.quantity * Number(line.product.price) -
      (line.quantity * Number(line.product.price) * line.discount_percentage) /
        100;
    line.price =
      Number(line.product.price) -
      Number(line.product.price) * (line.discount_percentage / 100);
    return line;
  }

  // console.log("lines", lines);

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
                  {lines.map((line, idx) => (
                    <InvoiceLine
                      key={line.id ? line.id : `new${idx}`}
                      line={line}
                      updateLine={updateLine}
                      recalculateLine={recalculateLine}
                    />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
        <NewInvoiceLine addLine={(id) => addLine(id)} />
      </div>
    </div>
  );
}
