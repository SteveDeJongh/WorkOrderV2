import { Link } from "react-router-dom";
import { API_URL } from "../constants";

function NavBar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">Customers</li>
        <li className="nav-item">Invoices</li>
        <li className="nav-item">WorkOrders</li>
        <li className="nav-item">Products</li>
        <li className="nav-item">Labour</li>
        <li className="nav-item">Reports</li>
      </ul>
    </div>
  );
}

export default NavBar;
