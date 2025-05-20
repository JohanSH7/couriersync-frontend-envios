"use client"

import type React from "react"
import { type FC, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const { login } = useAuth()

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    let isValid = true
    setEmailError(null)
    setPasswordError(null)
    setError(null)

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

    if (!validateForm()) return

    setIsSubmitting(true)
    setError(null)

    try {
      await login(email, password)

      setShowSuccessModal(true)

      setTimeout(() => {
        if (onSuccess) onSuccess()
      }, 1500)
    } catch (err: unknown) {
      console.log("Login error:", err)

      if (typeof err === "object" && err !== null) {
        const error = err as {
          response?: {
            status?: number
            data?: { message?: string }
          }
          request?: unknown
          message?: string
        }

        if (error.response) {
          switch (error.response.status) {
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
              if (error.response.data?.message === "User not found") {
                setError("Usuario no encontrado")
              } else if (error.response.data?.message === "Invalid password") {
                setError("Contraseña incorrecta")
              } else {
                setError(error.response.data?.message || "Error al iniciar sesión")
              }
          }
        } else if (error.request) {
          setError("No se pudo conectar con el servidor. Verifica tu conexión a internet")
        } else {
          if (error.message === "User not found") {
            setError("Usuario no encontrado")
          } else if (error.message === "Invalid password") {
            setError("Contraseña incorrecta")
          } else {
            setError(error.message || "Error al iniciar sesión")
          }
        }
      } else {
        setError("Ocurrió un error desconocido al iniciar sesión")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">¡Bienvenido!</h2>
        <p className="mt-2 text-muted-foreground">
          Ingresa tus datos para acceder a tu cuenta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <label
            htmlFor="email"
            className={`app-label ${
              focusedField === "email" ? "app-label-focus" : ""
            }`}
          >
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            required
            className={`app-input app-focus-ring ${
              emailError
                ? "border-destructive"
                : focusedField === "email"
                ? "border-primary ring-2 ring-primary/20"
                : ""
            }`}
          />
          {emailError && <p className="text-destructive text-xs">{emailError}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className={`app-label ${
                focusedField === "password" ? "app-label-focus" : ""
              }`}
            >
              Contraseña
            </label>
            <Button
              variant="link"
              className="p-0 h-auto text-xs text-primary hover:text-primary/90"
            >
              ¿Olvidaste tu contraseña?
            </Button>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            required
            className={`app-input app-focus-ring ${
              passwordError
                ? "border-destructive"
                : focusedField === "password"
                ? "border-primary ring-2 ring-primary/20"
                : ""
            }`}
          />
          {passwordError && (
            <p className="text-destructive text-xs">{passwordError}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full app-button-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Iniciando sesión..." : "INGRESAR"}
        </Button>
      </form>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="h-6 w-6" />
              Inicio de sesión exitoso
            </DialogTitle>
            <DialogDescription>
              Bienvenido al sistema. Serás redirigido en un momento...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LoginForm
