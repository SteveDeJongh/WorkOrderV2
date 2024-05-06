import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Customers from "./Customers";
import WorkOrders from "./WorkOrders";
import Products from "./Products";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/workorders" element={<WorkOrders />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}

export default AppRoutes;
