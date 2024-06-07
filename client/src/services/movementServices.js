import { API_URL } from "../constants";

async function fetchInventoryMovementsFor(id) {
    const response = await fetch(`${API_URL}/search/inventory_movement/?q=${id}`)
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    return response.json();
  }

export {fetchInventoryMovementsFor}