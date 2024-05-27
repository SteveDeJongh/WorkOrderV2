import { useRef } from "react";
import PropTypes from "prop-types";

function SearchBar({ value, onSearchChange, onImmediateChange }) {
  const searchDebouceRef = useRef(null);

  function handleSearchChange(e) {
    const searchValue = e.target.value;

    onImmediateChange(searchValue);

    if (searchDebouceRef.current) {
      clearTimeout(searchDebouceRef.current);
    }

    searchDebouceRef.current = setTimeout(() => {
      onSearchChange(searchValue);
    }, 1000);
  }

  return (
    <div id="searchBar">
      <input
        type="text"
        name="searchBar"
        placeholder="Search Customers..."
        value={value}
        onChange={handleSearchChange}
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onImmediateChange: PropTypes.func.isRequired,
};

export default SearchBar;
