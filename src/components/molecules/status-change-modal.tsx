"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { StatusChangeModalProps } from "@/types/shipment"

const StatusChangeModal = ({ isOpen, onClose, onConfirm, shipmentIds }: StatusChangeModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleConfirm = async () => {
    if (!selectedStatus) {
      setError("Por favor selecciona un estado")
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      await onConfirm(selectedStatus)
      onClose()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al cambiar el estado")
      } else {
        setError("Error al cambiar el estado")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Cambiar Estado</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status" className={`app-transition ${isFocused ? "app-label-focus" : "text-foreground"}`}>
              Nuevo Estado
            </Label>
            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
              onOpenChange={(open) => setIsFocused(open)}
            >
              <SelectTrigger
                id="status"
                className={`app-transition ${isFocused ? "border-primary ring-2 ring-primary/20" : "border-input"}`}
              >
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="en bodega">En Bodega</SelectItem>
                <SelectItem value="en tránsito">En Tránsito</SelectItem>
                <SelectItem value="entregado">Entregado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground">
            {shipmentIds.length === 1
              ? "Se cambiará el estado del envío seleccionado."
              : `Se cambiará el estado de ${shipmentIds.length} envíos seleccionados.`}
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="border-input hover:bg-accent hover:text-accent-foreground app-transition"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-primary-foreground app-transition app-hover-scale"
          >
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default StatusChangeModal
