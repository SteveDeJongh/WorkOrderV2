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
  { keys: ["id"], header: "ID" },
  { keys: ["customer_id"], header: "Customer ID" },
  { keys: ["status"], header: "Status" },
  { keys: ["total"], header: "Total", showAsDollars: true },
  { keys: ["tax"], header: "Tax", showAsDollars: true },
  { keys: ["balance"], header: "Balance", showAsDollars: true },
  { keys: ["updated_at"], header: "Updated", showAsDate: true },
  { keys: ["created_at"], header: "Created", showAsDate: true },
];

export const INVOICECOLUMNOPTIONS = INVOICECOLUMNSALT.map((col) => col.header);

export const CUSTOMERCOLUMNS: TColumn[] = [
  { keys: ["id"], header: "ID", size: 1200, id: "ID" },
  {
    keys: ["first_name", "last_name"],
    header: "Full Name",
    size: 200,
    id: "Full Name",
  },
  { keys: ["first_name"], header: "First Name", size: 200, id: "First Name" },
  { keys: ["last_name"], header: "Last Name", size: 200, id: "Last Name" },
  { keys: ["phone"], header: "Phone", size: 200, id: "Phone" },
  { keys: ["email"], header: "Email", size: 200, id: "Email" },
  { keys: ["address"], header: "Address", size: 200, id: "Address" },
  { keys: ["city"], header: "City", size: 200, id: "City" },
  { keys: ["province"], header: "Province", size: 200, id: "Province" },
  { keys: ["country"], header: "Country", size: 200, id: "Country" },
];

export const CUSTOMERCOLUMNOPTIONS = CUSTOMERCOLUMNS.map((col) => col.header);

// Alternate Customercolumn with aaccesorKEy and cell function.
export const CUSTOMERCOLUMNSEXTRA = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (props) => {
      return <>{props.getValue()}</>;
    },
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
    cell: (props) => {
      return (
        <>
          {props.row.original.first_name} {props.row.original.last_name}
        </>
      );
    },
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: (props) => <>{props.getValue()}</>,
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: (props) => {
      return <>{props.getValue()}</>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: (props) => <>{props.getValue()}</>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (props) => <>{props.getValue()}</>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: (props) => <>{props.getValue()}</>,
  },
  {
    accessorKey: "city",
    header: "City",
    cell: (props) => <>{props.getValue()}</>,
  },
  {
    accessorKey: "province",
    header: "Province",
    cell: (props) => <>{props.getValue()}</>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: (props) => <>{props.getValue()}</>,
  },
];

export const PRODUCTCOLUMNS: TColumn[] = [
  { keys: ["id"], header: "ID" },
  { keys: ["sku"], header: "SKU" },
  { keys: ["upc"], header: "UPC" },
  { keys: ["name"], header: "Name" },
  { keys: ["description"], header: "Description" },
  { keys: ["price"], header: "Price", showAsDollars: true },
  { keys: ["tax_rate"], header: "TaxRate" },
  { keys: ["stock"], header: "Stock" },
  { keys: ["min"], header: "Min" },
  { keys: ["max"], header: "Max" },
];

export const PRODUCTCOLUMNOPTIONS = PRODUCTCOLUMNS.map((col) => col.header);

export type TColumn = {
  keys: string[];
  header: string;
  size?: number;
  id?: string;
  showAsDollars?: boolean;
  showAsDate?: boolean;
};
