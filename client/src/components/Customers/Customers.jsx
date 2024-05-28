import LeftListWithAction from "../../multiuse/LeftListWithAction";
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NoSelection from "../NoSelection";
import useCustomersData from "../../hooks/useCustomersData";

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
            <LeftListWithAction
              title={"Customers"}
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
  );
}

export default Customers;
