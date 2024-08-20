import React from "react";
import { useState, useEffect, useContext } from "react";
import ReactDom from "react-dom";
import LoadingBox from "../../multiuse/LoadingBox";
import SearchBar from "../../multiuse/SearchBar";
import useCustomersData from "../../hooks/useCustomersData";
import useURLSearchParam from "../../hooks/useURLSearchParam";
import { objectToFormData } from "../../utils/formDataHelper";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import SelectableListItem from "../../multiuse/SelectableListItem";

type Props = {
  open: boolean;
  onClose: Function;
  onSave: Function;
};

function CustomerSearchModal({ open, onClose, onSave }: Props) {
  function handleClose(e) {
    if (e.target.className === "main-modal-background") {
      onClose();
    }
  }

  // Main Pane states
  const [selection, setSelection] = useState(0);
  const [data, setMainData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");

  const {
    data: fetchedData,
    loading,
    error,
  } = useCustomersData(debouncedSearchTerm);

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
            {!loading && !error && data == "No results" ? (
              <p>No Results</p>
            ) : (
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
            )}
          </ul>
          <div className="controls">
            <button onClick={() => onSave(selection)}>Save</button>
            <button onClick={() => onClose()}>Cancel</button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default CustomerSearchModal;
