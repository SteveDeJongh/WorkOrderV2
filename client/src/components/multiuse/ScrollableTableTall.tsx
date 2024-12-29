import { dateTimeFormatter } from "../../utils";

type Column = {
  name: String;
  propName: string;
  returnBoolean?: boolean;
};

type Props = {
  columns: Array<Column>;
  data: Array<object>;
  onClick?: Function;
};

function ScrollableTableTall({ columns, data, onClick }: Props) {
  return (
    <>
      <div className="main-pane-content">
        <div className="scrollable-table tall">
          <table>
            <thead>
              <tr>
                {columns.map((column, idx) => {
                  return <th key={idx}>{column.name}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((line) => {
                return (
                  <tr
                    key={line.id}
                    onClick={() => (onClick ? onClick(line) : null)}
                  >
                    {columns.map((column) => {
                      if (
                        column.propName == "created_at" ||
                        column.propName == "updated_at"
                      ) {
                        return (
                          <td key={`${line.id}${column.name}`}>
                            {dateTimeFormatter(line[column.propName])}
                          </td>
                        );
                      } else if (column.returnBoolean) {
                        return (
                          <td key={`${line.id}${column.name}`}>
                            {line[column.propName] ? "True" : "False"}
                          </td>
                        );
                      }

                      return (
                        <td key={`${line.id}${column.name}`}>
                          {line[column.propName]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export { ScrollableTableTall };
