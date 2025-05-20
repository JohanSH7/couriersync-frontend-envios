"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "@/components/templates/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DriverDashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log("DriverDashboard - Verificando autenticación:", { isAuthenticated, userRole: user?.role })

    if (!isAuthenticated) {
      console.log("No autenticado, redirigiendo a login")
      router.push("/")
    } else if (user?.role !== "conductor") {
      console.log("Rol incorrecto, redirigiendo a login")
      router.push("/")
    }
  }, [isAuthenticated, router, user])

  if (!isAuthenticated || user?.role !== "conductor") {
    return null
  }

  return (
    <DashboardLayout>
      <div className="grid gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rutas Asignadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Próxima ruta en 2 horas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado del Vehículo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Óptimo</div>
            <p className="text-xs text-muted-foreground">Próximo mantenimiento en 15 días</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
