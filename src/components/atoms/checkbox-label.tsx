import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CheckboxWithLabelProps {
  id: string
  label: string
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({ id, label }) => {
  return (
    <div className="flex items-center">
      <Checkbox id={id} />
      <Label htmlFor={id} className="ml-2 text-sm text-foreground">
        {label}
      </Label>
    </div>
  )
}

export default CheckboxWithLabel