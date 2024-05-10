import Table from "./Table";
import SingleColTable from "./SingleColTable";
import CustomerForm from "./CustomerForm";
import { API_URL } from "../constants";
import { useState, useEffect } from "react";

function Customers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setFormOpen] = useState(false);
  const [selection, setSelection] = useState("");
  const [disableActions, setDisableActions] = useState(true);

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
  }, [form]);

  useEffect(() => {
    function toggleActions() {
      selection ? setDisableActions(false) : setDisableActions(true);
    }

    toggleActions();
  }, [selection]);

  return (
    <>
      <div id="panes">
        <div className="pane pane-left">
          <div className="pane-inner">
            {loading && <p>Information loading...</p>}
            {error && <p>An error occured.</p>}
            {!loading && !form && (
              <SingleColTable
                title={"Customers"}
                data={data}
                setSelection={setSelection}
              />
            )}
          </div>
        </div>
        <div className="pane pane-mid">
          <div className="pane-inner"></div>
        </div>
      </div>
    </>
  );
}

export default Customers;
