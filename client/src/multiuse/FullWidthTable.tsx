import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import useURLSearchParam from "../hooks/useURLSearchParam";
import SearchBar from "./SearchBar";
import { create } from "domain";

type Props = {
  title: String;
  fetcher: Function;
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

function FullWidthTable({ title, fetcher }: Props) {
  // const { data, isError, error, isPending, isSuccess } = useQuery({
  //   queryKey: [resource],
  //   queryFn: () => useCustomersData(""),
  //   staleTime: 1000, // overriding default staleTime
  //   refetchOnWindowFocus: false, // won't refetch when switching tabs.
  // });

  // if (isError) {
  //   console.log(error);
  // }

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

  // Table Stuff

  // Different ways to define columns.
  const columnHelper = createColumnHelper<Customer>();
  const columnDef = [
    // Option 1 For defining a column.
    {
      header: "ID",
      accessorKey: "id",
    },
    // Option 2 for defining a column
    {
      accessorFn: (row: Customer) => `${row.first_name} ${row.last_name}`,
      header: "Full Name",
    },
    // Option 3 for defining a column, requires a "columnHelper"
    columnHelper.accessor("first_name", { header: "First Name" }),
    columnHelper.accessor("last_name", { header: "Last Name" }),
    columnHelper.accessor("phone", { header: "Phone" }),
    columnHelper.accessor("email", { header: "Email" }),
    columnHelper.accessor("address", { header: "Address" }),
    columnHelper.accessor("city", { header: "City" }),
    columnHelper.accessor("province", { header: "Province" }),
    columnHelper.accessor("country", { header: "Country" }),
  ];

  // Memo columns and data for use in table.
  const finalData = useMemo(() => data, [data, searchTerm]);
  const finalColumDef = useMemo(() => columnDef, []);

  const table = useReactTable({
    columns: finalColumDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
  });

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
                {table.getRowModel().rows.map((rowEl) => (
                  <tr key={rowEl.id}>
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
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default FullWidthTable;
