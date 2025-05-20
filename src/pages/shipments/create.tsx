"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import SidebarNav from "@/components/organisms/sidebar-nav"
import ShipmentForm from "@/components/organisms/shipment-form"

export default function CreateShipment() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    // Verificar si el usuario tiene el rol adecuado
    if (user?.role !== "operador" && user?.role !== "conductor") {
      setError("No tienes permisos para acceder a esta página")
    }
  }, [isAuthenticated, router, user])

  if (!isAuthenticated) {
    return null
  }

  if (error) {
    return (
      <div className="flex h-screen overflow-hidden app-orange-bg">
        <aside className="hidden w-72 flex-col md:flex border-r app-sidebar">
          <SidebarNav />
        </aside>
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 md:p-6 app-orange-bg">
            <div className="flex items-center justify-center h-full">
              <Alert variant="destructive" className="max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden app-orange-bg">
      <aside className="hidden w-72 flex-col md:flex border-r app-sidebar">
        <SidebarNav />
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 app-orange-bg">
          <div className="bg-white rounded-lg p-6 mx-auto max-w-6xl">
            <ShipmentForm />
          </div>
        </main>
      </div>
    </div>
  )
}
