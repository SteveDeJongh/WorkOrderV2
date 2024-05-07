import { Link } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";

function SideBar({ currentPage }) {
  useEffect(() => {
    let links = Array.from(document.querySelectorAll(".sidebar-link"));
    let activePage = links.filter(
      (link) => link.id.split("-")[3] === currentPage
    )[0];
    activePage.classList.add("selected");
  });

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

SideBar.propTypes = {
  currentPage: PropTypes.string.isRequired,
};
