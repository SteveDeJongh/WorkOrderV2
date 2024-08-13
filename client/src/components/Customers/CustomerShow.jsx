import MainPaneNav from "../../multiuse/MainPaneNav";
import { fetchCustomerData } from "../../services/customerServices";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import LoadingBox from "../../multiuse/LoadingBox";

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

  if (mainLoading) {
    return <LoadingBox text="Loading Customer..." />;
  }

  return (
    <>
      {mainError && <p>An error occured.</p>}
      {!mainLoading && (
        <>
          <MainPaneNav
            title={`${mainData.first_name} ${mainData.last_name}`}
            id={mainData.id}
            identifier={"Customer"}
            pages={["Profile", "Edit", "Invoices", "Items", "WorkOrders"]}
          />
          <Outlet context={[selection, setSelection]} />
        </>
      )}
    </>
  );
}

export default CustomerShow;
