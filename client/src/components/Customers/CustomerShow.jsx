import CustomerNav from "./CustomerNav";
import MainPaneNav from "../../multiuse/MainPaneNav";
import { fetchCustomerData } from "../../services/customerServices";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function CustomerShow() {
  // Main Pane states
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState(false);
  const [mainData, setMainData] = useState({});
  const [selection, setSelection] = useOutletContext();

  let { id } = useParams();

  useEffect(() => {
    async function loadCustomerData() {
      if (!id) {
        setMainData({});
        return;
      }
      try {
        setMainLoading(true);
        const response = await fetchCustomerData(id);
        setMainData(response);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }

    loadCustomerData();
  }, [id]);

  return (
    <>
      <div className="pane pane-mid">
        <div className="pane-inner">
          {mainLoading && <p>Information loading...</p>}
          {mainError && <p>An error occured.</p>}
          {!mainLoading && (
            <>
              {/* <CustomerNav
                title={`${mainData.firstName} ${mainData.lastName}`}
              /> */}
              <MainPaneNav
                title={`${mainData.firstName} ${mainData.lastName}`}
                customer={mainData}
              />
              <Outlet context={[selection, setSelection]} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CustomerShow;
