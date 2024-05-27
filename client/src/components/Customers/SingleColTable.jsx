import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import ListItem from "./ListItem";
import useCustomersData from "../../hooks/useCustomersData";
import useURLSearchParam from "../../hooks/useURLSearchParam";

function SingleColTable({ title, setSelection, selection }) {
  const [lastSelection, setLastSelection] = useState(null);

  // Customers List Data
  const [customers, setCustomers] = useState([]);
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
    }
  }, [fetchedCustomers]);

  function handleDebouncedSearchChange(searchValue) {
    setDebouncedSearchTerm(searchValue);
  }

  function handleImmediateSearchChange(searchValue) {
    setSearchTerm(searchValue);
  }

  function handleItemClick(e, id) {
    let nextCustomers = customers.slice();

    let item = nextCustomers.filter((cust) => cust.id == id)[0];
    if (lastSelection) {
      let lastItem = nextCustomers.filter(
        (cust) => cust.id == lastSelection
      )[0];
      lastItem.selected = false;
    }
    item.selected = true;
    setSelection(id);
    setLastSelection(id);
    setCustomers(nextCustomers);
  }

  function handleNewClick() {
    let nextCustomers = customers.slice();

    selection
      ? (nextCustomers.filter((cust) => {
          return cust.id == selection;
        })[0].selected = false)
      : null;
    setCustomers(nextCustomers);
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
          {customers.map((cust) => {
            return (
              <ListItem
                value={cust}
                key={cust.id}
                handleClick={handleItemClick}
                selected={cust.id === selection}
              />
            );
          })}
        </ul>
      )}
      <div id="single-col-bottom">
        <Link
          to="/customers/new"
          onClick={() => {
            handleNewClick(false);
          }}
        >
          <span>➕ New Customer</span>
        </Link>
      </div>
    </>
  );
}

SingleColTable.propTypes = {
  title: PropTypes.string,
  setSelection: PropTypes.func,
  selection: PropTypes.number,
};

export default SingleColTable;
