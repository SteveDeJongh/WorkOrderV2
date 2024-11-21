import { Dispatch, useState, useRef, useEffect } from "react";
import PaymentLine from "./PaymentLine";
import Button from "../../../multiuse/Button";
import PaymentModal from "./PaymentModal";
import { Invoice, Payment } from "../../../types/invoiceTypes";

type props = {
  payments: Invoice["payments"];
  recalculateInvoice: Function;
  adminActions: Boolean;
  balance: Number;
  // setDataLogger: React.Dispatch<React.SetStateAction<Invoice | undefined>>;
  dispatch: Dispatch<{
    type: string;
    paymentID?: number;
    paymentData?: Payment;
    created_at?: string;
  }>;
};

export default function FormPaymentLines({
  payments = [],
  recalculateInvoice,
  adminActions,
  balance,
  // setDataLogger,
  dispatch,
}: props) {
  const [lines, setLines] = useState(payments);

  useEffect(() => {
    console.log("*** payments changed ", payments);
    setLines(payments);
  }, [payments]);

  console.log("*** payments rerender");

  function toggleDelete(paymentID: string | number, created_at: string | Date) {
    // const newPayments = payments.map((payment) => {
    //   if (payment.id === paymentID && payment.created_at === created_at) {
    //     payment._destroy = !payment._destroy;
    //   }
    //   return payment;
    // });

    // setDataLogger((s) => {
    //   if (!s) return s;
    //   return { ...s, payments: newPayments };
    // });
    // setLines(payments);

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
        payments={payments}
        payment={payment}
        balance={balance}
      />
    </>
  );
}
