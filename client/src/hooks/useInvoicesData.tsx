import { fetchAllInvoices, searchInvoices } from "../services/invoiceServices";
import { useQuery } from "@tanstack/react-query";

function useInvoicesData(searchTerm: string) {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["invoices", searchTerm],
    queryFn: () => {
      if (searchTerm) {
        return searchInvoices(searchTerm);
      } else {
        return fetchAllInvoices();
      }
    },
  });

  return { data, loading, error };
}

export { useInvoicesData };
