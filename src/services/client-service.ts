import { apiClient } from "@/services/api-client";

export const clientService = {
  async getClients() {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_CLIENTS_ENDPOINT}`;
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error obteniendo lista de clientes:", error);
      throw error;
    }
  },
};