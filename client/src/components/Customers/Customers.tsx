import LeftListWithAction from "../../multiuse/LeftListWithAction";
import FullWidthTable from "../../multiuse/FullWidthTable";
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
import ViewToggle from "../../multiuse/ViewToggle";

function Customers() {
  const [user, setUser] = useContext(UserContext);
  const [view, setView] = useState(user.views?.customers || "profile");

  function viewSetter(view) {
    user.views ? user.views : (user.views = {});

    user.views["customers"] = view;
    setView(view);
  }

  let location = useLocation();
  let pathname = location.pathname;
  let navigate = useNavigate();

  const [selection, setSelection] = useState(Number(useParams().id) || null);

  let renderNoSelection = "/customers" === pathname && !selection;

  if (selection && selection !== "undefined" && pathname === "/customers") {
    navigate(`/customers/${selection}/profile`);
  }

  const columns = [
    { keys: ["id"], header: "ID" },
    { keys: ["first_name", "last_name"], header: "Full Name" },
    { keys: ["first_name"], header: "First Name" },
    { keys: ["last_name"], header: "Last Name" },
    { keys: ["phone"], header: "Phone" },
    { keys: ["email"], header: "Email" },
    { keys: ["address"], header: "Address" },
    { keys: ["city"], header: "City" },
    { keys: ["province"], header: "Province" },
    { keys: ["country"], header: "Country" },
  ];
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
          {view === "profile" && (
            <div id="panes">
              <div className="pane pane-left">
                <div className="pane-inner">
                  <LeftListWithAction
                    title={"Customers"}
                    linkToPage={"profile"}
                    setSelection={setSelection}
                    selection={selection}
                    fetcher={useCustomersData}
                  />
                </div>
              </div>
              <div className="pane pane-mid">
                <div className="pane-inner">
                  <ViewToggle view={view} setView={viewSetter} />
                  {renderNoSelection ? (
                    <NoSelection item={"customer"} />
                  ) : (
                    <Outlet context={[selection, setSelection]} />
                  )}
                </div>
              </div>
            </div>
          )}
          {view === "table" && (
            <>
              <div id="panes">
                <div className="pane pane-full">
                  <div className="pane-inner">
                    <div className="table-top">
                      <h3 className="title">Customers</h3>
                      <ViewToggle view={view} setView={viewSetter} />
                    </div>
                    <FullWidthTable
                      title={"Customers"}
                      fetcher={useCustomersData}
                      columns={columns}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Customers;
