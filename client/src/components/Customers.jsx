import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import Actions from "./Actions";
import Table from "./Table";
import CustomerForm from "./CustomerForm";
import { API_URL } from "../constants";
import { useState, useEffect } from "react";

function Customers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setFormOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(`${API_URL}/customers`);
        if (response.ok) {
          const responseData = await response.json();
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
      <Header />
      <div id="layout">
        <SideBar currentPage={"customers"} />
        <div className="main-panel">
          <Actions page={"Customer"} openForm={setFormOpen} />
          <div className="content">
            {loading && <p>Information loading...</p>}
            {error && <p>An error occured.</p>}
            {form && <CustomerForm />}
            {!loading && !form && <Table data={data} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Customers;
