import { mapResponseDataToKeys, mapSingleResponseDataToKeys } from "../utils";
import { API_URL } from "../constants";

async function fetchAllPayments() {
    const response = await fetch(`${API_URL}/payments`, {
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

async function searchPayments(query) {
  const response = await fetch(`${API_URL}/search/payments/?q=${query}`, {
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

async function createPayment(PaymentData) {
  const response = await fetch(`${API_URL}/payments`, {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    },
    body: PaymentData,
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json();
}

async function fetchPaymentData(id) {
  const response = await fetch(`${API_URL}/payments/${id}`, {
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  console.log("Response in fetchPaymentData", responseData)
  return mapSingleResponseDataToKeys(responseData);
}

async function editPayment(id, PaymentData) {
  const response = await fetch(`${API_URL}/payments/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    },
    body: PaymentData,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData);
}

export { createPayment, editPayment, fetchAllPayments, fetchPaymentData, searchPayments } 