import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Clock, ArrowUpRight, Sparkles, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { useIsMobile } from '../utils/useIsMobile';
import { buildContextualWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';
import { LanguageSelector } from './LanguageSelector';

export const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  const { siteConfig, openQuoteModal } = useCMS();
  const { t, tr } = useLanguage();

  if (isMobile) {
    return null;
  }

  const navLinks = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.lodgingDesktop, to: '/hospedaje' },
    { label: t.nav.corporateDesktop, to: '/corporativo' },
    { label: t.nav.weddingsDesktop, to: '/bodas' },
    { label: t.nav.contactDesktop, to: '/contacto' },
  ];

  const emailLinks = [
    { label: siteConfig.corporateEmails.reservas, tag: tr('Long Stays', 'Estadías') },
    { label: siteConfig.corporateEmails.corporativo, tag: tr('Corporate', 'Corporativo') },
    { label: siteConfig.corporateEmails.bodas, tag: tr('Weddings', 'Bodas') },
    { label: siteConfig.corporateEmails.general, tag: tr('Info', 'General') },
  ];

  const whatsappUrl = buildContextualWhatsAppUrl({
    phone: siteConfig.whatsappNumber,
    context: 'general',
  });

  return (
    <footer
      aria-label={tr("Hacienda Le Plus Footer", "Pie de página Hacienda Le Plus")}
      className="hidden md:block bg-[#06150F] text-[#FAF7F2] border-t border-[#C8A45D]/30 relative z-20"
    >
      {/* Contenido Principal del Footer Desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Columna 1: Identidad & Marca (4 cols) */}
          <div className="md:col-span-6 lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group focus:outline-none">
              <img
                src="/logo-leplus.png"
                alt={tr("Hacienda Le Plus Logo", "Logo Hacienda Le Plus")}
                className="h-14 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-serif-luxury text-base font-semibold tracking-[0.22em] text-[#FAF7F2]">
                  HACIENDA
                </span>
                <span className="font-serif-luxury text-lg font-bold tracking-[0.26em] text-[#C8A45D] -mt-0.5">
                  LE PLUS
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#FAF7F2]/55 mt-0.5">
                  Eco Club Resort
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-[#FAF7F2]/75 leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#071912] border border-[#C8A45D]/35 text-[11px] font-semibold text-[#E2C585]">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
              <span>{t.footer.commercialPriorityBadge}</span>
            </div>
          </div>

          {/* Columna 2: Navegación / Servicios (2 cols) */}
          <div className="md:col-span-6 lg:col-span-2 space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8A45D]">
              {tr('Explore', 'Explorar')}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              {navLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[#FAF7F2]/80 hover:text-[#E2C585] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Ubicación Estratégica (3 cols) */}
          <div className="md:col-span-6 lg:col-span-3 space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8A45D]">
              {t.footer.locationTitle}
            </h3>
            <div className="space-y-3 text-xs sm:text-[13px] text-[#FAF7F2]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{siteConfig.address}</span>
              </div>

              <div className="flex items-start gap-2.5 text-[#FAF7F2]/70">
                <Clock className="w-4 h-4 text-[#C8A45D]/80 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs leading-snug">
                  <p>{t.footer.airportTime}</p>
                  <p>{t.footer.quitoTime}</p>
                </div>
              </div>

              <a
                href={siteConfig.googleMapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E2C585] hover:text-white transition-colors pt-1"
              >
                <span>{tr('Open in Google Maps', 'Ver ubicación en Google Maps')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Columna 4: Atención Directa & Correos (3 cols) */}
          <div className="md:col-span-6 lg:col-span-3 space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8A45D]">
              {tr('Direct Attention', 'Atención Comercial Directa')}
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#1FAF53] text-[#06150F] text-xs font-extrabold shadow-md transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>{siteConfig.phoneDisplay}</span>
              </a>

              <button
                type="button"
                onClick={() => openQuoteModal({ serviceType: 'grupos' })}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C8A45D] hover:bg-[#E2C585] text-[#06150F] text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
              >
                <span>{t.nav.quote}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <ul className="space-y-1.5 pt-1 text-xs text-[#FAF7F2]/75">
              {emailLinks.map((email) => (
                <li key={email.label} className="flex items-center gap-2 min-w-0">
                  <Mail className="w-3.5 h-3.5 text-[#C8A45D]/80 shrink-0" />
                  <a
                    href={`mailto:${email.label}`}
                    className="hover:text-[#E2C585] transition-colors truncate"
                    title={`${email.tag}: ${email.label}`}
                  >
                    {email.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Franja Inferior Legal & Selector de Idioma */}
      <div className="border-t border-white/10 bg-[#040E0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pr-24 2xl:pr-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-[#FAF7F2]/60">
            <span>
              © {new Date().getFullYear()} {t.footer.rights}
            </span>
            <span className="text-white/20">•</span>
            <Link
              to="/portal-admin/login"
              className="text-[#FAF7F2]/45 hover:text-[#E2C585] transition-colors"
            >
              {tr('Admin Portal', 'Portal Administrativo')}
            </Link>
          </div>

          <LanguageSelector variant="footer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
