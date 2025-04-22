import { useCustomersData } from "../../hooks/useCustomersData";
import { CUSTOMERCOLUMNOPTIONS, CUSTOMERCOLUMNS } from "../columns";
import { ResourcePage } from "../multiuse/ResourcePage";

function Customers() {
  return (
    <ResourcePage
      viewProp="view_customers"
      resourcePath="/customers"
      item="customer"
      title="Customers"
      getter={useCustomersData}
      columns={CUSTOMERCOLUMNS}
      colPreferences={"customer_columns"}
      colOptions={CUSTOMERCOLUMNOPTIONS}
    />
  );
}

export { Customers };
