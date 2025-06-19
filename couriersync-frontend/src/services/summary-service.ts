// filepath: c:\Users\jhoan\Documents\Ing. Sistemas Materias\Semestre 9\Fabrica escuela\couriersync-frontend\src\services\summary-service.ts
import { apiClient } from "./api-client";

export const summaryService = {
  async getSummary(): Promise<any> {
    try {
      const response = await apiClient.get(process.env.NEXT_PUBLIC_ADMIN_SUMMARY_ENDPOINT || "/api/admin/summary");
      return response.data;
    } catch (error) {
      console.error("Error fetching summary data:", error);
      throw new Error("Failed to fetch summary data");
    }
  },
};