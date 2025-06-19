import { apiClient } from "@/services/api-client";

export const addressService = {
  async getAddresses() {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_ADDRESSES_ENDPOINT}`;
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error obteniendo lista de direcciones:", error);
      throw error;
    }
  },
};