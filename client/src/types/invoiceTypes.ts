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

type Invoice = {
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

type Product = {
  cost: string;
  created_at: string;
  description: string;
  id: number;
  inventory: true;
  max: number;
  min: number;
  name: string;
  price: string;
  sku: string;
  stock: number;
  tax_rate: Tax_rate;
  tax_rate_id: number;
  upc: number;
  updated_at: string;
};

type Tax_rate = {
  created_at: string;
  id: number;
  percentage: number;
  updated_at: string;
};

type Payment = {
  amount: number;
  created_at?: string;
  updated_at?: string;
  id: number | string;
  invoice_id: number;
  method: string;
  _destroy?: boolean;
};

type Total = {
  total: number;
  tax: number;
  balance: number;
  status: "open" | "closed";
};

export { Action, Invoice, InvoiceLine, Product, Tax_rate, Payment, Total }