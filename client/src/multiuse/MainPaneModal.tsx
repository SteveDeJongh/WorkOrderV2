import React from "react";
import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import LoadingBox from "./LoadingBox";
import MainPaneNav from "./MainPaneNav";

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
                          className={
                            page === tab
                              ? "mid-nav-pill active"
                              : "mid-nav-pill"
                          }
                          onClick={() => setTab(page)}
                        >
                          {page}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="modal-content">
                <div className="panel">weee</div>
                <div className="panel">weee</div>
                <div className="panel">weee</div>
              </div>
            </>
          )}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default MainPaneModal;
