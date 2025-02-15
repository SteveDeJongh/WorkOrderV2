import { UserPreference, UserPreferences, UserPreferencesResponse } from "../types/userPreferences"; 
import { HOST_URL } from "../constants";

async function syncUserPreference(user_id: number, preference: UserPreference<UserPreferences>): Promise<UserPreferencesResponse> {
  const response = await fetch(`${HOST_URL}/users/user_preferences/${user_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({user_preference: preference}),
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export { syncUserPreference }