import Header from "./Header";
import NavBar from "./NavBar";

function MainPage() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col">
            <NavBar />
          </div>
          <div className="col">Main page content</div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
