import { useState } from "react";

interface ShipmentFormData {
  origin?: string;
  destination?: string;
  priority?: string;
  weight?: number | string;
  shippingDate?: string;
  deliveryDate?: string;
  client?: string; // Added to fix the error
}

export const useShipmentForm = (initialData: ShipmentFormData) => {
  const [formData, setFormData] = useState({
    origin: initialData?.origin || "",
    destination: initialData?.destination || "",
    priority: initialData?.priority || "",
    weight: initialData?.weight?.toString() || "",
    shippingDate: initialData?.shippingDate || "",
    deliveryDate: initialData?.deliveryDate || "",
    newOriginAddress: { city: "", address: "" },
    newDestinationAddress: { city: "", address: "" },
    client: initialData?.client || "",
    newClient: { name: "", email: "", phone: "" },
  });

  const [errors, setErrors] = useState({
    origin: false,
    destination: false,
    priority: false,
    weight: false,
    shippingDate: false,
    deliveryDate: false,
  });

  const validateForm = () => {
    const newErrors = {
      origin: !formData.origin,
      destination: !formData.destination,
      priority: !formData.priority,
      weight: !formData.weight || parseFloat(formData.weight) <= 0,
      shippingDate: !formData.shippingDate || new Date(formData.shippingDate) < new Date(),
      deliveryDate: !formData.deliveryDate || new Date(formData.deliveryDate) <= new Date(formData.shippingDate),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  return { formData, setFormData, errors, validateForm };
};