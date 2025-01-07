import { LeftListWithAction } from "../multiuse/LeftListWithAction";
import { Outlet, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { NoSelection } from "../NoSelection";
import { FullWidthTable } from "../multiuse/FullWidthTable";
import { ViewToggle } from "../multiuse/ViewToggle";
import { useInvoicesData } from "../../hooks/useInvoicesData";
import { ViewTypes } from "../../types/users";
import { useAuth } from "../../contexts/AuthContext";
import { INVOICECOLUMNSALT } from "../Customers/columns";

function Invoices() {
  const { user } = useAuth();
  const [view, setView] = useState<ViewTypes>(
    user?.views?.invoices || "profile"
  );
  const { id } = useParams();

  function viewSetter(view: ViewTypes) {
    user!.views["invoices"] = view;
    setView(view);
  }

  let location = useLocation();
  let pathname = location.pathname;

  let renderNoSelection = "/invoices" === pathname && !id;

  return (
    <>
      {view === "profile" && (
        <div id="panes">
          <div className="pane pane-left">
            <div className="pane-inner">
              <LeftListWithAction
                title={"Invoices"}
                linkToPage={""}
                getter={useInvoicesData}
              />
            </div>
          </div>
          <div className="pane pane-mid">
            <div className="pane-inner">
              <ViewToggle view={view} setView={viewSetter} />
              {renderNoSelection ? (
                <NoSelection item={"invoice"} />
              ) : (
                <Outlet />
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
                  columns={INVOICECOLUMNSALT}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export { Invoices };
