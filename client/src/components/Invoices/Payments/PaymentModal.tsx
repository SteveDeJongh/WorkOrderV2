import React from "react";
import { useState, useEffect, useContext } from "react";
import ReactDom from "react-dom";
import LoadingBox from "../../../multiuse/LoadingBox";
import { fetchPaymentData } from "../../../services/paymentServices";
import PaymentForm from "./PaymentForm";
import { Invoice, Payment } from "../../../types/invoiceTypes";

type Props = {
  open: boolean;
  onClose: Function;
  paymentID: Number | String | undefined;
  dataLogger: Invoice;
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

  function savePayment(data: Payment) {
    if (data.id && dataLogger.payments) {
      let idx = dataLogger.payments.findIndex((x) => x.id === data.id);
      if (idx > -1) {
        Object.assign(dataLogger.payments[idx], data);
      }
    } else {
      dataLogger.payments?.push({
        ...data,
        created_at: new Date(Date.now()).toISOString(),
      });
    }
    onClose();
  }

  if (!open) return null;

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
                onSubmit={savePayment}
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
