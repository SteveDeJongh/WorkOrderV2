import { useProductsData } from "../../hooks/useProductsData";
import { PRODUCTCOLUMNOPTIONS, PRODUCTCOLUMNS } from "../columns";
import { ResourcePage } from "../multiuse/ResourcePage";

function Products() {
  return (
    <ResourcePage
      viewProp="view_products"
      resourcePath="/products"
      item="product"
      title="Products"
      getter={useProductsData}
      columns={PRODUCTCOLUMNS}
      colPreferences={"product_columns"}
      colOptions={PRODUCTCOLUMNOPTIONS}
    />
  );
}

export { Products };
