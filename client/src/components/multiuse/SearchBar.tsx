import { Box, TextField } from "../../utils/muiImports";
import { ChangeEvent, FocusEvent, useRef } from "react";

type Props = {
  title: string;
  value: string;
  onSearchChange: Function;
  onImmediateChange: Function;
};

function SearchBar({ title, value, onSearchChange, onImmediateChange }: Props) {
  const searchDebouceRef = useRef<ReturnType<typeof setTimeout>>();

  function handleSearchChange(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const searchValue = e.target.value;

    onImmediateChange(searchValue);

    if (searchDebouceRef.current) {
      clearTimeout(searchDebouceRef.current);
    }

    searchDebouceRef.current = setTimeout(() => {
      onSearchChange(searchValue);
    }, 1000);
  }

  function handleFocus(e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) {
    e.target.select();
  }

  return (
    <Box>
      <TextField
        fullWidth
        size="small"
        type="text"
        name="searchBar"
        placeholder={`Search ${title}...`}
        value={value}
        onChange={(e) => handleSearchChange(e)}
        onFocus={handleFocus}
      />
    </Box>
  );
}

export { SearchBar };
