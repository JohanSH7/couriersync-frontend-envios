import type { FC } from "react"
import Image from "next/image"

interface LoginHeroProps {
  title: string
  subtitle: string
  backgroundImage: string
  backgroundColor?: string // Agregar la propiedad opcional
}

const LoginHero: FC<LoginHeroProps> = ({ title, subtitle, backgroundImage, backgroundColor }) => {
  return (
    <div
      className="app-hero-container relative w-full h-full"
      style={{ backgroundColor: backgroundColor || "hsl(var(--primary))" }} // Aplicar el color de fondo
    >
      {/* Imagen de fondo */}
      <Image
        src={backgroundImage || "/placeholder.svg"}
        alt="Fondo logístico"
        fill
        style={{ objectFit: "cover" }}
        priority
      />

      {/* Contenido superpuesto */}
      <div className="relative z-10 text-white p-8">
        <h1 className="app-hero-title">{title}</h1>
        <p className="app-hero-subtitle">{subtitle}</p>
      </div>
    </div>
  )
}

export default LoginHero
