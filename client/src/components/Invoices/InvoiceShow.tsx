import { fetchInvoiceData, editInvoice } from "../../services/invoiceServices";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import LoadingBox from "../../multiuse/LoadingBox";
import InvoiceForm from "../Unused/InvoiceForm";
import InvoiceFormAlt from "./InvoiceFormAlt";

import { objectToFormData } from "../../utils/formDataHelper";

function InvoiceShow() {
  // Main Pane states
  const [mainLoading, setMainLoading] = useState(true);
  const [mainError, setMainError] = useState("");
  const [mainData, setMainData] = useState({});
  let { id: invoiceID } = useParams();
  const [selection, setSelection] = useOutletContext();

  useEffect(() => {
    async function loadInvoiceData() {
      if (!invoiceID) {
        setMainData({});
        return;
      }
      try {
        setMainLoading(true);
        const response = await fetchInvoiceData(invoiceID);
        setMainData(response);
      } catch (e) {
        setMainError("An error occured fetching the invoice.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }

    loadInvoiceData();
  }, [invoiceID]);

  const navigate = useNavigate();

  async function handleEditSubmit(rawFormData) {
    try {
      const formData = objectToFormData({ invoice: rawFormData });
      await editInvoice(invoiceID, formData);
      navigate(`/invoices/${invoiceID}`);
    } catch (e) {
      console.error("Failed to save invoice: ", e);
    }
  }

  if (mainLoading) {
    return <LoadingBox text="Loading Invoice..." />;
  }

  return (
    <>
      {mainError && <p>An error occured.</p>}
      {!mainLoading && (
        <>
          <div className="pane-inner">
            <InvoiceFormAlt
              data={mainData}
              headerText={`Invoice ${mainData.id}`}
              buttonText={"Save"}
              onSubmit={(newData) => handleEditSubmit(newData)}
              handleCancel={() => setSelection("")}
            />
          </div>
        </>
      )}
    </>
  );
}

export default InvoiceShow;
