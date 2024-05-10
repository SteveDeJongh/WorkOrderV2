import NavBar from "./NavBar";
import UserNav from "./UserNav";

function Header() {
  return (
    <>
      <header>
        <ul id="header-sections">
          <li className="header-section header-left">
            <NavBar />
          </li>
          <li className="header-section header-mid">
            <h1>WorkOrder App Logo</h1>
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
