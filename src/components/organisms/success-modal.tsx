import type { FC } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
}

const SuccessModal: FC<SuccessModalProps> = ({ isOpen, onClose, title, description }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessModal
