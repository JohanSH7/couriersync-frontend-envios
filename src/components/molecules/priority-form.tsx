import React, { useEffect, useState } from "react";
import SelectField from "@/components/atoms/select-field";
import FormField from "@/components/atoms/form-field";
import { clientService } from "@/services/client-service";
import type { ShipmentFormData } from "../organisms/shipment-form";

interface PriorityFormProps {
  formData: ShipmentFormData;
  setFormData: (data: ShipmentFormData | ((prev: ShipmentFormData) => ShipmentFormData)) => void;
  errors: { client?: string };
}

interface Client {
  id: string | number;
  name: string;
}

const PriorityForm = ({ formData, setFormData }: PriorityFormProps) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await clientService.getClients();
        if (Array.isArray(data)) {
          setClients(data);
        } else {
          console.error("Los datos de clientes no son un array:", data);
        }
      } catch (error) {
        console.error("Error obteniendo clientes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const clientOptions = [
    ...clients.map((client) => ({
      value: String(client.id),
      label: client.name,
    })),
    { value: "new-client", label: "Crear nuevo cliente" },
  ];

  return (
    <div>
      <SelectField
        id="client"
        value={formData.client || ""}
        options={clientOptions}
        onChange={(value) => setFormData((prev) => ({ ...prev, client: value }))}
        label="Cliente"
        disabled={loading}
      />

      {loading && (
        <div className="text-sm text-muted-foreground mt-1">Cargando clientes...</div>
      )}

      {!loading && clients.length === 0 && (
        <div className="text-sm text-destructive mt-1">No se pudieron cargar los clientes</div>
      )}

      {formData.client === "new-client" && (
        <div className="mt-4 space-y-4">
          <FormField
            id="newClient.name"
            name="newClient.name"
            type="text"
            value={formData.newClient?.name || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                newClient: { ...prev.newClient, name: e.target.value },
              }))
            }
            hasError={false}
            label="Nombre del cliente"
          />
          <FormField
            id="newClient.email"
            name="newClient.email"
            type="email"
            value={formData.newClient?.email || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                newClient: { ...prev.newClient, email: e.target.value },
              }))
            }
            hasError={false}
            label="Correo electrónico"
          />
          <FormField
            id="newClient.phone"
            name="newClient.phone"
            type="tel"
            value={formData.newClient?.phone || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                newClient: { ...prev.newClient, phone: e.target.value },
              }))
            }
            hasError={false}
            label="Teléfono"
          />
        </div>
      )}
    </div>
  );
};

export default PriorityForm;
