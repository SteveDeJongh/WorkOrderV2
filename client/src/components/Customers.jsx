import SingleColTable from "./SingleColTable";
import Customer from "./Customer";
import { API_URL } from "../constants";
import { fetchCustomerData } from "../services/customerServices";
import { useState, useEffect } from "react";

function Customers() {
  // Side Pane states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selection, setSelection] = useState("");

  // Main Pane states
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState(false);
  const [mainData, setMainData] = useState([]);

  // const [form, setFormOpen] = useState(false);
  // const [disableActions, setDisableActions] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(`${API_URL}/customers`);
        if (response.ok) {
          let responseData = await response.json();
          responseData = responseData.map((obj) => {
            return {
              id: obj.id,
              fullName: `${obj.firstName} ${obj.lastName}`,
            };
          });
          setData(responseData);
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error occured fetching data.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadCustomerData() {
      if (!selection) {
        setMainData({});
        return;
      }
      try {
        setMainLoading(true);
        const response = await fetchCustomerData(selection);
        setMainData(response);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }

    loadCustomerData();
  }, [selection]);

  return (
    <>
      <div id="panes">
        <div className="pane pane-left">
          <div className="pane-inner">
            {loading && <p>Information loading...</p>}
            {error && <p>An error occured.</p>}
            {!loading && (
              <SingleColTable
                title={"Customers"}
                data={data}
                setSelection={setSelection}
              />
            )}
          </div>
        </div>
        <div className="pane pane-mid">
          <div className="pane-inner">
            {mainLoading && <p>Information loading...</p>}
            {mainError && <p>An error occured.</p>}
            {!mainLoading && <Customer customer={mainData} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;
