import { API_URL } from "../constants";

async function fetchAllProducts() {
    const response = await fetch(`${API_URL}/products`);
    if (response.ok) {
      let responseData = await response.json();
      responseData = responseData.map((obj) => {
        return {
          id: obj.id,
          sku: obj.sku,
          name: obj.name,
          price: obj.price,
          stock: obj.stock,
        };
      });
      return responseData;
    } else {
      throw new Error(response.statusText);
    }
}

async function searchProducts(query) {
  const response = await fetch(`${API_URL}/search/products/?q=${query}`);
  if (response.ok) {
    let responseData = await response.json();
    responseData = responseData.map((obj) => {
      return {
        id: obj.id,
        sku: obj.sku,
        name: obj.name,
        price: obj.price,
        stock: obj.stock,
      };
    });
    return responseData;
  } else {
    throw new Error(response.statusText);
  }
}

async function fetchProductData(id) {
  const response = await fetch(`${API_URL}/products/${id}`)

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export { fetchAllProducts, searchProducts, fetchProductData };