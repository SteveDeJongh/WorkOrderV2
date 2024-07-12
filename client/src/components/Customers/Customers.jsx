import LeftListWithAction from "../../multiuse/LeftListWithAction";
import {
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import NoSelection from "../NoSelection";
import useCustomersData from "../../hooks/useCustomersData";
import { useContext } from "react";
import UserContext from "../../contexts/user-context";

function Customers() {
  const [user, setUser] = useContext(UserContext);
  let location = useLocation();
  let pathname = location.pathname;
  let navigate = useNavigate();

  const [selection, setSelection] = useState(Number(useParams().id) || null);

  let renderNoSelection = "/customers" === pathname && !selection;

  if (selection && selection !== "undefined" && pathname === "/customers") {
    navigate(`/customers/${selection}/profile`);
  }

  return (
    <>
      {!user && (
        <>
          <h1>Sorry, you must be signed in to access this page.</h1>
          <Link to="/signin">Sign In</Link>
        </>
      )}
      {user && (
        <>
          <div id="panes">
            <div className="pane pane-left">
              <div className="pane-inner">
                <LeftListWithAction
                  title={"Customers"}
                  page={"profile"}
                  setSelection={setSelection}
                  selection={selection}
                  fetcher={useCustomersData}
                />
              </div>
            </div>
            <div className="pane pane-mid">
              {renderNoSelection ? (
                <NoSelection item={"customer"} />
              ) : (
                <Outlet context={[selection, setSelection]} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Customers;
