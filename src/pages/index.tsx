import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/contexts/auth-context"
import LoginForm from "@/components/organisms/login-form"
import CheckboxWithLabel from "@/components/atoms/checkbox-label"
import LoginTemplate from "@/components/templates/login-template"

export default function Home() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  return (
    <LoginTemplate
      title="CourierSync"
      subtitle="Sistema Web para Optimización de Procesos Logísticos"
      backgroundImage="/images/background.jpg"
      backgroundColor="hsl(var(--primary))"
    >
      <LoginForm />
      <div className="mt-4">
        <CheckboxWithLabel id="remember" label="Recuérdame por 30 días" />
      </div>
    </LoginTemplate>
  )
}