import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import ListItem from "./ListItem";
import useURLSearchParam from "../hooks/useURLSearchParam";

function LeftListWithAction({
  title,
  linkToPage,
  setSelection,
  selection,
  fetcher,
}) {
  const [lastSelection, setLastSelection] = useState(null);

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
      <h3 className="title">{title}</h3>
      <SearchBar
        title={title}
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      <ul>
        {loading && <p>Information loading...</p>}
        {error && <p>An error occured.</p>}
        {!loading && !error && data == "No results" ? (
          <p>No Results</p>
        ) : (
          <>
            {data.map((data) => {
              return (
                <ListItem
                  resource={title.toLowerCase()}
                  value={data}
                  linkToPage={linkToPage}
                  key={data.id}
                  handleClick={handleItemClick}
                  selected={data.id === selection}
                />
              );
            })}
          </>
        )}
      </ul>
      <div id="single-col-bottom">
        <Link
          to={`/${title.toLowerCase()}/new`}
          onClick={() => {
            handleNewClick(false);
          }}
        >
          <span>➕ New {title.slice(0, -1)}</span>
        </Link>
      </div>
    </>
  );
}

LeftListWithAction.propTypes = {
  title: PropTypes.string,
  linkToPage: PropTypes.string,
  setSelection: PropTypes.func,
  selection: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fetcher: PropTypes.func,
};

export default LeftListWithAction;
