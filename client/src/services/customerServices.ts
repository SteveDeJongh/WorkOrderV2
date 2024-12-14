import { API_URL } from "../constants";
import { mapResponseDataToKeys, mapSingleResponseDataToKeys } from "../utils";
import { Customer } from "../types/customers";
import { Invoice } from "../types/invoiceTypes";

async function fetchAllCustomers(): Promise<Customer[]> {
    const response = await fetch(`${API_URL}/customers`, {
      headers: {
        "Authorization": localStorage.getItem("authToken"),
      } as HeadersInit
    });
    if (response.ok) {
      let responseData = await response.json();
      return mapResponseDataToKeys(responseData);
    } else {
      throw new Error(response.statusText);
    }
}

async function searchCustomers(query: string): Promise<Customer[]> {
  const response = await fetch(`${API_URL}/search/customers/?q=${query}`, {
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    } as HeadersInit
  });
  if (response.ok) {
    let responseData = await response.json();
    return mapResponseDataToKeys(responseData);
  } else {
    throw new Error(response.statusText);
  }
}

async function createCustomer(customerData: Customer): Promise<Customer> {
  const response = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    } as HeadersInit,
    body: customerData,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function editCustomer(id: string | number, customerData: Customer): Promise<Customer> {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    } as HeadersInit,
    body: customerData,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData);
}

async function fetchCustomerData(id: string | number): Promise<Customer> {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    } as HeadersInit
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData);
}

async function fetchCustomerInvoices(id: string | number): Promise<Invoice[]> {
  const response = await fetch(`${API_URL}/search/customerInvoices/?q=${id}`, {
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    } as HeadersInit
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export { createCustomer, editCustomer, fetchCustomerData, fetchAllCustomers, fetchCustomerInvoices, searchCustomers };