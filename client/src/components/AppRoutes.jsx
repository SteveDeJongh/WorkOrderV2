import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Customers from "./Customers";
import WorkOrders from "./WorkOrders";
import Products from "./Products";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="customers" element={<Customers />} />
        <Route path="workorders" element={<WorkOrders />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
