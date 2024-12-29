import { useState, useEffect } from "react";
import { useProductsData } from "../../../hooks/useProductsData";
import { useURLSearchParam } from "../../../hooks/useURLSearchParam";
import { SearchBar } from "../../multiuse/SearchBar";
import { Button } from "../../multiuse/Button";
import { SearchResultsTable } from "../../multiuse/SearchResultsTable";
import { Product } from "../../../types/products";

type props = {
  addLine: Function;
};

function NewInvoiceLine({ addLine }: props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("productSearch");
  const [data, setData] = useState<Product[]>();
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

  function handleDebouncedSearchChange(searchValue: string) {
    setDebouncedSearchTerm(searchValue);
  }

  function handleImmediateSearchChange(searchValue: string) {
    setSearchTerm(searchValue);
  }

  function handleSelection(product: Product) {
    setSearchTerm("");
    setIsOpen(false);
    addLine(product);
  }

  // Close search results list if outside click.
  useEffect(() => {
    function onClickOutside() {
      setIsOpen(false);
    }
    window.addEventListener("click", onClickOutside, false);
    return () => window.removeEventListener("click", onClickOutside);
  }, []);

  const columns = [
    { keys: ["sku"], header: "SKU" },
    { keys: ["upc"], header: "UPC" },
    { keys: ["name"], header: "Name" },
    { keys: ["description"], header: "Description" },
    { keys: ["price"], header: "Price" },
    { keys: ["stock"], header: "stock" },
  ];

  return (
    <div
      className="searchContainer"
      onClick={(event) => event.stopPropagation()}
    >
      <div id="search-actions">
        <SearchBar
          title={"products"}
          value={searchTerm}
          onSearchChange={handleDebouncedSearchChange}
          onImmediateChange={handleImmediateSearchChange}
        />
        <Button text={"Add Product"} />
      </div>
      {isOpen && data && (
        <div className="results-list">
          <SearchResultsTable
            results={data}
            handleSelection={(product: Product) => handleSelection(product)}
            columns={columns}
          />
        </div>
      )}
    </div>
  );
}

export { NewInvoiceLine };
