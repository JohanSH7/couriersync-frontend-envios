"use client"

import { type FC, type ReactNode, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import SidebarNav from "@/components/organisms/sidebar-nav"
import { Button } from "@/components/ui/button"
import { X, Menu, Package } from "lucide-react"
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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar para escritorio */}
      <aside
        className={`${
          isMobile
            ? `fixed inset-y-0 z-50 flex w-72 flex-col ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } app-transition`
            : "hidden w-72 flex-col md:flex"
        } border-r border-sidebar-border bg-sidebar`}
      >
        <SidebarNav />
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-sidebar-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header para móvil */}
        {isMobile && (
          <header className="flex h-16 items-center border-b border-sidebar-border px-4 bg-sidebar">
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="ml-4 text-xl font-bold text-sidebar-foreground flex items-center">
              <Package className="mr-2 h-5 w-5 text-primary" />
              CourierSync
            </h1>
          </header>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-primary">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default DashboardLayout
