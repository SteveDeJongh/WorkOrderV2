import { LeftListWithAction } from "../multiuse/LeftListWithAction";
import { FullWidthTable } from "../multiuse/FullWidthTable";
import { Outlet, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { NoSelection } from "../NoSelection";
import { useCustomersData } from "../../hooks/useCustomersData";
import { ViewToggle } from "../multiuse/ViewToggle";
import { ViewTypes } from "../../types/users";
import { useAuth } from "../../contexts/AuthContext";
import { CUSTOMERCOLUMNS } from "../columns";
import { syncUserPreference } from "../../services/userPreferencesServices";

function Customers() {
  const { user, updateUserPreferences } = useAuth();
  const [view, setView] = useState<ViewTypes>(user!.preferences.view_customers);
  const { id } = useParams();

  async function viewSetter(view: ViewTypes) {
    setView(view);

    const updatedPreferences = await syncUserPreference(user!.id, {
      view_customers: view,
    });
    updateUserPreferences(updatedPreferences);
  }

  let location = useLocation();
  let pathname = location.pathname;

  let renderNoSelection = "/customers" === pathname && !id;

  return (
    <>
      {view === "profile" && (
        <div id="panes">
          <div className="pane pane-left">
            <div className="pane-inner">
              <LeftListWithAction
                title={"Customers"}
                linkToPage={"profile"}
                getter={useCustomersData}
              />
            </div>
          </div>
          <div className="pane pane-mid">
            <div className="pane-inner">
              <ViewToggle view={view} setView={viewSetter} />
              {renderNoSelection ? (
                <NoSelection item={"customer"} />
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
                  <h3 className="title">Customers</h3>
                  <ViewToggle view={view} setView={viewSetter} />
                </div>
                <FullWidthTable
                  title={"Customers"}
                  fetcher={useCustomersData}
                  columns={CUSTOMERCOLUMNS}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export { Customers };
