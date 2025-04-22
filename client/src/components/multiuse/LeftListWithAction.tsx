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
import { GetterFunction } from "../../types/utils";

type Props = {
  title: string;
  linkToPage: string;
  getter: GetterFunction;
};

function LeftListWithAction({ title, linkToPage, getter }: Props) {
  const { id: paramID } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");
  const { data = [], loading, error } = getter(debouncedSearchTerm);
  const [selectedID, setSelectedID] = useState<number | null>(
    paramID ? parseInt(paramID, 10) : null
  );

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

  const navigate = useNavigate();

  function handleItemClick(id: number) {
    if (id !== selectedID) {
      setSelectedID(id);
      navigate(`/${title.toLowerCase()}/${id}`);
    }
  }

  return (
    <Grid2
      container
      direction="column"
      height="100%"
      wrap="nowrap"
      sx={{ width: "100%" }}
      spacing={1}
    >
      <Grid2 sx={{ flexShrink: 0, height: 40, width: "100%" }} pb={1}>
        <SearchBar
          title={title}
          value={searchTerm}
          onSearchChange={handleDebouncedSearchChange}
          onImmediateChange={handleImmediateSearchChange}
        />
      </Grid2>

      <Grid2
        sx={{
          flexGrow: 1,
          overflow: "auto",
          width: "100%",
        }}
      >
        <List>
          {loading && (
            <Typography component="p">Information loading...</Typography>
          )}
          {error && (
            <Typography component="p">
              {typeof error === "string"
                ? error
                : error.message || "An error occurred"}
            </Typography>
          )}
          {!loading && !error && data?.length === 0 && (
            <ListItemButton disabled>
              <ListItemText>No Results</ListItemText>
            </ListItemButton>
          )}
          {!loading && !error && data?.length > 0 && (
            <>
              {data.map((data) => (
                <ListItem
                  value={data}
                  linkToPage={linkToPage}
                  key={data.id}
                  selected={data.id === selectedID}
                  onClick={() => handleItemClick(data.id)}
                />
              ))}
            </>
          )}
        </List>
      </Grid2>

      <Grid2 sx={{ flexShrink: 0, height: 40, width: "100%" }}>
        <Button
          fullWidth
          onClick={() => navigate(`/${title.toLowerCase()}/new`)}
          startIcon={<AddIcon />}
          variant="outlined"
        >
          New {title.replace(/s$/, "")}
        </Button>
      </Grid2>
    </Grid2>
  );
}

export { LeftListWithAction };
