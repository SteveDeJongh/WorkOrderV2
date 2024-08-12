import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllCustomers,
  searchCustomers,
} from "../services/customerServices";

// function useCustomersData(searchTerm) {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function loadCustomers() {
//       try {
//         let data;
//         if (searchTerm) {
//           data = await searchCustomers(searchTerm);
//         } else {
//           data = await fetchAllCustomers();
//         }
//         setCustomers(data);
//         setLoading(false);
//       } catch (e) {
//         setError(e);
//         setLoading(false);
//         console.error("Failed to fetch customers: ", e);
//       }
//     }
//     loadCustomers();
//   }, [searchTerm]);

//   let data = customers;

//   return { data, loading, error };
// }

// React Query Version
function useCustomersData(searchTerm) {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["customers", searchTerm],
    queryFn: () => {
      if (searchTerm) {
        return searchCustomers(searchTerm);
      } else {
        return fetchAllCustomers();
      }
    },
  });

  return { data, loading, error };
}

export default useCustomersData;
