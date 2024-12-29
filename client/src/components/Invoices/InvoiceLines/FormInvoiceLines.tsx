import { useState, useEffect } from "react";
import { fetchProductData } from "../../../services/productServices";
import { InvoiceLine } from "./InvoiceLine";
import { NewInvoiceLine } from "./NewInvoiceLine";
import {
  Action,
  InvoiceLine as TInvoiceLine,
  InvoiceColumn,
} from "../../../types/invoiceTypes";
import { Product } from "../../../types/products";

type props = {
  invoice_lines: TInvoiceLine[];
  adminActions: boolean;
  invoice_id: number | null;
  dispatch: React.Dispatch<Action>;
};

function FormInvoiceLines({ invoice_lines = [], invoice_id, dispatch }: props) {
  const [lines, setLines] = useState<TInvoiceLine[]>(invoice_lines);

  useEffect(() => {
    console.log("*** invoice_lines changed ", invoice_lines);
    setLines(invoice_lines);
  }, [invoice_lines]);

  console.log("*** FormInvoiceLines rerender", lines);

  function updateLine(updatedLine: TInvoiceLine) {
    const invoiceLine = recalculateLine(updatedLine);
    dispatch({ type: "updateInvoiceLine", invoice_line: invoiceLine });
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

  let columns: InvoiceColumn[] = [
    // {
    //   keyName: "id",
    //   productValue: false,
    //   editable: false,
    //   type: "number",
    //   showAsDollars: false,
    // },
    {
      keyName: "movement_created",
      title: "Status",
      productValue: false,
      editable: false,
      type: "text",
      showAsDollars: false,
    },
    {
      keyName: "sku",
      title: "Sku",
      productValue: true,
      editable: false,
      type: "text",
      showAsDollars: false,
    },
    {
      keyName: "description",
      title: "Description",
      productValue: true,
      editable: false,
      type: "text",
      showAsDollars: false,
    },
    {
      keyName: "quantity",
      title: "Qty",
      productValue: false,
      editable: true,
      type: "number",
      showAsDollars: false,
    },
    {
      keyName: "discount_percentage",
      title: "Discount %",
      productValue: false,
      editable: true,
      type: "number",
      showAsDollars: false,
    },
    {
      keyName: "price",
      title: "MSRP",
      productValue: true,
      editable: false,
      type: "test",
      showAsDollars: true,
    },
    {
      keyName: "price",
      title: "Price",
      productValue: false,
      editable: false,
      type: "text",
      showAsDollars: true,
    },
    {
      keyName: "line_total",
      title: "Total",
      productValue: false,
      editable: false,
      type: "text",
      showAsDollars: true,
    },
    {
      keyName: "line_tax",
      title: "Tax",
      productValue: false,
      editable: false,
      type: "text",
      showAsDollars: true,
    },
  ];

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
                  {columns.map((column) => (
                    <th key={`header${column.title}`}>{column.title}</th>
                  ))}
                </tr>
              </thead>
              {lines && (
                <tbody>
                  {lines.map((line, idx) => (
                    <InvoiceLine
                      key={line.id ? line.id : `new${idx}`}
                      line={line}
                      updateLine={updateLine}
                      columns={columns}
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

export { FormInvoiceLines };
