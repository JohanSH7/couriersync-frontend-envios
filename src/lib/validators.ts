export const validateDates = (shippingDate: string, deliveryDate: string): string | null => {
  const shipping = new Date(shippingDate);
  const delivery = new Date(deliveryDate);

  if (shipping < new Date()) {
    return "La fecha de envío no puede estar en el pasado.";
  }

  if (delivery <= shipping) {
    return "La fecha de entrega debe ser posterior a la fecha de envío.";
  }

  return null;
};

export const validateWeight = (weight: number): string | null => {
  if (weight <= 0) {
    return "El peso debe ser mayor a 0.";
  }
  return null;
};