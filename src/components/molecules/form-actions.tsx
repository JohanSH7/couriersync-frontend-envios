"use client"

import type { FC } from "react"
import { Button } from "@/components/ui/button"

interface FormActionsProps {
  onCancel: () => void
  isSubmitting: boolean
  cancelText?: string
  submitText?: string
}

const FormActions: FC<FormActionsProps> = ({
  onCancel,
  isSubmitting,
  cancelText = "CANCELAR",
  submitText = "ENVIAR",
}) => {
  return (
    <div className="flex justify-center gap-4 pt-4">
      <Button type="button" variant="outline" onClick={onCancel} className="w-40">
        {cancelText}
      </Button>
      <Button type="submit" className="w-40 bg-black hover:bg-gray-800" disabled={isSubmitting}>
        {isSubmitting ? "ENVIANDO..." : submitText}
      </Button>
    </div>
  )
}

export default FormActions
