"use client";

import React, { useEffect, useState } from "react";
import { fetchSummaryData } from "@/services/summary-service";
import DashboardLayout from "@/components/templates/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";

interface SummaryData {
  pending: number;
  inTransit: number;
  delivered: number;
  delayed: number;
}

const AdminSummaryPage: React.FC = () => {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "administrador") {
      setError("No tienes permisos para acceder a esta página");
      return;
    }

    fetchSummaryData()
      .then((data) => setSummaryData(data as SummaryData))
      .catch((err) => setError(err.message));
  }, [isAuthenticated, user]);

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{summaryData.pending}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>En tránsito</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{summaryData.inTransit}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Entregados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{summaryData.delivered}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Retrasados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{summaryData.delayed}</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminSummaryPage;