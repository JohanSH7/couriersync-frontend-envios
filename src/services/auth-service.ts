import { apiClient } from "./api-client"

type LoginResponse = {
  id: number
  name: string
  email: string
  role: "admin" | "operator" | "driver"
  message: string
  success: boolean
  token: string
}

export const authService = {
  async login(
    email: string,
    password: string,
  ): Promise<{
    token: string
    user: { id: string; name: string; email: string; role: "admin" | "operator" | "driver" }
  }> {
    try {
      const response = await apiClient.post<LoginResponse>("/api/auth/login", {
        email,
        password,
      })

      // Verificar si la respuesta fue exitosa
      if (!response.data.success) {
        throw new Error(response.data.message || "Error de autenticación")
      }

      // Transformar la respuesta al formato que espera nuestro contexto de autenticación
      return {
        token: response.data.token,
        user: {
          id: String(response.data.id),
          name: response.data.name,
          email: response.data.email,
          role: response.data.role as "admin" | "operator" | "driver",
        },
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error // Propagar el error para manejarlo en el componente
    }
  },

  async getCurrentUser() {
    try {
      type MeResponse = {
        id: number | string
        name: string
        email: string
        role: "admin" | "operator" | "driver"
      }
      const response = await apiClient.get<MeResponse>("/api/auth/me")

      // Verificar si la respuesta contiene los datos esperados
      if (!response.data || !response.data.id) {
        throw new Error("Respuesta inválida del servidor")
      }

      // Transformar la respuesta si es necesario
      return {
        id: String(response.data.id),
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      }
    } catch (error) {
      console.error("Get current user error:", error)
      throw error // Propagar el error para manejarlo en el componente
    }
  },
}
