import { useState, useRef, useEffect } from "react";
import { fetchProductData } from "../../../services/productServices";
import InvoiceLine from "./InvoiceLine";
import NewInvoiceLine from "./NewInvoiceLine";
import {
  Action,
  InvoiceLine as TInvoiceLine,
  Product,
} from "../../../types/invoiceTypes";

type props = {
  invoice_lines: TInvoiceLine[];
  adminActions: boolean;
  invoice_id: number | null;
  dispatch: React.Dispatch<Action>;
};

export default function FormInvoiceLines({
  invoice_lines = [],
  adminActions,
  invoice_id,
  dispatch,
}: props) {
  const [lines, setLines] = useState<TInvoiceLine[]>(invoice_lines);

  useEffect(() => {
    console.log("*** invoice_lines changed ", invoice_lines);
    setLines(invoice_lines);
  }, [invoice_lines]);

  console.log("*** FormInvoiceLines rerender", lines);

  function updateLine(updatedLine: TInvoiceLine) {
    dispatch({ type: "updateInvoiceLine", invoice_line: updatedLine });
    dispatch({ type: "recaculateInvoice" });
  }

  async function addLine(selectedProduct: Product) {
    const productData = await fetchProductData(selectedProduct.id, {
      tax_rate: true,
    });

    // Run checks for inventory before adding line.
    productData.stock > 0
      ? addConfirmedLine(productData)
      : confirm("This product has 0 stock, are you sure you want to continue?")
      ? addConfirmedLine(productData)
      : null;
  }

  function addConfirmedLine(productData: Product) {
    const newLine: TInvoiceLine = {
      id: null,
      invoice_id: invoice_id,
      product_id: productData.id,
      created_at: new Date(Date.now()).toISOString(),
      discount_percentage: 0,
      line_tax: 0,
      line_total: 0,
      price: Number(productData.price),
      product: productData,
      quantity: 1,
      updated_at: new Date(Date.now()).toISOString(),
      movement_created: false,
    };

    let line = recalculateLine(newLine);

    dispatch({ type: "createInvoiceLine", invoice_line: line });
    dispatch({ type: "recaculateInvoice" });
  }

  function recalculateLine(line: TInvoiceLine) {
    line.line_total =
      line.quantity * Number(line.product.price) -
      (line.quantity * Number(line.product.price) * line.discount_percentage) /
        100;
    line.price =
      Number(line.product.price) -
      Number(line.product.price) * (line.discount_percentage / 100);
    line.line_tax =
      Number(line.line_total) * Number(line.product.tax_rate.percentage);
    return line;
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
                  <th>Line Tax</th>
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
        <NewInvoiceLine addLine={(product: Product) => addLine(product)} />
      </div>
    </div>
  );
}
