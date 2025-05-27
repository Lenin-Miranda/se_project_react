const BASE_URL = "http://localhost:3001";

export function getItems() {
  return fetch(`${BASE_URL}/items`).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  });
}

export function addItem({ name, imageUrl, weather }) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  });
}

export function deleteItem(_id) {
  return fetch(`${BASE_URL}/items/${_id}`, { method: "DELETE" }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error deleting item: ${res.status}`);
    }
    return _id;
  });
}
