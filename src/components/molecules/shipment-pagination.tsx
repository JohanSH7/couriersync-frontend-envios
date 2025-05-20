"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ShipmentPaginationProps } from "@/types/shipment"

const ShipmentPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  selectedCount,
  totalCount,
}: ShipmentPaginationProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-foreground">
        {selectedCount} de {totalCount} envío(s) seleccionados.
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="border-input text-foreground hover:bg-accent hover:text-accent-foreground app-transition"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Anterior</span>
        </Button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          // Si hay más de 5 páginas, mostrar las primeras 2, la actual y las últimas 2
          let pageToShow = i + 1
          if (totalPages > 5) {
            if (currentPage <= 3) {
              // Estamos en las primeras páginas
              pageToShow = i + 1
            } else if (currentPage >= totalPages - 2) {
              // Estamos en las últimas páginas
              pageToShow = totalPages - 4 + i
            } else {
              // Estamos en el medio
              pageToShow = currentPage - 2 + i
            }
          }

          return (
            <Button
              key={pageToShow}
              variant={currentPage === pageToShow ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageToShow)}
              className={
                currentPage === pageToShow
                  ? "bg-primary text-primary-foreground"
                  : "border-input text-foreground hover:bg-accent hover:text-accent-foreground"
              }
            >
              {pageToShow}
            </Button>
          )
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="border-input text-foreground hover:bg-accent hover:text-accent-foreground app-transition"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Siguiente</span>
        </Button>
      </div>
    </div>
  )
}

export default ShipmentPagination
