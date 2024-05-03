import { useState, useEffect } from "react";
import Table from "./Table";

function Content({ page, tableData }) {
  console.log("Table data from Content", tableData);
  return (
    <>
      <div className="content">
        <h1>{page}</h1>
        <p>Main Page Content</p>
        {tableData && <Table page={page} data={tableData} />}
      </div>
    </>
  );
}

export default Content;
