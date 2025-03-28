import { useState, useEffect, MouseEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { ListItem } from "./ListItem";
import { useURLSearchParam } from "../../hooks/useURLSearchParam";
import { Customer } from "../../types/customers";
import { Product } from "../../types/products";
import { Invoice } from "../../types/invoiceTypes";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Grid2,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

type OptionalSelection = {
  selected?: boolean;
};
type CustomerWithSelection = Customer & OptionalSelection;
type ProductWithSelection = Product & OptionalSelection;
type InvoiceWithSelection = Invoice & OptionalSelection;

type Props = {
  title: string;
  linkToPage: string;
  getter: Function;
};

function LeftListWithAction({ title, linkToPage, getter }: Props) {
  const { id: paramID } = useParams();
  const [data, setData] = useState<
    CustomerWithSelection[] | ProductWithSelection[] | InvoiceWithSelection[]
  >();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");
  const { data: fetchedData, loading, error } = getter(debouncedSearchTerm);

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

  const [selectedID, setSelectedID] = useState<number>(Number(paramID));
  const navigate = useNavigate();

  function handleItemClick(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    index: number
  ) {
    console.log(e, index, "clicked");
    setSelectedID(index);
    navigate(`/${title}/${index}/${linkToPage}`);
  }

  return (
    <Grid2 container direction="column">
      <SearchBar
        title={title}
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      <List sx={{}}>
        {loading && (
          <Typography component="p">Information loading...</Typography>
        )}
        {error && <Typography component="p">An error occured.</Typography>}
        {!loading && !error && data?.length === 0 ? (
          <ListItemButton disabled>
            <ListItemText>No Results</ListItemText>
          </ListItemButton>
        ) : !loading && !error ? (
          data ? (
            <>
              {data.map((data) => {
                return (
                  <ListItem
                    value={data}
                    linkToPage={linkToPage}
                    key={data.id}
                    selected={data.id === selectedID}
                    onClick={(e) => handleItemClick(e, data.id)}
                  />
                );
              })}
            </>
          ) : null
        ) : null}
      </List>
      <Box>
        <Button
          onClick={() => navigate(`/${title.toLowerCase()}/new`)}
          startIcon={<AddIcon />}
          variant="outlined"
        >
          New {title.slice(0, -1)}
        </Button>
      </Box>
    </Grid2>
  );
}

export { LeftListWithAction };
