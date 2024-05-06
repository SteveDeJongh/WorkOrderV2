import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { useState, useEffect } from "react";

function Customers() {
  return (
    <>
      <Header />
      <div id="layout">
        <SideBar currentPage={"customers"} />
        <div className="main-panel">
          <div>Customers</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Customers;
