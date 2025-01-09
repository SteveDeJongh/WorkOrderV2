import { TUserForm } from "../components/Users/UserForm";
import { HOST_URL } from "../constants";
import { NestedSignInUser, UserResponse} from "../types/users";

async function createUser(user: TUserForm): Promise<UserResponse> {
  const response = await fetch(`${HOST_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({user}),
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let token = response.headers.get("Authorization")
  token ? localStorage.setItem('authToken', token) : null;

  return response.json();
}

async function createSession(loginData: NestedSignInUser): Promise<UserResponse> {
  const response = await fetch(`${HOST_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  let token = response.headers.get("Authorization")
  token ? localStorage.setItem('authToken', token) : null;
  return response.json();
}

async function destroySession(token: string) {
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

async function editUser(user: TUserForm): Promise<UserResponse> {
  console.log("Here!")
  const response = await fetch(`${HOST_URL}/signup`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({user}),
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

async function getUserByToken(token: string): Promise<UserResponse> {
  const response = await fetch(`${HOST_URL}/current_user_details`, {
    headers: {
      "Authorization": token,
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json();
}

export { createUser, createSession, destroySession, editUser, getUserByToken}