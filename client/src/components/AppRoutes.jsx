import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/user-context";
import Layout from "./Layout";
import Customers from "./Customers/Customers";
import CustomerProfile from "./Customers/CustomerProfile";
import CustomerNew from "./Customers/CustomerNew";
import CustomerShow from "./Customers/CustomerShow";
import CustomerEdit from "./Customers/CustomerEdit";
import CustomerInvoices from "./Customers/CustomerInvoices";
import CustomerItems from "./Customers/CustomerItems";
import CustomerWorkOrders from "./Customers/CustomerWorkOrders";
import WorkOrders from "./WorkOrders/WorkOrders";
import Products from "./Products/Products";
import ProductShow from "./Products/ProductShow";
import ProductView from "./Products/ProductView";
import ProductMovements from "./Products/ProductMovements";
import ProductEdit from "./Products/ProductEdit";
import ProductNew from "./Products/ProductNew";
import Invoices from "./Invoices/Invoices";

import SignUp from "./Users/SignUp";
import Login from "./Users/Login";

function AppRoutes() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="customers" element={<Customers />}>
            <Route path=":id" element={<CustomerShow />}>
              <Route path="profile" element={<CustomerProfile />} />
              <Route path="invoices" element={<CustomerInvoices />} />
              <Route path="items" element={<CustomerItems />} />
              <Route path="workorders" element={<CustomerWorkOrders />} />
            </Route>
            <Route path=":id/edit" element={<CustomerEdit />} />
            <Route path="new" element={<CustomerNew />} />
          </Route>

          <Route path="products" element={<Products />}>
            <Route path=":id" element={<ProductShow />}>
              <Route path="view" element={<ProductView />} />
              <Route path="movements" element={<ProductMovements />} />
            </Route>
            <Route path=":id/edit" element={<ProductEdit />} />
            <Route path="new" element={<ProductNew />} />
          </Route>

          <Route path="workorders" element={<WorkOrders />} />

          <Route path="invoices" element={<Invoices />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default AppRoutes;
