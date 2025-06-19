"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "@/components/templates/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const RoleBasedDashboard = () => {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const renderContent = () => {
    switch (user.role) {
      case "administrador":
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="app-card">
              <CardHeader>
                <CardTitle className="app-card-title">Usuarios Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold dashboard-text">120</div>
                <p className="text-xs text-muted-foreground">+10% desde el mes pasado</p>
              </CardContent>
            </Card>
          </div>
        )
      case "operador":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="app-card">
              <CardHeader>
                <CardTitle className="app-card-title">Tareas Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold dashboard-text">12</div>
                <p className="text-xs text-muted-foreground">4 tareas de alta prioridad</p>
              </CardContent>
            </Card>
          </div>
        )
      case "conductor":
        return (
          <div className="grid gap-4">
            <Card className="app-card">
              <CardHeader>
                <CardTitle className="app-card-title">Rutas Asignadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold dashboard-text">3</div>
                <p className="text-xs text-muted-foreground">Próxima ruta en 2 horas</p>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return <p>Rol desconocido</p>
    }
  }

  return <DashboardLayout>{renderContent()}</DashboardLayout>
}

export default RoleBasedDashboard