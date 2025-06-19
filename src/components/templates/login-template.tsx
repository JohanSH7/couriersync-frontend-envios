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
    <div className="flex flex-row h-screen">
      {/* Lado izquierdo - Hero */}
      <div className="app-hero-container">
        <LoginHero
          title={title}
          subtitle={subtitle}
          backgroundImage={backgroundImage}
          backgroundColor={backgroundColor || "hsl(var(--primary))"}
        />
      </div>

      {/* Lado derecho - Formulario */}
      <div className="app-form-container">
        <div className="w-full max-w-sm space-y-6">{children}</div>
      </div>
    </div>
  )
}

export default LoginTemplate
