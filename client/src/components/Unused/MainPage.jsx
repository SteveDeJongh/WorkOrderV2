import Header from "../Header";
import SideBar from "./SideBar";
import PageContent from "./PageContent";
import Footer from "../Footer";
import { useState, useEffect } from "react";

function MainPage() {
  const [page, setPage] = useState("");

  useEffect(() => {
    console.log("render");
  }, [page]);

  function onTabClick(arg) {
    setPage(arg);
  }
  return (
    <>
      <Header />
      <div id="layout">
        <SideBar onTabClick={onTabClick} />
        <PageContent page={page} />
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
