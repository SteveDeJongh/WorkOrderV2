export const INVOICECOLUMNS = [
  { name: "Invoice ID", propName: "id" },
  { name: "Status", propName: "status" },
  { name: "Total", propName: "total" },
  { name: "Tax", propName: "tax" },
  { name: "Balance", propName: "balance" },
  { name: "Updated", propName: "updated_at" },
  { name: "Created", propName: "created_at" },
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