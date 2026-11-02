import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CMSProvider } from './context/CMSContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { FloatingWhatsAppAndMobileBar } from './components/FloatingWhatsAppAndMobileBar';
import { QuickQuoteModal } from './components/QuickQuoteModal';
import { HomePage } from './pages/HomePage';
import { WeddingsPage } from './pages/WeddingsPage';
import { CorporatePage } from './pages/CorporatePage';
import { LodgingPage } from './pages/LodgingPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';

const AppShell: React.FC = () => {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith('/portal-admin') || location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0A1F17]">
      {!isAdminRoute && <Navbar />}
      <div className="flex-1">
        <Routes>
          {/* Portada Principal de Alto Impacto (5 secciones) */}
          <Route path="/" element={<HomePage />} />

          {/* 4 Páginas Comerciales Estratégicas */}
          <Route path="/bodas" element={<WeddingsPage />} />
          <Route path="/corporativo" element={<CorporatePage />} />
          <Route path="/hospedaje" element={<LodgingPage />} />
          <Route path="/contacto" element={<ContactPage />} />

          {/* ==========================================================
              PORTAL ADMINISTRATIVO INDEPENDIENTE (ESTRUCTURA VALLE LOGISTICS)
             ========================================================== */}
          <Route path="/portal-admin/login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<AdminProtectedRoute />}>
            <Route path="/portal-admin" element={<AdminDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Redirecciones Limpias desde Rutas Históricas */}
          <Route path="/eventos" element={<Navigate to="/corporativo" replace />} />
          <Route path="/estadias-largas" element={<Navigate to="/hospedaje" replace />} />
          <Route path="/escapadas" element={<Navigate to="/hospedaje" replace />} />
          <Route path="/contactos" element={<Navigate to="/contacto" replace />} />
          <Route path="/book-online" element={<Navigate to="/hospedaje" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {!isAdminRoute && <FloatingWhatsAppAndMobileBar />}
      {!isAdminRoute && <QuickQuoteModal />}
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <LanguageProvider>
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </LanguageProvider>
      </CMSProvider>
    </AuthProvider>
  );
}

export default App;
