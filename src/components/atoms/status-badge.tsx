import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  className?: string
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "pendiente":
        return "bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-medium text-center inline-block min-w-[100px]"
      case "en tránsito":
      case "en transito":
      case "in transit":
      case "En transito":
      case "transito":
        return "bg-primary text-primary-foreground px-3 py-1 rounded-full font-medium text-center inline-block min-w-[100px]"
      case "entregado":
        return "bg-green-500 text-white px-3 py-1 rounded-full font-medium text-center inline-block min-w-[100px]"
      default:
        return "bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium text-center inline-block min-w-[100px]"
    }
  }

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  }

  return <span className={cn(getStatusClass(status), className)}>{formatStatus(status)}</span>
}

export default StatusBadge
