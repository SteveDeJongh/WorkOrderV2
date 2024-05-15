import { API_URL } from "../constants";

async function createCustomer(customerData) {
  const response = await fetch(`${API_URL}/customers`, {
    method: "POST",
    // header: {
    //   "Content-Type": "application/json",
    // },
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
    // header: {
    //   "Content-Type": "application/json",
    // },
    body: customerData,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function fetchCustomerData(id) {
  const response = await fetch(`${API_URL}/customers/${id}`)

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export { createCustomer, editCustomer, fetchCustomerData };