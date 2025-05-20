import { apiClient } from "./api-client"
import type { Shipment } from "@/types/shipment"

interface ShipmentData {
  originAddressId: number
  destinationAddressId: number
  weight: number
  priorityId: number
  clientId: number
  shippingDate: string
  deliveryDate: string
}

export const shipmentService = {
  async createShipment(data: ShipmentData) {
    try {
      const endpoint = process.env.NEXT_PUBLIC_CREATE_SHIPMENT_ENDPOINT || "/api/shipments/create"
      const response = await apiClient.post(endpoint, data)
      return response.data as Shipment[]
    } catch (error: unknown) {
      console.error("Error creating shipment:", error)
      throw error
    }
  },

  async getShipments(): Promise<Shipment[]> {
    try {
      const response = await apiClient.get(process.env.NEXT_PUBLIC_SHIPMENTS_ENDPOINT || "/api/shipments/list")
      return response.data as Shipment[]
    } catch (error) {
      console.error("Error fetching shipments:", error)
      throw error
    }
  },

  async updateShipmentStatus(id: number, status: string): Promise<void> {
    try {
      let endpoint = ""

      switch (status.toLowerCase()) {
        case "en tránsito":
        case "en transito":
        case "transito":
          endpoint = `/api/shipments/status/transit/${id}`
          break
        case "entregado":
        case "delivered":
          endpoint = `/api/shipments/status/delivered/${id}`
          break
        case "en bodega":
        case "bodega":
          endpoint = `/api/shipments/status/warehouse/${id}`
          break
        default:
          throw new Error(`Estado no soportado: ${status}`)
      }

      await apiClient.put(endpoint)
    } catch (error) {
      console.error(`Error updating shipment status for id ${id}:`, error)
      throw error
    }
  },
}
