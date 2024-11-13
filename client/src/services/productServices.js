import { API_URL } from "../constants";
import { mapResponseDataToKeys, mapSingleResponseDataToKeys } from "../utils";


async function fetchAllProducts() {
    const response = await fetch(`${API_URL}/products`, {
      headers: {
        "Authorization": localStorage.getItem("authToken"),
      }
    });
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

async function searchProducts(query) {
  const response = await fetch(`${API_URL}/search/products/?q=${query}`, {
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    }
  });
  if (response.ok) {
    let responseData = await response.json();
    return mapResponseDataToKeys(responseData);
  } else {
    throw new Error(response.statusText);
  }
}

async function fetchProductData(id, options = {tax_rate: false}) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    }
  })

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

async function createProduct(productData) {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    },
    body: productData,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData);
}

async function editProduct(id, productData) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    },
    body: productData,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export { createProduct, editProduct, fetchAllProducts, searchProducts, fetchProductData };