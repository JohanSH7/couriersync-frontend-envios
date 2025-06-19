export interface Shipment {
  id: number;
  status: string;
  destination: string;
  weight: number;
  priority: string;
  origin?: string;
  client?: string;
  shippingDate?: string;
  deliveryDate?: string;
  newOriginAddress?: {
    city: string;
    address: string;
  };
  newDestinationAddress?: {
    city: string;
    address: string;
  };
  newClient?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface ShipmentData {
  id: number;
  origin: string;
  destination: string;
  // Add the status property
  status?: "pending" | "in_transit" | "delivered" | "cancelled";
  // ...other properties
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
