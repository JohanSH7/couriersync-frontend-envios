"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth-context";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ShipmentForm from "@/components/organisms/shipment-form";
import DashboardLayout from "@/components/templates/dashboard-layout";

export default function CreateShipment() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    if (user?.role !== "operador" && user?.role !== "conductor") {
      setError("No tienes permisos para acceder a esta página");
    }
  }, [isAuthenticated, router, user]);

  if (!isAuthenticated) {
    return null;
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg p-6 mx-auto max-w-6xl">
        <ShipmentForm />
      </div>
    </DashboardLayout>
  );
}
