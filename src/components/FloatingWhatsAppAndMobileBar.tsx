import React from 'react';
import { useLocation } from 'react-router-dom';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { buildContextualWhatsAppUrl, WhatsAppContextType } from '../utils/whatsapp';
import { MobileBottomNav } from './MobileBottomNav';
import { LanguageSelector } from './LanguageSelector';

export const FloatingWhatsAppAndMobileBar: React.FC = () => {
  const { siteConfig } = useCMS();
  const { tr } = useLanguage();
  const location = useLocation();

  if (location.pathname.startsWith('/portal-admin') || location.pathname.startsWith('/admin')) {
    return null;
  }

  let context: WhatsAppContextType = 'general';
  let contextLabel = tr("Request quote via WhatsApp at +593 96 981 7891", "Solicitar cotización por WhatsApp al 0969817891");

  if (location.pathname.includes('bodas')) {
    context = 'bodas';
    contextLabel = tr("WhatsApp Weddings & Celebrations · 0969817891", "WhatsApp Bodas y Celebraciones · 0969817891");
  } else if (location.pathname.includes('corporativo')) {
    context = 'corporativo';
    contextLabel = tr("WhatsApp Corporate & Major Events · 0969817891", "WhatsApp Grandes Eventos y Corporativo · 0969817891");
  } else if (location.pathname.includes('hospedaje')) {
    context = 'grupos';
    contextLabel = tr("WhatsApp Group & Corporate Lodging · 0969817891", "WhatsApp Hospedaje Empresas y Grupos · 0969817891");
  } else if (location.pathname.includes('contacto')) {
    context = 'visita';
    contextLabel = tr("Schedule Resort Visit via WhatsApp · 0969817891", "Agendar Visita por WhatsApp · 0969817891");
  }

  const whatsappUrl = buildContextualWhatsAppUrl({
    phone: siteConfig.whatsappNumber,
    context,
  });

  return (
    <>
      {/* Etiqueta flotante de bandera móvil en la parte superior a 15px pegada al margen */}
      <div className="fixed top-[15px] right-[15px] z-50 md:hidden items-center flex pointer-events-auto">
        <LanguageSelector variant="mobile-top-tag" />
      </div>

      {/* Botón flotante contextual de WhatsApp (Desktop: bottom-6 right-6, Móvil: flotando ergonómicamente sobre la barra inferior) */}
      <div className="fixed bottom-[58px] right-3.5 md:bottom-6 md:right-6 z-40 items-center flex">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] border-2 border-white/70 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label={contextLabel}
          title={contextLabel}
        >
          <span className="animate-ping absolute inline-flex h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#25D366] opacity-35 pointer-events-none"></span>
          <WhatsAppIcon
            variant="monochrome"
            className="relative w-6 h-6 md:w-7 md:h-7 text-white fill-current drop-shadow-md transition-transform group-hover:rotate-6"
          />
        </a>
      </div>

      {/* Barra de Navegación Móvil Inferior con Muesca / Scoop SVG Animada */}
      <MobileBottomNav />
    </>
  );
};
