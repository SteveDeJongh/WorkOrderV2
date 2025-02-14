import { useMemo, useState, useEffect, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  ColumnSizingState,
} from "@tanstack/react-table";
import { useURLSearchParam } from "../../../hooks/useURLSearchParam";
import { SearchBar } from "../SearchBar";
import { useParams } from "react-router-dom";
import { CustomerModal } from "../../Customers/CustomerModal";
import { ProductModal } from "../../Products/ProductModal";
import { InvoiceModal } from "../../Invoices/InvoiceModal";
import { syncUserPreference } from "../../../services/userPreferencesServices";
import { useAuth } from "../../../contexts/AuthContext";
import { ColumnPreferences, TColumn } from "../../columns";
import { Customer } from "../../../types/customers";
import { Invoice } from "../../../types/invoiceTypes";
import { Product } from "../../../types/products";
import { dateTimeFormatter, showAsDollarAmount } from "../../../utils";

// Components

import { DragAlongCell } from "./DragAlongCell";
import { DraggableTableHeader } from "./DragableTableHeader";

// needed for table body level scope DnD setup
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

// Utilities
function reorderColumnPreferences(
  newColumnOrder: string[],
  colPreferences: ColumnPreferences[],
  allColumns: TColumn[]
) {
  let newColPreferences: ColumnPreferences[] = [...colPreferences];

  newColumnOrder.forEach((colName, colPosition) => {
    let savedColumn = newColPreferences.find(
      (preference) => preference.id === colName
    );

    if (savedColumn) {
      savedColumn.sequence = colPosition + 1;
    } else {
      // In case the column isn't already in the colPreferences, find it in allColumns.
      let newColumn = allColumns.find((column) => column.id === colName);
      if (!newColumn) return;
      newColPreferences.push({
        id: newColumn.id,
        size: newColumn.size,
        sequence: colPosition + 1,
        display: true,
      } as ColumnPreferences);
    }
  });

  // Change `display` property to false on any column not in the new order. Won't be required once managing display state via ColumnSelector.
  return newColPreferences.map((preference) => {
    let inColumnOrder = newColumnOrder.findIndex(
      (colName) => colName === preference.id
    );

    if (inColumnOrder === -1) {
      return { ...preference, display: false };
    }
    return preference;
  });
}

type Props = {
  title: string;
  fetcher: Function;
  columns: TColumn[];
  colPreferences: ColumnPreferences[];
  colOptions: string[];
};

function FullWidthTable({
  title,
  fetcher,
  columns,
  colPreferences,
  colOptions,
}: Props) {
  const { user, updateUserPreferences } = useAuth();
  // SearchBar
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");

  function handleDebouncedSearchChange(searchValue: string) {
    setDebouncedSearchTerm(searchValue);
  }

  function handleImmediateSearchChange(searchValue: string) {
    setSearchTerm(searchValue);
  }

  // Data Fetching
  const [data, setData] = useState([]);
  const { data: fetchedData, loading, error } = fetcher(debouncedSearchTerm);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  // Columns
  const [columnOrder, setColumnOrder] = useState<string[]>(
    sortColumnOrder(colPreferences)
  );

  function sortColumnOrder(columns: ColumnPreferences[]) {
    return columns
      .filter((colPref) => colPref.display)
      .toSorted((a, b) => a.sequence - b.sequence)
      .map((colPref) => colPref.id);
  }

  useEffect(() => {
    console.log(
      "colPreferences in useEffect to setColumnOrder",
      colPreferences
    );
    setColumnOrder(sortColumnOrder(colPreferences));
  }, [colPreferences]);

  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>(() =>
    columnSizingInit()
  );

  useEffect(() => {
    setColumnSizing(() => columnSizingInit());
  }, [colPreferences]);

  function columnSizingInit() {
    let columnSizingObject: ColumnSizingState = {};
    colPreferences.forEach((colPref) => {
      columnSizingObject[colPref.id] = colPref.size;
    });
    return columnSizingObject;
  }

  const columnHelper = createColumnHelper<Customer | Product | Invoice>();

  // Memo columns and data for use in table.
  const finalData = useMemo(() => data, [data, searchTerm]);
  const finalColumDef = useMemo(() => {
    // Filter columns to just those selected.
    let filteredCol = columns.filter((col) => {
      return columnOrder.some((x) => x === col.id);
    });
    return filteredCol.map((col) => {
      return columnHelper.accessor(
        (row) =>
          col.keys
            .map((key) => {
              return row[key as keyof typeof row];
            })
            .join(" "),
        {
          header: col.header,
          cell: (props) => {
            if (col.showAsDollars) {
              return showAsDollarAmount(props.getValue());
            } else if (col.showAsDate) {
              return dateTimeFormatter(props.getValue());
            }
            return props.getValue();
          },
        }
      );
    });
  }, [columnOrder, colPreferences]);

  const table = useReactTable({
    columns: finalColumDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    // Overriding the default row ids, instead using the ID from the data.
    getRowId: (originalRow) => originalRow.id!.toString(),
    state: {
      columnOrder,
      columnSizing,
    },
    columnResizeMode: "onChange",
    defaultColumn: {
      // size: 200, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
    onColumnOrderChange: setColumnOrder,
    onColumnSizingChange: handleColumnSizeChange,
  });

  // Column Resizing
  const columnSizeDebounceRef = useRef<ReturnType<typeof setTimeout>>();
  function handleColumnSizeChange() {
    let colInfo = table.getState().columnSizingInfo;
    let newSize = colInfo.startSize! + colInfo.deltaOffset!;
    let colName = colInfo.isResizingColumn;

    let newSizingInfo: ColumnSizingState = { ...columnSizing };
    newSizingInfo[colName as string] = newSize;

    setColumnSizing(newSizingInfo);
    updateColumnWidthsDebouncer(newSizingInfo);
  }

  function updateColumnWidthsDebouncer(newSizingInfo: ColumnSizingState) {
    if (columnSizeDebounceRef.current) {
      clearTimeout(columnSizeDebounceRef.current);
    }

    columnSizeDebounceRef.current = setTimeout(() => {
      updateColumnWidths(newSizingInfo);
    }, 2000);
  }

  async function updateColumnWidths(newSizingInfo: ColumnSizingState) {
    let newColPreferences = colPreferences.map((colPref) => {
      return { ...colPref, size: newSizingInfo[colPref.id] };
    });

    const keyName = `${title.toLowerCase().slice(0, -1)}_columns`;
    const updatedPreferences = await syncUserPreference(user!.id, {
      [keyName]: JSON.stringify(newColPreferences),
    });

    updateUserPreferences(updatedPreferences);
  }

  // Memoizing coolumns sizes.
  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  async function updateSavedUserColumns(newColumns: ColumnPreferences[]) {
    const keyName = `${title.toLowerCase().slice(0, -1)}_columns`;
    const updatedPreferences = await syncUserPreference(user!.id, {
      [keyName]: JSON.stringify(newColumns),
    });

    updateUserPreferences(updatedPreferences);
  }

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = columnOrder.indexOf(active.id as string);
      const newIndex = columnOrder.indexOf(over.id as string);
      let newColumnOrder = arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util

      setColumnOrder(newColumnOrder);

      updateSavedUserColumns(
        reorderColumnPreferences(newColumnOrder, colPreferences, columns)
      );
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  // For Modal
  function determineModal() {
    if (title === "Customers") {
      return CustomerModal;
    } else if (title === "Products") {
      return ProductModal;
    } else if (title === "Invoices") {
      return InvoiceModal;
    }
  }

  let Modal = determineModal();
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
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToHorizontalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <table
                {...{
                  className: "divTable",
                  style: {
                    ...columnSizeVars,
                    width: table.getTotalSize(),
                  },
                }}
              >
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      <SortableContext
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        {headerGroup.headers.map((header, idx) => (
                          <DraggableTableHeader
                            header={header}
                            key={header.id}
                            last={idx === headerGroup.headers.length - 1}
                            colOptions={colOptions}
                            colPreferences={colPreferences}
                            title={title.toLowerCase()}
                            columns={columns}
                          />
                        ))}
                      </SortableContext>
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
                              <SortableContext
                                key={cell.id}
                                items={columnOrder}
                                strategy={horizontalListSortingStrategy}
                              >
                                <DragAlongCell key={cell.id} cell={cell} />
                              </SortableContext>
                            ))}
                          </tr>
                        ))}
                      </>
                    )}
                  </>
                </tbody>
              </table>
            </DndContext>
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
