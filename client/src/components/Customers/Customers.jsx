import SingleColTable from "./SingleColTable";
import { Outlet, useParams } from "react-router-dom";
import { API_URL } from "../../constants";
import { useState, useEffect } from "react";

function Customers() {
  // Side Pane states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selection, setSelection] = useState(useParams().id || "");

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

  return (
    <>
      <div id="panes">
        <div className="pane pane-left">
          <div className="pane-inner">
            {loading && <p>Information loading...</p>}
            {error && <p>An error occured.</p>}
            {!loading && !error && (
              <SingleColTable
                title={"Customers"}
                data={data}
                setSelection={setSelection}
                selection={selection}
              />
            )}
          </div>
        </div>
        <div className="pane pane-mid">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Customers;
