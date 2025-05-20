"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authService } from "@/services/auth-service"

// Actualizar los tipos para que coincidan con la respuesta real del backend
type Role = "administrador" | "operador" | "conductor"

type User = {
  id: string | number
  name: string
  email: string
  role: Role
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Clave para almacenar los datos del usuario en localStorage
const USER_STORAGE_KEY = "auth_user"
const TOKEN_STORAGE_KEY = "auth_token"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Esta función se ejecuta una sola vez al cargar la aplicación
  useEffect(() => {
    // Recuperar el usuario desde localStorage al iniciar
    const checkAuth = () => {
      try {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY)
        const storedUser = localStorage.getItem(USER_STORAGE_KEY)

        if (token && storedUser) {
          const userData = JSON.parse(storedUser) as User
          setUser(userData)
        }
      } catch (error) {
        console.error("Error recuperando datos de autenticación:", error)
        // Limpiar datos si hay un error
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        localStorage.removeItem(USER_STORAGE_KEY)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { token, user } = await authService.login(email, password)

      // Verificar que el token y los datos del usuario sean válidos
      if (!token || !user || !user.id || !user.role) {
        throw new Error("Respuesta de autenticación inválida")
      }

      // Guardar el token y el usuario en localStorage
      localStorage.setItem(TOKEN_STORAGE_KEY, token)
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))

      // Actualizar el estado
      setUser(user)
    } catch (error) {
      console.error("Login error:", error)
      throw error // Propagar el error para manejarlo en el componente
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Limpiar tanto el token como los datos del usuario
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
