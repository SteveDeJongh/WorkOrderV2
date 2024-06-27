import { API_URL } from "../constants";

async function fetchInventoryMovementsFor(id) {
    const response = await fetch(`${API_URL}/search/inventory_movement/?q=${id}`, {
      headers: {
        "Authorization": localStorage.getItem("authToken"),
      }
    })
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    return response.json();
  }

async function fetchLast3MovementsFor(id) {
  const response = await fetch(`${API_URL}/search/last_3_inventory_movements/?q=${id}`, {
    headers: {
      "Authorization": localStorage.getItem("authToken"),
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export {fetchInventoryMovementsFor, fetchLast3MovementsFor}