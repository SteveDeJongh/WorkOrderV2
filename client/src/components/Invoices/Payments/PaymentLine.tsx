import { fetchProductData } from "../../../services/productServices";
import { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import Button from "../../../multiuse/Button";

type props = {
  line: object;
  // updateLine: Function;
};

type dataCellProps = {
  showAsDollars: boolean;
  val: string;
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

export default function PaymentLine({ line, lineClick }: props) {
  const [stateLine, setStateLine] = useState(line);
  const refLine = useRef(stateLine);

  let columns = [
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
      keyName: "updated_at",
      showAsDollars: false,
    },
  ];

  return (
    <tr onClick={(id) => lineClick(id)}>
      {columns.map((col) => (
        <DataCell
          showAsDollars={col.showAsDollars}
          key={`${[col.keyName]}${refLine.current.id}`}
          val={refLine.current[col.keyName]}
        />
      ))}
    </tr>
  );
}
