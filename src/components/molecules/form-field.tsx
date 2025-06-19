"use client"

import type React from "react"

import type { FC, ReactNode } from "react"
import { useState } from "react"
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
  name: string
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
  name,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1"> {/* Ajustar espacio entre elementos */}
      <div className="flex items-center justify-between">
        <Label
          htmlFor={id}
          className={`app-label ${isFocused ? "app-label-focus" : ""} ${hasError ? "text-destructive" : ""}`}
        >
          {label}
        </Label>
        {rightElement}
      </div>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className={`
          ${hasError ? "border-destructive" : isFocused ? "border-primary ring-2 ring-primary/20" : ""}
        `}
      />
      {hasError && errorMessage && <p className="text-destructive text-xs">{errorMessage}</p>}
    </div>
  );
}

export default FormField
