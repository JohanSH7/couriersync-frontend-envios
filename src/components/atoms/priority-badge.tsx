import { cn } from "@/lib/utils"

interface PriorityBadgeProps {
  priority: string
  className?: string
}

const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const getPriorityClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "alta":
        return "bg-red-500 text-white px-3 py-1 rounded-full font-medium text-center inline-block min-w-[80px]"
      case "media":
        return "bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-medium text-center inline-block min-w-[80px]"
      case "baja":
        return "bg-green-500 text-white px-3 py-1 rounded-full font-medium text-center inline-block min-w-[80px]"
      default:
        return "bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium text-center inline-block min-w-[80px]"
    }
  }

  const formatPriority = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()
  }

  return <span className={cn(getPriorityClass(priority), className)}>{formatPriority(priority)}</span>
}

export default PriorityBadge
