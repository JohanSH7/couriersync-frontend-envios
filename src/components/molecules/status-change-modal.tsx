"use client";

import { ShipmentStatus } from "@/services/shipment-service";
import { shipmentService } from "@/services/shipment-service";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface StatusChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipmentIds: number[];
  onConfirm: (status: ShipmentStatus) => void | Promise<void>; // Callback para actualizar la lista de envíos
}

const StatusChangeModal: React.FC<StatusChangeModalProps> = ({ isOpen, onClose, shipmentIds, onConfirm }) => {
  const [selectedStatus, setSelectedStatus] = useState<ShipmentStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!selectedStatus) {
      alert("Por favor, selecciona un estado.");
      return;
    }

    setIsSubmitting(true);
    try {
      for (const id of shipmentIds) {
        if (selectedStatus === "en transito") {
          await shipmentService.updateStatusTransit(id);
        } else if (selectedStatus === "entregado") {
          await shipmentService.updateStatusDelivered(id);
        }
      }
      onConfirm(selectedStatus);
      onClose();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      alert("No se pudo cambiar el estado. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar Estado</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="mb-4">Selecciona el nuevo estado para los envíos seleccionados:</p>
          <div className="flex flex-col gap-2">
            {["EN_TRANSITO", "ENTREGADO"].map((status) => (
              <label key={status} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="shipmentStatus"
                  value={status}
                  checked={selectedStatus === status}
                  onChange={() => setSelectedStatus(status as ShipmentStatus)}
                />
                {status === "EN_TRANSITO" ? "En tránsito" : "Entregado"}
              </label>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedStatus || isSubmitting}>
            {isSubmitting ? "Guardando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusChangeModal;
