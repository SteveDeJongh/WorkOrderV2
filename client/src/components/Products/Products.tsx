import { LeftListWithAction } from "../multiuse/LeftListWithAction";
import { Outlet, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { NoSelection } from "../NoSelection";
import { useProductsData } from "../../hooks/useProductsData";
import { FullWidthTable } from "../multiuse/FullWidthTable";
import { ViewToggle } from "../multiuse/ViewToggle";
import { ViewTypes } from "../../types/users";
import { useAuth } from "../../contexts/AuthContext";
import { PRODUCTCOLUMNS } from "../Customers/columns";

function Products() {
  const { user } = useAuth();
  const [view, setView] = useState<ViewTypes>(
    user?.views.products || "profile"
  );
  const { id } = useParams();

  function viewSetter(view: ViewTypes) {
    user!.views["products"] = view;
    setView(view);
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
