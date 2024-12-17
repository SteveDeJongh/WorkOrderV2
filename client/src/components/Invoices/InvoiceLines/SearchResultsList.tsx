import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowSelectionState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Product } from "../../../types/products";

type Props = {
  results: Array<object> | String;
  handleSelection: Function;
};

export default function SearchResultsList({ results, handleSelection }: Props) {
  const [haveResults, setHaveResults] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    if (results.length === 0) {
      setHaveResults(false);
    } else {
      setHaveResults(true);
    }
  }, [results]);

  useEffect(() => {
    console.log("Selection changed,", rowSelection);
  }, [rowSelection]);

  const columns = [
    { keys: ["sku"], header: "SKU" },
    { keys: ["upc"], header: "UPC" },
    { keys: ["name"], header: "Name" },
    { keys: ["description"], header: "Description" },
    { keys: ["price"], header: "Price" },
    { keys: ["stock"], header: "stock" },
  ];

  const columnDef = [];

  columns.forEach((col) => {
    columnDef.push({
      header: col.header,
      accessorFn: (row: Product) => {
        return row[col.keys];
      },
    });
  });

  const data = useMemo(() => results, [results]);
  const finalColumDef = useMemo(() => columnDef, []);

  const table = useReactTable({
    data: data,
    columns: finalColumDef,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  function handleClick(id) {
    handleSelection(id);
  }

  return (
    <>
      <div className="results-list">
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
            {!haveResults && (
              <tr>
                <td>No Results</td>
              </tr>
            )}
            {haveResults && (
              <>
                {table.getRowModel().rows.map((rowEl) => (
                  <tr
                    key={rowEl.id}
                    onClick={() => handleClick(rowEl.original)}
                    className={"search-result"}
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
          </tbody>
        </table>
      </div>
    </>
  );
}
