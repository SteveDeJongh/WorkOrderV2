import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Customers from "./Customers";
import NewCustomer from "./NewCustomer";
import ShowCustomer from "./ShowCustomer";
import WorkOrders from "./WorkOrders";
import Products from "./Products";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route path="customers" element={<Customers />}></Route>
        <Route path="customers/new" element={<NewCustomer />} /> */}
        <Route path="customers" element={<Customers />}>
          <Route path=":id" element={<ShowCustomer />} />
          <Route path="new" element={<NewCustomer />} />
        </Route>
        <Route path="workorders" element={<WorkOrders />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
