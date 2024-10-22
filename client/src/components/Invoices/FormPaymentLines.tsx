import { useState, useRef, useEffect } from "react";
import LoadingBox from "../../multiuse/LoadingBox";
import PaymentLine from "./PaymentLine";
import Button from "../../multiuse/Button";
import PaymentModal from "./PaymentModal";

type props = {
  dataLogger: customerRef;
  payments: Array<object>;
};

type customerRef = {
  current: number;
};

export default function FormPaymentLines({ dataLogger, payments }: props) {
  const [lineModal, setlineModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [lines, setLines] = useState(payments);
  const refLines = useRef(payments);

  console.log(payments);
  console.log(lines);
  console.log("dataLogger", dataLogger);

  // For Modal
  const [isOpen, setIsOpen] = useState(false);
  const clickedID = useRef(null);

  function handleClick(id) {
    clickedID.current = id;
    setIsOpen(true);
  }

  function handleClose(data) {
    console.log("Data from handleClose", data);
    clickedID.current = null;
    setIsOpen(false);
  }

  return (
    <>
      <div className="panel">
        <div className="panel-heading">
          <h3>Payments</h3>
          <div className="panel-action"></div>
        </div>
        {loading && <div>loading</div>}
        {refLines.current && !loading && (
          <div className="panel-contents">
            <div className="panel-contents-section">
              <table>
                <thead>
                  <tr>
                    <th>payment ID</th>
                    <th>Method</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {refLines.current.map((line) => (
                    <PaymentLine
                      key={line.id}
                      line={line}
                      lineClick={() => handleClick(line.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <Button text="Add Payment" onClick={() => setIsOpen(true)} />
          </div>
        )}
      </div>
      <PaymentModal
        open={isOpen}
        onClose={(data) => handleClose(data)}
        paymentID={clickedID.current}
        dataLogger={dataLogger}
      />
    </>
  );
}
