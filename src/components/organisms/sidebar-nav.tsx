"use client"

import type { FC } from "react"
import { useAuth } from "@/contexts/auth-context"
import NavLink from "@/components/molecules/nav-link"
import { LayoutDashboard, Package, PlusCircle, LogOut, User, BarChart } from "lucide-react"
import { useRouter } from "next/router"
import clsx from "clsx"

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
      {/* Header */}
      <div className="p-4 border-b app-border sidebar-header">
        <h2 className="text-xl font-bold text-primary-foreground flex items-center">
          <Package className="mr-2 h-5 w-5 text-primary-foreground" />
          CourierSync
        </h2>
      </div>

      {/* User Info */}
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

      {/* Navigation Links */}
      <div className="space-y-1">
        <NavLink
          href="/dashboard"
          icon={<LayoutDashboard className="h-4 w-4" />}
          className={clsx("app-sidebar-button", {
            "app-sidebar-button-active": router.pathname === "/dashboard",
          })}
        >
          Dashboard
        </NavLink>

        <NavLink
          href="/shipments"
          icon={<Package className="h-4 w-4" />}
          className={clsx("app-sidebar-button", {
            "app-sidebar-button-active": router.pathname === "/shipments",
          })}
        >
          Consultar envíos
        </NavLink>

        <NavLink
          href="/shipments/create"
          icon={<PlusCircle className="h-4 w-4" />}
          className={clsx("app-sidebar-button", {
            "app-sidebar-button-active": router.pathname === "/shipments/create",
          })}
        >
          Nuevo envío
        </NavLink>

        <NavLink
          href="/admin/summary"
          icon={<BarChart className="h-4 w-4" />}
          className={clsx("app-sidebar-button", {
            "app-sidebar-button-active": router.pathname === "/admin/summary",
          })}
        >
          Resumen de envíos
        </NavLink>
      </div>

      {/* Logout Button */}
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm w-full bg-primary text-primary-foreground hover:bg-primary/90 app-transition"
        >
          <LogOut className="h-4 w-4" />
          <span>Salir</span>
        </button>
      </div>
    </div>
  )
}

export default SidebarNav
