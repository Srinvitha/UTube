const API_BASE_URL = "http://localhost:8080/api";

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("utube_token");
  const headers = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `API request failed: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  return contentType.includes("application/json") ? response.json() : null;
}

export async function getVideos() { return apiRequest("/videos"); }
export async function getVideoById(id) { return apiRequest(`/videos/${id}`); }
export async function searchVideos(query) {
  return apiRequest(`/videos/search?q=${encodeURIComponent(query)}`);
}

export async function registerUser(userData) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function loginUser(credentials) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function uploadVideo({ videoFile, thumbnail, title, description }) {
  const formData = new FormData();
  formData.append("video", videoFile);
  formData.append("title", title);
  formData.append("description", description);
  if (thumbnail) formData.append("thumbnail", thumbnail);

  return apiRequest("/videos/upload", {
    method: "POST",
    body: formData,
  });
}

export { API_BASE_URL, apiRequest };
