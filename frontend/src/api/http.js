const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
export const get = async (path) => fetch(`${API}${path}`).then(r => r.json());