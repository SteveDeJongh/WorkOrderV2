import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="container pt-2 pb-2">
        <ul className="row justify-content-center">
          <li className="col-sm">
            <div className="">LOGO</div>
          </li>
          <li className="col-sm">
            <div className="">
              <h4 className="navbar-brand">Shop Name Goes Here</h4>
            </div>
          </li>
          <li className="col-sm">
            <div className="">
              <Link htmlFor="/">Log In</Link>
            </div>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
