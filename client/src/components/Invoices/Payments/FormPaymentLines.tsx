import { useState, useEffect } from "react";
import { PaymentLine } from "./PaymentLine";
import { Button } from "../../multiuse/Button";
import { PaymentModal } from "./PaymentModal";
import { Action } from "../../../types/invoiceTypes";
import { Payment } from "../../../types/payments";

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

  function handleClose(data: Payment | undefined) {
    dispatch({ type: "recaculateInvoice" });
    setPayment(undefined);
    setIsOpen(false);
  }

  return (
    <>
      <div className="panel">
        <div className="panel-heading">
          <h3>Payments</h3>
          <div className="panel-action"></div>
        </div>
        {lines && (
          <div className="panel-contents">
            <div className="panel-contents-section">
              <div className="scrollable-table">
                <table>
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th>Amount</th>
                      <th>Date</th>
                      {adminActions && <th>Delete</th>}
                    </tr>
                  </thead>
                  <tbody>
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
                  </tbody>
                </table>
              </div>
            </div>
            <Button text="Add Payment" onClick={() => setIsOpen(true)} />
          </div>
        )}
      </div>
      <PaymentModal
        open={isOpen}
        closeModal={(data: Payment | undefined) => handleClose(data)}
        payment={payment}
        balance={balance}
        invoice_id={invoice_id}
        dispatch={dispatch}
      />
    </>
  );
}

export { FormPaymentLines };
