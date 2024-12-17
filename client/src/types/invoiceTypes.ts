import { Product } from "./products"
import { Payment } from "./payments";

type Action =
  | { type: "setInvoice"; data: Invoice }
  | { type: "recaculateInvoice" }
  | { type: "updateCustomer"; customerId: number }
  | { type: "removeCustomer" }
  | { type: "createInvoiceLine"; invoice_line: InvoiceLine}
  | { type: "updateInvoiceLine"; invoice_line: InvoiceLine }
  | { type: "togglePaymentDelete"; paymentId: number | string; created_at: string | Date }
  | { type: "updatePayment"; payment: Payment }
  | { type: "createPayment"; payment: Payment };

type NestedInvoiceData = {
  invoice: InitialInvoice;
}

type InitialInvoice = {
  id: number | null;
  customer_id: number | undefined;
  user_id: number;
  total: number;
  sub_total: number;
  balance: number;
  tax: number;
  created_at: string;
  updated_at: string;
  status: "open" | "closed";
}

type Invoice = InitialInvoice & {
  // id: number | null;
  // customer_id: number | undefined;
  // user_id: number;
  // total: number;
  // sub_total: number;
  // balance: number;
  // tax: number;
  // created_at: string;
  // updated_at: string;
  // status: "open" | "closed";
  invoice_lines: InvoiceLine[]; // changed from an optional property.
  payments: Payment[];
};

type InvoiceLine = {
  id: number | null;
  invoice_id: number | null;
  product_id: number;
  discount_percentage: number;
  price: number;
  created_at: string;
  updated_at: string;
  line_tax: number;
  line_total: number;
  quantity: number;
  product: Product;
  changed?: boolean;
  movement_created: boolean;
};

type Total = {
  total: number;
  tax: number;
  balance: number;
  status: "open" | "closed";
};

type InvoiceColumn = {
    keyName: string;
    title: string;
    productValue: boolean;
    editable: boolean;
    type: string;
    showAsDollars: boolean;
};

type SelectionContext = {
  selection: string | number;
  setSelection: React.Dispatch<React.SetStateAction<string | number>>;
}

function isInvoice(invoice: Invoice | Object): invoice is Invoice {
  return (invoice as Invoice).total !== undefined && (invoice as Invoice).sub_total !== undefined;
}

export { Action, Invoice, InvoiceLine, Total, InvoiceColumn, NestedInvoiceData, SelectionContext, isInvoice }