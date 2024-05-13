import PropTypes from "prop-types";
import { useState } from "react";

function SingleColTable({ title, data, setSelection, selection }) {
  const [lastSelection, setLastSeleciton] = useState(null);

  function handleClick(e, id) {
    let row = e.target.closest("li");
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
            // <a href={`/customers/${row.id}`} key={row.id}>
            <li
              key={row.id}
              onClick={(e) => handleClick(e, row.id)}
              className={`single-col-li ${
                row.id == selection ? "selected" : ""
              }`}
            >
              {row.fullName}
            </li>
            // </a>
          );
        })}
      </ul>
      <div id="single-col-bottom">
        <a href="/customers/new">
          <span>➕ New Customer</span>
        </a>
      </div>
    </>
  );
}

SingleColTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  setSelection: PropTypes.func,
};

export default SingleColTable;
