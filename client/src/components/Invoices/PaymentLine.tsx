import { fetchProductData } from "../../services/productServices";
import { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import Button from "../../multiuse/Button";

type props = {
  line: object;
  // updateLine: Function;
};

type tableFormCellProps = {
  showAsDollars: boolean;
  val: string;
};

function TableFormCell({
  showAsDollars,
  val,
}: // inputName,
// onImmediateChange,
// onDelayedChange,
tableFormCellProps) {
  const changeRef = useRef<null | NodeJS.Timeout>(null);
  const [inputValue, setInputValue] = useState(val);

  // function handleChange(e) {
  //   let label = e.target.name;
  //   let value =
  //     e.target.type === "number" ? Number(e.target.value) : e.target.value;
  //   const change = { [inputName]: value };
  //   setInputValue(value);

  //   onImmediateChange(change);

  //   if (changeRef.current) {
  //     clearTimeout(changeRef.current);
  //   }

  //   changeRef.current = setTimeout(() => {
  //     onDelayedChange(change);
  //   }, 1500);
  // }

  // val = showAsDollars ? `$${Number(val).toFixed(2)}` : val;
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

  console.log("Payment line", line);

  return (
    <tr onClick={(id) => lineClick(id)}>
      {columns.map((col) => (
        <TableFormCell
          showAsDollars={col.showAsDollars}
          key={`${[col.keyName]}${refLine.current.id}`}
          val={refLine.current[col.keyName]}
        />
      ))}
    </tr>
  );
}
