import React, { useState } from 'react';
import Layout from './Layout';
import { useAuth } from '../hooks/useAuth';
import AppointmentsPage from './appointments/AppointmentsPage';
import ProductsPage from './products/ProductsPage';
import ClientsPage from './clients/ClientsPage';
import StaffPage from './staff/StaffPage';
import CreditsPage from './credits/CreditsPage';
import PettyCashPage from './petty-cash/PettyCashPage';
import ExpensesPage from './expenses/ExpensesPage';
import SalesPage from './sales/SalesPage';

type PageType = 'appointments' | 'products' | 'clients' | 'staff' | 'credits' | 'petty-cash' | 'expenses' | 'sales';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<PageType>('appointments');
  const { user } = useAuth();
  
  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductsPage />;
      case 'clients':
        return <ClientsPage />;
      case 'staff':
        return <StaffPage />;
      case 'credits':
        return <CreditsPage />;
      case 'petty-cash':
        return <PettyCashPage />;
      case 'expenses':
        return <ExpensesPage />;
      case 'sales':
        return <SalesPage />;
      default:
        return <AppointmentsPage />;
    }
  };

  return (
    <Layout onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}