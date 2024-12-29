import { NavBar } from "./NavBar";
import { UserNav } from "./UserNav";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <div id="header-sections">
          <div className="header-section header-left">
            <NavBar />
          </div>
          <div className="header-section header-mid">
            <Link to="/">
              <h1>WorkOrder</h1>
            </Link>
          </div>
          <div className="header-section header-right">
            <UserNav />
          </div>
        </div>
      </header>
    </>
  );
}

export { Header };
