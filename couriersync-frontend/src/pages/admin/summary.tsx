// filepath: c:\Users\jhoan\Documents\Ing. Sistemas Materias\Semestre 9\Fabrica escuela\couriersync-frontend\src\pages\admin\summary.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@/contexts/auth-context"
import AdminSummaryLayout from "@/components/templates/admin-summary-layout"
import { summaryService } from "@/services/summary-service"

const SummaryPage = () => {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [summaryData, setSummaryData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    if (user?.role !== "administrador") {
      router.push("/")
      return
    }

    const fetchSummary = async () => {
      try {
        const data = await summaryService.getSummary()
        setSummaryData(data)
      } catch (err) {
        setError("Error al cargar los datos del resumen.")
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [isAuthenticated, user, router])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>{error}</div>

  return (
    <AdminSummaryLayout>
      <h1>Resumen de Administrador</h1>
      <pre>{JSON.stringify(summaryData, null, 2)}</pre>
    </AdminSummaryLayout>
  )
}

export default SummaryPage