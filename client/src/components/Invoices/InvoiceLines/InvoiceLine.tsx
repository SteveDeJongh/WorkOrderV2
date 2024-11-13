import { fetchProductData } from "../../../services/productServices";
import { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { TInvoiceLine } from "../../../types/invoiceTypes";

type props = {
  line: TInvoiceLine;
  updateLine: Function;
  recalculateLine: Function;
};

type tableFormCellProps = {
  editable: boolean;
  showAsDollars: boolean;
  type: string;
  val: string;
  inputName: string;
  onDelayedChange: Function;
};

function TableFormCell({
  editable,
  type,
  showAsDollars,
  val,
  inputName,
  onDelayedChange,
}: tableFormCellProps) {
  const changeRef = useRef<null | NodeJS.Timeout>(null);
  const [inputValue, setInputValue] = useState(val);

  function handleChange(e) {
    let value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    const change = { [inputName]: value };
    setInputValue(value);

    if (changeRef.current) {
      clearTimeout(changeRef.current);
    }

    changeRef.current = setTimeout(() => {
      onDelayedChange(change);
    }, 500);
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

export default function InvoiceLine({
  line,
  updateLine,
  recalculateLine,
}: props) {
  const [stateLine, setStateLine] = useState(line);

  function onDelayedChange(change: TInvoiceLine) {
    let changedLine = { ...line, ...change, changed: true };
    changedLine = recalculateLine(changedLine);
    updateLine(changedLine);
    setStateLine(changedLine);
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

  return (
    <tr>
      {columns.map((col) => (
        <TableFormCell
          onDelayedChange={onDelayedChange}
          editable={col.editable}
          showAsDollars={col.showAsDollars}
          key={
            col.productValue
              ? `Product${[col.keyName]}${line.id}`
              : `${[col.keyName]}${line.id}`
          }
          inputName={col.keyName}
          type={col.type}
          val={
            col.productValue ? line["product"][col.keyName] : line[col.keyName]
          }
          onChange={(e) => handleChange(e)}
        />
      ))}
    </tr>
  );
}
