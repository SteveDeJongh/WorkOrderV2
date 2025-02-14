import { flexRender, Header } from "@tanstack/react-table";
import { Customer } from "../../../types/customers";
import { Product } from "../../../types/products";
import { Invoice } from "../../../types/invoiceTypes";
import { useSortable } from "@dnd-kit/sortable";
import { CSSProperties } from "react";
import { CSS } from "@dnd-kit/utilities";
import { ColumnSelector } from "./ColumnSelector";
import { ColumnPreferences, TColumn } from "../../columns";

const DraggableTableHeader = ({
  header,
  last,
  colOptions,
  colPreferences,
  title,
  columns,
}: {
  header: Header<Customer | Product | Invoice, unknown>;
  last: boolean;
  colPreferences: ColumnPreferences[];
  colOptions: string[];
  title: string;
  columns: TColumn[];
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
        <button
          // Reordering
          {...attributes}
          {...listeners}
        />
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        {last ? (
          <ColumnSelector
            colOptions={colOptions}
            colPreferences={colPreferences}
            title={title}
            columns={columns}
          />
        ) : (
          <div
            // Resizing
            {...{
              onDoubleClick: () => header.column.resetSize(),
              onMouseDown: header.getResizeHandler(),
              onTouchStart: header.getResizeHandler(),
              className: `resizer ${
                header.column.getIsResizing() ? "isResizing" : ""
              }`,
            }}
          ></div>
        )}
      </div>
    </th>
  );
};

export { DraggableTableHeader };
