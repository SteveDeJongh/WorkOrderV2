import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { useState, useEffect } from "react";

function Products() {
  return (
    <>
      <Header />
      <div id="layout">
        <SideBar currentPage={"products"} />
        <div className="main-panel">
          <div>Products</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
