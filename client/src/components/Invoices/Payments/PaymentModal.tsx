import React from "react";
import ReactDom from "react-dom";
import PaymentForm from "./PaymentForm";
import { Invoice, Payment } from "../../../types/invoiceTypes";

type Props = {
  open: boolean;
  onClose: Function;
  dataLogger: Invoice;
  payment?: Payment;
  balance: Number;
};

function PaymentModal({ open, onClose, dataLogger, payment, balance }: Props) {
  function handleClose(e) {
    if (e.target.className === "main-modal-background") {
      onClose();
    }
  }

  function savePayment(data: Payment) {
    console.log(data);
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
          <>
            <PaymentForm
              handleCancel={() => onClose()}
              payment={payment}
              onSubmit={savePayment}
              buttonText={"Save"}
              invoice_id={dataLogger.id}
              balance={balance}
            />
          </>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default PaymentModal;
