// retrieves information for customer list in selectable colum.

import { useState, useEffect } from "react";
import {
  fetchAllCustomers,
  searchCustomers,
} from "../services/customerServices";

function useCustomersData(searchTerm) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCustomers() {
      try {
        let data;
        if (searchTerm) {
          data = await searchCustomers(searchTerm);
        } else {
          data = await fetchAllCustomers();
        }
        // let responseData = await data.json();
        console.log(data);
        setCustomers(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error("Failed to fetch customers: ", e);
      }
    }
    loadCustomers();
  }, [searchTerm]);

  return { customers, loading, error };
}

export default useCustomersData;
