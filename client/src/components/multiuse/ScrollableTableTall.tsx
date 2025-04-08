import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "../../utils/muiImports";
import { dateTimeFormatter } from "../../utils";
import { Product } from "../../types/products";
import { Invoice } from "../../types/invoiceTypes";
import { Customer } from "../../types/customers";
import { Movement } from "../../types/movements";

type Column = {
  name: String;
  propName: string;
  returnBoolean?: boolean;
};

type Props = {
  columns: Array<Column>;
  data: Array<Customer | Product | Invoice | Movement>;
  onClick?: Function;
  inModal?: boolean;
  height?: string;
};

function ScrollableTableTall({
  columns,
  data,
  onClick,
  inModal,
  height,
}: Props) {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          ...(height ? { maxHeight: height } : {}),
          overflow: "auto",
          whiteSpace: "nowrap",
        }}
        variant="outlined"
      >
        <Table sx={{ minWidth: 1000 }} stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, idx) => {
                return (
                  <TableCell key={idx} align={idx !== 0 ? "right" : "inherit"}>
                    {column.name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((line) => {
              return (
                <TableRow
                  key={line.id}
                  onClick={() => (onClick ? onClick(line) : null)}
                >
                  {columns.map((column, idx) => {
                    return (
                      <TableCell
                        key={`${line.id}${column.name}`}
                        align={idx !== 0 ? "right" : "inherit"}
                      >
                        {(column.propName == "created_at" ||
                          column.propName == "updated_at") && (
                          <>{dateTimeFormatter(line[column.propName])}</>
                        )}
                        {column.returnBoolean && (
                          <>{line[column.propName] ? "True" : "False"}</>
                        )}
                        {column.propName !== "created_at" &&
                          column.propName !== "updated_at" &&
                          !column.returnBoolean && <>{line[column.propName]}</>}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export { ScrollableTableTall };
