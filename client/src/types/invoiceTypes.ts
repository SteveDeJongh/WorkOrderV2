type Invoice = {
  id: number;
  customer_id: number;
  user_id: number;
  total: number;
  balance: number;
  tax: number;
  created_at: string;
  updated_at: string;
  status: string;
  invoice_lines?: Array<InvoiceLine>;
  payments?: Array<Payment>;
};

type InvoiceLine = {
  id: number;
  invoice_id: number;
  product_id: number;
  discount_percentage: number;
  price: number;
  created_at: string;
  updated_at: string;
  line_tax: number;
  line_total: number;
  quantity: number;
  tax_rate: Tax_rate;
  product: Product;
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
  tax_rate: number;
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
};

export { Invoice, InvoiceLine, Product, Tax_rate, Payment, Total }