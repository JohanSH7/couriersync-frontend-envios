"use client"

import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    // Función para verificar si la pantalla es móvil
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Verificar inicialmente
    checkIsMobile()

    // Agregar listener para cambios de tamaño de ventana
    window.addEventListener("resize", checkIsMobile)

    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return !!isMobile
}
