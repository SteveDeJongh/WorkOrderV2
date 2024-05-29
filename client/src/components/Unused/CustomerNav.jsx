import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function CustomerNav({ title }) {
  return (
    <>
      <div id="main-pane-header">
        <div id="main-pane-header-title">
          <h2>{title}</h2>
          <div className="main-pane-id">Customer #{customer.id}</div>
        </div>
        <div id="main-pane-nav">
          <ul id="main-pane-profile-nav" className="mid-nav">
            <li className="mid-nav-pill">
              <NavLink to={`/customers/${customer.id}/profile`}>
                Profile
              </NavLink>
            </li>
            <li className="mid-nav-pill">
              <NavLink to={`/customers/${customer.id}/edit`}>Edit</NavLink>
            </li>
            <li className="mid-nav-pill">
              <NavLink to={`/customers/${customer.id}/invoices`}>
                Invoices
              </NavLink>
            </li>
            <li className="mid-nav-pill">
              <NavLink to={`/customers/${customer.id}/items`}>Items</NavLink>
            </li>
            <li className="mid-nav-pill">
              <NavLink to={`/customers/${customer.id}/workorders`}>
                WorkOrders
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

CustomerNav.propTypes = {
  customer: PropTypes.object,
};

export default CustomerNav;
