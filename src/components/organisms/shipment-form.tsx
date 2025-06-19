"use client";

import { useShipmentForm } from "@/hooks/useShipmentForm";
import AddressForm from "@/components/molecules/address-form";
import PriorityForm from "@/components/molecules/priority-form";
import DateForm from "@/components/molecules/date-form";
import FormField from "@/components/atoms/form-field";
import SelectField from "@/components/atoms/select-field";
import ReusableCard from "@/components/atoms/reusable-card";
import { Button } from "@/components/ui/button";
import { shipmentService } from "@/services/shipment-service";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export type ShipmentFormData = {
  priority: string;
  weight: string;
  shippingDate: string;
  deliveryDate: string;
  origin: string;
  destination: string;
  client: string;
  newOriginAddress: { city: string; address: string };
  newDestinationAddress: { city: string; address: string };
  newClient: { name: string; email: string; phone: string };
};

const ShipmentForm = ({ initialData }: { initialData?: ShipmentFormData }) => {
  const { formData, setFormData, errors, validateForm } = useShipmentForm(initialData ?? {});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, corrige los errores en el formulario.");
      return;
    }

    const payload = {
      originAddressInfo:
        formData.origin === "new"
          ? { newAddress: formData.newOriginAddress }
          : { id: parseInt(formData.origin) },
      destinationAddressInfo:
        formData.destination === "new"
          ? { newAddress: formData.newDestinationAddress }
          : { id: parseInt(formData.destination) },
      weight: parseFloat(formData.weight),
      priorityName: formData.priority,
      clientInfo:
        formData.client === "new-client"
          ? { newClient: formData.newClient }
          : { id: parseInt(formData.client) },
      shippingDate: formData.shippingDate,
      deliveryDate: formData.deliveryDate,
    };

    try {
      await shipmentService.createShipment(payload);
      toast.success("Envío creado exitosamente.");
      router.push("/shipments");
    } catch (error) {
      console.error("Error al crear envío:", error);
      toast.error("Error al crear el envío.");
    }
  };

  const handleClearFields = () => {
    setFormData({
      priority: "",
      weight: "",
      shippingDate: "",
      deliveryDate: "",
      origin: "",
      destination: "",
      client: "",
      newOriginAddress: { city: "", address: "" },
      newDestinationAddress: { city: "", address: "" },
      newClient: { name: "", email: "", phone: "" },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ORIGEN */}
        <ReusableCard title="Remitente">
          <AddressForm
            formData={{
              origin: formData.origin,
              destination: formData.destination,
              newOriginAddress: formData.newOriginAddress,
              newDestinationAddress: formData.newDestinationAddress,
            }}
            setFormData={(updatedData) => {
              if (typeof updatedData === "function") {
                setFormData((prev) => {
                  const updated = updatedData(prev);
                  return {
                    ...prev,
                    origin: updated.origin,
                    newOriginAddress: updated.newOriginAddress,
                  };
                });
              } else {
                setFormData((prev) => ({
                  ...prev,
                  origin: updatedData.origin,
                  newOriginAddress: updatedData.newOriginAddress,
                }));
              }
            }}
            errors={{
              origin: errors.origin ? "Este campo es obligatorio." : "",
              originCity: errors.originCity ? "La ciudad es obligatoria." : "",
              originAddress: errors.originAddress ? "La dirección es obligatoria." : "",
            }}
            type="origin"
          />
        </ReusableCard>

        {/* DESTINO + CLIENTE */}
        <ReusableCard title="Destinatario">
          <AddressForm
            formData={{
              origin: formData.origin,
              destination: formData.destination,
              newOriginAddress: formData.newOriginAddress,
              newDestinationAddress: formData.newDestinationAddress,
            }}
            setFormData={(updatedData) => {
              if (typeof updatedData === "function") {
                setFormData((prev) => {
                  const updated = updatedData(prev);
                  return {
                    ...prev,
                    destination: updated.destination,
                    newDestinationAddress: updated.newDestinationAddress,
                  };
                });
              } else {
                setFormData((prev) => ({
                  ...prev,
                  destination: updatedData.destination,
                  newDestinationAddress: updatedData.newDestinationAddress,
                }));
              }
            }}
            errors={{
              destination: errors.destination ? "Este campo es obligatorio." : "",
              destinationCity: errors.destinationCity ? "La ciudad es obligatoria." : "",
              destinationAddress: errors.destinationAddress ? "La dirección es obligatoria." : "",
            }}
            type="destination"
          />

          <div className="mt-6">
            <PriorityForm
              formData={formData}
              setFormData={setFormData}
              errors={{ client: errors.client ? "Este campo es obligatorio." : undefined }}
            />
          </div>
        </ReusableCard>

        {/* DETALLES DE ENVÍO */}
        <ReusableCard title="Datos de Envío">
          <div className="space-y-6">
            <SelectField
              id="priority"
              value={formData.priority || ""}
              options={[
                { value: "ALTA", label: "Alta" },
                { value: "MEDIA", label: "Media" },
                { value: "BAJA", label: "Baja" },
              ]}
              onChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
              label="Prioridad"
            />

            <FormField
              id="weight"
              name="weight"
              type="number"
              value={formData.weight || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
              hasError={errors.weight}
              errorMessage="El peso es obligatorio y debe ser mayor a 0."
              label="Peso (kg)"
            />

            <DateForm
              formData={{
                shippingDate: formData.shippingDate,
                deliveryDate: formData.deliveryDate,
              }}
              setFormData={(dateData) =>
                setFormData((prev) => ({
                  ...prev,
                  shippingDate: dateData.shippingDate,
                  deliveryDate: dateData.deliveryDate,
                }))
              }
              errors={{
                shippingDate: errors.shippingDate ? "Este campo es obligatorio." : undefined,
                deliveryDate: errors.deliveryDate ? "Este campo es obligatorio." : undefined,
              }}
            />
          </div>
        </ReusableCard>
      </div>

      <div className="flex flex-col space-y-4">
        <Button type="submit" className="w-full app-button-primary">
          Enviar
        </Button>
        <Button type="button" onClick={handleClearFields} className="w-full app-button-primary">
          Limpiar Campos
        </Button>
      </div>
    </form>
  );
};

export default ShipmentForm;
