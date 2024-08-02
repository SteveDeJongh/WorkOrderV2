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
import MainPaneModal from "../../multiuse/MainPaneModal";

function Customers() {
  const [user, setUser] = useContext(UserContext);
  const [view, setView] = useState("profile");

  let location = useLocation();
  let pathname = location.pathname;
  let navigate = useNavigate();

  const [selection, setSelection] = useState(Number(useParams().id) || null);

  let renderNoSelection = "/customers" === pathname && !selection;

  if (selection && selection !== "undefined" && pathname === "/customers") {
    navigate(`/customers/${selection}/profile`);
  }

  // Table View specific state/functions
  const [isOpen, setIsOpen] = useState(false);
  const [clickedID, setClickedId] = useState(Number(useParams().id) || null);

  function rowClick(id) {
    setClickedId(id);
    setIsOpen(true);
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
                  <ViewToggle view={view} setView={setView} />
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
                      <ViewToggle view={view} setView={setView} />
                    </div>
                    <FullWidthTable
                      title={"Customers"}
                      fetcher={useCustomersData}
                      onRowClick={rowClick}
                    />
                  </div>
                </div>
              </div>
              <MainPaneModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                resourceId={clickedID}
              ></MainPaneModal>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Customers;
