import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import useCustomerData from "../../hooks/useCustomersData";
import useURLSearchParam from "../../hooks/useURLSearchParam";
import useCustomersData from "../../hooks/useCustomersData";

function SingleColTable({ title, setSelection, selection }) {
  const [lastSelection, setLastSeleciton] = useState(null);

  // Customers List Data
  const [customers, setCustomers] = useState([]);
  // const [, setLoading] = useState(true);
  // const [, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");

  const {
    customers: fetchedCustomers,
    loading,
    error,
  } = useCustomersData(debouncedSearchTerm);

  useEffect(() => {
    if (fetchedCustomers) {
      setCustomers(fetchedCustomers);
      console.log(customers, loading, error);
    }
  }, [fetchedCustomers]);

  function handleDebouncedSearchChange(searchValue) {
    setSearchTerm(searchValue);
  }

  function handleImmediateSearchChange(searchValue) {
    setDebouncedSearchTerm(searchValue);
  }

  // Existing functionality below.
  function handleClick(e, id) {
    if (!e) {
      console.log(
        selection,
        lastSelection,
        "from single col table handleClick method."
      );
      lastSelection ? lastSelection.classList.remove("selected") : null;
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
      setSelection(String(id));
      setLastSeleciton(row);
    } else {
      row.classList.toggle("selected");
      setSelection(String(id));
      setLastSeleciton(row);
    }
  }

  return (
    <>
      <h3>{title}</h3>
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      {loading && <p>Information loading...</p>}
      {error && <p>An error occured.</p>}
      {!loading && !error && (
        <ul>
          {customers.map((row) => {
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
      )}
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
  selection: PropTypes.string,
};

export default SingleColTable;
