"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import StatusBadge from "@/components/atoms/status-badge";
import PriorityBadge from "@/components/atoms/priority-badge";
import type { ShipmentTableProps } from "@/types/shipment";

const ShipmentsTable = ({ shipments, isLoading, onSelectShipments, selectedShipments }: ShipmentTableProps) => {
  const handleSelectShipment = (id: number) => {
    const newSelected = selectedShipments.includes(id)
      ? selectedShipments.filter((shipmentId) => shipmentId !== id)
      : [...selectedShipments, id];

    onSelectShipments(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedShipments.length === shipments.length) {
      onSelectShipments([]);
    } else {
      onSelectShipments(shipments.map((shipment) => shipment.id));
    }
  };

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
            <TableHead>Status</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Origen</TableHead>
            <TableHead>Destino</TableHead>
            <TableHead>Peso</TableHead>
            <TableHead>Prioridad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Cargando envíos...
              </TableCell>
            </TableRow>
          ) : shipments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No hay envíos disponibles
              </TableCell>
            </TableRow>
          ) : (
            shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedShipments.includes(shipment.id)}
                    onCheckedChange={() => handleSelectShipment(shipment.id)}
                  />
                </TableCell>
                <TableCell>
                  <StatusBadge status={shipment.status} />
                </TableCell>
                <TableCell>{shipment.client}</TableCell>
                <TableCell>{shipment.origin}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.weight} kg</TableCell>
                <TableCell>
                  <PriorityBadge priority={shipment.priority} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShipmentsTable;
