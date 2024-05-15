import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function CustomerNav({ customer }) {
  return (
    <>
      <div id="customer-header">
        <div id="customer-header-title">
          <h2>
            {customer.firstName} {customer.lastName}
          </h2>
          <div className="customer-id">Customer #{customer.id}</div>
        </div>
        <div id="customer-nav">
          <ul id="customer-profile-nav">
            <li>
              <NavLink
                to={`/customers/${customer.id}/profile`}
                className="active"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`/customers/${customer.id}/edit`}>Edit</NavLink>
            </li>
            <li>
              <NavLink to={`/customers/${customer.id}/invoices`}>
                Invoices
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
