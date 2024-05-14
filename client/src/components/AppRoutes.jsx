import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Customers from "./Customers";
import CustomerNew from "./CustomerNew";
import CustomerShow from "./CustomerShow";
import CustomerEdit from "./CustomerEdit";
import CustomerInvoices from "./CustomerInvoices";
import WorkOrders from "./WorkOrders";
import Products from "./Products";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route path="customers" element={<Customers />}></Route>
        <Route path="customers/new" element={<CustomerNew />} /> */}
        <Route path="customers" element={<Customers />}>
          <Route path=":id" element={<CustomerShow />} />
          <Route path=":id/edit" element={<CustomerEdit />} />
          <Route path=":id/invoices" element={<CustomerInvoices />} />
          <Route path="new" element={<CustomerNew />} />
        </Route>
        <Route path="workorders" element={<WorkOrders />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
