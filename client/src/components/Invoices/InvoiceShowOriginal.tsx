import { fetchInvoiceData, editInvoice } from "../../services/invoiceServices";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import LoadingBox from "../../multiuse/LoadingBox";
import InvoiceForm from "./InvoiceForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { objectToFormData } from "../../utils/formDataHelper";

function InvoiceShow() {
  // Main Pane states
  const [mainLoading, setMainLoading] = useState(true);
  const [mainError, setMainError] = useState("");
  const [mainData, setMainData] = useState({});
  let { id: invoiceID } = useParams();

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

  const queryClient = useQueryClient();

  const {
    mutate: handleEditSubmit,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (dldata) => {
      const allowed = ["customer_id", "user_id", "total", "balance", "tax"];

      let allowedParams = {};
      Object.keys(dldata)
        .filter((key) => allowed.includes(key))
        .forEach((key) => {
          allowedParams[key] = dldata[key];
        });

      const formData = objectToFormData({ invoice: allowedParams });
      console.log("Updating invoice...");
      return editInvoice(invoiceID, formData);
    },
    onSuccess: (updatedInvoice) => {
      console.log("Invoice updated!");
      console.log(updatedInvoice);
      // queryClient.setQueryData(["products"], (oldProducts) => {
      //   [...oldProducts, newProduct];
      // });
      navigate(`/invoices/${updatedInvoice.id}`);
    },
  });

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
              headerText={`Invoice ${mainData.invoice.id}`}
              buttonText={"Save"}
              onSubmit={(b) => handleEditSubmit(b)}
              handleCancel={() => setSelection("")}
            />
          </div>
        </>
      )}
    </>
  );
}

export default InvoiceShow;
