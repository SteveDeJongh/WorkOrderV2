import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";

function NavBar({ currentPage }) {
  // useEffect(() => {
  //   let links = Array.from(document.querySelectorAll(".navBar-tab"));
  //   let activePage = links.filter(
  //     (link) => link.id.split("-")[3] === currentPage
  //   )[0];
  //   activePage.classList.add("selected");
  // });

  return (
    <>
      <nav>
        <ul>
          <li id="navBar-link-for-home" className="navBar-tab">
            <NavLink to="/">Home</NavLink>
          </li>
          <li id="navBar-link-for-customers" className="navBar-tab">
            <NavLink to="/customers">Customers</NavLink>
          </li>
          <li id="navBar-link-for-workorders" className="navBar-tab">
            <NavLink to="/workorders">Workorders</NavLink>
          </li>
          <li id="navBar-link-for-products" className="navBar-tab">
            <NavLink to="/products">Products</NavLink>
          </li>
          <li id="navBar-link-for-services" className="navBar-tab">
            <NavLink to="/services">Services</NavLink>
          </li>
          <li id="navBar-link-for-reports" className="navBar-tab">
            <NavLink to="/reports">Reports</NavLink>
          </li>
          <li id="navBar-link-for-settings" className="navBar-tab">
            <NavLink to="/settings">Settings</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;

NavBar.propTypes = {
  currentPage: PropTypes.string.isRequired,
};
