import { NavLink } from "react-router-dom";

function NavBar() {
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
          <li id="navBar-link-for-reports" className="navBar-tab">
            <NavLink to="/invoices">Invoices</NavLink>
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
