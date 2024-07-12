import NavBar from "./NavBar";
import UserNav from "./UserNav";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <ul id="header-sections">
          <li className="header-section header-left">
            <NavBar />
          </li>
          <li className="header-section header-mid">
            <Link to="/">
              <h1>WorkOrder Logo</h1>
            </Link>
          </li>
          <li className="header-section header-right">
            <UserNav />
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
