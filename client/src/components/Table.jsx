import PropTypes from "prop-types";
import { useState } from "react";

function Table({ data, setSelection }) {
  let headers = Object.keys(data[0]);
  const [lastSelection, setLastSeleciton] = useState(null);

  function handleClick(e, id) {
    let row = e.target.closest("tr");
    if (lastSelection === row) {
      lastSelection.classList.toggle("selected");
      setSelection(null);
      setLastSeleciton(null);
    } else if (lastSelection) {
      lastSelection.classList.toggle("selected");
      row.classList.toggle("selected");
      setSelection(id);
      setLastSeleciton(row);
    } else {
      row.classList.toggle("selected");
      setSelection(id);
      setLastSeleciton(row);
    }
  }

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header) => {
                return <th key={header}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr key={row.id} onClick={(e) => handleClick(e, row.id)}>
                  {Object.keys(row).map((key) => {
                    return <td key={row["id"] + key}>{row[key]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  setSelection: PropTypes.func,
};

export default Table;
