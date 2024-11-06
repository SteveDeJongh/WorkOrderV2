import { useState, useRef, useEffect } from "react";
import PaymentLine from "./PaymentLine";
import Button from "../../../multiuse/Button";
import PaymentModal from "./PaymentModal";
import { Invoice, Payment } from "../../../types/invoiceTypes";

type props = {
  dataLogger: Invoice;
  recalculateInvoice: Function;
  adminActions: Boolean;
};

export default function FormPaymentLines({
  dataLogger,
  recalculateInvoice,
  adminActions,
}: props) {
  const [lines, setLines] = useState(dataLogger.payments);
  const [loading, setLoading] = useState(true);
  const [shownLines, setShownLines] = useState<Array<Payment>>();

  useEffect(() => {
    setShownLines(
      lines?.filter((payment) => {
        return payment._destroy == undefined || payment._destroy == false;
      })
    );
    setLoading(false);
  }, [lines]);

  function deletePayment(
    paymentID: string | number,
    created_at: string | Date
  ) {
    setLines(
      lines?.map((payment) => {
        if (payment.id == paymentID && payment.created_at == created_at) {
          payment._destroy = true;
        }
        return payment;
      })
    );
    recalculateInvoice();
  }

  // For Modal
  const [isOpen, setIsOpen] = useState(false);
  const clickedID = useRef<Number | String>();

  function handleClick(id: Number | String, e: React.MouseEvent) {
    if ((e.target as HTMLInputElement).tagName !== "BUTTON") {
      clickedID.current = id;
      setIsOpen(true);
    }
  }

  function handleClose(data: Payment | undefined) {
    clickedID.current = undefined;
    recalculateInvoice();
    setIsOpen(false);
  }

  if (loading) {
    return <div>Loading!</div>;
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
              <table>
                <thead>
                  <tr>
                    <th>payment ID</th>
                    <th>Method</th>
                    <th>Amount</th>
                    <th>Date</th>
                    {adminActions && <th>Delete</th>}
                  </tr>
                </thead>
                <tbody>
                  {shownLines?.map((line, idx) => {
                    return (
                      <PaymentLine
                        key={line.id ? line.id : `new${idx}`}
                        paymentData={line}
                        lineClick={(e: React.MouseEvent) =>
                          handleClick(line.id, e)
                        }
                        adminActions={adminActions}
                        deletePayment={deletePayment}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Button text="Add Payment" onClick={() => setIsOpen(true)} />
          </div>
        )}
      </div>
      <PaymentModal
        open={isOpen}
        onClose={(data: Payment | undefined) => handleClose(data)}
        paymentID={clickedID.current}
        dataLogger={dataLogger}
      />
    </>
  );
}
