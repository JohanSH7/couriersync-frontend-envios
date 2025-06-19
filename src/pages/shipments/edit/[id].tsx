"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { shipmentService } from "@/services/shipment-service";

export default function EditShipment() {

  const router = useRouter();
  const { id } = router.query; // Obtener el ID del envío desde la URL
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if (!id) {
      console.error("ID no definido, redirigiendo...");
      router.push("/shipments");
      return;
    }

    const fetchShipment = async () => {
      try {
        const data = await shipmentService.getShipmentById(Number(id));
        setShipment(data);
      } catch (err) {
        console.error("Error al cargar el envío:", err);
        setError("No se pudo cargar la información del envío.");
      }
    };

    fetchShipment();
  }, [id]);

  if (error) {
    return (
      <div>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {shipment ? (
        <div>
          <h1>Editar Envío</h1>
          <p>{JSON.stringify(shipment)}</p>
        </div>
      ) : (
        <p>Cargando datos del envío...</p>
      )}
    </div>
  );
}