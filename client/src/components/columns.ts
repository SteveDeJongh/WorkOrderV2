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
export const INVOICECOLUMNSALT = [
  { keys: ["id"], header: "ID" },
  { keys: ["customer_id"], header: "Customer_ID" },
  { keys: ["total"], header: "Total" },
  { keys: ["balance"], header: "Balance" },
  { keys: ["status"], header: "Status" },
];

export const CUSTOMERCOLUMNS = [
  { keys: ["id"], header: "ID" },
  { keys: ["first_name", "last_name"], header: "Full Name" },
  { keys: ["first_name"], header: "First Name" },
  { keys: ["last_name"], header: "Last Name" },
  { keys: ["phone"], header: "Phone" },
  { keys: ["email"], header: "Email" },
  { keys: ["address"], header: "Address" },
  { keys: ["city"], header: "City" },
  { keys: ["province"], header: "Province" },
  { keys: ["country"], header: "Country" },
];

export const PRODUCTCOLUMNS = [
  { keys: ["id"], header: "ID" },
  { keys: ["sku"], header: "SKU" },
  { keys: ["upc"], header: "UPC" },
  { keys: ["name"], header: "Name" },
  { keys: ["description"], header: "Description" },
  { keys: ["price"], header: "Price" },
  { keys: ["taxrate"], header: "TaxRate" },
  { keys: ["stock"], header: "stock" },
  { keys: ["min"], header: "Min" },
  { keys: ["max"], header: "Max" },
]
