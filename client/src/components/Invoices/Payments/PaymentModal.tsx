import React from "react";
import { useState, useEffect, useContext } from "react";
import ReactDom from "react-dom";
import LoadingBox from "../../../multiuse/LoadingBox";
import { objectToFormData } from "../../../utils/formDataHelper";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchPaymentData,
  savePayment,
} from "../../../services/paymentServices";
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
    console.log("Triggered useEffect in Payment Modal");
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

  // const { mutate, isPending, isError, isSuccess } = useMutation({
  //   mutationFn: (rawData) => {
  //     const formData = objectToFormData({ payment: rawData });
  //     return savePayment(rawData.id, formData);
  //   },
  //   onSuccess: (payment) => {
  //     console.log("Payment saved or edited successfully");
  //     onClose(payment);
  //   },
  // });

  function addPayment(data) {
    console.log(data);
    if (data.id) {
      let idx = dataLogger.payments_attributes.findIndex(
        (x) => x.id === data.id
      );
      if (idx > -1) {
        Object.assign(dataLogger.payments[idx], data);
      }
    } else {
      dataLogger.payments_attributes.push({
        ...data,
        created_at: new Date(Date.now()).toISOString(),
      });
    }

    console.log("dataLogger.payments_attributes");
    console.log(dataLogger.payments_attributes);
    onClose();
  }

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
                onSubmit={addPayment}
                buttonText={"Save"}
                invoice_id={dataLogger.invoice.id}
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
