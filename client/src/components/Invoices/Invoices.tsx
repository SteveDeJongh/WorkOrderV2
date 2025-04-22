import { useInvoicesData } from "../../hooks/useInvoicesData";
import { INVOICECOLUMNOPTIONS, INVOICECOLUMNSALT } from "../columns";
import { ResourcePage } from "../multiuse/ResourcePage";

function Invoices() {
  return (
    <ResourcePage
      viewProp="view_invoices"
      resourcePath="/invoices"
      item="invoice"
      title="Invoices"
      getter={useInvoicesData}
      columns={INVOICECOLUMNSALT}
      colPreferences={"invoice_columns"}
      colOptions={INVOICECOLUMNOPTIONS}
    />
  );
}

export { Invoices };
