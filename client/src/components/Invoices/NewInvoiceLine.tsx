import { fetchProductData } from "../../services/productServices";
import { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import SearchBar from "../../multiuse/SearchBar";
import useURLSearchParam from "../../hooks/useURLSearchParam";

type props = {
  line: object;
  updateLine: Function;
};

// type tableSearchFormCellProps = {
//   type: string;
//   onImmediateChange: Function;
//   onDelayedChange: Function;
// };

// function TableSearchFormCell({
//   type,
//   onImmediateChange,
//   onDelayedChange,
// }: tableSearchFormCellProps) {
//   const changeRef = useRef<null | NodeJS.Timeout>(null);
//   const [inputValue, setInputValue] = useState(val);

//   function handleChange(e) {
//     let label = e.target.name;
//     let value =
//       e.target.type === "number" ? Number(e.target.value) : e.target.value;
//     const change = { [inputName]: value };
//     setInputValue(value);

//     onImmediateChange(change);

//     if (changeRef.current) {
//       clearTimeout(changeRef.current);
//     }

//     changeRef.current = setTimeout(() => {
//       onDelayedChange(change);
//     }, 1500);
//   }

//   val = showAsDollars ? `$${Number(val).toFixed(2)}` : val;
//   return (
//     <td>
//       {editable && (
//         <input
//           name={inputName}
//           type={type}
//           value={inputValue}
//           onChange={handleChange}
//         />
//       )}
//       {!editable && <div>{val}</div>}
//     </td>
//   );
// }

export default function NewInvoiceLine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");

  function handleDebouncedSearchChange(searchValue) {
    setDebouncedSearchTerm(searchValue);
    console.log("New value is debounced and set", searchValue);
  }

  function handleImmediateSearchChange(searchValue) {
    setSearchTerm(searchValue);
  }

  function onImmediateChange(change: object) {
    refLine.current = { ...refLine.current, ...change, changed: true };
  }

  function onDelayedChange(change: object) {
    // let changedLine = recalculateLine(refLine.current);
    // refLine.current = changedLine;
    // updateLine(changedLine);
    // setStateLine(changedLine);
  }

  return (
    <tr>
      {/* <td>
        <input type="text" defaultValue="Search for product or service..." />
      </td> */}

      <td>
        <SearchBar
          title="products"
          value={searchTerm}
          onSearchChange={handleDebouncedSearchChange}
          onImmediateChange={handleImmediateSearchChange}
        />
      </td>

      {/* <TableSearchFormCell
          onImmediateChange={onImmediateChange}
          onDelayedChange={onDelayedChange}
          editable={col.editable}
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
        /> */}
    </tr>
  );
}
