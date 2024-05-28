import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import ListItem from "./ListItem";
import useURLSearchParam from "../hooks/useURLSearchParam";

function LeftListWithAction({ title, page, setSelection, selection, fetcher }) {
  const [lastSelection, setLastSelection] = useState(null);

  // Customers List Data
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");

  const { data: fetchedData, loading, error } = fetcher(debouncedSearchTerm);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  function handleDebouncedSearchChange(searchValue) {
    setDebouncedSearchTerm(searchValue);
  }

  function handleImmediateSearchChange(searchValue) {
    setSearchTerm(searchValue);
  }

  function handleItemClick(e, id) {
    let nextData = data.slice();

    let item = nextData.filter((data) => data.id == id)[0];
    if (lastSelection) {
      let lastItem = nextData.filter((data) => data.id == lastSelection)[0];
      lastItem.selected = false;
    }
    item.selected = true;
    setSelection(id);
    setLastSelection(id);
    setData(nextData);
  }

  function handleNewClick() {
    let nextData = data.slice();

    selection
      ? (nextData.filter((data) => {
          return data.id == selection;
        })[0].selected = false)
      : null;
    setData(nextData);
  }

  return (
    <>
      <h3>{title}</h3>
      <SearchBar
        title={title}
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      {loading && <p>Information loading...</p>}
      {error && <p>An error occured.</p>}
      {!loading && !error && (
        <ul>
          {data.map((data) => {
            return (
              <ListItem
                resource={title.toLowerCase()}
                value={data}
                page={page}
                key={data.id}
                handleClick={handleItemClick}
                selected={data.id === selection}
              />
            );
          })}
        </ul>
      )}
      <div id="single-col-bottom">
        <Link
          to={`/${title.toLowerCase()}/new`}
          onClick={() => {
            handleNewClick(false);
          }}
        >
          <span>➕ New {title}</span>
        </Link>
      </div>
    </>
  );
}

LeftListWithAction.propTypes = {
  title: PropTypes.string,
  setSelection: PropTypes.func,
  selection: PropTypes.number,
  fetcher: PropTypes.func,
};

export default LeftListWithAction;
