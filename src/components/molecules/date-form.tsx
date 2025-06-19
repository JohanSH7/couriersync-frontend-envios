import FormField from "@/components/molecules/form-field";

interface DateFormData {
  shippingDate: string;
  deliveryDate: string;
}

interface DateFormProps {
  formData: DateFormData;
  setFormData: (data: DateFormData) => void;
  errors: { shippingDate?: string; deliveryDate?: string };
}

const DateForm = ({ formData, setFormData, errors }: DateFormProps) => {
  const today = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD

  return (
    <div className="space-y-6"> {/* Espaciado uniforme entre los campos */}
      <div className="form-group">
        <FormField
          id="shippingDate"
          name="shippingDate"
          label="Fecha de envío"
          type="date"
          value={formData.shippingDate}
          onChange={(e) =>
            setFormData({
              ...formData,
              shippingDate: e.target.value,
            })
          }
          min={today} // Restringir fechas anteriores a la actual
          hasError={!!errors.shippingDate}
          errorMessage={errors.shippingDate}
          placeholder="dd/mm/aaaa" // Placeholder transparente
          className="app-placeholder-transparent"
        />
      </div>
      <div className="form-group">
        <FormField
          id="deliveryDate"
          name="deliveryDate"
          label="Fecha de entrega"
          type="date"
          value={formData.deliveryDate}
          onChange={(e) =>
            setFormData({
              ...formData,
              deliveryDate: e.target.value,
            })
          }
          min={formData.shippingDate || today} // Restringir fechas anteriores a la fecha de envío
          hasError={!!errors.deliveryDate}
          errorMessage={errors.deliveryDate}
          placeholder="dd/mm/aaaa" // Placeholder transparente
          className="app-placeholder-transparent"
        />
      </div>
    </div>
  );
};

export default DateForm;