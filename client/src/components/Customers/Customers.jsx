import SingleColTable from "./SingleColTable";
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NoSelection from "../NoSelection";

function Customers() {
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
      <div id="panes">
        <div className="pane pane-left">
          <div className="pane-inner">
            <SingleColTable
              title={"Customers"}
              setSelection={setSelection}
              selection={selection}
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
  );
}

export default Customers;
