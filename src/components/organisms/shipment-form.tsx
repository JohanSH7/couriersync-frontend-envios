"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { shipmentService } from "@/services/shipment-service"
import FormField from "@/components/molecules/form-field"

interface FormErrors {
  [key: string]: string
}

export default function ShipmentForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  const [formData, setFormData] = useState({
    // Datos del remitente
    originName: "",
    originPhone: "",
    originAddress: "",
    originCity: "",

    // Datos del destinatario
    destinationName: "",
    destinationPhone: "",
    destinationAddress: "",
    destinationCity: "",

    // Datos del envío
    value: "",
    shippingDate: "",
    weight: "",
    priority: "",
  })

  // Para mapear los datos del formulario al formato que espera la API
  const mapFormDataToApiRequest = () => {
    return {
      originAddressId: 1, // Valor fijo según el ejemplo
      destinationAddressId: 2, // Valor fijo según el ejemplo
      weight: Number.parseFloat(formData.weight),
      priorityId: formData.priority === "Alta" ? 3 : formData.priority === "Media" ? 2 : 1,
      clientId: 1, // Valor fijo según el ejemplo
      shippingDate: formData.shippingDate,
      deliveryDate: calculateDeliveryDate(formData.shippingDate), // Calcular fecha de entrega
    }
  }

  // Función para calcular la fecha de entrega (5 días después de la fecha de envío)
  const calculateDeliveryDate = (shippingDate: string): string => {
    const date = new Date(shippingDate)
    date.setDate(date.getDate() + 5) // Añadir 5 días
    return date.toISOString().split("T")[0] // Formato YYYY-MM-DD
  }

  const validateForm = () => {
    const errors: FormErrors = {}
    let isValid = true

    // Validar campos del remitente
    if (!formData.originName.trim()) {
      errors.originName = "El nombre del remitente es obligatorio"
      isValid = false
    }

    if (!formData.originPhone.trim()) {
      errors.originPhone = "El teléfono del remitente es obligatorio"
      isValid = false
    } else if (!/^\d{10}$/.test(formData.originPhone)) {
      errors.originPhone = "El teléfono debe tener 10 dígitos"
      isValid = false
    }

    if (!formData.originAddress.trim()) {
      errors.originAddress = "La dirección del remitente es obligatoria"
      isValid = false
    }

    if (!formData.originCity.trim()) {
      errors.originCity = "La ciudad del remitente es obligatoria"
      isValid = false
    }

    // Validar campos del destinatario
    if (!formData.destinationName.trim()) {
      errors.destinationName = "El nombre del destinatario es obligatorio"
      isValid = false
    }

    if (!formData.destinationPhone.trim()) {
      errors.destinationPhone = "El teléfono del destinatario es obligatorio"
      isValid = false
    } else if (!/^\d{10}$/.test(formData.destinationPhone)) {
      errors.destinationPhone = "El teléfono debe tener 10 dígitos"
      isValid = false
    }

    if (!formData.destinationAddress.trim()) {
      errors.destinationAddress = "La dirección del destinatario es obligatoria"
      isValid = false
    }

    if (!formData.destinationCity.trim()) {
      errors.destinationCity = "La ciudad del destinatario es obligatoria"
      isValid = false
    }

    // Validar datos del envío
    if (!formData.value.trim()) {
      errors.value = "El valor del envío es obligatorio"
      isValid = false
    } else if (isNaN(Number.parseFloat(formData.value)) || Number.parseFloat(formData.value) <= 0) {
      errors.value = "El valor debe ser un número mayor que cero"
      isValid = false
    }

    if (!formData.shippingDate.trim()) {
      errors.shippingDate = "La fecha de envío es obligatoria"
      isValid = false
    }

    if (!formData.weight.trim()) {
      errors.weight = "El peso del paquete es obligatorio"
      isValid = false
    } else if (isNaN(Number.parseFloat(formData.weight)) || Number.parseFloat(formData.weight) <= 0) {
      errors.weight = "El peso debe ser un número mayor que cero"
      isValid = false
    }

    if (!formData.priority) {
      errors.priority = "La prioridad es obligatoria"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const apiData = mapFormDataToApiRequest()
      await shipmentService.createShipment(apiData)
      setShowSuccessModal(true)
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null) {
        // @ts-expect-error: runtime error object may have response/request/message
        if (err.response) {
          // @ts-expect-error: runtime error object may have response.data.message
          setError(err.response.data?.message || "Error al crear el envío")
        // @ts-expect-error: runtime error object may have request
        } else if (err.request) {
          setError("No se pudo conectar con el servidor. Verifica tu conexión a internet")
        } else if ("message" in err) {
          setError(`Error inesperado: ${err.message || "Desconocido"}`)
        } else {
          setError("Error inesperado")
        }
        console.error("Error creating shipment:", err)
      } else {
        setError("Error inesperado")
        console.error("Error creating shipment:", err)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    router.push("/shipments")
  }

  return (
    <div className="bg-card rounded-lg p-6 mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold mb-6 text-card-foreground">Nuevo Envío</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="space-y-6">
            <Card className="form-card">
              <CardContent className="pt-6">
                <h2 className="form-section-title">DATOS REMITENTE</h2>
                <div className="form-group">
                  <FormField
                    id="originName"
                    name="originName"
                    label="Nombre remitente"
                    value={formData.originName}
                    onChange={handleInputChange}
                    hasError={!!formErrors.originName}
                    errorMessage={formErrors.originName}
                  />

                  <FormField
                    id="originPhone"
                    name="originPhone"
                    label="Teléfono remitente"
                    value={formData.originPhone}
                    onChange={handleInputChange}
                    hasError={!!formErrors.originPhone}
                    errorMessage={formErrors.originPhone}
                  />

                  <FormField
                    id="originAddress"
                    name="originAddress"
                    label="Dirección remitente"
                    value={formData.originAddress}
                    onChange={handleInputChange}
                    hasError={!!formErrors.originAddress}
                    errorMessage={formErrors.originAddress}
                  />

                  <FormField
                    id="originCity"
                    name="originCity"
                    label="Ciudad remitente"
                    value={formData.originCity}
                    onChange={handleInputChange}
                    hasError={!!formErrors.originCity}
                    errorMessage={formErrors.originCity}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="form-card">
              <CardContent className="pt-6">
                <h2 className="form-section-title">DATOS DESTINATARIO</h2>
                <div className="form-group">
                  <FormField
                    id="destinationName"
                    name="destinationName"
                    label="Nombre destinatario"
                    value={formData.destinationName}
                    onChange={handleInputChange}
                    hasError={!!formErrors.destinationName}
                    errorMessage={formErrors.destinationName}
                  />

                  <FormField
                    id="destinationPhone"
                    name="destinationPhone"
                    label="Teléfono destinatario"
                    value={formData.destinationPhone}
                    onChange={handleInputChange}
                    hasError={!!formErrors.destinationPhone}
                    errorMessage={formErrors.destinationPhone}
                  />

                  <FormField
                    id="destinationAddress"
                    name="destinationAddress"
                    label="Dirección destinatario"
                    value={formData.destinationAddress}
                    onChange={handleInputChange}
                    hasError={!!formErrors.destinationAddress}
                    errorMessage={formErrors.destinationAddress}
                  />

                  <FormField
                    id="destinationCity"
                    name="destinationCity"
                    label="Ciudad destinatario"
                    value={formData.destinationCity}
                    onChange={handleInputChange}
                    hasError={!!formErrors.destinationCity}
                    errorMessage={formErrors.destinationCity}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna derecha */}
          <div>
            <Card className="form-card">
              <CardContent className="pt-6">
                <h2 className="form-section-title">DATOS ENVÍO</h2>
                <div className="form-group">
                  <FormField
                    id="value"
                    name="value"
                    label="Valor"
                    value={formData.value}
                    onChange={handleInputChange}
                    hasError={!!formErrors.value}
                    errorMessage={formErrors.value}
                  />

                  <FormField
                    id="shippingDate"
                    name="shippingDate"
                    label="Fecha"
                    type="date"
                    value={formData.shippingDate}
                    onChange={handleInputChange}
                    hasError={!!formErrors.shippingDate}
                    errorMessage={formErrors.shippingDate}
                  />

                  <FormField
                    id="weight"
                    name="weight"
                    label="Peso paquete kg"
                    value={formData.weight}
                    onChange={handleInputChange}
                    hasError={!!formErrors.weight}
                    errorMessage={formErrors.weight}
                  />

                  <div className="space-y-2">
                    <Label
                      htmlFor="priority"
                      className={formErrors.priority ? "text-destructive font-medium" : "form-label"}
                    >
                      Prioridad
                    </Label>
                    <Select value={formData.priority} onValueChange={(value) => handleSelectChange(value, "priority")}>
                      <SelectTrigger
                        id="priority"
                        className={formErrors.priority ? "border-destructive" : "form-input"}
                      >
                        <SelectValue placeholder="Selecciona prioridad..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Baja">Baja</SelectItem>
                        <SelectItem value="Media">Media</SelectItem>
                        <SelectItem value="Alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors.priority && <p className="form-error">{formErrors.priority}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="form-actions">
          <Button type="button" variant="outline" onClick={() => router.push("/shipments")} className="w-40">
            CANCELAR
          </Button>
          <Button type="submit" className="w-40 app-button-primary" disabled={isSubmitting}>
            {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
          </Button>
        </div>
      </form>

      {/* Modal de éxito */}
      <Dialog open={showSuccessModal} onOpenChange={handleSuccessModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <CheckCircle className="h-6 w-6" />
              Envío creado con éxito
            </DialogTitle>
            <DialogDescription>El envío ha sido registrado correctamente en el sistema.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
