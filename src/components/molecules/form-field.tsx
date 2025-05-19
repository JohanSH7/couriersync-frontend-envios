"use client"

import type React from "react"

import type { FC, ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  hasError?: boolean
  errorMessage?: string
  rightElement?: ReactNode
}

const FormField: FC<FormFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  hasError = false,
  errorMessage,
  rightElement,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className={hasError ? "text-red-500 font-medium" : ""}>
          {label}
        </Label>
        {rightElement}
      </div>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={hasError ? "border-red-500" : ""}
        aria-invalid={hasError ? "true" : "false"}
      />
      {hasError && errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  )
}

export default FormField
