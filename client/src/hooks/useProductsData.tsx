import { fetchAllProducts, searchProducts } from "../services/productServices";
import { useQuery } from "@tanstack/react-query";

function useProductsData(searchTerm: string) {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: () => {
      if (searchTerm) {
        return searchProducts(searchTerm);
      } else {
        return fetchAllProducts();
      }
    },
  });

  return { data, loading, error };
}

export default useProductsData;
