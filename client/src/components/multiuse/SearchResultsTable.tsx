import { useEffect, useMemo, useState, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Product } from "../../types/products";

type Props = {
  results: Array<object>;
  handleSelection: Function;
  handleDoubleClick?: Function;
  columns: { keys: string[]; header: string }[];
};

export default function SearchResultsTable({
  results,
  handleSelection,
  handleDoubleClick,
  columns,
}: Props) {
  const [haveResults, setHaveResults] = useState(false);
  const lastSelectedRow = useRef<HTMLTableRowElement>();

  useEffect(() => {
    if (results.length === 0) {
      setHaveResults(false);
    } else {
      setHaveResults(true);
    }
  }, [results]);

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
  });

  function handleClick(row, target: HTMLElement) {
    let tr = target.closest("tr");
    tr ? manageSelectionState(tr) : null;
    handleSelection(row, row);
  }

  function manageSelectionState(row: HTMLTableRowElement) {
    if (lastSelectedRow.current) {
      lastSelectedRow.current.classList.remove("active");
    }

    lastSelectedRow.current = row;
    row.classList.add("active");
  }

  function doubleClickHandler(row, target: HTMLElement) {
    if (handleDoubleClick) {
      handleDoubleClick(row.id);
    } else {
      handleClick(row, target);
    }
  }

  return (
    <>
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
                  onClick={(e) => {
                    handleClick(rowEl.original, e.target as HTMLElement);
                  }}
                  onDoubleClick={(e) =>
                    doubleClickHandler(rowEl.original, e.target as HTMLElement)
                  }
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
    </>
  );
}
