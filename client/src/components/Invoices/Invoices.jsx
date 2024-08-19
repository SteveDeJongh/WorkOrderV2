import LeftListWithAction from "../../multiuse/LeftListWithAction";
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NoSelection from "../NoSelection";
import FullWidthTable from "../../multiuse/FullWidthTable";
import { useContext } from "react";
import UserContext from "../../contexts/user-context";
import ViewToggle from "../../multiuse/ViewToggle";
import useInvoicesData from "../../hooks/useInvoicesData";

function Invoices() {
  const [user, setUser] = useContext(UserContext);
  const [view, setView] = useState(user.views?.invoices || "profile");

  function viewSetter(view) {
    user.views ? user.views : (user.views = {});

    user.views["invoices"] = view;
    setView(view);
  }

  let location = useLocation();
  let pathname = location.pathname;
  let navigate = useNavigate();

  const [selection, setSelection] = useState(Number(useParams().id) || null);

  let renderNoSelection = "/invoices" === pathname && !selection;

  if (selection && selection !== "undefined" && pathname === "/invoices") {
    navigate(`/invoices/${selection}/view`);
  }

  const columns = [
    { keys: ["id"], header: "ID" },
    // { keys: ["sku"], header: "SKU" },
    // { keys: ["upc"], header: "UPC" },
    // { keys: ["name"], header: "Name" },
    // { keys: ["description"], header: "Description" },
    // { keys: ["price"], header: "Price" },
    // { keys: ["taxrate"], header: "TaxRate" },
    // { keys: ["stock"], header: "stock" },
    // { keys: ["min"], header: "Min" },
    // { keys: ["max"], header: "Max" },
  ];

  return (
    <>
      {view === "profile" && (
        <div id="panes">
          <div className="pane pane-left">
            <div className="pane-inner">
              <LeftListWithAction
                title={"Invoices"}
                linkToPage={"view"}
                setSelection={setSelection}
                selection={selection}
                fetcher={useInvoicesData}
              />
            </div>
          </div>
          <div className="pane pane-mid">
            <div className="pane-inner">
              <ViewToggle view={view} setView={viewSetter} />
              {renderNoSelection ? (
                <NoSelection item={"invoice"} />
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
                  <h3 className="title">Invoices</h3>
                  <ViewToggle view={view} setView={viewSetter} />
                </div>
                <FullWidthTable
                  title={"Invoices"}
                  fetcher={useInvoicesData}
                  columns={columns}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Invoices;
