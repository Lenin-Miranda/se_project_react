import { checkResponse } from "./Api";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://35.203.136.160"
    : "http://localhost:3001";

export function signup({ name, password, email, avatar }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": " application/json",
    },
    body: JSON.stringify({ name, password, email, avatar }),
  }).then(checkResponse);
}

export function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function updateProfile({ name, avatar }) {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}
