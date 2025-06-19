import React, { useEffect, useState } from "react";
import SelectField from "@/components/atoms/select-field";
import FormField from "@/components/atoms/form-field";
import { addressService } from "@/services/address-service";

interface AddressFormData {
  origin: string;
  destination: string;
  newOriginAddress: { city: string; address: string };
  newDestinationAddress: { city: string; address: string };
}

interface AddressFormProps {
  formData: AddressFormData;
  setFormData: (data: AddressFormData | ((prev: AddressFormData) => AddressFormData)) => void;
  errors: Record<string, string>;
  type: "origin" | "destination";
}

const AddressForm = ({ formData, setFormData, errors, type }: AddressFormProps) => {
  const [addresses, setAddresses] = useState<{ id: number; address: string; city: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await addressService.getAddresses();
        if (Array.isArray(data)) {
          setAddresses(data);
        } else {
          console.error("Los datos de direcciones no son un array:", data);
        }
      } catch (error) {
        console.error("Error obteniendo direcciones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const getNewAddressKey = (type: "origin" | "destination") =>
    type === "origin" ? "newOriginAddress" : "newDestinationAddress";

  const selectOptions = [
    ...addresses.map((addr) => ({
      value: String(addr.id),
      label: `${addr.address}, ${addr.city}`,
    })),
    { value: "new", label: "Crear nueva dirección" },
  ];

  return (
    <div className="form-group">
      <SelectField
        id={type}
        value={formData[type] || ""}
        options={selectOptions}
        onChange={(value) =>
          setFormData((prev) => ({
            ...prev,
            [type]: value,
          }))
        }
        label={`Dirección ${type === "origin" ? "remitente" : "destinatario"}`}
        disabled={loading}
      />

      {loading && (
        <div className="text-sm text-muted-foreground mt-1">
          Cargando direcciones...
        </div>
      )}

      {!loading && addresses.length === 0 && (
        <div className="text-sm text-destructive mt-1">
          No se pudieron cargar las direcciones
        </div>
      )}

      {formData[type] === "new" && (
        <div className="mt-4 space-y-4">
          <FormField
            id={`new${type}Address.city`}
            name={`new${type}Address.city`}
            type="text"
            value={formData[getNewAddressKey(type)]?.city || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [getNewAddressKey(type)]: {
                  ...prev[getNewAddressKey(type)],
                  city: e.target.value,
                },
              }))
            }
            hasError={Boolean(errors[`${type}City`])}
            errorMessage="La ciudad es obligatoria."
            label="Ciudad"
          />
          <FormField
            id={`new${type}Address.address`}
            name={`new${type}Address.address`}
            type="text"
            value={formData[getNewAddressKey(type)]?.address || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [getNewAddressKey(type)]: {
                  ...prev[getNewAddressKey(type)],
                  address: e.target.value,
                },
              }))
            }
            hasError={Boolean(errors[`${type}Address`])}
            errorMessage="La dirección es obligatoria."
            label="Dirección"
          />
        </div>
      )}
    </div>
  );
};

export default AddressForm;
