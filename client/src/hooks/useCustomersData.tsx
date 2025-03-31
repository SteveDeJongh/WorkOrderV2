import { useQuery } from "@tanstack/react-query";
import {
  fetchAllCustomers,
  searchCustomers,
} from "../services/customerServices";

function useCustomersData(searchTerm: string) {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["customersSearch", { searchTerm }],
    queryFn: async () => {
      if (searchTerm) {
        return searchCustomers(searchTerm);
      } else {
        return fetchAllCustomers();
      }
    },
  });

  return { data: data ?? [], loading, error };
}

export { useCustomersData };
