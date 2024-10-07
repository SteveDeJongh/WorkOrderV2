import { fetchProductData } from "../../services/productServices";
import { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";

type props = {
  line: object;
  updateLine: Function;
};

type tableFormCellProps = {
  editable: boolean;
  showAsDollars: boolean;
  type: string;
  val: string;
  inputName: string;
  onImmediateChange: Function;
  onDelayedChange: Function;
};

function TableFormCell({
  editable,
  type,
  showAsDollars,
  val,
  inputName,
  onImmediateChange,
  onDelayedChange,
}: tableFormCellProps) {
  const changeRef = useRef<null | NodeJS.Timeout>(null);
  const [inputValue, setInputValue] = useState(val);

  function handleChange(e) {
    let label = e.target.name;
    let value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    const change = { [inputName]: value };
    setInputValue(value);

    onImmediateChange(change);

    if (changeRef.current) {
      clearTimeout(changeRef.current);
    }

    changeRef.current = setTimeout(() => {
      onDelayedChange(change);
    }, 1500);
  }

  val = showAsDollars ? `$${Number(val).toFixed(2)}` : val;
  return (
    <td>
      {editable && (
        <input
          name={inputName}
          type={type}
          value={inputValue}
          onChange={handleChange}
        />
      )}
      {!editable && <div>{val}</div>}
    </td>
  );
}

export default function InvoiceLine({ line, updateLine }: props) {
  const [stateLine, setStateLine] = useState(line);
  const refLine = useRef(stateLine);

  function onImmediateChange(change: object) {
    refLine.current = { ...refLine.current, ...change, changed: true };
  }

  function onDelayedChange(change: object) {
    let changedLine = recalculateLine(refLine.current);
    refLine.current = changedLine;
    updateLine(changedLine);
    setStateLine(changedLine);
  }

  function recalculateLine(line: object) {
    line.line_total =
      line.quantity * Number(line.product.price) -
      (line.quantity * Number(line.product.price) * line.discount_percentage) /
        100;
    line.price =
      Number(line.product.price) -
      Number(line.product.price) * (line.discount_percentage / 100);
    return line;
  }

  let columns = [
    {
      keyName: "id",
      productValue: false,
      editable: false,
      type: "number",
      showAsDollars: false,
    },
    {
      keyName: "sku",
      productValue: true,
      editable: false,
      type: "text",
      showAsDollars: false,
    },
    {
      keyName: "description",
      productValue: true,
      editable: false,
      type: "text",
      showAsDollars: false,
    },
    {
      keyName: "quantity",
      productValue: false,
      editable: true,
      type: "number",
      showAsDollars: false,
    },
    {
      keyName: "discount_percentage",
      productValue: false,
      editable: true,
      type: "number",
      showAsDollars: false,
    },
    {
      keyName: "price",
      productValue: true,
      editable: false,
      type: "test",
      showAsDollars: true,
    },
    {
      keyName: "price",
      productValue: false,
      editable: false,
      type: "text",
      showAsDollars: true,
    },
    {
      keyName: "line_total",
      productValue: false,
      editable: false,
      type: "text",
      showAsDollars: true,
    },
  ];

  // console.log("line", line);
  // console.log("stateLine", stateLine);
  // console.log("refline", refLine.current);

  return (
    <tr>
      {columns.map((col) => (
        <TableFormCell
          onImmediateChange={onImmediateChange}
          onDelayedChange={onDelayedChange}
          editable={col.editable}
          showAsDollars={col.showAsDollars}
          key={
            col.productValue
              ? `Product${[col.keyName]}${refLine.current.id}`
              : `${[col.keyName]}${refLine.current.id}`
          }
          inputName={col.keyName}
          type={col.type}
          val={
            col.productValue
              ? refLine.current["product"][col.keyName]
              : refLine.current[col.keyName]
          }
          onChange={(e) => handleChange(e)}
        />
      ))}
    </tr>
  );
}
