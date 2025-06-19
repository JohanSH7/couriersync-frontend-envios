import React from "react";

interface SelectFieldProps {
  id: string;
  label?: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SelectField = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = "Seleccionar...",
  disabled = false,
}: SelectFieldProps) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="select-trigger w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-primary/20"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
