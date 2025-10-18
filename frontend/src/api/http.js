const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

function getToken() {
  return localStorage.getItem("token");
}

export const get = async (path, auth) => {
  const headers = auth ? { Authorization: `Bearer ${getToken()}` } : {};
  const res = await fetch(`${API}${path}`, { headers });
  if (!res.ok) throw new Error((await res.json()).error || "Error");
  const data = await res.json();
  return data;
};

export const post = async (path, body, auth) => {
  const headers = { "Content-Type": "application/json" };
  if (auth) headers.Authorization = `Bearer ${getToken()}`;
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  if (!res.ok) throw new Error(data.error || "Error");
  return data;
};

export const put = async (path, body, auth) => {
  const headers = { "Content-Type": "application/json" };
  if (auth) headers.Authorization = `Bearer ${getToken()}`;
  const res = await fetch(`${API}${path}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  if (!res.ok) throw new Error(data.error || "Error");
  return data;
};

export const del = async (path, auth) => {
  const headers = auth ? { Authorization: `Bearer ${getToken()}` } : {};
  const res = await fetch(`${API}${path}`, { method: "DELETE", headers });
  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  if (!res.ok) throw new Error(data.error || "Error");
  return data;
};
