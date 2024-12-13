import { mapResponseDataToKeys, mapSingleResponseDataToKeys } from "../utils";
import { API_URL } from "../constants";
import { Payment } from "../types/payments";

async function fetchAllPayments(): Promise<Payment[]> {
    const response = await fetch(`${API_URL}/payments`, {
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

async function searchPayments(query: string): Promise<Payment[]> {
  const response = await fetch(`${API_URL}/search/payments/?q=${query}`, {
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

async function createPayment(PaymentData: Payment): Promise<Payment> {
  const response = await fetch(`${API_URL}/payments`, {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    } as HeadersInit,
    body: PaymentData,
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json();
}

async function fetchPaymentData(id: string): Promise<Payment> {
  const response = await fetch(`${API_URL}/payments/${id}`, {
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    } as HeadersInit
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  console.log("Response in fetchPaymentData", responseData)
  return mapSingleResponseDataToKeys(responseData);
}

async function editPayment(id: string, PaymentData: Payment): Promise<Payment> {
  const response = await fetch(`${API_URL}/payments/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    } as HeadersInit,
    body: PaymentData,
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData);
}

async function savePayment(id:string, paymentData:Payment) {
  if (id === "") {
    console.log("creating");
    return createPayment(paymentData);
  } else {
    console.log("editing");
    return editPayment(id, paymentData);
  }
}

export { fetchAllPayments, fetchPaymentData, savePayment, searchPayments} 