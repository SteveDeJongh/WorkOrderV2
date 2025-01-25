import { LeftListWithAction } from "../multiuse/LeftListWithAction";
import { Outlet, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { NoSelection } from "../NoSelection";
import { FullWidthTable } from "../multiuse/FullWidthTable";
import { ViewToggle } from "../multiuse/ViewToggle";
import { useInvoicesData } from "../../hooks/useInvoicesData";
import { ViewTypes } from "../../types/userPreferences";
import { useAuth } from "../../contexts/AuthContext";
import { INVOICECOLUMNOPTIONS, INVOICECOLUMNSALT } from "../columns";
import { syncUserPreference } from "../../services/userPreferencesServices";

function Invoices() {
  const { user, updateUserPreferences } = useAuth();
  const [view, setView] = useState<ViewTypes>(
    user?.preferences.view_invoices || "profile"
  );
  const { id } = useParams();

  async function viewSetter(newView: ViewTypes) {
    if (newView === "table") {
      window.history.replaceState(null, "", "/invoices");
    }
    setView(newView);

    const updatedPreferences = await syncUserPreference(user!.id, {
      view_invoices: newView,
    });
    updateUserPreferences(updatedPreferences);
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
                  colPreferences={user!.preferences.invoice_columns
                    .split(",")
                    .map((col) => col.trim())}
                  colOptions={INVOICECOLUMNOPTIONS}
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
