import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(addressStr: string): { city: string; address: string } {
  if (typeof addressStr === "string") {
    const cityMatch = addressStr.match(/city=([^,)]+)/)
    const addressMatch = addressStr.match(/address=([^)]+)\)/)

    return {
      city: cityMatch ? cityMatch[1] : "Desconocida",
      address: addressMatch ? addressMatch[1] : "Desconocida",
    }
  }

  return {
    city: "Desconocida",
    address: "Desconocida",
  }
}
