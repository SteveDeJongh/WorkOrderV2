import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./whitespace-resets.css";
import "./App.css";
import { useEffect, useState } from "react";
import ErrorPage from "./error-page";
import UserContext from "./contexts/user-context";
import Layout from "./components/Layout";
import Index from "./components/Index";
import Customers from "./components/Customers/Customers";
import CustomerIndex from "./components/Customers/CustomerIndex";
import CustomerProfile from "./components/Customers/CustomerProfile";
import CustomerNew from "./components/Customers/CustomerNew";
import CustomerShow from "./components/Customers/CustomerShow";
import CustomerEdit from "./components/Customers/CustomerEdit";
import CustomerInvoices from "./components/Customers/CustomerInvoices";
import CustomerItems from "./components/Customers/CustomerItems";
import CustomerWorkOrders from "./components/Customers/CustomerWorkOrders";
import Products from "./components/Products/Products";
import ProductIndex from "./components/Products/ProductIndex";
import ProductShow from "./components/Products/ProductShow";
import ProductView from "./components/Products/ProductView";
import ProductMovements from "./components/Products/ProductMovements";
import ProductEdit from "./components/Products/ProductEdit";
import ProductNew from "./components/Products/ProductNew";
import Invoices from "./components/Invoices/Invoices";
import SignUp from "./components/Users/SignUp";
import Login from "./components/Users/Login";
import Profile from "./components/Users/Profile";
import EditProfile from "./components/Users/EditProfile";
import PageTitle from "./components/PageTitle";
import { getUserByToken } from "./services/userServices";
import ProtectedRoute from "./utils/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <PageTitle title="WorkOrder" />
        <Layout />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      // Page title done in each component for User actions
      {
        path: "login",
        element: <Login />,
      },
      {
        element: <ProtectedRoute role="admin" />,
        children: [
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
      {
        element: <ProtectedRoute role="user" />, // Users must be logged in to access these routes.
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          { path: "profile/edit", element: <EditProfile /> },
          {
            path: "customers",
            element: (
              <>
                <PageTitle title="Customers" />
                <Customers />
              </>
            ),
            children: [
              { index: true, element: <CustomerIndex /> },
              {
                path: ":id",
                element: <CustomerShow />,
                children: [
                  {
                    path: "profile",
                    element: <CustomerProfile />,
                  },
                  {
                    path: "invoices",
                    element: <CustomerInvoices />,
                  },
                  {
                    path: "items",
                    element: <CustomerItems />,
                  },
                  {
                    path: "workorders",
                    element: <CustomerWorkOrders />,
                  },
                ],
              },
              {
                path: ":id/edit",
                element: <CustomerEdit />,
              },
              {
                path: "new",
                element: <CustomerNew />,
              },
            ],
          },
          {
            path: "products",
            element: (
              <>
                <PageTitle title="Products" />
                <Products />
              </>
            ),
            children: [
              { index: true, element: <ProductIndex /> },
              {
                path: ":id",
                element: <ProductShow />,
                children: [
                  {
                    path: "view",
                    element: <ProductView />,
                  },
                  {
                    path: "movements",
                    element: <ProductMovements />,
                  },
                ],
              },
              {
                path: ":id/edit",
                element: <ProductEdit />,
              },
              {
                path: "new",
                element: <ProductNew />,
              },
            ],
          },
          {
            path: "invoices",
            element: <Invoices />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkActiveUser() {
      let token = localStorage.getItem("authToken");

      if (token) {
        console.log("We have a token.");
        try {
          const response = await getUserByToken(token);
          console.log(response.status.code);
          if (response.status.code === 204) {
            console.log("Sorry, that token expired.");
            localStorage.removeItem("authToken");
          } else {
            console.log("That's still a valid token, checking if user is set.");
            if (!user) {
              console.log("We didn't have a set user, so let's set it now.");
              response.data["views"] = {}; // To eventually come direct from API user call.
              setUser(response.data);
            }
          }
        } catch (e) {
          console.log("An error occured checking the token: ", e);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    checkActiveUser();
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
