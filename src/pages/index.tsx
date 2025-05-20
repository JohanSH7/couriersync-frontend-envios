"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/contexts/auth-context"
import LoginForm from "@/components/organisms/login-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import LoginTemplate from "@/components/templates/login-template"

export default function Home() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  // Función para manejar la redirección después del login exitoso
  const handleLoginSuccess = () => {
    // La redirección se maneja en el useEffect
  }

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect based on role
      switch (user?.role) {
        case "administrador":
          router.push("/admin")
          break
        case "operador":
          router.push("/operator")
          break
        case "conductor":
          router.push("/driver")
          break
        default:
          console.warn("Rol desconocido:", user?.role)
          break
      }
    }
  }, [isAuthenticated, router, user])

  return (
    <LoginTemplate
      title="CourierSync"
      subtitle="Sistema Web para Optimización de Procesos Logísticos"
      backgroundImage="/images/background.jpg"
      backgroundColor="app-orange-bg"
    >
      <LoginForm onSuccess={handleLoginSuccess} />

      <div className="mt-4 flex items-center">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="ml-2 text-sm text-foreground">
          Recuérdame por 30 días
        </Label>
      </div>
    </LoginTemplate>
  )
}
