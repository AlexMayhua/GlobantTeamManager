const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
export const get = async (path) => fetch(`${API}${path}`).then((r) => r.json());
export const post = async (path, body) => {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
