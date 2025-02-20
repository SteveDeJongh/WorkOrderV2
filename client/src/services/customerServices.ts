import { API_URL } from "../constants";
import { mapResponseDataToKeys, mapSingleResponseDataToKeys } from "../utils";
import { Customer } from "../types/customers";
import { Invoice } from "../types/invoiceTypes";

async function fetchAllCustomers(): Promise<Customer[]> {
    const response = await fetch(`${API_URL}/customers`);
    if (response.ok) {
      let responseData = await response.json();
      return mapResponseDataToKeys(responseData);
    } else {
      throw new Error(response.statusText);
    }
}

async function searchCustomers(query: string): Promise<Customer[]> {
  const response = await fetch(`${API_URL}/search/customers/?q=${query}`);
  if (response.ok) {
    let responseData = await response.json();
    return mapResponseDataToKeys(responseData);
  } else {
    throw new Error(response.statusText);
  }
}

async function createCustomer(customerData: FormData): Promise<Customer> {
  const response = await fetch(`${API_URL}/customers`, {
    method: "POST",
    body: customerData,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function editCustomer(id: number, customerData: FormData): Promise<Customer> {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "PATCH",
    body: customerData,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData) as Customer;
}

async function fetchCustomerData(id: number): Promise<Customer> {
  const response = await fetch(`${API_URL}/customers/${id}`)

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData) as Customer;
}

async function fetchCustomerInvoices(id: number): Promise<Invoice[]> {
  const response = await fetch(`${API_URL}/search/customerInvoices/?q=${id}`)

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export { createCustomer, editCustomer, fetchCustomerData, fetchAllCustomers, fetchCustomerInvoices, searchCustomers };