import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Customers from "./Customers";
import CustomerProfile from "./CustomerProfile";
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
        <Route path="customers" element={<Customers />}>
          <Route path=":id" element={<CustomerShow />}>
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="invoices" element={<CustomerInvoices />} />
          </Route>
          <Route path=":id/edit" element={<CustomerEdit />} />
          <Route path="new" element={<CustomerNew />} />
        </Route>
        <Route path="workorders" element={<WorkOrders />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
