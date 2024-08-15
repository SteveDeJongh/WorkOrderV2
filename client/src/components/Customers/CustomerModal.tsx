import React from "react";
import { useState, useEffect, useContext } from "react";
import ReactDom from "react-dom";
import LoadingBox from "../../multiuse/LoadingBox";
import CustomerForm from "./CustomerForm";
import {
  editCustomer,
  fetchCustomerData,
} from "../../services/customerServices";
import { objectToFormData } from "../../utils/formDataHelper";
import { useQueryClient, useMutation } from "@tanstack/react-query";

type Props = {
  open: boolean;
  onClose: Function;
  resourceId: number | null;
  searchTerm: String;
};

function CustomerModal({ open, onClose, resourceId, searchTerm }: Props) {
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
        const response = await fetchCustomerData(resourceId);
        setMainData(response);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }
    if (resourceId) {
      loadCustomerData();
    }
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

  // Edit Tab
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (rawData) => {
      const formData = objectToFormData({ customer: rawData });
      await editCustomer(resourceId, formData);
      return await fetchCustomerData(resourceId);
    },
    onSuccess: (data) => {
      setMainData(data);
      const oldData = queryClient.getQueryData(["customers", searchTerm]);
      let newData = oldData.map((entry) =>
        entry.id === resourceId ? data : entry
      );
      queryClient.setQueryData(["customers", searchTerm], newData);
      setTab("Profile");
    },
  });

  const pages = ["Profile", "Edit", "Invoices"];

  if (!open) return null;

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
                  <h2>{`${mainData.first_name} ${mainData.last_name}`}</h2>
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
                  <div className="modal-content">
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
                    handleCancel={() => setTab("Profile")}
                    customer={entity}
                    headerText={`Edit Customer`}
                    buttonText={"Save"}
                    onSubmit={mutate}
                  />
                </>
              )}
              {tab === "Invoices" && <div>Invoices</div>}
            </>
          )}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default CustomerModal;
