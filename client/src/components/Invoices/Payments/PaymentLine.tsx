import { useRef, useState } from "react";
import Button from "../../../multiuse/Button";
import { Invoice, Payment } from "../../../types/invoiceTypes";

type props = {
  paymentData: Payment;
  lineClick: Function;
  adminActions: Boolean;
  deletePayment: Function;
};

type dataCellProps = {
  showAsDollars: boolean;
  val: string | number | undefined;
};

type columnProps = {
  keyName: "id" | "method" | "amount" | "created_at";
  showAsDollars: boolean;
};

function DataCell({ showAsDollars, val }: dataCellProps) {
  const changeRef = useRef<null | NodeJS.Timeout>(null);
  const [inputValue, setInputValue] = useState(val);

  val = showAsDollars ? `$${Number(val).toFixed(2)}` : val;
  return (
    <td>
      <div>{val}</div>
    </td>
  );
}

export default function PaymentLine({
  paymentData,
  lineClick,
  adminActions,
  deletePayment,
}: props) {
  const [payment, setPayment] = useState(paymentData);

  let columns: Array<columnProps> = [
    {
      keyName: "id",
      showAsDollars: false,
    },
    {
      keyName: "method",
      showAsDollars: false,
    },
    {
      keyName: "amount",
      showAsDollars: true,
    },
    {
      keyName: "created_at",
      showAsDollars: false,
    },
  ];

  return (
    <tr onClick={(e) => lineClick(e)}>
      {columns.map((col) => (
        <DataCell
          showAsDollars={col.showAsDollars}
          key={`${[col.keyName]}${payment.id}`}
          val={payment[col.keyName]}
        />
      ))}
      {adminActions && (
        <td className="pad">
          <Button
            text="Delete"
            onClick={() => deletePayment(payment.id, payment.created_at)}
          />
        </td>
      )}
    </tr>
  );
}
