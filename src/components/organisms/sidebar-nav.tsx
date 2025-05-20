"use client"

import type { FC } from "react"
import { useAuth } from "@/contexts/auth-context"
import NavLink from "@/components/molecules/nav-link"
import { LayoutDashboard, Users, FileText, Map, BarChart, Package, PlusCircle, LogOut, User } from "lucide-react"
import { useRouter } from "next/router"

interface SidebarNavProps {
  className?: string
}

const SidebarNav: FC<SidebarNavProps> = ({ className }) => {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) return null

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-xl font-bold text-sidebar-foreground flex items-center">
          <Package className="mr-2 h-5 w-5 text-primary" />
          CourierSync
        </h2>
      </div>

      <div className="flex flex-col p-2 flex-1 overflow-auto">
        <div className="mb-4 p-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="text-sidebar-foreground">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/70">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        {user.role === "administrador" && (
          <>
            <NavLink href="/admin" icon={<LayoutDashboard className="h-4 w-4" />} className="py-3">
              Dashboard
            </NavLink>
            <NavLink href="/admin/users" icon={<Users className="h-4 w-4" />} className="py-3">
              Usuarios
            </NavLink>
            <NavLink href="/admin/reports" icon={<FileText className="h-4 w-4" />} className="py-3">
              Reportes
            </NavLink>
          </>
        )}

        {user.role === "operador" && (
          <>
            <NavLink href="/operator" icon={<LayoutDashboard className="h-4 w-4" />} className="py-3">
              Dashboard
            </NavLink>
            <NavLink href="/operator/metrics" icon={<BarChart className="h-4 w-4" />} className="py-3">
              Consultar métricas
            </NavLink>
            <NavLink href="/operator/routes" icon={<Map className="h-4 w-4" />} className="py-3">
              Consultar rutas
            </NavLink>
            <NavLink href="/shipments" icon={<Package className="h-4 w-4" />} className="py-3">
              Consultar envíos
            </NavLink>
            <NavLink
              href="/shipments/create"
              icon={<PlusCircle className="h-4 w-4" />}
              className="py-3 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 app-transition"
            >
              Nuevo envío
            </NavLink>
          </>
        )}

        {user.role === "conductor" && (
          <>
            <NavLink href="/driver" icon={<LayoutDashboard className="h-4 w-4" />} className="py-3">
              Dashboard
            </NavLink>
            <NavLink href="/driver/routes" icon={<Map className="h-4 w-4" />} className="py-3">
              Mis Rutas
            </NavLink>
            <NavLink href="/shipments" icon={<Package className="h-4 w-4" />} className="py-3">
              Consultar envíos
            </NavLink>
            <NavLink href="/shipments/create" icon={<PlusCircle className="h-4 w-4" />} className="py-3">
              Nuevo envío
            </NavLink>
          </>
        )}
      </div>

      <div className="mt-auto p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm w-full bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90 app-transition app-hover-scale"
        >
          <LogOut className="h-4 w-4" />
          <span>Salir</span>
        </button>
      </div>
    </div>
  )
}

export default SidebarNav
