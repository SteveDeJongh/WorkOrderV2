import { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useURLSearchParam } from "../../hooks/useURLSearchParam";
import { SearchBar } from "./SearchBar";
import { useParams } from "react-router-dom";
import { CustomerModal } from "../Customers/CustomerModal";
import { ProductModal } from "../Products/ProductModal";
import { InvoiceModal } from "../Invoices/InvoiceModal";
import { Invoice } from "../../types/invoiceTypes";
import { ColumnSelector } from "./ColumnSelector";

type Props = {
  title: string;
  fetcher: Function;
  columns: Array<Object>;
  colPreferences: string[];
  colOptions: string[];
};

type Customer = {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  country: string;
};

type Product = {
  id: Number;
  sku: String;
  upc: Number;
  name: String;
  description: String;
  price: Number;
  taxrate: Number;
  stock: Number;
  min: Number;
  max: Number;
};

function FullWidthTable({
  title,
  fetcher,
  columns,
  colPreferences,
  colOptions,
}: Props) {
  const [data, setData] = useState([]);
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

  const filteredAndOrderedColumns = colPreferences.map((pref) => {
    return columns[columns.findIndex((col) => col.header === pref)];
  });

  let Modal;
  if (title === "Customers") {
    Modal = CustomerModal;
  } else if (title === "Products") {
    Modal = ProductModal;
  } else if (title === "Invoices") {
    Modal = InvoiceModal;
  }

  // Memo columns and data for use in table.
  const finalData = useMemo(() => data, [data, searchTerm]);
  const finalColumDef = useMemo(() => {
    return filteredAndOrderedColumns.map((col) => {
      return {
        header: col.header,
        accessorFn: (row: Customer | Product | Invoice) =>
          col.keys.map((key) => row[key]).join(" "),
      };
    });
  }, [filteredAndOrderedColumns]);

  const table = useReactTable({
    columns: finalColumDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
  });

  // For Modal
  const { id } = useParams();
  const [clickedID, setClickedId] = useState(Number(id) || undefined);
  const [isOpen, setIsOpen] = useState(!!clickedID);

  function handleClick(id: number) {
    setClickedId(id);
    setIsOpen(true);
  }

  return (
    <>
      {loading && <p>Information loading...</p>}
      {error && <p>An error occured.</p>}
      {!loading && !error && (
        <div>
          <SearchBar
            title={title}
            value={searchTerm}
            onSearchChange={handleDebouncedSearchChange}
            onImmediateChange={handleImmediateSearchChange}
          />
          <div className="table">
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, idx) =>
                      // if last column, add ColunmSelctor, otherwise just return column.
                      idx === headerGroup.headers.length - 1 ? (
                        <th key={header.id}>
                          <div className="flex">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <ColumnSelector
                              colOptions={colOptions}
                              preferences={colPreferences}
                              table={title.toLowerCase()}
                            />
                          </div>
                        </th>
                      ) : (
                        <th key={header.id}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      )
                    )}
                  </tr>
                ))}
              </thead>
              <tbody>
                <>
                  {data.length <= 0 ? (
                    <tr>
                      <td>No Results</td>
                    </tr>
                  ) : (
                    <>
                      {table.getRowModel().rows.map((row) => (
                        <tr
                          key={row.id}
                          onClick={() => handleClick(Number(row.original.id))}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}
                </>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Modal
        open={isOpen}
        onClose={() => {
          setClickedId(undefined);
          setIsOpen(false);
        }}
        resourceId={clickedID}
        searchTerm={debouncedSearchTerm}
      />
    </>
  );
}

export { FullWidthTable };
