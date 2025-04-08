import { useState, useEffect } from "react";
import { useProductsData } from "../../../hooks/useProductsData";
import { useURLSearchParam } from "../../../hooks/useURLSearchParam";
import { SearchBar } from "../../multiuse/SearchBar";
import { SearchResultsTable } from "../../multiuse/SearchResultsTable";
import { Product } from "../../../types/products";
import { Box, Button, Grid2, Popper } from "../../../utils/muiImports";

type props = {
  addLine: Function;
};

function NewInvoiceLine({ addLine }: props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("productSearch");
  const [data, setData] = useState<Product[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  const {
    data: fetchedData,
    loading,
    error,
  } = useProductsData(debouncedSearchTerm);

  useEffect(() => {
    if (searchTerm) {
      setAnchorEl(document.getElementById("search-container")!);
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
    <Box
      className="searchContainer"
      onClick={(event) => event.stopPropagation()}
    >
      <Grid2
        container
        direction="row"
        spacing={1}
        alignItems={"center"}
        id="search-container"
      >
        <Grid2 size={{ xs: 9 }}>
          <SearchBar
            title={"products"}
            value={searchTerm}
            onSearchChange={handleDebouncedSearchChange}
            onImmediateChange={handleImmediateSearchChange}
          />
        </Grid2>
        <Grid2 size={{ xs: 3 }} display={"flex"} justifyContent={"center"}>
          <Button variant="outlined">Add Product</Button>
        </Grid2>
      </Grid2>
      <Popper open={isOpen && !!data} anchorEl={anchorEl}>
        <SearchResultsTable
          results={data ? data : []}
          handleSelection={(product: Product) => handleSelection(product)}
          columns={columns}
        />
      </Popper>
    </Box>
  );
}

export { NewInvoiceLine };
