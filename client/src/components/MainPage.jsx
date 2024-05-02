import Header from "./Header";
import SideBar from "./SideBar";
import PageContent from "./PageContent";
import Footer from "./Footer";

function MainPage() {
  return (
    <>
      <Header />
      <div id="layout">
        <SideBar />
        <PageContent />
      </div>
      <Footer />
    </>
  );
}

export default MainPage;

{
  /* <div className="container-fluid">
<div className="row flex-nowrap">
  <SideBar />
  <div className="col-auto col-sm-10 col-md-9 col-xl-10 px-0">
    <Header />
    <PageContent />
  </div>
</div>
</div> */
}
