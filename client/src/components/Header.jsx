import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <ul className="">
          <li>WorkOrder</li>
          <li>
            <h1>Shop Name Goes Here</h1>
          </li>
          <li>
            <ul>
              <li>Sign In</li>
              <li>My Info</li>
            </ul>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;

{
  /* <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div
          className="collapse navbar-collapse justify-content-md-center space-around"
          id="navbarsExample08"
        >
          {
            <Link htmlFor="/" className="navbar-brand col-6">
              {" "}
              Shop Name Goes Here{" "}
            </Link>
          }

          <a className="nav-link text-white col-3" href="#">
            Log In
          </a>
        </div>
      </nav> */
}
