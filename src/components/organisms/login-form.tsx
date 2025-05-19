"use client"

import type React from "react"
import { type FC, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import FormField from "@/components/molecules/form-field"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle2 } from "lucide-react"

interface LoginFormProps {
  onSuccess?: () => void
}

const LoginForm: FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const { login } = useAuth()

  // Función para validar el formato del email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    let isValid = true
    setEmailError(null)
    setPasswordError(null)
    setError(null)

    // Validación de campos vacíos
    if (!email) {
      setEmailError('El campo "Correo electrónico" es obligatorio.')
      isValid = false
    } else if (!isValidEmail(email)) {
      setEmailError("Por favor, ingresa un correo electrónico válido.")
      isValid = false
    }

    if (!password) {
      setPasswordError('El campo "Contraseña" es obligatorio.')
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await login(email, password)
      // Mostrar modal de éxito antes de redireccionar
      setShowSuccessModal(true)
      // Esperar un momento antes de ejecutar onSuccess (que redireccionará)
      setTimeout(() => {
        if (onSuccess) {
          onSuccess()
        }
      }, 1500)
    } catch (err: unknown) {
      // Manejo de diferentes tipos de errores
      if (typeof err === "object" && err !== null) {
        interface ErrorResponse {
          response?: {
            status?: number;
            data?: {
              message?: string;
            };
          };
          request?: unknown;
          message?: string;
        }
        const errorObj = err as ErrorResponse;
        if (errorObj.response) {
          // Error de respuesta del servidor (401, 500, etc.)
          switch (errorObj.response.status) {
            case 401:
              setError("Credenciales inválidas. Por favor, verifica tu correo y contraseña")
              setEmailError("Verifica este campo")
              setPasswordError("Verifica este campo")
              break
            case 403:
              setError("No tienes permiso para acceder. Contacta al administrador")
              break
            case 429:
              setError("Demasiados intentos. Por favor, intenta más tarde")
              break
            case 500:
              setError("Error en el servidor. Por favor, intenta más tarde")
              break
            default:
              setError(errorObj.response.data?.message || "Error al iniciar sesión")
          }
        } else if (errorObj.request) {
          // Error de red o CORS (no se recibió respuesta)
          setError("No se pudo conectar con el servidor. Verifica tu conexión a internet")
        } else {
          // Error inesperado
          setError(`Error inesperado: ${errorObj.message || "Desconocido"}`)
        }
        console.error("Login error:", err)
      } else {
        setError("Error inesperado")
        console.error("Login error:", err)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          hasError={!!emailError}
          errorMessage={emailError || ""}
        />

        <FormField
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          hasError={!!passwordError}
          errorMessage={passwordError || ""}
          rightElement={
            <Button variant="link" className="p-0 h-auto text-xs text-blue-600">
              ¿Olvidaste tu contraseña?
            </Button>
          }
        />

        <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isSubmitting}>
          {isSubmitting ? "Iniciando sesión..." : "INGRESAR"}
        </Button>
      </form>

      {/* Modal de éxito */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-6 w-6" />
              Inicio de sesión exitoso
            </DialogTitle>
            <DialogDescription>Bienvenido al sistema. Serás redirigido en un momento...</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LoginForm
