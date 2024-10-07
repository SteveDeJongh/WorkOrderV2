import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomerData } from "../../services/customerServices";
import LoadingBox from "../../multiuse/LoadingBox";

function CustomerProfile() {
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState(false);
  const [customerData, setcustomerData] = useState({});
  let { id } = useParams();

  useEffect(() => {
    async function loadCustomerData() {
      if (!id) {
        setcustomerData({});
        return;
      }
      try {
        setMainLoading(true);
        const response = await fetchCustomerData(id);
        setcustomerData(response);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }

    loadCustomerData();
  }, [id]);

  // console.log(customerData);
  let customer = Object.keys(customerData).length < 1 ? false : customerData;

  // Example Notices data, to be part of the customer data api fetch in the future.
  if (customer && customer.first_name == "Steve") {
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
      {mainLoading && <LoadingBox text="Loading Profile..." />}
      {mainError && <p>An error occured.</p>}
      {!mainLoading && !mainError && (
        <>
          {!customer && <h2>No Customer Selected</h2>}
          {customer && (
            <>
              <div className="main-pane-content">
                <div className="panel">
                  <h3>Details</h3>
                  <div className="panel-contents">
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">📞</div>
                      <div className="panel-section-data">
                        <div className="data-item">{customer.phone}</div>
                        <div className="data-item">{customer.phone}</div>
                      </div>
                    </div>
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">📧</div>
                      <div className="panel-section-data">
                        <div className="data-item">{customer.email}</div>
                      </div>
                    </div>
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">🏠</div>
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
      )}
    </>
  );
}

export default CustomerProfile;
