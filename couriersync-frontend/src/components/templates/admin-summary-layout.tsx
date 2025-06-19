// filepath: c:\Users\jhoan\Documents\Ing. Sistemas Materias\Semestre 9\Fabrica escuela\couriersync-frontend\src\components\templates\admin-summary-layout.tsx
import { FC, ReactNode } from "react";
import DashboardLayout from "@/components/templates/dashboard-layout";

interface AdminSummaryLayoutProps {
  children: ReactNode;
}

const AdminSummaryLayout: FC<AdminSummaryLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <div className="admin-summary-container">
        {children}
      </div>
    </DashboardLayout>
  );
};

export default AdminSummaryLayout;