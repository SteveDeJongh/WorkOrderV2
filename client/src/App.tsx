import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./whitespace-resets.css";
import "./App.css";
import { useEffect, useState } from "react";
import { UserContext } from "./contexts/user-context";
// Navigation/Layout
import Layout from "./components/Layout";
import Index from "./components/Index";
import ErrorPage from "./error-page";
import PageTitle from "./components/PageTitle";
import ProtectedRoute from "./utils/ProtectedRoute";
// Customers
import Customers from "./components/Customers/Customers";
import CustomerProfile from "./components/Customers/CustomerProfile";
import CustomerNew from "./components/Customers/CustomerNew";
import CustomerShow from "./components/Customers/CustomerShow";
import CustomerEdit from "./components/Customers/CustomerEdit";
import CustomerInvoices from "./components/Customers/CustomerInvoices";
// Products
import Products from "./components/Products/Products";
import PageIndex from "./components/multiuse/PageIndex";
import ProductShow from "./components/Products/ProductShow";
import ProductView from "./components/Products/ProductView";
import ProductMovements from "./components/Products/ProductMovements";
import ProductEdit from "./components/Products/ProductEdit";
import ProductNew from "./components/Products/ProductNew";
// Invoices
import Invoices from "./components/Invoices/Invoices";
import InvoiceShow from "./components/Invoices/InvoiceShow";
import InvoiceNew from "./components/Invoices/InvoiceNew";
// Users
import SignUp from "./components/Users/SignUp";
import Login from "./components/Users/Login";
import Profile from "./components/Users/Profile";
import EditProfile from "./components/Users/EditProfile";
import { getUserByToken } from "./services/userServices";
import { User } from "./types/users";

import { interceptor } from "./interceptors/interceptor";

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
        element: <ProtectedRoute role="admin" />, // User must be an admin to create a new user.
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
              { index: true, element: <PageIndex title="customer" /> },
              {
                path: ":id",
                element: <CustomerShow />,
                children: [
                  {
                    path: "profile",
                    element: (
                      <>
                        <PageTitle title="Customer Profile" />
                        <CustomerProfile />
                      </>
                    ),
                  },
                  {
                    path: "invoices",
                    element: (
                      <>
                        <PageTitle title="Customer Invoices" />
                        <CustomerInvoices />
                      </>
                    ),
                  },
                  {
                    path: "edit",
                    element: (
                      <>
                        <PageTitle title="Edit Customer" />
                        <CustomerEdit />
                      </>
                    ),
                  },
                ],
              },
              {
                path: "new",
                element: (
                  <>
                    <PageTitle title="New Customer" />
                    <CustomerNew />
                  </>
                ),
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
              { index: true, element: <PageIndex title="product" /> },
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
                  {
                    path: "edit",
                    element: <ProductEdit />,
                  },
                ],
              },
              {
                path: "new",
                element: <ProductNew />,
              },
            ],
          },
          {
            path: "invoices",
            element: (
              <>
                <PageTitle title="Invoices" />
                <Invoices />
              </>
            ),
            children: [
              { index: true, element: <PageIndex title={"invoice"} /> },
              {
                path: ":id",
                element: (
                  <>
                    <PageTitle title={"View Invoice"} />
                    <InvoiceShow />
                  </>
                ),
              },
              {
                path: "new",
                element: (
                  <>
                    <PageTitle title="New Invoice" />
                    <InvoiceNew />
                  </>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [intercept, _] = useState(true);

  useEffect(() => {
    if (intercept) {
      // Loads interceptor if state is set to true.
      interceptor();
    }
  }, [intercept]);

  useEffect(() => {
    async function checkActiveUser() {
      let token = localStorage.getItem("authToken");

      if (token) {
        console.log("We have a token.");
        try {
          const response = await getUserByToken(token);
          console.log(response.status);
          if (response.status.code === 204) {
            console.log("Sorry, that token expired.");
            localStorage.removeItem("authToken");
            window.dispatchEvent(new Event("storage"));
          } else {
            console.log("That's still a valid token, checking if user is set.");
            if (!user) {
              console.log("We didn't have a set user, so let's set it now.");
              response.data["views"] = {
                customers: null,
                products: null,
                invoices: null,
              }; // To eventually come direct from API user call.
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
  }, []);

  useEffect(() => {
    window.addEventListener("authChange", storageChange);

    function storageChange() {
      console.log("There was a change to our authToken.");
      if (!localStorage.getItem("authToken")) {
        console.log("We no longer have a token, removing user.");
        setUser(null);
      }
    }

    return () => {
      window.removeEventListener("authChange", storageChange);
    };
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
