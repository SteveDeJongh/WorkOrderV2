import { fetchProductData } from "../../services/productServices";
import { useRef, useState } from "react";

type props = {
  line: object;
};

type tableFormCellProps = {
  editable: boolean;
  type: string;
  val: string;
  inputName: string;
  onChange: React.ChangeEventHandler;
};

function TableFormCell({
  editable,
  type,
  val,
  inputName,
  onChange,
}: tableFormCellProps) {
  return (
    <td>
      {editable && (
        <input
          name={inputName}
          type={type}
          defaultValue={val}
          onChange={onChange}
        />
      )}
      {!editable && <div>{val}</div>}
    </td>
  );
}

export default function InvoiceLine({ line }: props) {
  // const refLine = useRef(line);

  // function handleChange(e) {
  //   refLine.current[e.target.name] = e.target.value;
  // }

  const [stateLine, setStateLine] = useState(line);

  function recalculateLine(line) {
    line.total =
      line.quantity * Number(line.price) -
      (line.quantity * Number(line.price) * line.discount_percentage) / 100;
    return line;
  }

  function handleChange(e) {
    console.log(e.target);
    let label = e.target.name;
    let value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    let changed = { ...stateLine, [label]: value };
    changed = recalculateLine(changed);
    setStateLine(changed);
  }

  console.log(line);
  let columns = [
    { name: "id", editable: false, type: "number" },
    { name: "sku", editable: false, type: "text" },
    { name: "description", editable: false, type: "text" },
    { name: "quantity", editable: true, type: "number" },
    { name: "discount_percentage", editable: true, type: "number" },
    { name: "price", editable: false, type: "text" },
    { name: "line_total", editable: false, type: "text" },
  ];

  console.log("line", line);

  return (
    <tr>
      {columns.map((col) => (
        <TableFormCell
          key={col.name + stateLine.id}
          inputName={col.name}
          editable={col.editable}
          type={col.type}
          val={stateLine[col.name]}
          onChange={(e) => handleChange(e)}
        />
      ))}
    </tr>
  );
}
