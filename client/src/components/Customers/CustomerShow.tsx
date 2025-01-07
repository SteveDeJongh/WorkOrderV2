import { MainPaneNav } from "../multiuse/MainPaneNav";
import { fetchCustomerData } from "../../services/customerServices";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { LoadingBox } from "../multiuse/LoadingBox";
import { Customer } from "../../types/customers";

function CustomerShow() {
  // Main Pane states
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState(false);
  const [mainData, setMainData] = useState<Customer>();

  const { id } = useParams();

  useEffect(() => {
    async function loadCustomerData() {
      if (!id) {
        setMainData(undefined);
        return;
      }
      try {
        setMainLoading(true);
        const response = await fetchCustomerData(Number(id));
        setMainData(response);
      } catch (e) {
        setMainError(true);
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
      {!mainLoading && mainData && (
        <>
          <MainPaneNav
            title={`${mainData.first_name} ${mainData.last_name}`}
            id={mainData.id}
            identifier={"Customer"}
            pages={["Profile", "Edit", "Invoices"]}
          />
          <Outlet context={{ mainData, setMainData }} />
        </>
      )}
    </>
  );
}

export { CustomerShow };
