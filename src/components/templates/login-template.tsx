import type { FC, ReactNode } from "react"
import LoginHero from "@/components/organisms/login-hero"

interface LoginTemplateProps {
  children: ReactNode
  title: string
  subtitle: string
  backgroundImage: string
  backgroundColor?: string
}

const LoginTemplate: FC<LoginTemplateProps> = ({ children, title, subtitle, backgroundImage, backgroundColor }) => {
  return (
    <div className="flex min-h-screen">
      {/* Lado izquierdo - Hero */}
      <LoginHero
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
        backgroundColor={backgroundColor || "app-orange-bg"}
      />

      {/* Lado derecho - Contenido del formulario */}
      <div className="flex w-full items-center justify-center bg-background p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
    </div>
  )
}

export default LoginTemplate
