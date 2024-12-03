import { mapResponseDataToKeys, mapSingleResponseDataToKeys } from "../utils";
import { API_URL } from "../constants";
import { Invoice } from "../types/invoiceTypes";

async function fetchAllInvoices(): Promise<Invoice[]> {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', localStorage.getItem("authToken") as string)

  const response = await fetch(`${API_URL}/invoices`, {
    headers: requestHeaders,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  
  let responseData = await response.json();
  return mapResponseDataToKeys(responseData);
}

async function searchInvoices(query: string): Promise<Invoice[]> {
  const response = await fetch(`${API_URL}/search/invoices/?q=${query}`, {
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    } as HeadersInit,
  });
  
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapResponseDataToKeys(responseData);
}

async function createInvoice(invoiceData: Invoice): Promise<Invoice> {
  const response = await fetch(`${API_URL}/invoices`, {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
      "Content-Type": "application/json",
    } as HeadersInit,
    body: JSON.stringify(invoiceData),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json();
}

async function fetchInvoiceData(id: string | undefined): Promise<Invoice[]> {
  const response = await fetch(`${API_URL}/invoices/${id}`, {
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    } as HeadersInit,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData);
}

async function editInvoice(id: string, invoiceData: Invoice): Promise<Invoice[]> {
  const response = await fetch(`${API_URL}/invoices/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
      "Content-Type": "application/json",
    } as HeadersInit,
    body: JSON.stringify(invoiceData),
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData);
}

export { createInvoice, editInvoice, fetchAllInvoices, fetchInvoiceData, searchInvoices } 