// retrieves information for product list in selectable column.

import { useState, useEffect } from "react";
import { fetchAllProducts, searchProducts } from "../services/productServices";

function useProductsData(searchTerm) {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        let data;
        if (searchTerm) {
          data = await searchProducts(searchTerm);
        } else {
          data = await fetchAllProducts();
        }
        setProducts(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error("Failed to fetch Products: ", e);
      }
    }
    loadProducts();
  }, [searchTerm]);

  let data = Products;

  return { data, loading, error };
}

export default useProductsData;
