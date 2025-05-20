"use client"

import type { FC } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Option {
  value: string
  label: string
}

interface SelectFieldProps {
  id: string
  label: string
  value: string
  options: Option[]
  onChange: (value: string) => void
  hasError?: boolean
  errorMessage?: string
  placeholder?: string
}

const SelectField: FC<SelectFieldProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  hasError = false,
  errorMessage,
  placeholder = "Seleccionar...",
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={hasError ? "text-red-500 font-medium" : ""}>
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className={hasError ? "border-red-500" : ""}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hasError && errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  )
}

export default SelectField
