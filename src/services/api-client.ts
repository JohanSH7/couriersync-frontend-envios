import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://couriersync-backend-envios.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token de acceso a las solicitudes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token"); // Asegúrate de que el token esté almacenado correctamente
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Evita múltiples intentos de refresh en bucle
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      const token = localStorage.getItem("auth_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!token || !refreshToken) {
        console.warn("Faltan tokens en localStorage. Redirigiendo a login.");
        window.location.href = "/";
        return Promise.reject(error);
      }

      try {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://couriersync-backend-envios.onrender.com";
        const refreshTokenEndpoint = process.env.NEXT_PUBLIC_REFRESH_TOKEN_ENDPOINT || "/api/auth/refresh-token";
        const fullRefreshTokenURL = `${baseURL}${refreshTokenEndpoint}`;

        const refreshResponse = await axios.post(
          fullRefreshTokenURL,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const data = refreshResponse.data as { token: string };
        const newToken = data.token;
        if (newToken) {
          localStorage.setItem("auth_token", newToken);
          apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return apiClient(originalRequest); // reintenta la solicitud original
        } else {
          throw new Error("No se recibió nuevo token al refrescar.");
        }
      } catch (refreshError) {
        console.error("Error al refrescar token:", refreshError);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

