"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/contexts/auth-context"
import LoginForm from "@/components/organisms/login-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import LoginTemplate from "@/components/templates/login-template"

export default function Home() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  // Función para manejar la redirección después del login exitoso
  const handleLoginSuccess = () => {
    setShouldRedirect(true)
  }

  useEffect(() => {
    if (isAuthenticated && shouldRedirect) {
      // Redirect based on role
      switch (user?.role) {
        case "admin":
          router.push("/admin/dashboard")
          break
        case "operator":
          router.push("/operator/dashboard")
          break
        case "driver":
          router.push("/driver/dashboard")
          break
        default:
          break
      }
    }
  }, [isAuthenticated, router, user, shouldRedirect])

  return (
    <LoginTemplate
      title="CourierSync"
      subtitle="Sistema Web para Optimización de Procesos Logísticos"
      backgroundImage="/images/background.jpg"
      backgroundColor="bg-orange-500"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold">¡Bienvenido!</h2>
        <p className="mt-2 text-gray-600">Ingresa tus datos para acceder a tu cuenta</p>
      </div>

      <LoginForm onSuccess={handleLoginSuccess} />

      <div className="mt-4 flex items-center">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="ml-2 text-sm text-gray-600">
          Recuérdame por 30 días
        </Label>
      </div>

      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">O continúa con</span>
        </div>
      </div>

      <button className="mt-4 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.787-1.676-4.139-2.701-6.735-2.701-5.522 0-10.001 4.478-10.001 10s4.479 10 10.001 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.081z"
            fill="#4285F4"
          />
        </svg>
        Sign in with Google
      </button>
    </LoginTemplate>
  )
}
