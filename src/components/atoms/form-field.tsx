import { Input } from "@/components/ui/input";

interface FormFieldProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  errorMessage?: string;
  label: string;
}

const FormField = ({ id, name, type, value, onChange, hasError, errorMessage, label }: FormFieldProps) => (
  <div className="form-group">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <Input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`app-input ${hasError ? "border-red-500" : ""}`}
    />
    {hasError && <p className="text-red-500 text-sm">{errorMessage}</p>}
  </div>
);

export default FormField;