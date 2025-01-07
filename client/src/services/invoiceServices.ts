import { mapResponseDataToKeys, mapSingleResponseDataToKeys } from "../utils";
import { API_URL } from "../constants";
import { Invoice, NestedInvoiceData } from "../types/invoiceTypes";

async function fetchAllInvoices(): Promise<Invoice[]> {
  const response = await fetch(`${API_URL}/invoices`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  
  let responseData = await response.json();
  return mapResponseDataToKeys(responseData);
}

async function searchInvoices(query: string): Promise<Invoice[]> {
  const response = await fetch(`${API_URL}/search/invoices/?q=${query}`);
  
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapResponseDataToKeys(responseData);
}

async function createInvoice(invoiceData: NestedInvoiceData): Promise<Invoice> {
  const response = await fetch(`${API_URL}/invoices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    } as HeadersInit,
    body: JSON.stringify(invoiceData),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json();
}

async function fetchInvoiceData(id: number ): Promise<Invoice> {
  const response = await fetch(`${API_URL}/invoices/${id}`)

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData) as Invoice;
}

async function editInvoice(id: number, invoiceData: NestedInvoiceData): Promise<Invoice> {
  const response = await fetch(`${API_URL}/invoices/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    } as HeadersInit,
    body: JSON.stringify(invoiceData),
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData) as Invoice;
}

export { createInvoice, editInvoice, fetchAllInvoices, fetchInvoiceData, searchInvoices } 