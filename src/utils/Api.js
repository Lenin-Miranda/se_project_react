export function checkResponse(res) {
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  return res.json();
}

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://se-project-express-m2qk.onrender.com"
    : "http://localhost:3001";

export function getItems() {
  return fetch(`${BASE_URL}/items`).then(checkResponse);
}

export function addItem({ name, imageUrl, weather }) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Token expired or invalid");
      }
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  });
}

export function deleteItem(_id) {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/items/${_id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
}

export function addCardLike(_id) {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function removeCardLike(_id) {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
