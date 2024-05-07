import PropTypes from "prop-types";

function Table({ data }) {
  let headers = Object.keys(data[0]);

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header) => {
                return <th key={header}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr key={row.id}>
                  {Object.keys(row).map((key) => {
                    return <td key={row["id"] + key}>{row[key]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Table;
