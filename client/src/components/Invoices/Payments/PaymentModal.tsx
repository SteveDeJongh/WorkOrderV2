import React from "react";
import ReactDom from "react-dom";
import PaymentForm from "./PaymentForm";
import { Payment } from "../../../types/invoiceTypes";

type Props = {
  open: boolean;
  closeModal: Function;
  payment?: Payment;
  balance: number;
  invoice_id: number | null;
  dispatch: Function;
};

function PaymentModal({
  open,
  closeModal,
  payment,
  balance,
  invoice_id,
  dispatch,
}: Props) {
  function handleClose(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    if (target.className === "main-modal-background") {
      closeModal();
    }
  }

  function savePayment(data: Payment) {
    if (data.id || data.created_at) {
      dispatch({ type: "updatePayment", payment: data });
    } else {
      dispatch({
        type: "createPayment",
        payment: {
          ...data,
          created_at: new Date(Date.now()).toISOString(),
        },
      });
      if (data.change && data.method === "Cash") {
        let val = data.change;
        if (typeof data.change === "string") {
          val = Number(data.change.split("$")[1]);
        }
        dispatch({
          type: "createPayment",
          payment: {
            ...data,
            method: "Change",
            amount: -val,
            change: 0,
            created_at: new Date(Date.now()).toISOString(),
          },
        });
      }
    }
    closeModal();
  }

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="main-modal-background" onClick={(e) => handleClose(e)}>
        <div className="main-modal">
          <>
            <PaymentForm
              handleCancel={() => closeModal()}
              payment={payment}
              onSubmit={savePayment}
              buttonText={"Save"}
              invoice_id={invoice_id}
              balance={balance}
            />
          </>
        </div>
      </div>
    </>,
    document.getElementById("portal")!
  );
}

export default PaymentModal;
