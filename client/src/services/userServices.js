import { HOST_URL } from "../constants";

async function createUser(userData) {
  const response = await fetch(`${HOST_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function createSession(userData) {
  const response = await fetch(`${HOST_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export { createUser, createSession }