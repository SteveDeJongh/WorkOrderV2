import { useRef, useState } from "react";
import {
  InvoiceLine as TInvoiceLine,
  InvoiceColumn,
} from "../../../types/invoiceTypes";
import { showAsDollarAmount } from "../../../utils/index";

type props = {
  line: TInvoiceLine;
  updateLine: Function;
  columns: InvoiceColumn[];
};

type TableDataProps = {
  onDelayedChange: Function;
  disabled: boolean;
  field: InvoiceColumn;
  val: string;
};

function TableData({ onDelayedChange, disabled, field, val }: TableDataProps) {
  const editTimer = useRef<null | NodeJS.Timeout>(null);
  const [inputValue, setInputValue] = useState<string | number>(val);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    const change = { [field.keyName]: newValue };
    setInputValue(newValue);

    if (editTimer.current) {
      clearTimeout(editTimer.current);
    }

    editTimer.current = setTimeout(() => {
      onDelayedChange(change);
    }, 500);
  }

  function handleFocus(e) {
    e.target.select();
  }

  val = field.showAsDollars ? showAsDollarAmount(val) : val;
  val = field.keyName === "movement_created" ? (val ? "🔒" : "") : val;

  return (
    <td>
      {field.editable && (
        <input
          name={field.keyName}
          type={field.type}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          value={inputValue}
        />
      )}
      {!field.editable && <div>{val}</div>}
    </td>
  );
}

function InvoiceLine({ line, updateLine, columns }: props) {
  function onDelayedChange(change: TInvoiceLine) {
    let changedLine = { ...line, ...change };
    updateLine(changedLine);
  }

  return (
    <>
      <tr
        title={
          line.movement_created
            ? "This invoice line has already been saved. To make changes, create a return line and start over."
            : ""
        }
      >
        {columns.map((field) => (
          <TableData
            onDelayedChange={onDelayedChange}
            disabled={line.movement_created}
            field={field}
            key={
              field.productValue
                ? `Product${[field.keyName]}${line.id}`
                : `${[field.keyName]}${line.id}`
            }
            val={
              field.productValue
                ? line["product"][field.keyName]
                : line[field.keyName]
            }
          />
        ))}
      </tr>
    </>
  );
}

export { InvoiceLine };
