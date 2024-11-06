import { useRef, useState } from "react";
import Button from "../../../multiuse/Button";
import { Invoice, Payment } from "../../../types/invoiceTypes";
import { dateRegExp, dateTimeFormatter } from "../../../utils/index";

type props = {
  paymentData: Payment;
  lineClick: Function;
  adminActions: Boolean;
  deletePayment: Function;
};

type dataCellProps = {
  showAsDollars: boolean;
  val: string | number | undefined;
  deleted?: boolean;
};

type columnProps = {
  keyName: "id" | "method" | "amount" | "created_at";
  showAsDollars: boolean;
};

function DataCell({ showAsDollars, val, deleted }: dataCellProps) {
  const changeRef = useRef<null | NodeJS.Timeout>(null);
  const [inputValue, setInputValue] = useState(val);

  val = showAsDollars ? `$${Number(val).toFixed(2)}` : val;
  val = dateRegExp.test(val) ? dateTimeFormatter(val) : val;
  return (
    <td>
      {deleted && (
        <del>
          <div>{val}</div>
        </del>
      )}
      {!deleted && <div>{val}</div>}
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
          deleted={payment._destroy}
        />
      ))}
      {adminActions && (
        <td className="pad">
          <input
            type="checkbox"
            onClick={() => deletePayment(payment.id, payment.created_at)}
          />
        </td>
      )}
    </tr>
  );
}
