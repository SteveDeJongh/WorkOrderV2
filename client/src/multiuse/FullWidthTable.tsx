import { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import useURLSearchParam from "../hooks/useURLSearchParam";
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";
import CustomerModal from "../components/Customers/CustomerModal";
import ProductModal from "../components/Products/ProductModal";
import InvoiceModal from "../components/Invoices/InvoiceModal";

type Props = {
  title: string;
  fetcher: Function;
  columns: Array<Object>;
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

function FullWidthTable({ title, fetcher, columns }: Props) {
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

  let Modal;
  const columnDef = columns.map((col) => {
    return {
      header: col.header,
      accessorFn: (row: Customer | Product) =>
        col.keys.map((key) => row[key]).join(" "),
    };
  });
  if (title === "Customers") {
    Modal = CustomerModal;
  } else if (title === "Products") {
    Modal = ProductModal;
  } else if (title === "Invoices") {
    Modal = InvoiceModal;
  }

  // Memo columns and data for use in table.
  const finalData = useMemo(() => data, [data, searchTerm]);
  const finalColumDef = useMemo(() => columnDef, []);

  const table = useReactTable({
    columns: finalColumDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
  });

  // For Modal
  const [isOpen, setIsOpen] = useState(false);
  const [clickedID, setClickedId] = useState(Number(useParams().id) || null);

  function handleClick(id) {
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
                {table.getHeaderGroups().map((headerEl) => (
                  <tr key={headerEl.id}>
                    {headerEl.headers.map((columnEl) => (
                      <th key={columnEl.id} colSpan={columnEl.colSpan}>
                        {flexRender(
                          columnEl.column.columnDef.header,
                          columnEl.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                <>
                  {data.length <= 0 ? (
                    <p>No Results</p>
                  ) : (
                    <>
                      {table.getRowModel().rows.map((rowEl) => (
                        <tr
                          key={rowEl.id}
                          onClick={() => handleClick(rowEl.original.id)}
                        >
                          {rowEl.getVisibleCells().map((cellEl) => (
                            <td key={cellEl.id}>
                              {flexRender(
                                cellEl.column.columnDef.cell,
                                cellEl.getContext()
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
        onClose={() => setIsOpen(false)}
        resourceId={clickedID}
        searchTerm={debouncedSearchTerm}
      />
    </>
  );
}

export default FullWidthTable;
