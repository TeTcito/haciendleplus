import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { AdminCMSPage } from './pages/AdminCMSPage';

export function App() {
  return (
    <CMSProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0A1F17]">
            <Navbar />
            <div className="flex-1">
              <Routes>
                {/* Portada Principal de Alto Impacto (5 secciones) */}
                <Route path="/" element={<HomePage />} />

                {/* 4 Páginas Comerciales Estratégicas */}
                <Route path="/bodas" element={<WeddingsPage />} />
                <Route path="/corporativo" element={<CorporatePage />} />
                <Route path="/hospedaje" element={<LodgingPage />} />
                <Route path="/contacto" element={<ContactPage />} />

                {/* Panel Administrativo de Control (CMS) */}
                <Route path="/admin" element={<AdminCMSPage />} />

                {/* Redirecciones Limpias desde Rutas Históricas */}
                <Route path="/eventos" element={<Navigate to="/corporativo" replace />} />
                <Route path="/estadias-largas" element={<Navigate to="/hospedaje" replace />} />
                <Route path="/escapadas" element={<Navigate to="/hospedaje" replace />} />
                <Route path="/contactos" element={<Navigate to="/contacto" replace />} />
                <Route path="/book-online" element={<Navigate to="/hospedaje" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <FloatingWhatsAppAndMobileBar />
            <QuickQuoteModal />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </CMSProvider>
  );
}

export default App;
