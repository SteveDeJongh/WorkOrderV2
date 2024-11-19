import { useState, useRef, useEffect } from "react";
import PaymentLine from "./PaymentLine";
import Button from "../../../multiuse/Button";
import PaymentModal from "./PaymentModal";
import { Invoice, Payment } from "../../../types/invoiceTypes";

type props = {
  dataLogger: Invoice;
  recalculateInvoice: Function;
  adminActions: Boolean;
  balance: Number;
};

export default function FormPaymentLines({
  dataLogger,
  recalculateInvoice,
  adminActions,
  balance,
}: props) {
  const [lines, setLines] = useState(dataLogger.payments);

  function toggleDelete(paymentID: string | number, created_at: string | Date) {
    dataLogger.payments?.map((payment) => {
      if (payment.id == paymentID && payment.created_at == created_at) {
        payment._destroy = !payment._destroy;
      }
      return payment;
    });
    setLines(dataLogger.payments);
    recalculateInvoice();
  }

  // For Modal
  const [payment, setPayment] = useState<Payment | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(line: Payment, e: React.MouseEvent): void {
    if ((e.target as HTMLInputElement).tagName !== "INPUT") {
      setPayment(line);
      setIsOpen(true);
    }
  }

  function handleClose(data: Payment | undefined) {
    recalculateInvoice();
    setPayment(undefined);
    setIsOpen(false);
  }

  // console.log("datalogger in payment lines", dataLogger);
  // console.log("lines in payment lines", lines);
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
                            handleClick(line, e)
                          }
                          adminActions={adminActions}
                          deletePayment={toggleDelete}
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
        onClose={(data: Payment | undefined) => handleClose(data)}
        dataLogger={dataLogger}
        payment={payment}
        balance={balance}
      />
    </>
  );
}
