"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import StatusBadge from "@/components/atoms/status-badge"
import PriorityBadge from "@/components/atoms/priority-badge"
import type { ShipmentTableProps } from "@/types/shipment"
import { formatAddress } from "@/lib/utils"

const ShipmentsTable = ({ shipments, isLoading, onSelectShipments, selectedShipments }: ShipmentTableProps) => {
  const handleSelectShipment = (id: number) => {
    const newSelected = selectedShipments.includes(id)
      ? selectedShipments.filter((shipmentId) => shipmentId !== id)
      : [...selectedShipments, id]

    onSelectShipments(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedShipments.length === shipments.length) {
      onSelectShipments([])
    } else {
      onSelectShipments(shipments.map((shipment) => shipment.id))
    }
  }

  // Función para generar un código de envío basado en el ID
  const generateShipmentCode = (id: number) => {
    return `${id}${Math.floor(Math.random() * 1000)}F34M`
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border shadow-md">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedShipments.length === shipments.length && shipments.length > 0}
                onCheckedChange={handleSelectAll}
                aria-label="Seleccionar todos"
              />
            </TableHead>
            <TableHead className="font-semibold text-foreground">Status</TableHead>
            <TableHead className="font-semibold text-foreground">Código</TableHead>
            <TableHead className="font-semibold text-foreground">Peso Kg</TableHead>
            <TableHead className="font-semibold text-foreground">Ciudad origen</TableHead>
            <TableHead className="font-semibold text-foreground">Ciudad destino</TableHead>
            <TableHead className="font-semibold text-foreground">Dirección</TableHead>
            <TableHead className="font-semibold text-foreground">Prioridad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="ml-2">Cargando envíos...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : shipments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No hay envíos disponibles
              </TableCell>
            </TableRow>
          ) : (
            shipments.map((shipment) => {
              const originData = formatAddress(shipment.origin)
              const destinationData = formatAddress(shipment.destination)

              return (
                <TableRow key={shipment.id} className="app-table-row">
                  <TableCell>
                    <Checkbox
                      checked={selectedShipments.includes(shipment.id)}
                      onCheckedChange={() => handleSelectShipment(shipment.id)}
                      aria-label={`Seleccionar envío ${shipment.id}`}
                    />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={shipment.status} />
                  </TableCell>
                  <TableCell className="font-medium">{generateShipmentCode(shipment.id)}</TableCell>
                  <TableCell>{shipment.weight}</TableCell>
                  <TableCell>{originData.city}</TableCell>
                  <TableCell>{destinationData.city}</TableCell>
                  <TableCell>{destinationData.address}</TableCell>
                  <TableCell>
                    <PriorityBadge priority={shipment.priority} />
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ShipmentsTable
