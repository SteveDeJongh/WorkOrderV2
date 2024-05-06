import { Link } from "react-router-dom";
import { useEffect } from "react";

function SideBar({ currentPage }) {
  useEffect(() => {
    let links = Array.from(document.querySelectorAll(".sidebar-link"));
    let activePage = links.filter(
      (link) => link.id.split("-")[3] === currentPage
    )[0];
    activePage.classList.add("selected");
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li id="sidebar-link-for-dashboard" className="sidebar-link">
            <Link to="/">Dashboard</Link>
          </li>
          <li id="sidebar-link-for-customers" className="sidebar-link">
            <Link to="/customers">Customers</Link>
          </li>
          <li id="sidebar-link-for-workorders" className="sidebar-link">
            <Link to="/workorders">Workorders</Link>
          </li>
          <li id="sidebar-link-for-products" className="sidebar-link">
            <Link to="/products">Products</Link>
          </li>
          <li id="sidebar-link-for-services" className="sidebar-link">
            <Link to="/services">Services</Link>
          </li>
          <li id="sidebar-link-for-reports" className="sidebar-link">
            <Link to="/reports">Reports</Link>
          </li>
          <li id="sidebar-link-for-settings" className="sidebar-link">
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideBar;

{
  /* <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">Customers</li>
        <li className="nav-item">Invoices</li>
        <li className="nav-item">WorkOrders</li>
        <li className="nav-item">Products</li>
        <li className="nav-item">Labour</li>
        <li className="nav-item">Reports</li>
      </ul>
    </div> */
}

{
  /* <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a
            href="/"
            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-5 d-none d-sm-inline text-white">
              Work Order
            </span>
          </a>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="nav-item">
              <a href="#" className="nav-link align-middle px-0">
                <i className="fs-4 bi-house"></i>{" "}
                <span className="ms-1 d-none d-sm-inline text-white">
                  DashBoard
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table"></i>{" "}
                <span className="ms-1 d-none d-sm-inline text-white">
                  Customers
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table"></i>{" "}
                <span className="ms-1 d-none d-sm-inline text-white">
                  WorkOrders
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table"></i>{" "}
                <span className="ms-1 d-none d-sm-inline text-white">
                  Products
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table"></i>{" "}
                <span className="ms-1 d-none d-sm-inline text-white">
                  Services
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table"></i>{" "}
                <span className="ms-1 d-none d-sm-inline text-white">
                  Reports
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table"></i>{" "}
                <span className="ms-1 d-none d-sm-inline text-white">
                  Users
                </span>
              </a>
            </li>
          </ul>
          <hr />
          <ul>
            <li>
              <a href="#" className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table"></i>{" "}
                <span className="ms-1 d-none d-sm-inline text-white">
                  Settings
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div> */
}
