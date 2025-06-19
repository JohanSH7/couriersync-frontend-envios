import type React from "react"
import { type FC, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

interface LoginFormProps {
  onSuccess?: () => void
}

const LoginForm: FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dialogState, setDialogState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    if (!email || !isValidEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.")
      return false
    }
    if (!password) {
      setError("El campo 'Contraseña' es obligatorio.")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setDialogState("error")
      setError("Usuario o contraseña incorrectos.")
      return
    }

    setIsSubmitting(true)
    setDialogState("loading")
    setError(null)

    try {
      await login(email, password)
      setDialogState("success")

      setTimeout(() => {
        if (onSuccess) onSuccess()
      }, 1500)
    } catch {
      setDialogState("error")
      setError("Usuario o contraseña incorrectos.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
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
        <div>
          <label htmlFor="email" className="app-label">
            Correo electrónico
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="app-input app-placeholder-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="app-label">
            Contraseña
          </label>
          <div className="app-input-container">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="app-input app-placeholder-transparent"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="app-password-toggle"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full app-button-primary hover:bg-primary/80 hover:text-primary-foreground"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Iniciando sesión..." : "INGRESAR"}
        </Button>
      </form>

      <Dialog open={dialogState !== "idle"} onOpenChange={() => setDialogState("idle")}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            {dialogState === "loading" && (
              <>
                <DialogTitle className="flex items-center gap-2 text-primary">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Iniciando sesión...
                </DialogTitle>
                <DialogDescription>
                  Por favor, espera mientras procesamos tu solicitud.
                </DialogDescription>
              </>
            )}
            {dialogState === "success" && (
              <>
                <DialogTitle className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                  Inicio de sesión exitoso
                </DialogTitle>
                <DialogDescription>
                  Bienvenido al sistema. Serás redirigido en un momento...
                </DialogDescription>
              </>
            )}
            {dialogState === "error" && (
              <>
                <DialogTitle className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-6 w-6" />
                  Error al iniciar sesión
                </DialogTitle>
                <DialogDescription>{error}</DialogDescription>
              </>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LoginForm
