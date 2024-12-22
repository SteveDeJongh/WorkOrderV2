import { API_URL } from "../constants";
import { mapResponseDataToKeys, mapSingleResponseDataToKeys } from "../utils";
import { Product } from "../types/products";

async function fetchAllProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`);
    if (response.ok) {
      let responseData = await response.json();
      // responseData = responseData.map((obj) => {
      //   return {
      //     id: obj.id,
      //     sku: obj.sku,
      //     name: obj.name,
      //     price: obj.price,
      //     stock: obj.stock,
      //   };
      // });
      return mapResponseDataToKeys(responseData);
    } else {
      throw new Error(response.statusText);
    }
}

async function searchProducts(query: string): Promise<Product[]> {
  const response = await fetch(`${API_URL}/search/products/?q=${query}`);
  if (response.ok) {
    let responseData = await response.json();
    return mapResponseDataToKeys(responseData);
  } else {
    throw new Error(response.statusText);
  }
}

async function fetchProductData(id: string | number, options = {tax_rate: false}): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`)

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  
  // Remove additional associations unless told not to.
  for (const [key, value] of Object.entries(options)) {
    if (!value) {
      delete responseData[key];
    }
  }
  
  return mapSingleResponseDataToKeys(responseData);
}

async function createProduct(productData: Product): Promise<Product> {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    body: productData,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData);
}

async function editProduct(id: string | number, productData: Product): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    body: productData,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export { createProduct, editProduct, fetchAllProducts, searchProducts, fetchProductData };