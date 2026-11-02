import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export const AdminProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06150F] flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#C8A45D]" />
        <p className="font-sans-ui tracking-wider uppercase text-sm text-[#FAF7F2]/80">
          Cargando entorno seguro de administración...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/portal-admin/login" replace />;
  }

  return <Outlet />;
};
