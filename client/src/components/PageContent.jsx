import Actions from "./Actions";
import Content from "./Content";
import { useState, useEffect } from "react";

function PageContent({ page }) {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    async function fetchData(resource) {
      let data;
      try {
        let response = await fetch(`http://localhost:3000/api/v1/${resource}`);
        if (response.ok) {
          data = await response.json();
          if (data) {
            setTableData(data);
          }
        }
      } catch (e) {
        console.error(`Error occured fetching ${resource}: `, e);
      }
    }
    fetchData(page);
    console.log(tableData);
  }, [page]);

  return (
    <>
      <div className="main-panel">
        <Actions page={page} />
        <Content page={page} tableData={tableData} />
      </div>
    </>
  );
}

export default PageContent;
