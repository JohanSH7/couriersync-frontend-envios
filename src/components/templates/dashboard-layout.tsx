"use client"

import { type FC, type ReactNode, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import SidebarNav from "@/components/organisms/sidebar-nav"
import UserMenu from "@/components/molecules/user-menu"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useIsMobile()

  if (!user) return null

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar for desktop */}
      <aside
        className={`${
          isMobile
            ? `fixed inset-y-0 z-50 flex w-72 flex-col ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`
            : "hidden w-72 flex-col md:flex"
        } border-r`}
      >
        <SidebarNav />
        {isMobile && (
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          {isMobile && (
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              {user.role === "admin"
                ? "Panel de Administración"
                : user.role === "operator"
                  ? "Panel de Operador"
                  : "Panel de Conductor"}
            </h1>
          </div>
          <UserMenu />
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default DashboardLayout
