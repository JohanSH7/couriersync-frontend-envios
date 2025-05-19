import axios from "axios"

// Actualizar la URL base para que coincida con la estructura de la API
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://courimsync-backend-envios.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para agregar el token a todas las solicitudes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el error es 401 (Unauthorized), limpiar el token y redirigir al login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("auth_token")
      window.location.href = "/"
    }
    return Promise.reject(error)
  },
)
