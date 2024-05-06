import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { useState, useEffect } from "react";

function Dashboard() {
  return (
    <>
      <Header />
      <div id="layout">
        <SideBar currentPage={"dashboard"} />
        <div className="main-panel">
          <div>DashBoard</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
