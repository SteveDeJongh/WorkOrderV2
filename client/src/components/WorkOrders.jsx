import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { useState, useEffect } from "react";

function Workorders() {
  return (
    <>
      <Header />
      <div id="layout">
        <SideBar currentPage={"workorders"} />
        <div className="main-panel">
          <div>WorkOrders</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Workorders;
