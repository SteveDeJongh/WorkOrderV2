import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import SearchBar from "../multiuse/SearchBar";
import useCustomersData from "../../hooks/useCustomersData";
import useURLSearchParam from "../../hooks/useURLSearchParam";
import SearchResultsTable from "../multiuse/SearchResultsTable";
import Button from "../multiuse/Button";
import { Customer } from "../../types/customers";

type Props = {
  open: boolean;
  onClose: Function;
  onSave: Function;
  customer_id?: number | string;
};

function CustomerSearchModal({ open, onClose, onSave, customer_id }: Props) {
  function handleClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let target = e.target as HTMLElement;
    if (target.className === "main-modal-background") {
      onClose();
    }
  }

  // Main Pane states
  const [selection, setSelection] = useState(customer_id);
  const [data, setMainData] = useState<Customer[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");

  const {
    data: fetchedData,
    loading,
    error,
  } = useCustomersData(debouncedSearchTerm);

  useEffect(() => {
    setSelection(customer_id);
  }, [customer_id]);

  useEffect(() => {
    if (fetchedData) {
      setMainData(fetchedData);
    }
  }, [fetchedData]);

  function handleDebouncedSearchChange(searchValue: string) {
    setDebouncedSearchTerm(searchValue);
  }

  function handleImmediateSearchChange(searchValue: string) {
    setSearchTerm(searchValue);
  }

  function handleCustomerSelect(id: number) {
    setSelection(id);
  }

  if (!open) return null;

  const columns = [
    { keys: ["id"], header: "ID" },
    { keys: ["first_name", "last_name"], header: "Full Name" },
    { keys: ["first_name"], header: "First Name" },
    { keys: ["last_name"], header: "Last Name" },
    { keys: ["phone"], header: "Phone" },
    { keys: ["email"], header: "Email" },
    { keys: ["address"], header: "Address" },
    { keys: ["city"], header: "City" },
    { keys: ["province"], header: "Province" },
    { keys: ["country"], header: "Country" },
  ];

  return ReactDom.createPortal(
    <>
      <div className="main-modal-background" onClick={(e) => handleClose(e)}>
        <div className="main-modal">
          <SearchBar
            title={"Customers"}
            value={searchTerm}
            onSearchChange={handleDebouncedSearchChange}
            onImmediateChange={handleImmediateSearchChange}
          />
          {loading && <p>Information loading...</p>}
          {error && <p>An error occured.</p>}
          {!loading && !error && data ? (
            <>
              <div className="contained-search-table">
                <SearchResultsTable
                  results={data}
                  handleSelection={(customer: Customer) => {
                    handleCustomerSelect(customer.id);
                  }}
                  handleDoubleClick={() => {
                    onSave(selection);
                  }}
                  columns={columns}
                />
              </div>
            </>
          ) : null}
          <div className="controls">
            <Button onClick={() => onSave(selection)} text={"Save"} />
            <Button onClick={() => onClose()} text={"Cancel"} />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default CustomerSearchModal;
