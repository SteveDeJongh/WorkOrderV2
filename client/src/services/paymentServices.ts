import { mapResponseDataToKeys, mapSingleResponseDataToKeys } from "../utils";
import { API_URL } from "../constants";
import { NestedPaymentData, Payment } from "../types/payments";

async function fetchAllPayments(): Promise<Payment[]> {
    const response = await fetch(`${API_URL}/payments`);
    if (response.ok) {
      let responseData = await response.json();
      return mapResponseDataToKeys(responseData);
    } else {
      throw new Error(response.statusText);
    }
}

async function searchPayments(query: string): Promise<Payment[]> {
  const response = await fetch(`${API_URL}/search/payments/?q=${query}`);
  if (response.ok) {
    let responseData = await response.json();
    return mapResponseDataToKeys(responseData);
  } else {
    throw new Error(response.statusText);
  }
}

async function createPayment(PaymentData: NestedPaymentData): Promise<Payment> {
  const response = await fetch(`${API_URL}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    } as HeadersInit,
    body: JSON.stringify(PaymentData),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json();
}

async function fetchPaymentData(id: number): Promise<Payment> {
  const response = await fetch(`${API_URL}/payments/${id}`)

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData) as Payment;
}

async function editPayment(id: number, PaymentData: NestedPaymentData): Promise<Payment> {
  const response = await fetch(`${API_URL}/payments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    } as HeadersInit,
    body: JSON.stringify(PaymentData),
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData) as Payment;
}

async function savePayment(id:number, paymentData: NestedPaymentData) {
  if (id === undefined) {
    return createPayment(paymentData);
  } else {
    return editPayment(id, paymentData);
  }
}

export { fetchAllPayments, fetchPaymentData, savePayment, searchPayments} 