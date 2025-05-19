"use client"

import type { FC, ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  icon: ReactNode
  children: ReactNode
  className?: string
}

const NavLink: FC<NavLinkProps> = ({ href, icon, children, className }) => {
  const router = useRouter()
  const isActive = router.pathname === href || router.pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

export default NavLink
