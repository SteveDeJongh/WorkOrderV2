import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import ListItem from "./ListItem";
import useURLSearchParam from "../hooks/useURLSearchParam";
import { Customer } from "../types/customers";
import { Product } from "../types/products";
import { Invoice } from "../types/invoiceTypes";

type OptionalSelection = {
  selected?: boolean;
};
type CustomerWithSelection = Customer & OptionalSelection;
type ProductWithSelection = Product & OptionalSelection;
type InvoiceWithSelection = Invoice & OptionalSelection;

type Props = {
  title: string;
  linkToPage: string;
  setSelection: React.Dispatch<React.SetStateAction<number | null>>;
  selection: number | null;
  fetcher: Function;
};

function LeftListWithAction({
  title,
  linkToPage,
  setSelection,
  selection,
  fetcher,
}: Props) {
  const { id: paramID } = useParams();
  const [lastSelection, setLastSelection] = useState<Number>();
  const [data, setData] = useState<
    CustomerWithSelection[] | ProductWithSelection[] | InvoiceWithSelection[]
  >();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");
  const { data: fetchedData, loading, error } = fetcher(debouncedSearchTerm);

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

  function handleItemClick(id: number) {
    let nextData = data ? data.slice() : [];

    let item = nextData.filter((data) => data.id == id)[0];
    if (lastSelection) {
      let lastItem = nextData.filter((data) => data.id == lastSelection)[0];
      lastItem.selected = false;
    }
    item.selected = true;

    setSelection(id);
    setLastSelection(id);
    setData(nextData);
  }

  function handleNewClick() {
    let nextData = data ? data.slice() : [];

    selection
      ? (nextData.filter((data) => {
          return data.id == selection;
        })[0].selected = false)
      : null;

    setData(nextData);
  }

  return (
    <>
      <h3 className="title">{title}</h3>
      <SearchBar
        title={title}
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      <ul>
        {loading && (
          <>
            <p>Information loading...</p>
          </>
        )}
        {error && <p>An error occured.</p>}
        {!loading && !error && data?.length === 0 ? (
          <>
            <p>No Results</p>
          </>
        ) : !loading && !error ? (
          data ? (
            <>
              {data.map((data) => {
                return (
                  <ListItem
                    resource={title.toLowerCase()}
                    value={data}
                    linkToPage={linkToPage}
                    key={data.id}
                    handleClick={handleItemClick}
                    selected={!!data.selected || data.id == Number(paramID)}
                  />
                );
              })}
            </>
          ) : null
        ) : null}
      </ul>
      <div id="single-col-bottom">
        <Link
          to={`/${title.toLowerCase()}/new`}
          onClick={() => {
            handleNewClick();
          }}
        >
          <span>➕ New {title.slice(0, -1)}</span>
        </Link>
      </div>
    </>
  );
}

export default LeftListWithAction;
