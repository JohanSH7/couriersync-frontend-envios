import { apiClient } from "./api-client";
import axios from "axios";

// Tipo para los roles de usuario
type Role = "administrador" | "operador" | "conductor";

// Tipo para la respuesta del login
type LoginResponse = {
  id: number;
  name: string;
  email: string;
  role: string;
  message: string;
  success: boolean;
  token: string;
  refreshToken: string;
};

export const authService = {
  async login(
    email: string,
    password: string
  ): Promise<{
    token: string;
    refreshToken: string;
    user: { id: string | number; name: string; email: string; role: Role };
  }> {
    try {
      const response = await apiClient.post<LoginResponse>(
        process.env.NEXT_PUBLIC_LOGIN_ENDPOINT || "/api/auth/login",
        { email, password }
      );

      // Verificar si la respuesta fue exitosa
      if (!response.data.success) {
        throw new Error(response.data.message || "Usuario o contraseña incorrectos.");
      }

      const mappedRole = mapRoleToAppRole(response.data.role);

      // Guardar el token en localStorage
      localStorage.setItem("auth_token", response.data.token);

      return {
        token: response.data.token,
        refreshToken: response.data.refreshToken,
        user: {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: mappedRole,
        },
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error en el login: ${error.message}`);
      } else {
        throw new Error("Error en el login.");
      }
    }
  },

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const response = await axios.post<{ token: string }>(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_ENDPOINT || "/api/auth/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    if (!response.data || typeof response.data.token !== "string") {
      throw new Error("La respuesta del servidor no contiene un token válido.");
    }
    return response.data;
  },
};

// Función para mapear los roles del backend a los roles que usa nuestra aplicación
function mapRoleToAppRole(backendRole: string): Role {
  switch (backendRole?.toLowerCase()) {
    case "administrador":
      return "administrador";
    case "operador":
      return "operador";
    case "conductor":
      return "conductor";
    default:
      return "operador";
  }
}
