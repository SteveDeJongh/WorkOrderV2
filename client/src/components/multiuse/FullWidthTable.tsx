import {
  useMemo,
  useState,
  useEffect,
  useRef,
  type CSSProperties,
} from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type Header,
  type Cell,
} from "@tanstack/react-table";
import { useURLSearchParam } from "../../hooks/useURLSearchParam";
import { SearchBar } from "./SearchBar";
import { useParams } from "react-router-dom";
import { CustomerModal } from "../Customers/CustomerModal";
import { ProductModal } from "../Products/ProductModal";
import { InvoiceModal } from "../Invoices/InvoiceModal";
import { ColumnSelector } from "./ColumnSelector";
import { syncUserPreference } from "../../services/userPreferencesServices";
import { useAuth } from "../../contexts/AuthContext";
import { TColumn } from "../columns";
import { Customer } from "../../types/customers";
import { Invoice } from "../../types/invoiceTypes";
import { Product } from "../../types/products";
import { dateTimeFormatter, showAsDollarAmount } from "../../utils";

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

// needed for row & cell level scope DnD setup
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  title: string;
  fetcher: Function;
  columns: TColumn[];
  colPreferences: string[];
  colOptions: string[];
};

const DraggableTableHeader = ({
  header,
}: {
  header: Header<Customer | Product | Invoice, unknown>;
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <th colSpan={header.colSpan} ref={setNodeRef} style={style}>
      <div className="flex">
        <button {...attributes} {...listeners}></button>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
      </div>
      {/* <div className="resizer"></div> */}
    </th>
  );
};

const DragAlongCell = ({
  cell,
}: {
  cell: Cell<Customer | Product | Invoice, unknown>;
}) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <td style={style} ref={setNodeRef}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
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
  const { user, updateUserPreferences } = useAuth();

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

  const [columnOrder, setColumnOrder] = useState<string[]>(colPreferences);

  useEffect(() => {
    setColumnOrder(colPreferences);
  }, [colPreferences]);

  const columnHelper = createColumnHelper<Customer | Product | Invoice>();

  // Memo columns and data for use in table.
  const finalData = useMemo(() => data, [data, searchTerm]);
  const finalColumDef = useMemo(() => {
    return filteredAndOrderedColumns.map((col) => {
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
          size: col.size,
        }
      );
    });
  }, [columnOrder, colPreferences]);

  const table = useReactTable({
    columns: finalColumDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    // Overriding the defualt rows ids, instead using the ID from the data.
    getRowId: (originalRow) => originalRow.id!.toString(),
    state: {
      columnOrder,
    },
    columnResizeMode: "onChange",
    defaultColumn: {
      size: 200, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
    onColumnOrderChange: setColumnOrder,
  });

  async function updateSavedUserColumns(newColumns: string[]) {
    const keyName = `${title.toLowerCase().slice(0, -1)}_columns`;
    const updatedPreferences = await syncUserPreference(user!.id, {
      [keyName]: newColumns.join(", "),
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

      setColumnOrder((columnOrder) => {
        return newColumnOrder;
      });
      updateSavedUserColumns(newColumnOrder);
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

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
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToHorizontalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <table>
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
                          />
                          // <th
                          //   key={header.id}
                          //   colSpan={header.colSpan}
                          //   style={{ width: `${header.getSize()}px` }}
                          //   draggable
                          //   onDragStart={() => (movingColumnId.current = header.id)}
                          //   onDragEnter={() => (targetColumnId.current = header.id)}
                          //   onDragEndCapture={handleDragEnd}
                          //   onDragOver={(e) => e.preventDefault()}
                          // >
                          //   {/* if last column, add ColunmSelctor, otherwise just return column.*/}
                          //   {idx === headerGroup.headers.length - 1 ? (
                          //     <div className="flex">
                          //       <span>
                          //         {flexRender(
                          //           header.column.columnDef.header,
                          //           header.getContext()
                          //         )}
                          //       </span>
                          //       <ColumnSelector
                          //         colOptions={colOptions}
                          //         preferences={colPreferences}
                          //         table={title.toLowerCase()}
                          //       />
                          //     </div>
                          //   ) : (
                          //     flexRender(
                          //       header.column.columnDef.header,
                          //       header.getContext()
                          //     )
                          //   )}
                          // </th>
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
                                {/* <td key={cell.id}>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </td> */}
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
