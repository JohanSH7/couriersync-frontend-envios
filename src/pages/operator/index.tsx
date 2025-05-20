"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "@/components/templates/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OperatorDashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log("OperatorDashboard - Verificando autenticación:", { isAuthenticated, userRole: user?.role })

    if (!isAuthenticated) {
      console.log("No autenticado, redirigiendo a login")
      router.push("/")
    } else if (user?.role !== "operador") {
      console.log("Rol incorrecto, redirigiendo a login")
      router.push("/")
    }
  }, [isAuthenticated, router, user])

  if (!isAuthenticated || user?.role !== "operador") {
    return null
  }

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 tareas de alta prioridad</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conductores Asignados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 conductores disponibles</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
