import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { ListItem } from "./ListItem";
import { useURLSearchParam } from "../../hooks/useURLSearchParam";
import { Customer } from "../../types/customers";
import { Product } from "../../types/products";
import { Invoice } from "../../types/invoiceTypes";

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
                    value={data}
                    linkToPage={linkToPage}
                    key={data.id}
                    selected={data.id == Number(paramID)}
                  />
                );
              })}
            </>
          ) : null
        ) : null}
      </ul>
      <div id="single-col-bottom">
        <Link to={`/${title.toLowerCase()}/new`}>
          <span>➕ New {title.slice(0, -1)}</span>
        </Link>
      </div>
    </>
  );
}

export { LeftListWithAction };
