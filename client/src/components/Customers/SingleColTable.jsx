import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

function SingleColTable({ title, data, setSelection, selection }) {
  const [lastSelection, setLastSeleciton] = useState(null);

  function handleClick(e, id) {
    if (!e) {
      lastSelection ? lastSelection.classList.toggle("selected") : null;
      return;
    }

    let row = e.target.closest("li");
    if (lastSelection === row) {
      // Do we want to be able to switch batch to no selection at all?
      // lastSelection.classList.toggle("selected");
      // setSelection(null);
      // setLastSeleciton(null);
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
            <Link
              to={`/customers/${row.id}/profile`}
              key={row.id}
              className="col-link"
            >
              <li
                key={row.id}
                onClick={(e) => handleClick(e, row.id)}
                className={`single-col-li ${
                  row.id == selection ? "selected" : ""
                }`}
              >
                {row.fullName}
              </li>
            </Link>
          );
        })}
      </ul>
      <div id="single-col-bottom">
        <Link to="/customers/new" onClick={() => handleClick(false)}>
          <span>➕ New Customer</span>
        </Link>
      </div>
    </>
  );
}

SingleColTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  setSelection: PropTypes.func,
  selection: PropTypes.string || PropTypes.number,
};

export default SingleColTable;
