import SingleColTable from "./SingleColTable";
import Customer from "./Customer";
import { API_URL } from "../constants";
import { fetchCustomerData } from "../services/customerServices";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

function ShowCustomer({ selection }) {
  // Side Pane states
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  // const [selection, setSelection] = useState("");

  // Main Pane states
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState(false);
  const [mainData, setMainData] = useState([]);

  // let { id } = useParams();
  console.log(selection, "From showcustomer");
  let id = selection;

  // const [form, setFormOpen] = useState(false);
  // const [disableActions, setDisableActions] = useState(true);

  // useEffect(() => {
  //   async function loadData() {
  //     try {
  //       const response = await fetch(`${API_URL}/customers`);
  //       if (response.ok) {
  //         let responseData = await response.json();
  //         responseData = responseData.map((obj) => {
  //           return {
  //             id: obj.id,
  //             fullName: `${obj.firstName} ${obj.lastName}`,
  //           };
  //         });
  //         setData(responseData);
  //       } else {
  //         throw response;
  //       }
  //     } catch (e) {
  //       setError("An error occured fetching data.");
  //       console.error(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadData();
  // }, []);

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
          {!mainLoading && <Customer customer={mainData} />}
        </div>
      </div>
    </>
  );
}

export default ShowCustomer;
