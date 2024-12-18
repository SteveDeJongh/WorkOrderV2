import { useRef } from "react";

type Props = {
  title: string;
  value: string;
  onSearchChange: Function;
  onImmediateChange: Function;
};

function SearchBar({ title, value, onSearchChange, onImmediateChange }: Props) {
  const searchDebouceRef = useRef<ReturnType<typeof setTimeout>>();

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value;

    onImmediateChange(searchValue);

    if (searchDebouceRef.current) {
      clearTimeout(searchDebouceRef.current);
    }

    searchDebouceRef.current = setTimeout(() => {
      onSearchChange(searchValue);
    }, 1000);
  }

  function handleFocus(e) {
    e.target.select();
  }

  return (
    <div className="searchBar">
      <input
        type="text"
        name="searchBar"
        placeholder={`Search ${title}...`}
        value={value}
        onChange={(e) => handleSearchChange(e)}
        onFocus={handleFocus}
      />
    </div>
  );
}

export default SearchBar;
