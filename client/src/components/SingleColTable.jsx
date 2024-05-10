import PropTypes from "prop-types";
import { useState } from "react";

function SingleColTable({ title, data, setSelection }) {
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
      <h3>{title}</h3>
      <ul>
        {data.map((row) => {
          return (
            <li key={row.id} onClick={(e) => handleClick(e, row.id)}>
              {row.fullName}
            </li>
          );
        })}
      </ul>
    </>
  );
}

SingleColTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  setSelection: PropTypes.func,
};

export default SingleColTable;
