import LeftListWithAction from "../../multiuse/LeftListWithAction";
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NoSelection from "../NoSelection";
import useProductsData from "../../hooks/useProductsData";

function Products() {
  let location = useLocation();
  let pathname = location.pathname;
  let navigate = useNavigate();

  const [selection, setSelection] = useState(Number(useParams().id) || null);

  let renderNoSelection = "/products" === pathname && !selection;

  if (selection && selection !== "undefined" && pathname === "/products") {
    navigate(`/products/${selection}/view`);
  }

  return (
    <>
      <div id="panes">
        <div className="pane pane-left">
          <div className="pane-inner">
            <LeftListWithAction
              title={"Products"}
              page={"view"}
              setSelection={setSelection}
              selection={selection}
              fetcher={useProductsData}
            />
          </div>
        </div>
        <div className="pane pane-mid">
          {renderNoSelection ? (
            <NoSelection item={"product"} />
          ) : (
            <Outlet context={[selection, setSelection]} />
          )}
        </div>
      </div>
    </>
  );
}

export default Products;
