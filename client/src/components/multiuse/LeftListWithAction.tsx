import { useState, useEffect, MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { ListItem } from "./ListItem";
import { useURLSearchParam } from "../../hooks/useURLSearchParam";
import { Customer } from "../../types/customers";
import { Product } from "../../types/products";
import { Invoice } from "../../types/invoiceTypes";
import {
  AddIcon,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Grid2,
} from "../../utils/muiImports";

type OptionalSelection = {
  selected?: boolean;
};
type CustomerWithSelection = Customer & OptionalSelection;
type ProductWithSelection = Product & OptionalSelection;
type InvoiceWithSelection = Invoice & OptionalSelection;

type GetterFunction = (searchTerm: string) => {
  data: Customer[] | Product[] | Invoice[];
  loading: boolean;
  error: Error | null;
};

type Props = {
  title: string;
  linkToPage: string;
  getter: GetterFunction;
};

function LeftListWithAction({ title, linkToPage, getter }: Props) {
  const { id: paramID } = useParams();
  const [data, setData] = useState<
    CustomerWithSelection[] | ProductWithSelection[] | InvoiceWithSelection[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");
  const { data: fetchedData, loading, error } = getter(debouncedSearchTerm);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (paramID) {
      setSelectedID(parseInt(paramID, 10));
    }
  }, [paramID]);

  function handleDebouncedSearchChange(searchValue: string) {
    setDebouncedSearchTerm(searchValue);
  }

  function handleImmediateSearchChange(searchValue: string) {
    setSearchTerm(searchValue);
  }

  const [selectedID, setSelectedID] = useState<number>(Number(paramID));
  const navigate = useNavigate();

  function handleItemClick(index: number) {
    setSelectedID(index);
    navigate(`/${title.toLowerCase()}/${index}`);
  }

  return (
    <Grid2 container direction="column" height={"100%"}>
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
        {!loading && !error && data?.length === 0 && (
          <ListItemButton disabled>
            <ListItemText>No Results</ListItemText>
          </ListItemButton>
        )}
        {!loading && !error && data?.length > 0 && (
          <>
            {data.map((data) => {
              return (
                <ListItem
                  value={data}
                  linkToPage={linkToPage}
                  key={data.id}
                  selected={data.id === selectedID}
                  onClick={() => handleItemClick(data.id)}
                />
              );
            })}
          </>
        )}
      </List>

      <Button
        sx={{ marginTop: "auto", alightSelf: "auto" }}
        onClick={() => navigate(`/${title.toLowerCase()}/new`)}
        startIcon={<AddIcon />}
        variant="outlined"
      >
        New {title.replace(/s$/, "")}
      </Button>
    </Grid2>
  );
}

export { LeftListWithAction };
