import MainPaneNav from "../../multiuse/MainPaneNav";
import { fetchProductData } from "../../services/productServices";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function ProductShow() {
  // Main Pane states
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState(false);
  const [mainData, setMainData] = useState({});
  const [selection, setSelection] = useOutletContext();

  let { id } = useParams();

  useEffect(() => {
    async function loadProductData() {
      if (!id) {
        setMainData({});
        return;
      }
      try {
        setMainLoading(true);
        const response = await fetchProductData(id);
        setMainData(response);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }

    loadProductData();
  }, [id]);

  return (
    <>
      <div className="pane pane-mid">
        <div className="pane-inner">
          {mainLoading && <p>Information loading...</p>}
          {mainError && <p>An error occured.</p>}
          {!mainLoading && (
            <>
              <MainPaneNav
                title={mainData.name}
                id={mainData.id}
                identifier={"Product"}
                pages={["View", "Edit", "Movements"]}
              />
              <Outlet context={[selection, setSelection]} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductShow;
