import { API_URL } from "../constants";
import { Movement } from "../types/movements";

async function fetchInventoryMovementsFor(id: number): Promise<Movement[]> {
    const response = await fetch(`${API_URL}/search/inventory_movement/?q=${id}`)
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    return response.json();
  }

async function fetchLast3MovementsFor(id: number): Promise<Movement[]> {
  const response = await fetch(`${API_URL}/search/last_3_inventory_movements/?q=${id}`)

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export {fetchInventoryMovementsFor, fetchLast3MovementsFor}