import React from "react";
import { useState, useEffect, useContext } from "react";
import ReactDom from "react-dom";
import LoadingBox from "../../multiuse/LoadingBox";
import { objectToFormData } from "../../utils/formDataHelper";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchPaymentData, savePayment } from "../../services/paymentServices";
import PaymentForm from "./PaymentForm";

type Props = {
  open: boolean;
  onClose: Function;
  paymentID: number | null;
  balance: number;
};

function PaymentModal({ open, onClose, paymentID, dataLogger }: Props) {
  function handleClose(e) {
    if (e.target.className === "main-modal-background") {
      onClose();
    }
  }

  // Main Pane states
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState("");
  const [mainData, setMainData] = useState({});

  // Fetches payment data if passed in a payment ID. (editing) Should this info just be passed in? Ie: payment is clicked from a list so the data is already loaded.
  useEffect(() => {
    console.log("trig");
    async function loadPaymentData() {
      try {
        setMainLoading(true);
        const response = await fetchPaymentData(paymentID);
        setMainData(response);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }
    if (paymentID) {
      loadPaymentData();
    } else {
      setMainData(false);
    }
  }, [open]);

  let entity = Object.keys(mainData).length < 1 ? false : mainData;

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (rawData) => {
      console.log("From payment modal", rawData);
      console.log("Submitting console");
      const formData = objectToFormData({ payment: rawData });

      savePayment(rawData.id, formData);
    },
    onSuccess: (newPayment) => {
      console.log("new payment or edited payment!"); // to do...
    },
  });

  if (!open) return null;

  console.log("ID from modal", paymentID);
  console.log("entity", entity);

  return ReactDom.createPortal(
    <>
      <div className="main-modal-background" onClick={(e) => handleClose(e)}>
        <div className="main-modal">
          {mainLoading && <LoadingBox text="Loading Payment..." />}
          {mainError && <p>An error occured.</p>}
          {!mainLoading && !mainError && (
            <>
              <PaymentForm
                handleCancel={() => onClose()}
                payment={entity}
                onSubmit={mutate}
                buttonText={"Save"}
                invoice_id={dataLogger.id}
              />
            </>
          )}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default PaymentModal;
