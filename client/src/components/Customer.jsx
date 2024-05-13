import PropTypes from "prop-types";

function Customer({ customer }) {
  console.log(customer);
  customer = Object.keys(customer).length < 1 ? false : customer;
  if (customer && customer.firstName == "Steve") {
    customer.notices = [
      { id: 1, notice: "This is notice 1." },
      { id: 2, notice: "This is notice 2." },
    ];
  } else if (customer) {
    customer.notices = [];
  }

  let noticeCount = customer ? customer.notices.length : 0;

  return (
    <>
      {!customer && <h2>No Customer Selected</h2>}
      {customer && (
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
                  <a href={`customers/${customer.id}`} className="selected">
                    Profile
                  </a>
                </li>
                <li>
                  <a href={`customers/${customer.id}`}>Edit</a>
                </li>
                <li>
                  <a href={`customers/${customer.id}`}>Details</a>
                </li>
              </ul>
            </div>
          </div>
          <div id="customer-info">
            <div className="panel customer-details">
              <h3>Details</h3>
              <div className="panel-contents">
                <div className="panel-contents-section">
                  <div className="panel-section-icon">📞</div>
                  <div className="panel-section-data">
                    <div className="data-item">{customer.phone}</div>
                    <div className="data-item">{customer.phone}</div>
                  </div>
                </div>
                <div className="panel-contents-section">
                  <div className="panel-section-icon">📧</div>
                  <div className="panel-section-data">
                    <div className="data-item">{customer.email}</div>
                  </div>
                </div>
                <div className="panel-contents-section">
                  <div className="panel-section-icon">🏠</div>
                  <div className="panel-section-data">
                    <div className="data-item">{customer.address}</div>
                    <div className="data-item">
                      {customer.city} {customer.province} {customer.postal}
                    </div>
                    <div className="data-item">{customer.country}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel customer-notices">
              <h3>
                Notices <span>({`${noticeCount}`})</span>
              </h3>
              <ul>
                {noticeCount === 0 && <li>No Notices</li>}
                {customer.notices.map((notice) => {
                  return <li key={notice.id}>{notice.notice}</li>;
                })}
              </ul>
            </div>
            <div className="panel customer-history">
              <h3>History</h3>
              <ul>
                <li>Todo...</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

Customer.propTypes = {
  customer: PropTypes.object,
};

export default Customer;
