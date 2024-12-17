import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import SearchBar from "../../multiuse/SearchBar";
import useCustomersData from "../../hooks/useCustomersData";
import useURLSearchParam from "../../hooks/useURLSearchParam";
import SelectableListItem from "../../multiuse/SelectableListItem";
import Button from "../../multiuse/Button";
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

  function handleCustomerSelect(e: React.MouseEvent<HTMLElement>, id: number) {
    setSelection(id);
  }

  if (!open) return null;

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
          <ul>
            {loading && <p>Information loading...</p>}
            {error && <p>An error occured.</p>}
            {!loading && !error && data?.length === 0 ? (
              <p>No Results</p>
            ) : data ? (
              <>
                {data.map((d) => {
                  return (
                    <SelectableListItem
                      resource={"customers"}
                      value={d}
                      key={d.id}
                      handleClick={handleCustomerSelect}
                      selected={d.id === selection}
                    />
                  );
                })}
              </>
            ) : null}
          </ul>
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
