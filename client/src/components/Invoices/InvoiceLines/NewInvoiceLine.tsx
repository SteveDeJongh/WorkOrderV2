import { useState, useEffect } from "react";
import useProductsData from "../../../hooks/useProductsData";
import useURLSearchParam from "../../../hooks/useURLSearchParam";
import SearchBar from "../../../multiuse/SearchBar";
import Button from "../../../multiuse/Button";
import SearchResultsList from "./SearchResultsList";

type props = {};

export default function NewInvoiceLine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("productSearch");
  const [data, setData] = useState();

  const {
    data: fetchedData,
    loading,
    error,
  } = useProductsData(debouncedSearchTerm);

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

  console.log("searchTerm", searchTerm);
  console.log(data);

  return (
    <div>
      <SearchBar
        title={"products"}
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      <Button text={"Add Product"} />
      {data && searchTerm && <SearchResultsList results={data} />}
    </div>
  );
}
