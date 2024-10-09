import React from "react";
import { useState, useEffect, useContext } from "react";
import ReactDom from "react-dom";
import LoadingBox from "../../multiuse/LoadingBox";
import { objectToFormData } from "../../utils/formDataHelper";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import Button from "../../multiuse/Button";
import { fetchPaymentData } from "../../services/paymentServices";

type Props = {
  open: boolean;
  onClose: Function;
  paymentID: number | null;
};

function PaymentModal({ open, onClose, paymentID }: Props) {
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
    console.log("trig");
    async function loadProductData() {
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
      loadProductData();
    }
  }, [paymentID]);

  let entity = Object.keys(mainData).length < 1 ? false : mainData;

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="main-modal-background" onClick={(e) => handleClose(e)}>
        <div className="main-modal">
          {mainLoading && <LoadingBox text="Loading Payment..." />}
          {mainError && <p>An error occured.</p>}
          {!mainLoading && !mainError && (
            <>
              <div>Woohoo!</div>
            </>
          )}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default PaymentModal;
