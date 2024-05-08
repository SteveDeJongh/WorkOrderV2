import { API_URL } from "../constants";

async function createCustomer(customerData) {
  const response = await fetch(`${API_URL}/customers`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  })

  return response.json();
}

export { createCustomer };