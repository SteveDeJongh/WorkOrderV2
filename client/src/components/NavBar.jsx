import React from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";

function NavBar() {
  return (
    <ul className="list-group">
      <li className="list-group-item">
        <Link htmlFor="/">Customers</Link>
      </li>
      <li>
        <Link htmlFor="/">Invoices</Link>
      </li>
      <li>
        <Link htmlFor="/">Work Orders</Link>
      </li>
      <li>
        <Link htmlFor="/">Products</Link>
      </li>
      <li>
        <Link htmlFor="/">Labour</Link>
      </li>
    </ul>
  );
}

export default NavBar;
