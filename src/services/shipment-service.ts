import { apiClient } from "@/services/api-client";

interface AddressData {
  city: string;
  address: string;
}

interface ClientData {
  name: string;
  email: string;
  phone: string;
}

export interface ShipmentData {
  originAddressInfo: { id?: number; newAddress?: AddressData };
  destinationAddressInfo: { id?: number; newAddress?: AddressData };
  weight: number;
  priorityName: "ALTA" | "MEDIA" | "BAJA";
  clientInfo: { id?: number; newClient?: ClientData };
  shippingDate: string;
  deliveryDate: string;
}

export type ShipmentStatus = "pendiente" | "en transito" | "entregado";

export const shipmentService = {
  async getShipments() {
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shipments/list`;
    const response = await apiClient.get(endpoint);
    return response.data;
  },

  async getShipmentById(id: number) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shipments/listOne/${id}`;
    const response = await apiClient.get(endpoint);
    return response.data;
  },

  async createShipment(data: ShipmentData) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_CREATE_SHIPMENT_ENDPOINT}`;
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error("Token de autenticación no encontrado.");
    }

    const response = await apiClient.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  },

  async updateShipment(id: number, data: { status: ShipmentStatus }): Promise<void> {
    await apiClient.put(`/shipments/${id}`, data);
  },

  async updateStatusTransit(id: number) {
    const token = localStorage.getItem("auth_token");
    const response = await apiClient.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shipments/status/transit/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      }
    );
    return response.data;
  },

  async updateStatusDelivered(id: number) {
    const token = localStorage.getItem("auth_token");
    const response = await apiClient.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shipments/status/delivered/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
