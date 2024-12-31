import { InvoiceForm } from "./InvoiceForm";
import { Invoice } from "../../types/invoiceTypes";

function InvoiceNew() {
  let newInvoice: Invoice = {
    id: null,
    customer_id: 0,
    user_id: 0,
    total: 0,
    sub_total: 0,
    balance: 0,
    tax: 0,
    created_at: new Date(Date.now()).toISOString(),
    updated_at: new Date(Date.now()).toISOString(),
    status: "open",
    invoice_lines: [],
    payments: [],
  };

  return (
    <>
      <div className="pane-inner">
        <InvoiceForm
          modalForm={false}
          buttonText={"Save"}
          invoiceData={newInvoice}
        />
      </div>
    </>
  );
}

export { InvoiceNew };
