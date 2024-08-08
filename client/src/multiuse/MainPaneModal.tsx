import React from "react";
import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import LoadingBox from "./LoadingBox";
import CustomerForm from "../components/Customers/CustomerForm";
import { editCustomer } from "../services/customerServices";
import { objectToFormData } from "../utils/formDataHelper";

type Props = {
  resource: String;
  dataGeter: Function;
  open: boolean;
  children?: React.ReactNode;
  onClose: Function;
  resourceId: number;
};

function MainPaneModal({
  resource,
  dataGeter,
  open,
  children,
  onClose,
  resourceId,
}: Props) {
  if (!open) return null;

  function handleClose(e) {
    if (e.target.className === "main-modal-background") {
      onClose();
    }
  }

  // Main Pane states
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState("");
  const [mainData, setMainData] = useState({});
  const [tab, setTab] = useState("Profile");

  // Profile Tab
  useEffect(() => {
    async function loadCustomerData() {
      try {
        setMainLoading(true);
        const response = await dataGeter(resourceId);
        setMainData(response);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }

    loadCustomerData();
  }, [resourceId]);

  let entity = Object.keys(mainData).length < 1 ? false : mainData;

  // Example Notices data, to be part of the customer data api fetch in the future.
  if (entity && entity.firstName == "Steve") {
    entity.notices = [
      { id: 1, notice: "This is notice 1." },
      { id: 2, notice: "This is notice 2." },
    ];
  } else if (entity) {
    entity.notices = [];
  }

  let noticeCount = entity ? entity.notices.length : 0;

  console.log("entity", entity);

  // Edit Tab

  async function handleEditSubmit(rawData) {
    try {
      const formData = objectToFormData({ customer: rawData });
      await editCustomer(resourceId, formData);
      const response = await dataGeter(resourceId);
      setMainData(response);
      setTab("Profile");
    } catch (e) {
      console.error("Failed to create customer: ", e);
    }
  }

  const pages = ["Profile", "Edit", "Invoices", "Items", "WorkOrders"];

  return ReactDom.createPortal(
    <>
      <div className="main-modal-background" onClick={(e) => handleClose(e)}>
        <div className="main-modal">
          {mainLoading && <LoadingBox text="Loading Customer..." />}
          {mainError && <p>An error occured.</p>}
          {!mainLoading && !mainError && (
            <>
              <div className="modal-pane-header">
                <div className="modal-pane-header-title">
                  <h2>{`${mainData.firstName} ${mainData.lastName}`}</h2>
                  <div className="modal-pane-id">Customer {mainData.id}</div>
                </div>
                <div className="modal-pane-nav">
                  <ul className="modal-pane-nav mid-nav">
                    {pages.map((page: string) => {
                      return (
                        <li
                          key={page}
                          className={"mid-nav-pill"}
                          onClick={() => setTab(page)}
                        >
                          <span className={page === tab ? "active" : ""}>
                            {page}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {tab === "Profile" && (
                <>
                  <div className="main-pane-content">
                    <div className="panel">
                      <h3>Details</h3>
                      <div className="panel-contents">
                        <div className="panel-contents-section">
                          <div className="panel-section-desc">📞</div>
                          <div className="panel-section-data">
                            <div className="data-item">{entity.phone}</div>
                            <div className="data-item">{entity.phone}</div>
                          </div>
                        </div>
                        <div className="panel-contents-section">
                          <div className="panel-section-desc">📧</div>
                          <div className="panel-section-data">
                            <div className="data-item">{entity.email}</div>
                          </div>
                        </div>
                        <div className="panel-contents-section">
                          <div className="panel-section-desc">🏠</div>
                          <div className="panel-section-data">
                            <div className="data-item">{entity.address}</div>
                            <div className="data-item">
                              {entity.city} {entity.province} {entity.postal}
                            </div>
                            <div className="data-item">{entity.country}</div>
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
                        {noticeCount !== 0 &&
                          entity.notices.map((notice) => {
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
              {tab === "Edit" && (
                <>
                  <CustomerForm
                    modalForm={true}
                    customer={entity}
                    headerText={`Edit Customer`}
                    buttonText={"Save"}
                    onSubmit={handleEditSubmit}
                  />
                </>
              )}
              {tab === "Invoices" && <div>Invoices</div>}
              {tab === "Items" && <div>Items</div>}
              {tab === "WorkOrders" && <div>WorkOrders</div>}
            </>
          )}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default MainPaneModal;
