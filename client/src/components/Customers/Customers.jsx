import SingleColTable from "./SingleColTable";
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";
import { useState, useEffect } from "react";
import NoSelection from "../NoSelection";

function Customers() {
  // Side Pane states
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  // Search Customers Lists
  // const [searchTerm, setSearchTerm] = useState("");
  // const [debouncedSearchTerm, setDebouncedSearchTerm] =
  //   useURLSearchParam("search");

  let location = useLocation();
  let pathname = location.pathname;
  let navigate = useNavigate();

  // let prevSelection = state ? state.selection : null;
  const [selection, setSelection] = useState(String(useParams().id) || "");

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

  function renderNoSelection() {
    return !!("/customers" === pathname && !selection);
  }

  if (selection && selection !== "undefined" && pathname === "/customers") {
    console.log("In the if", selection, !!selection, pathname === "/customers");
    navigate(`/customers/${selection}/profile`);
  }

  return (
    <>
      <div id="panes">
        <div className="pane pane-left">
          <div className="pane-inner">
            {/* {loading && <p>Information loading...</p>}
            {error && <p>An error occured.</p>}
            {!loading && !error && ( */}
            <SingleColTable
              title={"Customers"}
              setSelection={setSelection}
              selection={selection}
            />
            {/* )} */}
          </div>
        </div>
        <div className="pane pane-mid">
          {renderNoSelection() ? (
            <NoSelection item={"customer"} />
          ) : (
            <Outlet context={[selection, setSelection]} />
          )}
        </div>
      </div>
    </>
  );
}

export default Customers;
