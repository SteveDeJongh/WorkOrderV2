import { useState, useEffect, useRef } from "react";
import useProductsData from "../../../hooks/useProductsData";
import useURLSearchParam from "../../../hooks/useURLSearchParam";
import SearchBar from "../../../multiuse/SearchBar";
import Button from "../../../multiuse/Button";
import SearchResultsList from "./SearchResultsList";

type props = {
  addLine: Function;
};

export default function NewInvoiceLine({ addLine }: props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("productSearch");
  const [data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: fetchedData,
    loading,
    error,
  } = useProductsData(debouncedSearchTerm);

  useEffect(() => {
    if (searchTerm) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchTerm]);

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

  function handleSelection(product) {
    console.log("product selected", product);
    setSearchTerm("");
    setIsOpen(false);
    addLine(product);
  }

  return (
    <div className="searchContainer">
      <div id="search-actions">
        <SearchBar
          title={"products"}
          value={searchTerm}
          onSearchChange={handleDebouncedSearchChange}
          onImmediateChange={handleImmediateSearchChange}
        />
        <Button text={"Add Product"} />
      </div>
      {/* {data && searchTerm && <SearchResultsList results={data} />} */}
      {isOpen && (
        <SearchResultsList
          results={data}
          handleSelection={(product) => handleSelection(product)}
        />
      )}
    </div>
  );
}
