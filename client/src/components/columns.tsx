// Non-react table columns
export const MOVEMENTCOLUMNS = [
  { name: "Movement ID", propName: "id" },
  { name: "relation", propName: "relation" },
  { name: "Adjustment", propName: "adjustment", returnBoolean: true },
  { name: "Change", propName: "change" },
  { name: "Stock", propName: "stock" },
  { name: "ChangeType", propName: "change_type" },
  { name: "Time", propName: "created_at" },
  { name: "userId", propName: "user_id" },
];

export const INVOICECOLUMNS = [
  { name: "Invoice ID", propName: "id" },
  { name: "Status", propName: "status" },
  { name: "Total", propName: "total" },
  { name: "Tax", propName: "tax" },
  { name: "Balance", propName: "balance" },
  { name: "Updated", propName: "updated_at" },
  { name: "Created", propName: "created_at" },
];

// React-table columns
export const INVOICECOLUMNSALT: TColumn[] = [
  { keys: ["id"], id: "ID", header: "ID", sequence: 1, size: 200 },
  {
    keys: ["customer_id"],
    id: "Customer ID",
    header: "Customer ID",
    sequence: 2,
    size: 200,
  },
  { keys: ["status"], id: "Status", header: "Status", sequence: 3, size: 200 },
  {
    keys: ["total"],
    id: "Total",
    header: "Total",
    showAsDollars: true,
    sequence: 4,
    size: 200,
  },
  {
    keys: ["tax"],
    id: "Tax",
    header: "Tax",
    showAsDollars: true,
    sequence: 5,
    size: 200,
  },
  {
    keys: ["balance"],
    id: "Balance",
    header: "Balance",
    showAsDollars: true,
    sequence: 6,
    size: 200,
  },
  {
    keys: ["updated_at"],
    id: "Updated",
    header: "Updated",
    showAsDate: true,
    sequence: 7,
    size: 200,
  },
  {
    keys: ["created_at"],
    id: "Created",
    header: "Created",
    showAsDate: true,
    sequence: 8,
    size: 200,
  },
];
export const INVOICECOLUMNOPTIONS = INVOICECOLUMNSALT.map((col) => col.header);

export const CUSTOMERCOLUMNS: TColumn[] = [
  { keys: ["id"], header: "ID", size: 80, id: "ID", sequence: 1 },
  {
    keys: ["first_name", "last_name"],
    header: "Full Name",
    size: 115,
    id: "Full Name",
    sequence: 2,
  },
  {
    keys: ["first_name"],
    header: "First Name",
    size: 115,
    id: "First Name",
    sequence: 3,
  },
  {
    keys: ["last_name"],
    header: "Last Name",
    size: 115,
    id: "Last Name",
    sequence: 4,
  },
  { keys: ["phone"], header: "Phone", size: 110, id: "Phone", sequence: 5 },
  { keys: ["email"], header: "Email", size: 150, id: "Email", sequence: 6 },
  {
    keys: ["address"],
    header: "Address",
    size: 100,
    id: "Address",
    sequence: 7,
  },
  { keys: ["city"], header: "City", size: 100, id: "City", sequence: 8 },
  {
    keys: ["province"],
    header: "Province",
    size: 150,
    id: "Province",
    sequence: 9,
  },
  {
    keys: ["country"],
    header: "Country",
    size: 200,
    id: "Country",
    sequence: 10,
  },
];
export const CUSTOMERCOLUMNOPTIONS = CUSTOMERCOLUMNS.map((col) => col.header);

export const PRODUCTCOLUMNS: TColumn[] = [
  { keys: ["id"], id: "ID", header: "ID", size: 100, sequence: 1 },
  { keys: ["sku"], id: "SKU", header: "SKU", size: 100, sequence: 1 },
  { keys: ["upc"], id: "UPC", header: "UPC", size: 100, sequence: 1 },
  { keys: ["name"], id: "Name", header: "Name", size: 100, sequence: 1 },
  {
    keys: ["description"],
    id: "Description",
    header: "Description",
    size: 100,
    sequence: 1,
  },
  {
    keys: ["price"],
    id: "Price",
    header: "Price",
    size: 100,
    sequence: 1,
    showAsDollars: true,
  },
  {
    keys: ["tax_rate"],
    id: "TaxRate",
    header: "TaxRate",
    size: 100,
    sequence: 1,
  },
  { keys: ["stock"], id: "Stock", header: "Stock", size: 100, sequence: 1 },
  { keys: ["min"], id: "Min", header: "Min", size: 100, sequence: 1 },
  { keys: ["max"], id: "Max", header: "Max", size: 100, sequence: 1 },
];
export const PRODUCTCOLUMNOPTIONS = PRODUCTCOLUMNS.map((col) => col.header);

export type TColumn = {
  keys: string[];
  header: string;
  size?: number;
  id?: string;
  sequence?: number;
  showAsDollars?: boolean;
  showAsDate?: boolean;
};

let b = CUSTOMERCOLUMNS.map((col) => {
  return {
    id: col.id,
    size: col.size,
    sequence: col.sequence,
    display: true,
  };
});
