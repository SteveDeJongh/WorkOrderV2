import { useState } from "react";
import { Payment } from "../../../types/invoiceTypes";
import { dateRegExp, dateTimeFormatter } from "../../../utils/index";

type props = {
  paymentData: Payment;
  lineClick: Function;
  adminActions: Boolean;
  toggleDelete: Function;
};

type TabelDataProps = {
  showAsDollars: boolean;
  val: string | number | undefined;
  deleted?: boolean;
};

type columnProps = {
  keyName: "id" | "method" | "amount" | "created_at";
  showAsDollars: boolean;
};

function TabelData({ showAsDollars, val, deleted }: TabelDataProps) {
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
  toggleDelete,
}: props) {
  const [payment, _] = useState(paymentData);

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
        <TabelData
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
            onClick={() => toggleDelete(payment.id, payment.created_at)}
            checked={payment._destroy}
          />
        </td>
      )}
    </tr>
  );
}
