import { useState, useEffect } from "react";
import { PaymentLine } from "./PaymentLine";
import { PaymentModal } from "./PaymentModal";
import { Action } from "../../../types/invoiceTypes";
import { Payment } from "../../../types/payments";
import {
  Button,
  CardActions,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "../../../utils/muiImports";

type props = {
  payments: Payment[];
  adminActions: boolean;
  balance: number;
  invoice_id: number | null;
  dispatch: React.Dispatch<Action>;
};

function FormPaymentLines({
  payments = [],
  adminActions,
  balance,
  invoice_id,
  dispatch,
}: props) {
  const [lines, setLines] = useState(payments);

  useEffect(() => {
    setLines(payments);
  }, [payments]);

  function toggleDelete(paymentId: string | number, created_at: string | Date) {
    dispatch({
      type: "togglePaymentDelete",
      paymentId: paymentId,
      created_at: created_at,
    });

    dispatch({ type: "recaculateInvoice" });
  }

  // For Modal
  const [payment, setPayment] = useState<Payment | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  function handlePaymentClick(line: Payment, e: React.MouseEvent): void {
    if ((e.target as HTMLInputElement).tagName !== "INPUT") {
      setPayment(line);
      setIsOpen(true);
    }
  }

  function handleClose() {
    dispatch({ type: "recaculateInvoice" });
    setPayment(undefined);
    setIsOpen(false);
  }

  return (
    <Stack spacing={1} sx={{ overflow: "auto", maxWidth: "100%" }}>
      <Typography variant="h6">Payments</Typography>

      {lines && (
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "400px",
            overflow: "auto",
            maxWidth: "100%",
            whiteSpace: "nowrap",
          }}
          variant="outlined"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Method</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                {adminActions && <TableCell>Delete</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {lines?.map((line, idx) => {
                return (
                  <PaymentLine
                    key={line.id ? line.id : `new${idx}`}
                    paymentData={line}
                    lineClick={(e: React.MouseEvent) =>
                      handlePaymentClick(line, e)
                    }
                    adminActions={adminActions}
                    toggleDelete={toggleDelete}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CardActions>
        <Button variant="outlined" onClick={() => setIsOpen(true)}>
          Add Payment
        </Button>
      </CardActions>
      <PaymentModal
        open={isOpen}
        closeModal={handleClose}
        payment={payment}
        balance={balance}
        invoice_id={invoice_id}
        dispatch={dispatch}
      />
    </Stack>
  );
}

export { FormPaymentLines };
