import axios from "axios"

// Clave para almacenar el token en localStorage
const TOKEN_STORAGE_KEY = "auth_token"

// Crear instancia de axios con la URL base del backend
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://couriersync-backend-envios.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para agregar el token a todas las solicitudes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (token) {
      // Asegurarse de que los headers existan
      if (!config.headers) {
        config.headers = {}
      }

      // Establecer el header de autorización
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
  (response) => {
    return response
  },
  (error) => {
    // Si el error es 401 (Unauthorized), limpiar el token y el usuario, y redirigir al login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      localStorage.removeItem("auth_user") // También limpiar los datos del usuario

      // Solo redirigir si no estamos ya en la página de login
      if (window.location.pathname !== "/") {
        window.location.href = "/"
      }
    }
    return Promise.reject(error)
  },
)
