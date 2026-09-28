const API_BASE_URL = "http://localhost:5000/api";

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`
    );
  }

  return response.json();
}

export async function getVideos() {
  return apiRequest("/videos");
}

export async function getVideoById(id) {
  return apiRequest(`/videos/${id}`);
}

export async function searchVideos(query) {
  return apiRequest(
    `/videos/search?q=${encodeURIComponent(query)}`
  );
}

export { API_BASE_URL, apiRequest };
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

export async function logoutUser() {
  return apiRequest("/auth/logout", {
    method: "POST",
  });
}export async function uploadVideo({
  videoFile,
  thumbnail,
  title,
  description,
}) {
  const formData = new FormData();

  formData.append("video", videoFile);
  formData.append("thumbnail", thumbnail);
  formData.append("title", title);
  formData.append("description", description);

  const response = await fetch(
    `${API_BASE_URL}/videos/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(
      `Video upload failed: ${response.status}`
    );
  }

  return response.json();
}