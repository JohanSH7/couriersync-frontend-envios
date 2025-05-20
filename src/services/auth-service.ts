import { apiClient } from "./api-client"

// Tipo para los roles de usuario
type Role = "administrador" | "operador" | "conductor"

// Tipo para la respuesta del login
type LoginResponse = {
  id: number
  name: string
  email: string
  role: string
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
    user: { id: string | number; name: string; email: string; role: Role }
  }> {
    try {
      console.log("Enviando solicitud de login a:", process.env.NEXT_PUBLIC_LOGIN_ENDPOINT)

      const response = await apiClient.post<LoginResponse>(
        process.env.NEXT_PUBLIC_LOGIN_ENDPOINT || "/api/auth/login",
        { email, password },
      )

      // Verificar si la respuesta fue exitosa
      if (!response.data.success) {
        throw new Error(response.data.message || "Error de autenticación")
      }

      // Mapear el rol del backend al formato que espera nuestra aplicación
      const mappedRole = mapRoleToAppRole(response.data.role)

      // Transformar la respuesta al formato que espera nuestro contexto de autenticación
      return {
        token: response.data.token,
        user: {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: mappedRole,
        },
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error // Propagar el error para manejarlo en el componente
    }
  },
}

// Función para mapear los roles del backend a los roles que usa nuestra aplicación
function mapRoleToAppRole(backendRole: string): Role {
  switch (backendRole?.toLowerCase()) {
    case "administrador":
      return "administrador"
    case "operador":
      return "operador"
    case "conductor":
      return "conductor"
    default:
      console.warn(`Rol desconocido: ${backendRole}, usando 'operador' por defecto`)
      return "operador"
  }
}
