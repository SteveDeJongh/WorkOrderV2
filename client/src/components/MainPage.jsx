import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";

function MainPage() {
  return (
    <>
      <div className="container">
        <Header />
        <NavBar />
        Main Page Content
      </div>
    </>
  );
}

export default MainPage;
