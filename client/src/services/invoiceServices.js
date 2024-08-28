import { mapResponseDataToKeys, mapSingleResponseDataToKeys } from "../utils";
import { API_URL } from "../constants";

async function fetchAllInvoices() {
    const response = await fetch(`${API_URL}/invoices`, {
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

async function searchInvoices(query) {
  const response = await fetch(`${API_URL}/search/invoices/?q=${query}`, {
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

async function createInvoice(invoiceData) {
  const response = await fetch(`${API_URL}/invoices`, {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    },
    body: invoiceData,
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json();
}

async function fetchInvoiceData(id) {
  const response = await fetch(`${API_URL}/invoices/${id}`, {
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  console.log("Response in fetchInvoiceData", responseData)
  return mapSingleResponseDataToKeys(responseData);
}

// More to do here...
async function editInvoice(id, customerData) {
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

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData);
}

export { createInvoice, editInvoice, fetchAllInvoices, fetchInvoiceData, searchInvoices } 