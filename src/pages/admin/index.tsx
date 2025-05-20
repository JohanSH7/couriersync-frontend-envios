"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/contexts/auth-context"
import DashboardLayout from "@/components/templates/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log("AdminDashboard - Verificando autenticación:", { isAuthenticated, userRole: user?.role })

    if (!isAuthenticated) {
      console.log("No autenticado, redirigiendo a login")
      router.push("/")
    } else if (user?.role !== "administrador") {
      console.log("Rol incorrecto, redirigiendo a login")
      router.push("/")
    }
  }, [isAuthenticated, router, user])

  if (!isAuthenticated || user?.role !== "administrador") {
    return null
  }

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">+10% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operadores Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+5% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conductores Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75</div>
            <p className="text-xs text-muted-foreground">+15% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
