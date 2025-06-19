import React from 'react';

interface AdminSummaryLayoutProps {
  children: React.ReactNode;
}

const AdminSummaryLayout: React.FC<AdminSummaryLayoutProps> = ({ children }) => {
  return (
    <div className="admin-summary-layout">
      <header>
        <h1>Resumen de Envíos</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AdminSummaryLayout;