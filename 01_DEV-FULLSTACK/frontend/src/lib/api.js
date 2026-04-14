const BASE_URL = "http://localhost:3000/api";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  let data;

  try {
    data = await res.json();
  } catch {
    throw new Error("Response bukan JSON (backend error)");
  }

  if (!res.ok) {
    throw new Error(data.message || "API Error");
  }

  return data;
}

export async function apiGet(path, token) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    console.error("Non-JSON response:", text);
    throw new Error("Backend tidak mengembalikan JSON");
  }
}

export async function apiPost(path, body, token) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    console.error("Non-JSON response:", text);
    throw new Error("Backend tidak mengembalikan JSON");
  }
}

const getToken = () => localStorage.getItem("token");

export async function getActivities() {
    const res = await fetch(`${BASE_URL}/activities`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
    }

    const data = await res.json();
    return data;
}