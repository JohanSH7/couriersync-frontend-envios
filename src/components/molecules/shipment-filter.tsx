"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { ShipmentFilterProps } from "@/types/shipment"
import { useState } from "react"

const ShipmentFilter = ({ onFilterChange }: ShipmentFilterProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`relative app-transition ${isFocused ? "ring-2 ring-primary/20" : ""}`}>
      <Search
        className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 app-transition ${isFocused ? "text-primary" : "text-muted-foreground"}`}
      />
      <Input
        placeholder="Filtrar por ciudad"
        className="pl-10 bg-background border-input focus:border-primary focus:ring-0 app-transition"
        onChange={(e) => onFilterChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  )
}

export default ShipmentFilter
