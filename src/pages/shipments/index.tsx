"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, PlusCircle } from "lucide-react"
import { shipmentService } from "@/services/shipment-service"
import type { Shipment } from "@/types/shipment"
import ShipmentsListTemplate from "@/components/templates/shipments-list-template"
import SidebarNav from "@/components/organisms/sidebar-nav"
import { Button } from "@/components/ui/button"

export default function ShipmentsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(true)

  const fetchShipments = useCallback(async () => {
    try {
      setLoading(true)
      const data = await shipmentService.getShipments()
      setShipments(data)
      setError(null)
    } catch (err: unknown) {
      console.error("Error al cargar los envíos:", err)
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error desconocido"
      setError("Error al cargar los envíos: " + errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    // Verificar si el usuario tiene el rol adecuado
    if (user?.role !== "operador" && user?.role !== "conductor" && user?.role !== "administrador") {
      setError("No tienes permisos para acceder a esta página")
      return
    }

    fetchShipments()
  }, [isAuthenticated, router, user, fetchShipments])

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
          {loading && shipments.length === 0 ? (
            <div className="app-content p-6 mx-auto max-w-7xl">
              <p className="text-center">Cargando envíos...</p>
            </div>
          ) : shipments.length === 0 ? (
            <div className="app-content p-6 mx-auto max-w-7xl">
              <div className="text-center py-10">
                <p className="text-gray-500">No hay envíos registrados</p>
                {(user?.role === "operador" || user?.role === "conductor") && (
                  <Button onClick={() => router.push("/shipments/create")} variant="outline" className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Crear primer envío
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <ShipmentsListTemplate shipments={shipments} isLoading={loading} onRefresh={fetchShipments} />
          )}
        </main>
      </div>
    </div>
  )
}
