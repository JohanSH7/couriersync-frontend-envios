import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SUMMARY_ENDPOINT = process.env.NEXT_PUBLIC_SUMMARY_ENDPOINT;

export const fetchSummaryData = async () => {
  try {
    const token = localStorage.getItem("auth_token"); // Recuperar el token desde localStorage
    if (!token) {
      throw new Error("No se encontró un token de autenticación.");
    }

    const response = await axios.get(`${API_BASE_URL}${SUMMARY_ENDPOINT}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching summary data:", error);
    throw error;
  }
};