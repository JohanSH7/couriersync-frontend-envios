"use client";

import { useEffect, useState } from "react";
import { shipmentService } from "@/services/shipment-service";
import DashboardLayout from "@/components/templates/dashboard-layout";
import ShipmentsListTemplate from "@/components/templates/shipments-list-template";
import StatusChangeModal from "@/components/molecules/status-change-modal";
import { Shipment } from "@/types/shipment";

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipments, setSelectedShipments] = useState<number[]>([]);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchShipments = async () => {
      setIsLoading(true);
      try {
        const data = await shipmentService.getShipments();
        setShipments(data as Shipment[]);
      } catch (err: unknown) {
        console.error("Error al cargar los envíos:", err);
        setError("No se pudo cargar la lista de envíos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchShipments();
  }, []);

  const refreshShipments = async () => {
    setIsLoading(true);
    try {
      const data = await shipmentService.getShipments();
      setShipments(data as Shipment[]);
    } catch (err: unknown) {
      console.error("Error al refrescar los envíos:", err);
    } finally {
      setIsLoading(false);
    }
  };


  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
        <ShipmentsListTemplate
          shipments={shipments}
          onSelectShipments={setSelectedShipments}
          selectedShipments={selectedShipments}
          isLoading={isLoading}
          onRefresh={refreshShipments}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ShipmentsListTemplate
        shipments={shipments}
        onSelectShipments={setSelectedShipments}
        selectedShipments={selectedShipments}
        isLoading={isLoading}
        onRefresh={refreshShipments}
      />
      <StatusChangeModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        shipmentIds={selectedShipments}
        onConfirm={refreshShipments}
      />
    </DashboardLayout>
  );
}
