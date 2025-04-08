import { PaymentForm } from "./PaymentForm";
import { EditablePaymentData, Payment } from "../../../types/payments";
import { Box, Modal } from "@mui/material";
import { parseCurrencyString } from "../../../utils";
import { Action } from "../../../types/invoiceTypes";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "60%", md: "40%", lg: "30%" },
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  closeModal: () => void;
  payment?: Payment;
  balance: number;
  invoice_id: number | null;
  dispatch: (action: Action) => void;
};

function PaymentModal({
  open,
  closeModal,
  payment,
  balance,
  invoice_id,
  dispatch,
}: Props) {
  function onSavePayment(data: EditablePaymentData) {
    const now = new Date().toISOString();

    if (data.id || data.created_at) {
      dispatch({ type: "updatePayment", payment: data });
    } else {
      dispatch({
        type: "createPayment",
        payment: {
          ...data,
          created_at: now,
        },
      });

      if (data.change && data.method === "Cash") {
        const val =
          typeof data.change === "string"
            ? parseCurrencyString(data.change)
            : data.change;

        if (val > 0) {
          dispatch({
            type: "createPayment",
            payment: {
              ...data,
              method: "Change",
              amount: -val,
              change: 0,
              created_at: now,
            },
          });
        }
      }
    }
    closeModal();
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <PaymentForm
          handleCancel={closeModal}
          payment={payment}
          onSubmit={onSavePayment}
          buttonText={"Save"}
          invoice_id={invoice_id}
          balance={balance}
        />
      </Box>
    </Modal>
  );
}

export { PaymentModal };
