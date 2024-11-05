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

  console.log("response here.", response)
  let responseData = await response.json();
  console.log("Response in fetchInvoiceData", responseData)
  return mapSingleResponseDataToKeys(responseData);
}

async function editInvoice(id, invoiceData) {
  console.log("invoiceData in editInvoice", invoiceData)
  const response = await fetch(`${API_URL}/invoices/${id}`, {
    method: "PATCH",
    headers: {
      "Authorization": localStorage.getItem("authToken"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let responseData = await response.json();
  return mapSingleResponseDataToKeys(responseData);
}

export { createInvoice, editInvoice, fetchAllInvoices, fetchInvoiceData, searchInvoices } 

/*
{"id"=>1, "customer_id"=>2, "total"=>"10.0", "balance"=>"5.5", "tax"=>"0.5", "created_at"=>"2024-10-30T23:00:23.428Z", "updated_at"=>"2024-10-30T23:00:43.423Z", "status"=>"open", "user_id"=>1, 
  "invoice_lines_attributes"=>
    [
    #<ActionController::Parameters {"invoice_id"=>1, "line_tax"=>"0.5", "product_id"=>1, "tax_rate_id"=>1, "id"=>1, "discount_percentage"=>0, "price"=>"10.0", "quantity"=>1, "line_total"=>"10.0", "created_at"=>"2024-10-30T23:00:23.466Z", "updated_at"=>"2024-10-30T23:00:23.466Z", 
      "product"=>
        #<ActionController::Parameters {"id"=>1, "name"=>"Product 1", "description"=>"This is product 1", "sku"=>"PR0001", "upc"=>111111111111, "price"=>"10.0", "cost"=>"1.0", "stock"=>3, "min"=>1, "max"=>10, "inventory"=>true, "tax_rate_id"=>1, "created_at"=>"2024-10-30T23:00:22.228Z", "updated_at"=>"2024-10-30T23:00:23.402Z"} permitted: true>, 
      "tax_rate"=>
        #<ActionController::Parameters {"id"=>1, "percentage"=>0.15, "created_at"=>"2024-10-30T23:00:23.440Z", "updated_at"=>"2024-10-30T23:00:23.440Z"} permitted: true>} permitted: true>
    ], 
    "payments_attributes"=>[
      #<ActionController::Parameters {"id"=>2, "method"=>"Cash", "invoice_id"=>1, "amount"=>"5.0", "created_at"=>"2024-10-30T23:00:23.497Z", "updated_at"=>"2024-10-30T23:00:23.497Z"} permitted: true>
  ]
}
*/