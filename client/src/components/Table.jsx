function Table({ page, data }) {
  console.log("Data from table", data);
  let headers = Object.keys(data[0]);

  return (
    <>
      <h1>{page}</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header) => {
              return <th>{header}</th>;
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
