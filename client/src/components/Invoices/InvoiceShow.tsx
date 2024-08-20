import { fetchInvoiceData, editInvoice } from "../../services/invoiceServices";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import LoadingBox from "../../multiuse/LoadingBox";
import InvoiceForm from "./InvoiceForm";
import { objectToFormData } from "../../utils/formDataHelper";

function InvoiceShow() {
  // Main Pane states
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState("");
  const [mainData, setMainData] = useState({});
  // const [selection, setSelection] = useOutletContext();

  let { id } = useParams();

  useEffect(() => {
    async function loadInvoiceData() {
      if (!id) {
        setMainData({});
        return;
      }
      try {
        setMainLoading(true);
        const response = await fetchInvoiceData(id);
        setMainData(response);
      } catch (e) {
        setMainError("An error occured fetching the invoice.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }

    loadInvoiceData();
  }, [id]);
  const navigate = useNavigate();

  async function handleEditSubmit(rawData) {
    try {
      const formData = objectToFormData({ invoice: rawData });
      await editInvoice(id, formData);
      navigate(`/invoices/${id}`);
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
            <InvoiceForm
              data={mainData}
              headerText={`Invoice ${mainData.id}`}
              buttonText={"Save"}
              onSubmit={handleEditSubmit}
              handleCancel={() => navigate("/invoices")}
            />
          </div>
        </>
      )}
    </>
  );
}

export default InvoiceShow;
