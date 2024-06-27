import { API_URL } from "../constants";

async function fetchAllCustomers() {
    const response = await fetch(`${API_URL}/customers`, {
      headers: {
        "Authorization": localStorage.getItem("authToken"),
      }
    });
    if (response.ok) {
      let responseData = await response.json();
      responseData = responseData.map((obj) => {
        return {
          id: obj.id,
          fullName: `${obj.firstName} ${obj.lastName}`,
        };
      });
      return responseData;
    } else {
      throw new Error(response.statusText);
    }
}

async function searchCustomers(query) {
  const response = await fetch(`${API_URL}/search/customers/?q=${query}`, {
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    }
  });
  if (response.ok) {
    let responseData = await response.json();
    responseData = responseData.map((obj) => {
      return {
        id: obj.id,
        fullName: `${obj.firstName} ${obj.lastName}`,
      };
    });
    return responseData;
  } else {
    throw new Error(response.statusText);
  }
}

async function createCustomer(customerData) {
  const response = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    },
    body: customerData,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function editCustomer(id, customerData) {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    },
    body: customerData,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function fetchCustomerData(id) {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export { createCustomer, editCustomer, fetchCustomerData, fetchAllCustomers, searchCustomers };