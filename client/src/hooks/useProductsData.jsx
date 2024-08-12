import { fetchAllProducts, searchProducts } from "../services/productServices";
import { useQuery } from "@tanstack/react-query";

function useProductsData(searchTerm) {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function loadProducts() {
  //     try {
  //       let data;
  //       if (searchTerm) {
  //         data = await searchProducts(searchTerm);
  //       } else {
  //         data = await fetchAllProducts();
  //       }
  //       setProducts(data);
  //       setLoading(false);
  //     } catch (e) {
  //       setError(e);
  //       setLoading(false);
  //       console.error("Failed to fetch Products: ", e);
  //     }
  //   }
  //   loadProducts();
  // }, [searchTerm]);

  // let data = products;

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
