function Table({ page, data }) {
  let headers = Object.keys(data[0]);

  return (
    <>
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
                {Object.values(row).map((field) => {
                  console.log(field);
                  return <td key={row.id + field}>{field}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
