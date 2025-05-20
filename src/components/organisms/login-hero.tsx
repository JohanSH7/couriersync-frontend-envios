import type { FC } from "react"
import Image from "next/image"

interface LoginHeroProps {
  title: string
  subtitle: string
  backgroundImage: string
  backgroundColor?: string
}

const LoginHero: FC<LoginHeroProps> = ({ title, subtitle, backgroundImage, backgroundColor = "bg-white" }) => {
  return (
    <div className={`relative hidden w-1/2 flex-col justify-between p-10 lg:flex ${backgroundColor}`}>
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt="Fondo logístico"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Contenido superpuesto */}
      <div className="relative z-10 text-white">
        <h1 className="text-7xl font-bold">{title}</h1>
        <p className="mt-4 text-2xl">{subtitle}</p>
      </div>
    </div>
  )
}

export default LoginHero
