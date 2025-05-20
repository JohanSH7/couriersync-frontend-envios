"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Edit, FileEdit, User } from "lucide-react"
import ShipmentFilter from "@/components/molecules/shipment-filter"
import ShipmentsTable from "@/components/organisms/shipments-table"
import ShipmentPagination from "@/components/molecules/shipment-pagination"
import StatusChangeModal from "@/components/molecules/status-change-modal"
import type { Shipment } from "@/types/shipment"
import { shipmentService } from "@/services/shipment-service"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface ShipmentsListTemplateProps {
  shipments: Shipment[]
  isLoading: boolean
  onRefresh: () => void
}

const ShipmentsListTemplate = ({ shipments: initialShipments, isLoading, onRefresh }: ShipmentsListTemplateProps) => {
  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>(initialShipments)
  const [filter, setFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedShipments, setSelectedShipments] = useState<number[]>([])
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    if (filter) {
      const filtered = initialShipments.filter((shipment) => {
        const originCity =
          typeof shipment.origin === "string" ? shipment.origin.toLowerCase().includes(filter.toLowerCase()) : false

        const destinationCity =
          typeof shipment.destination === "string"
            ? shipment.destination.toLowerCase().includes(filter.toLowerCase())
            : false

        return originCity || destinationCity
      })
      setFilteredShipments(filtered)
      setCurrentPage(1)
    } else {
      setFilteredShipments(initialShipments)
    }
  }, [filter, initialShipments])

  const handleFilterChange = (value: string) => {
    setFilter(value)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleStatusChange = async (status: string) => {
    try {
      // Actualizar el estado de cada envío seleccionado
      for (const id of selectedShipments) {
        await shipmentService.updateShipmentStatus(id, status)
      }

      setStatusMessage({
        type: "success",
        text: `Se ha actualizado el estado de ${selectedShipments.length} envío(s)`,
      })

      // Limpiar selección y refrescar datos
      setSelectedShipments([])
      onRefresh()

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        setStatusMessage(null)
      }, 3000)
    } catch (error: unknown) {
      console.error("Error al cambiar el estado:", error)
      setStatusMessage({
        type: "error",
        text: error instanceof Error ? error.message : "No se pudo actualizar el estado",
      })

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        setStatusMessage(null)
      }, 3000)
    }
  }

  const paginatedShipments = filteredShipments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage)

  return (
    <div className="bg-white rounded-lg p-6 mx-auto max-w-7xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Registro de envíos</h1>

      {statusMessage && (
        <Alert variant={statusMessage.type === "success" ? "default" : "destructive"} className="mb-4">
          {statusMessage.type === "error" && <AlertCircle className="h-4 w-4" />}
          <AlertDescription>{statusMessage.text}</AlertDescription>
        </Alert>
      )}

      <div className="mb-6">
        <ShipmentFilter onFilterChange={handleFilterChange} />
      </div>

      <ShipmentsTable
        shipments={paginatedShipments}
        isLoading={isLoading}
        onSelectShipments={setSelectedShipments}
        selectedShipments={selectedShipments}
      />

      <div className="mt-4">
        <ShipmentPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          selectedCount={selectedShipments.length}
          totalCount={filteredShipments.length}
        />
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <Button
          variant="default"
          className="bg-primary hover:bg-primary/90 text-primary-foreground app-transition app-hover-scale"
          disabled={selectedShipments.length === 0}
        >
          <Edit className="mr-2 h-4 w-4" />
          EDITAR DATOS
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsStatusModalOpen(true)}
          disabled={selectedShipments.length === 0}
          className="border-input hover:bg-accent hover:text-accent-foreground app-transition"
        >
          <FileEdit className="mr-2 h-4 w-4" />
          EDITAR STATUS
        </Button>
        <Button
          variant="default"
          className="bg-primary hover:bg-primary/90 text-primary-foreground app-transition app-hover-scale"
          disabled={selectedShipments.length !== 1}
        >
          <User className="mr-2 h-4 w-4" />
          CONSULTAR DESTINATARIO
        </Button>
      </div>

      <StatusChangeModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={handleStatusChange}
        shipmentIds={selectedShipments}
      />
    </div>
  )
}

export default ShipmentsListTemplate
