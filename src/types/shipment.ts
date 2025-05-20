export interface Shipment {
  id: number
  origin: string
  destination: string
  client: string
  weight: number
  priority: string
  shippingDate: string
  deliveryDate: string
  registrationDate: string
  status: string
}

export interface ShipmentTableProps {
  shipments: Shipment[]
  isLoading: boolean
  onSelectShipments: (ids: number[]) => void
  selectedShipments: number[]
}

export interface ShipmentFilterProps {
  onFilterChange: (value: string) => void
}

export interface ShipmentPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  selectedCount: number
  totalCount: number
}

export interface StatusChangeModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (status: string) => Promise<void>
  shipmentIds: number[]
}
