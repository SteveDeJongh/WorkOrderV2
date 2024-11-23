import { useQuery } from "@tanstack/react-query";
import {
  fetchAllCustomers,
  searchCustomers,
} from "../services/customerServices";

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
