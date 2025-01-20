import { LeftListWithAction } from "../multiuse/LeftListWithAction";
import { Outlet, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { NoSelection } from "../NoSelection";
import { useProductsData } from "../../hooks/useProductsData";
import { FullWidthTable } from "../multiuse/FullWidthTable";
import { ViewToggle } from "../multiuse/ViewToggle";
import { ViewTypes } from "../../types/userPreferences";
import { useAuth } from "../../contexts/AuthContext";
import { PRODUCTCOLUMNS } from "../columns";
import { syncUserPreference } from "../../services/userPreferencesServices";

function Products() {
  const { user, updateUserPreferences } = useAuth();
  const [view, setView] = useState<ViewTypes>(
    user?.preferences.view_products || "profile"
  );
  const { id } = useParams();

  async function viewSetter(newView: ViewTypes) {
    if (newView === "table") {
      window.history.replaceState(null, "", "/products");
    }
    setView(newView);

    const updatedPreferences = await syncUserPreference(user!.id, {
      view_products: newView,
    });
    updateUserPreferences(updatedPreferences);
  }

  let location = useLocation();
  let pathname = location.pathname;

  let renderNoSelection = "/products" === pathname && !id;

  return (
    <>
      {view === "profile" && (
        <div id="panes">
          <div className="pane pane-left">
            <div className="pane-inner">
              <LeftListWithAction
                title={"Products"}
                linkToPage={"view"}
                getter={useProductsData}
              />
            </div>
          </div>
          <div className="pane pane-mid">
            <div className="pane-inner">
              <ViewToggle view={view} setView={viewSetter} />
              {renderNoSelection ? (
                <NoSelection item={"product"} />
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
                  <h3 className="title">Products</h3>
                  <ViewToggle view={view} setView={viewSetter} />
                </div>
                <FullWidthTable
                  title={"Products"}
                  fetcher={useProductsData}
                  columns={PRODUCTCOLUMNS}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export { Products };
