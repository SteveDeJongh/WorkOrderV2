import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomerData } from "../services/customerServices";

function CustomerEdit() {
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState(false);
  const [mainData, setMainData] = useState({});

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
  }, []);

  return (
    <>
      <div className="pane pane-mid">
        <div className="pane-inner">
          {mainLoading && <p>Information loading...</p>}
          {mainError && <p>An error occured.</p>}
          {!mainLoading && !mainError && (
            <>
              <h1>Edit page</h1>
              <p>{mainData}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CustomerEdit;
