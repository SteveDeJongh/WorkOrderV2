import React from "react";
import { useState, useEffect, useContext } from "react";
import ReactDom from "react-dom";
import LoadingBox from "../../multiuse/LoadingBox";
import InvoiceForm from "./InvoiceForm";
import { editInvoice, fetchInvoiceData } from "../../services/invoiceServices";
import { objectToFormData } from "../../utils/formDataHelper";
import { useQueryClient, useMutation } from "@tanstack/react-query";

type Props = {
  open: boolean;
  onClose: Function;
  resourceId: number | null;
  searchTerm: String;
};

function InvoiceModal({ open, onClose, resourceId, searchTerm }: Props) {
  function handleClose(e) {
    if (e.target.className === "main-modal-background") {
      onClose();
    }
  }

  // Main Pane states
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState("");
  const [mainData, setMainData] = useState({});
  const [tab, setTab] = useState("View");

  // Profile Tab
  useEffect(() => {
    async function looadInvoiceData() {
      try {
        setMainLoading(true);
        const response = await fetchInvoiceData(resourceId);
        setMainData(response);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }
    if (resourceId) {
      looadInvoiceData();
    }
  }, [resourceId]);

  let entity = Object.keys(mainData).length < 1 ? false : mainData;

  // Edit Tab
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (rawData) => {
      const formData = objectToFormData({ invoice: rawData });
      await editInvoice(resourceId, formData);
      return await fetchInvoiceData(resourceId);
    },
    onSuccess: (data) => {
      setMainData(data);
      const oldData = queryClient.getQueryData(["invoices", searchTerm]);
      let newData = oldData.map((entry) =>
        entry.id === resourceId ? data : entry
      );
      queryClient.setQueryData(["invoices", searchTerm], newData);
      setTab("View");
    },
  });

  const pages = ["View"];

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
                  <h2>{mainData.id}</h2>
                  <div className="modal-pane-id">Invoice {mainData.id}</div>
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
              {tab === "View" && (
                <>
                  <div>Woohoo</div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default InvoiceModal;
