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

  let token = response.headers.get("Authorization")
  console.log("Authorization header", token);
  localStorage.setItem('authToken', token)

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
    let err = new Error;
    err.status = response.status;
    err.statusText = response.statusText;
    throw err
  }

  // Need to store this in localstorage
  let token = response.headers.get("Authorization")
  console.log("Authorization header", token);
  localStorage.setItem('authToken', token)

  return response.json();
}

async function destroySession(token) {
  const response = await fetch(`${HOST_URL}/logout`, {
    method: "DELETE",
    headers: {
      "Authorization": token,
    },
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json();
}

async function fetchUserData(id) {
  let response =  {
    userID: id,
    name: "Some name",
    email: "Some@email.com",
  }

  return response;
}

async function getUserByToken(token) {
  const response = await fetch(`${HOST_URL}/current_user`, {
    headers: {
      "Authorization": token,
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json();
}


export { createUser, createSession, destroySession, fetchUserData, getUserByToken}