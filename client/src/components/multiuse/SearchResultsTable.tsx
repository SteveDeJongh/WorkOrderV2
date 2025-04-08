import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { Product } from "../../types/products";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "../../utils/muiImports";
import { Customer } from "../../types/customers";

type Props = {
  results: Product[] | Customer[];
  handleSelection: Function;
  handleDoubleClick?: Function;
  columns: { keys: string[]; header: string }[];
};

function SearchResultsTable({
  results,
  handleSelection,
  handleDoubleClick,
  columns,
}: Props) {
  const [haveResults, setHaveResults] = useState(false);

  useEffect(() => {
    if (results) {
      setHaveResults(results.length !== 0);
    }
  }, [results]);

  const columnDef: ColumnDef<Product | Customer>[] = [];

  columns.forEach((col) => {
    columnDef.push({
      header: col.header,
      accessorFn: (row: Product | Customer) => {
        return row[col.keys];
      },
    });
  });

  const data: Product[] | Customer[] = useMemo(() => results, [results]);
  const finalColumDef = useMemo(() => columnDef, []);

  const table = useReactTable<Product | Customer>({
    data: data,
    columns: finalColumDef,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const [selectedRow, setSelectedRow] = useState<number>();
  function handleClick(row) {
    setSelectedRow(row.id);
    handleSelection(row, row);
  }

  function doubleClickHandler(row, target: HTMLElement) {
    if (handleDoubleClick) {
      handleDoubleClick(row.id);
    } else {
      handleClick(row, target);
    }
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: "400px", overflow: "auto", whiteSpace: "nowrap" }}
      variant="outlined"
    >
      <Table sx={{ maxWidth: 100, overflow: "auto" }} stickyHeader>
        <TableHead>
          {table.getHeaderGroups().map((headerEl) => (
            <TableRow key={headerEl.id}>
              {headerEl.headers.map((columnEl) => (
                <TableCell key={columnEl.id} colSpan={columnEl.colSpan}>
                  {flexRender(
                    columnEl.column.columnDef.header,
                    columnEl.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {!haveResults && (
            <TableRow>
              <TableCell>No Results</TableCell>
            </TableRow>
          )}
          {haveResults && (
            <>
              {table.getRowModel().rows.map((rowEl) => (
                <TableRow
                  key={rowEl.id}
                  onClick={(e) => {
                    handleClick(rowEl.original);
                  }}
                  onDoubleClick={(e) =>
                    doubleClickHandler(rowEl.original, e.target as HTMLElement)
                  }
                  selected={
                    selectedRow
                      ? selectedRow === Number(rowEl.original.id)
                      : false
                  }
                >
                  {rowEl.getVisibleCells().map((cellEl) => (
                    <TableCell key={cellEl.id}>
                      {flexRender(
                        cellEl.column.columnDef.cell,
                        cellEl.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { SearchResultsTable };
