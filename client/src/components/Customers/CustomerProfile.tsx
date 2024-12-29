import { useOutletContext } from "react-router-dom";
import { Customer, CustomerContext } from "../../types/customers";

type CustomerWithNotices = Customer & {
  notices?: Notice[];
};

type Notice = {
  id: number;
  notice: string;
};

function CustomerProfile() {
  const { mainData } = useOutletContext<CustomerContext>();
  const customerData: CustomerWithNotices = { ...mainData };

  // Example Notices data, to be part of the customer data api fetch in the future.
  if (customerData && customerData.first_name == "Steve") {
    customerData.notices = [
      { id: 1, notice: "This is notice 1." },
      { id: 2, notice: "This is notice 2." },
    ];
  } else if (customerData) {
    customerData.notices = [];
  }

  let noticeCount = customerData ? customerData.notices?.length : 0;

  return (
    <>
      {!customerData && <h2>No Customer Selected</h2>}
      {customerData && (
        <>
          <div className="main-pane-content">
            <div className="panel">
              <h3>Details</h3>
              <div className="panel-contents">
                <div className="panel-contents-section">
                  <div className="panel-section-desc">📞</div>
                  <div className="panel-section-data">
                    <div className="data-item">{customerData.phone}</div>
                    <div className="data-item">{customerData.phone}</div>
                  </div>
                </div>
                <div className="panel-contents-section">
                  <div className="panel-section-desc">📧</div>
                  <div className="panel-section-data">
                    <div className="data-item">{customerData.email}</div>
                  </div>
                </div>
                <div className="panel-contents-section">
                  <div className="panel-section-desc">🏠</div>
                  <div className="panel-section-data">
                    <div className="data-item">{customerData.address}</div>
                    <div className="data-item">
                      {customerData.city} {customerData.province}{" "}
                      {customerData.postal}
                    </div>
                    <div className="data-item">{customerData.country}</div>
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
                {customerData.notices?.map((notice) => {
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

export { CustomerProfile };
