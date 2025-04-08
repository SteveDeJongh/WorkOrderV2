import { useState, useEffect } from "react";
import { SearchBar } from "../../multiuse/SearchBar";
import { useCustomersData } from "../../../hooks/useCustomersData";
import { useURLSearchParam } from "../../../hooks/useURLSearchParam";
import { SearchResultsTable } from "../../multiuse/SearchResultsTable";
import { Customer } from "../../../types/customers";
import { CUSTOMERCOLUMNS } from "../../columns";
import {
  Box,
  Button,
  CardActions,
  Modal,
  Stack,
  Typography,
} from "../../../utils/muiImports";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  handleClose: () => void;
  onSave: Function;
  customer_id?: number | string;
};

function CustomerSearchModal({
  open,
  handleClose,
  onSave,
  customer_id,
}: Props) {
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={style} spacing={3}>
        <SearchBar
          title={"Customers"}
          value={searchTerm}
          onSearchChange={handleDebouncedSearchChange}
          onImmediateChange={handleImmediateSearchChange}
        />
        {loading && (
          <Typography variant="body1">Information loading...</Typography>
        )}
        {error && <Typography variant="body1">An error occured.</Typography>}
        {!loading && !error && data ? (
          <Box className="contained-search-table">
            <SearchResultsTable
              results={data}
              handleSelection={(customer: Customer) => {
                handleCustomerSelect(customer.id);
              }}
              handleDoubleClick={() => {
                onSave(selection);
              }}
              columns={CUSTOMERCOLUMNS}
            />
          </Box>
        ) : null}
        <CardActions>
          <Button variant="outlined" onClick={() => onSave(selection)}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </CardActions>
      </Stack>
    </Modal>
  );
}

export { CustomerSearchModal };
