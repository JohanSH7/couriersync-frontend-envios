"use client"

import type { FC } from "react"
import { useAuth } from "@/contexts/auth-context"
import Logo from "@/components/atoms/logo"
import NavLink from "@/components/molecules/nav-link"
import { LayoutDashboard, Users, Settings, FileText, Map, Car, Calendar, BarChart } from "lucide-react"

interface SidebarNavProps {
  className?: string
}

const SidebarNav: FC<SidebarNavProps> = ({ className }) => {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className={`flex flex-col h-full p-4 ${className}`}>
      <div className="px-3 py-2">
        <Logo />
      </div>
      <div className="mt-8 flex flex-col gap-2">
        {user.role === "admin" && (
          <>
            <NavLink href="/admin/dashboard" icon={<LayoutDashboard className="h-4 w-4" />}>
              Dashboard
            </NavLink>
            <NavLink href="/admin/users" icon={<Users className="h-4 w-4" />}>
              Usuarios
            </NavLink>
            <NavLink href="/admin/reports" icon={<FileText className="h-4 w-4" />}>
              Reportes
            </NavLink>
            <NavLink href="/admin/settings" icon={<Settings className="h-4 w-4" />}>
              Configuración
            </NavLink>
          </>
        )}

        {user.role === "operator" && (
          <>
            <NavLink href="/operator/dashboard" icon={<LayoutDashboard className="h-4 w-4" />}>
              Dashboard
            </NavLink>
            <NavLink href="/operator/routes" icon={<Map className="h-4 w-4" />}>
              Rutas
            </NavLink>
            <NavLink href="/operator/drivers" icon={<Users className="h-4 w-4" />}>
              Conductores
            </NavLink>
            <NavLink href="/operator/schedule" icon={<Calendar className="h-4 w-4" />}>
              Programación
            </NavLink>
          </>
        )}

        {user.role === "driver" && (
          <>
            <NavLink href="/driver/dashboard" icon={<LayoutDashboard className="h-4 w-4" />}>
              Dashboard
            </NavLink>
            <NavLink href="/driver/routes" icon={<Map className="h-4 w-4" />}>
              Mis Rutas
            </NavLink>
            <NavLink href="/driver/vehicle" icon={<Car className="h-4 w-4" />}>
              Mi Vehículo
            </NavLink>
            <NavLink href="/driver/stats" icon={<BarChart className="h-4 w-4" />}>
              Estadísticas
            </NavLink>
          </>
        )}
      </div>
    </div>
  )
}

export default SidebarNav
